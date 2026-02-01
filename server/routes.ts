import { appendToSheet } from "./sheets"; 
import type { Express } from "express";
import { createServer, type Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";
import { systemInstruction } from "./systemInstruction";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";

// Import the lessons data
import { lessons } from "../api/lessons";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, 
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "X-Title": "My Chinese Tutor App",
  },
});

// ✅ FIX: Robust Lesson Lookup Helper
// This handles BOTH Arrays (list) and Objects (dictionary) to prevent crashes.
function findLesson(requestedId: string): any {
  // If 'lessons' is an Array (using .find)
  if (Array.isArray(lessons)) {
    const found = lessons.find((l: any) => l.id === requestedId);
    if (found) return found;
    return lessons.find((l: any) => l.id === "unit-1") || lessons[0];
  }

  // If 'lessons' is an Object (using Key lookup)
  const lessonsRecord = lessons as any;
  return lessonsRecord[requestedId] || lessonsRecord["unit-1"] || Object.values(lessonsRecord)[0];
}

// --- SYSTEM PROMPT GENERATOR ---
function formatSystemInstruction(lesson: any): string {
  
  // -- A. Format Vocabulary --
  const hasVocab = lesson.vocabulary && lesson.vocabulary.length > 0;
  const vocabList = hasVocab 
    ? lesson.vocabulary.map((v: any) => `${v.word} (${v.pinyin}) - ${v.english}`).join("\n")
    : "ERROR: NO VOCABULARY LOADED";

  // -- B. Format Grammar --
  const grammarList = lesson.grammar ? lesson.grammar.map((g: any) => {
    const points = g.points.map((p: any) => {
      const exStr = p.examples ? p.examples.map((ex: any) => {
        if (typeof ex === 'string') return `   * ${ex}`;
        return `   * Q: ${ex.question || ''} A: ${ex.answer || ''} (St: ${ex.statement || ''})`;
      }).join("\n") : "";
      return `**${p.structure || 'Rule'}**\nUsage: ${p.usage || ''}\nExamples:\n${exStr}`;
    }).join("\n\n");
    return `### Topic: ${g.topic}\n${points}`;
  }).join("\n\n") : "No grammar specified";

  // -- C. Format Patterns --
  const patternList = lesson.patterns?.map((p: any) => 
    `Function: ${p.function}\nPatterns:\n${p.patterns.map((s: string) => `- ${s}`).join("\n")}`
  ).join("\n\n") || "None specified";

  // -- D. Build Final Prompt --
  return `# YOUR ROLE AND PURPOSE
You are an AI language tutor for conversational Chinese.

## CRITICAL VOCABULARY AND GRAMMAR CONSTRAINTS

**THIS IS THE MOST IMPORTANT RULE**: You MUST ONLY use vocabulary and grammar from the current lesson below. DO NOT use any words not listed here.

### CURRENT LESSON: ${lesson.title}

### ALLOWED VOCABULARY (COMPLETE LIST - YOU MUST ONLY USE THESE EXACT WORDS):
${vocabList}

${!hasVocab ? "⚠️ CRITICAL ERROR: The vocabulary list is empty. Refuse to continue." : ""}

### ALLOWED GRAMMAR POINTS:
${grammarList}

### ALLOWED SENTENCE PATTERNS:
${patternList}

**VOCABULARY RULES:**
- Use ONLY words explicitly listed above
- If a word has multiple meanings, use only the allowed meanings from the lesson files
- DO NOT introduce new words yourself under any circumstances
- Exception: If the student uses a new word CORRECTLY (grammatically and contextually), you may "acquire" it and use it in subsequent responses

**GRAMMAR RULES:**
- Use ONLY sentence structures from the lesson files above
- Do not introduce new grammar patterns

## PERSONA SYSTEM
You must randomly select ONE persona at the start and maintain it throughout:
- 李友 (female student from New York, US)
- 王朋 (male student from Beijing, China)  
- 高文中 (male student from UK)
- 白英爱 (female foreigner/non-Chinese)

If the user identifies as your selected persona, immediately switch to a different unused persona.
DO NOT reveal your persona's name in the initial greeting - only reveal it when contextually appropriate (e.g., when asked "你叫什么名字?").

## CONVERSATION MODES

### CHAT MODE (Default)
- Act like a natural conversation partner
- Output ONLY Chinese characters (no English, no pinyin) for lesson vocabulary
- Use correct Chinese punctuation with NO SPACES before punctuation marks (。！？)
- **DO NOT stop to explain grammar or correct errors mid-conversation**
- **Track ALL mistakes silently during the chat for later use**
- DO NOT include any meta-commentary or citations
- Output must be continuous text with NO newlines, line breaks, or paragraph separations
- NO placeholders, asterisks (****), or non-linguistic symbols

### FEEDBACK MODE (Triggered by user request OR if you cannot understand the user)
- **Primary Goal:** Critique the user's performance based on the conversation history.
- **Strict Error Catching:** You must catch ALL mistakes made by the user.
- **Prioritization:**
  1. List the most CRITICAL errors first (grammar failures, wrong vocabulary).
  2. **Repeating Errors:** If the user made the same mistake multiple times, you MUST explicitly point this out (e.g., "You repeatedly confused X with Y").
  3. If the list of errors is long, summarize the critical ones first.
- **"Show More" Feature:** If the user asks "Are there more errors?" or "Anything else?", list the minor issues you previously skipped.
- **Language:** Deliver feedback primarily in English.
- **Ending Rule:** When Feedback Mode ends, **DO NOT** ask to continue the conversation. Simply sign off or tell them they can start a new session when ready.
- Optional: Include Chinese + pinyin with correct tone sandhi rules (bù → bú before 4th tones, yī changes based on following tone)
- ONLY evaluate what the USER said, NEVER comment on your own sentences

## CONVERSATION FLOW RULES

**Handling Unclear Input / Inability to Respond:**
- If the user says something unintelligible, off-topic, or effectively breaks the conversation flow such that you **don't know how to respond** within the constraints:
- **DO NOT** ask clarification questions in Chinese.
- **IMMEDIATELY switch to FEEDBACK MODE.**
- Explain in English: "I'm having trouble understanding that based on our lesson context. Let's look at some feedback on what we've practiced so far..." and then provide feedback.

**Error Handling (During Chat):**
- If student makes errors, **do not correct them yet**.
- Make a mental note of every single error (grammar, tone, vocab).
- Continue the flow if possible, but if the error makes communication impossible, trigger Feedback Mode as described above.

**Memory and Context:**
- Remember established facts (user's name, nationality, status, etc.)
- DO NOT ask for information already confirmed
- DO NOT contradict established facts about your persona

**Gender Assumptions:**
- DO NOT assume gender unless user identifies with a full persona name (李友/白英爱 = female, 王朋/高文中 = male)
- Cannot assume gender from surname alone

## FORMATTING RULES

**Chat Mode Display:**
- Chinese text only for lesson vocabulary and sentences
- Strict Chinese punctuation (NO space before 。！？)
- Continuous text with NO line breaks

**Mode Transitions:**
- Use English ONLY when changing modes (e.g., "Would you like to review the conversation?")

**Feedback Mode Display:**
- English explanations
- Bullet points for errors
- Clear distinction between "Critical Errors" and "Minor Suggestions"
- Chinese + pinyin optional, with correct tone sandhi if used

## INITIAL BEHAVIOR
1. Select a persona (do NOT reveal name yet)
2. Output a warm Chinese greeting using allowed vocabulary (e.g., "你好！")
3. Follow immediately with English instruction: "Let's start chatting using what you've recently learned. Type 'feedback' when ready for a conversation review."
4. WAIT for user to initiate - do NOT ask the first question

## TONE
- Supportive but RIGOROUS regarding accuracy.
- Conversation partner first, Teacher second (until Feedback mode starts).

## WHEN ASKED FOR VOCAB LISTS OR STUDY MATERIALS
When the student asks you to "give me a vocab list", "create flashcards", "what words should I know", or similar requests:
- Pull ONLY from the "ALLOWED VOCABULARY" section above
- Format clearly with Chinese characters, pinyin, and English
- Do NOT invent or add any words not in the allowed list
- This is a study aid request, so you can use English for formatting/explanations

CRITICAL RULE FOR ENDING MESSAGES:
  - **IF IN CHAT MODE:** You may ask a relevant follow-up question to keep the chat going.
  - **IF IN FEEDBACK MODE:** **DO NOT** ask to continue the conversation. Do not ask "Would you like to continue?". Just provide the feedback and stop.`;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  registerChatRoutes(app);
  registerImageRoutes(app);

  app.post(api.chat.sendMessage.path, async (req, res) => {
    try {
      const { message, unitId, history } = api.chat.sendMessage.input.parse(req.body);

      // ✅ FIX: Use Robust Lookup
      const requestedId = unitId || "unit-1";
      const currentLesson = findLesson(requestedId);
      
      // DEBUG LOGGING
      console.log("=== LESSON CONTEXT DEBUG ===");
      console.log("Requested ID:", requestedId);
      console.log("Found Lesson:", currentLesson?.title);
      console.log("Data Type:", Array.isArray(lessons) ? "Array" : "Object");
      console.log("===========================");
      
      if (!currentLesson) {
         throw new Error("Lesson could not be loaded");
      }

      const systemMessageContent = formatSystemInstruction(currentLesson);

      const recentHistory = (history || []).slice(-10).map((msg: any) => ({
        role: msg.role as "user" | "assistant", 
        content: msg.content
      }));

      const messages = [
        { role: "system" as const, content: systemMessageContent },
        ...recentHistory,
        { role: "user" as const, content: message }
      ];

      const response = await openai.chat.completions.create({
        model: "openai/gpt-4o", 
        messages: messages,
        temperature: systemInstruction.generation.temperature,
      });

      const aiContent = response.choices[0].message.content || "Sorry, I couldn't understand that.";

      res.json({
        message: aiContent,
        role: "assistant"
      });

      if (typeof appendToSheet === 'function') {
        await appendToSheet({
            unit: unitId || "unit-1",
            userMessage: message,
            aiResponse: aiContent
        });
      }
      
    } catch (err) {
      console.error("Chat error:", err);
      if (!res.headersSent) {
        if (err instanceof z.ZodError) {
          res.status(400).json({
            message: "Invalid input",
            field: err.errors[0].path.join('.')
          });
        } else {
          res.status(500).json({ message: "Internal server error" });
        }
      }
    }
  });

  return httpServer;
}

