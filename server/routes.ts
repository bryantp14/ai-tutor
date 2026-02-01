import { appendToSheet } from "./sheets"; 
import type { Express } from "express";
import { createServer, type Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";
import { systemInstruction } from "./systemInstruction";

// ❌ REMOVED: Broken integration imports that were crashing the build
// import { registerChatRoutes } from "./replit_integrations/chat";
// import { registerImageRoutes } from "./replit_integrations/image";

// ✅ IMPORT: This requires api/lessons.ts to have "export const lessons = ..." at the bottom
import { lessons } from "../api/lessons";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, 
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "X-Title": "My Chinese Tutor App",
  },
});

// --- YOUR SPECIAL PROMPT RESTORED ---
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
- DO NOT assume gender unless user identifies with a full persona name

## INITIAL BEHAVIOR
1. Select a persona (do NOT reveal name yet)
2. Output a warm Chinese greeting using allowed vocabulary (e.g., "你好！")
3. Follow immediately with English instruction: "Let's start chatting using what you've recently learned. Type 'feedback' when ready for a conversation review."
4. WAIT for user to initiate - do NOT ask the first question
`;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // ❌ REMOVED: These lines were causing "Module not found" errors in your logs
  // registerChatRoutes(app);
  // registerImageRoutes(app);

  app.post(api.chat.sendMessage.path, async (req, res) => {
    try {
      const { message, unitId, history } = api.chat.sendMessage.input.parse(req.body);

      // ✅ FIX: TypeScript "Implicit Any" Error
      // We cast 'lessons' to any so TypeScript doesn't complain about using [requestedId]
      const allLessons = lessons as any;
      const requestedId = unitId || "unit-1";
      
      // Safe Lookup Logic
      let currentLesson = allLessons[requestedId];

      if (!currentLesson && Array.isArray(allLessons)) {
         currentLesson = allLessons.find((l: any) => l.id === requestedId);
      }
      
      if (!currentLesson) {
        // Ultimate fallback to prevent crash
        currentLesson = allLessons["unit-1"] || (Array.isArray(allLessons) ? allLessons[0] : undefined);
      }

      if (!currentLesson) {
         throw new Error("Lesson could not be loaded. Please check api/lessons.ts exports.");
      }

      console.log(`[SERVER] Loading Special Prompt for: ${currentLesson.title}`);

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
        appendToSheet({
            unit: requestedId,
            userMessage: message,
            aiResponse: aiContent
        }).catch(err => console.error("Logging error:", err));
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