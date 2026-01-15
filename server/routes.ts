import { appendToSheet } from "./sheets"; 
import type { Express } from "express";
import { createServer, type Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";
import { systemInstruction } from "./systemInstruction";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";

// ✅ 1. Import your new data and types
import { lesson1 } from "./data/lesson1"; 
import { lesson2 } from "./data/lesson2"; // ✅ Created
import { lesson3 } from "./data/lesson3"; // ✅ Created
import { lesson4 } from "./data/lesson4"; // ✅ Created
import { lesson5 } from "./data/lesson5";
import { Module } from "./data/types";

// Map IDs to files
const lessons: Record<string, Module> = {
  "unit-1": lesson1,
  "unit-2": lesson2,
  "unit-3": lesson3,
  "unit-4": lesson4,
  "unit-5": lesson5,
};

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, 
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "X-Title": "My Chinese Tutor App",
  },
});

// ✅ 3. Updated Helper: Convert raw Lesson Data into the String format your prompt needs
function formatSystemInstruction(lesson: Module): string {
  
  // -- A. Format Vocabulary --
  const hasVocab = lesson.vocabulary && lesson.vocabulary.length > 0;
  const vocabList = hasVocab 
    ? lesson.vocabulary.map(v => `${v.word} (${v.pinyin}) - ${v.english}`).join("\n")
    : "ERROR: NO VOCABULARY LOADED";

  // -- B. Format Grammar --
  const grammarList = lesson.grammar.map(g => {
    const points = g.points.map((p: any) => {
      // Handle examples safely
      const exStr = p.examples.map((ex: any) => {
        if (typeof ex === 'string') return `   * ${ex}`;
        return `   * Q: ${ex.question || ''} A: ${ex.answer || ''} (St: ${ex.statement || ''})`;
      }).join("\n");

      return `**${p.structure || 'Rule'}**\nUsage: ${p.usage || ''}\nExamples:\n${exStr}`;
    }).join("\n\n");
    return `### Topic: ${g.topic}\n${points}`;
  }).join("\n\n") || "No grammar specified";

  // -- C. Format Patterns --
  const patternList = lesson.patterns?.map(p => 
    `Function: ${p.function}\nPatterns:\n${p.patterns.map(s => `- ${s}`).join("\n")}`
  ).join("\n\n") || "None specified";

  // -- D. Build the Final Prompt --
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
  2. Do not give direct correct answers to the user. Instead, quote their incorrect sentence/phrase/word, say the English meaning while hinting at the error, and encourage user to try answering again (e.g., "You typed [incorrect phrase in Chinese], I think you meant [correct phrase in English], but [explain mistake]. Can you try again?").
  3. **Repeating Errors:** If the user made the same mistake multiple times, you MUST explicitly point this out 
  4. If the list of errors is long (more than five mistakes), summarize the critical ones first.
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

      // ✅ 4. Fetch the raw lesson data safely
      const requestedId = unitId || "unit-1";
      const currentLesson = lessons[requestedId] || lesson1; // Fallback to lesson1 if ID not found
      
      // DEBUG: Log what we're getting
      console.log("=== LESSON CONTEXT DEBUG ===");
      console.log("Unit ID:", requestedId);
      console.log("Topic:", currentLesson.title);
      console.log("Vocab Count:", currentLesson.vocabulary?.length || 0);
      console.log("===========================");
      
      // ✅ 5. Convert it to text for the AI
      const systemMessageContent = formatSystemInstruction(currentLesson);

      const recentHistory = (history || []).slice(-10).map(msg => ({
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

      await appendToSheet({
        unit: unitId,
        userMessage: message,
        aiResponse: aiContent
      });
      
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