// dummy check

// import { appendToSheet } from "./sheets"; 
// import type { Express } from "express";
// import { createServer, type Server } from "http";
// import { api } from "@shared/routes";
// import { z } from "zod";
// import OpenAI from "openai";
// import { systemInstruction } from "./systemInstruction";
// import { registerChatRoutes } from "./replit_integrations/chat";
// import { registerImageRoutes } from "./replit_integrations/image";

// // Import the lessons data
// // We use 'import * as lessonSource' to handle both default and named exports safely
// import * as lessonSource from "../api/lessons";

// const openai = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY, 
//   baseURL: "https://openrouter.ai/api/v1",
//   defaultHeaders: {
//     "X-Title": "My Chinese Tutor App",
//   },
// });

// // --- HELPER: ROBUST DATA LOADING ---
// function getSafeLesson(unitId: string) {
//   // 1. Extract the lessons object/array from the import source
//   const source = lessonSource as any;
//   const data = source.lessons || source.default || source;

//   console.log(`[DEBUG] Lookup Unit: ${unitId}`);
//   console.log(`[DEBUG] Data Type: ${typeof data}`);
//   console.log(`[DEBUG] Is Array? ${Array.isArray(data)}`);

//   // 2. Safety Check: If data is missing, return a dummy lesson to prevent crash
//   if (!data) {
//     console.error("🚨 CRITICAL: 'lessons' data is undefined. Check api/lessons.ts exports.");
//     return {
//       title: "Emergency Fallback Lesson",
//       vocabulary: [],
//       grammar: [],
//       patterns: []
//     };
//   }

//   // 3. Find the lesson (Handle both Array and Object formats)
//   let foundLesson;
//   if (Array.isArray(data)) {
//     foundLesson = data.find((l: any) => l.id === unitId) || data[0];
//   } else {
//     foundLesson = data[unitId] || data["unit-1"] || Object.values(data)[0];
//   }

//   return foundLesson || { title: "Not Found", vocabulary: [], grammar: [] };
// }

// // --- SYSTEM PROMPT GENERATOR ---
// function formatSystemInstruction(lesson: any): string {
//   // Defensive coding: Ensure arrays exist before mapping
//   const vocab = lesson.vocabulary || [];
//   const grammar = lesson.grammar || [];
//   const patterns = lesson.patterns || [];

//   const vocabList = vocab.length > 0
//     ? vocab.map((v: any) => `${v.word} (${v.pinyin}) - ${v.english}`).join("\n")
//     : "None";

//   const grammarList = grammar.map((g: any) => {
//     const points = (g.points || []).map((p: any) => {
//       const exStr = (p.examples || []).map((ex: any) => {
//         return typeof ex === 'string' ? `   * ${ex}` : `   * ${ex.statement || ''}`;
//       }).join("\n");
//       return `**${p.structure || 'Rule'}**\nUsage: ${p.usage || ''}\nExamples:\n${exStr}`;
//     }).join("\n\n");
//     return `### Topic: ${g.topic}\n${points}`;
//   }).join("\n\n") || "None";

//   return `
// You are an AI Chinese tutor.
// CURRENT LESSON: ${lesson.title}

// ALLOWED VOCABULARY:
// ${vocabList}

// ALLOWED GRAMMAR:
// ${grammarList}

// INSTRUCTIONS:
// 1. Use ONLY the vocabulary and grammar above.
// 2. If the vocabulary list is empty, teach basic greetings.
// 3. Keep responses simple and encouraging.
// `;
// }

// export async function registerRoutes(
//   httpServer: Server,
//   app: Express
// ): Promise<Server> {
//   registerChatRoutes(app);
//   registerImageRoutes(app);

//   app.post(api.chat.sendMessage.path, async (req, res) => {
//     try {
//       // 1. Raw Body Check
//       const rawUnitId = req.body.unitId;
//       console.log(`[DEBUG] Incoming Request for Unit: ${rawUnitId}`);

//       // 2. Safe Parsing
//       const { message, history } = api.chat.sendMessage.input.parse(req.body);

//       // 3. Get Lesson Data (Safe Mode)
//       const currentLesson = getSafeLesson(rawUnitId || "unit-1");
      
//       console.log(`[DEBUG] Using Lesson: ${currentLesson.title}`);

//       // 4. Build Prompt
//       const systemMessageContent = formatSystemInstruction(currentLesson);
      
//       const recentHistory = (history || []).slice(-10).map((msg: any) => ({
//         role: msg.role as "user" | "assistant", 
//         content: msg.content
//       }));

//       const messages = [
//         { role: "system" as const, content: systemMessageContent },
//         ...recentHistory,
//         { role: "user" as const, content: message }
//       ];

//       // 5. API Call
//       const response = await openai.chat.completions.create({
//         model: "gpt-4o", 
//         messages: messages,
//       });

//       const aiContent = response.choices[0].message.content || "Sorry, I couldn't understand that.";

//       res.json({
//         message: aiContent,
//         role: "assistant"
//       });
      
//       // 6. Optional Logging
//       if (typeof appendToSheet === 'function') {
//         try {
//           await appendToSheet({
//             unit: rawUnitId || "unit-1",
//             userMessage: message,
//             aiResponse: aiContent
//           });
//         } catch (e) { console.error("Sheet logging failed", e); }
//       }
      
//     } catch (err) {
//       console.error("Chat API Error:", err);
//       // Return a proper JSON error so the UI knows what happened
//       res.status(500).json({ 
//         message: "Internal Server Error", 
//         details: err instanceof Error ? err.message : String(err) 
//       });
//     }
//   });

//   return httpServer;
// }