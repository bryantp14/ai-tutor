import { lessons } from "./lessons";
import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "X-Title": "My Chinese Tutor App",
  },
});

// --- YOUR SPECIAL PROMPT LOGIC (Included directly here to prevent import errors) ---
function formatSystemInstruction(lesson: any): string {
  const vocab = lesson.vocabulary || [];
  const grammar = lesson.grammar || [];
  const patterns = lesson.patterns || [];

  const vocabList = vocab.length > 0 
    ? vocab.map((v: any) => `${v.word} (${v.pinyin}) - ${v.english}`).join("\n")
    : "None";

  const grammarList = grammar.length > 0 ? grammar.map((g: any) => {
    const points = (g.points || []).map((p: any) => {
      const exStr = (p.examples || []).map((ex: any) => {
        return typeof ex === 'string' ? `   * ${ex}` : `   * ${ex.statement || ''}`;
      }).join("\n");
      return `**${p.structure || 'Rule'}**\nUsage: ${p.usage || ''}\nExamples:\n${exStr}`;
    }).join("\n\n");
    return `### Topic: ${g.topic}\n${points}`;
  }).join("\n\n") : "No grammar specified";

  const patternList = patterns.length > 0 ? patterns.map((p: any) => 
    `Function: ${p.function}\nPatterns:\n${(p.patterns || []).map((s: string) => `- ${s}`).join("\n")}`
  ).join("\n\n") : "None specified";

  return `# YOUR ROLE AND PURPOSE
You are an AI language tutor for conversational Chinese.

## CRITICAL CONSTRAINTS
**THIS IS THE MOST IMPORTANT RULE**: You MUST ONLY use vocabulary and grammar from the current lesson below.

### CURRENT LESSON: ${lesson.title || "General Chat"}

### ALLOWED VOCABULARY:
${vocabList}

### ALLOWED GRAMMAR:
${grammarList}

### ALLOWED PATTERNS:
${patternList}

## PERSONA SYSTEM
You must randomly select ONE persona at the start:
- 李友 (female student from NY)
- 王朋 (male student from Beijing)  
- 高文中 (male student from UK)
- 白英爱 (female foreigner)

## CONVERSATION MODES
### CHAT MODE (Default)
- Output ONLY Chinese characters.
- NO English, NO pinyin in the output (unless requested).
- Track errors silently.

### FEEDBACK MODE (Triggered by 'feedback' or repeated errors)
- List mistakes in English.
- Prioritize grammar and tone errors.
- Do not ask to continue conversation after feedback.
`;
}

// --- THE SERVER HANDLER ---
export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { message, unitId, history } = req.body;

    // 1. Load the Lesson (With TypeScript safety fixes)
    const allLessons = lessons as any; 
    const requestedId = unitId || "unit-1";
    let currentLesson = allLessons[requestedId];

    // Fallback search if direct key lookup fails
    if (!currentLesson && Array.isArray(allLessons)) {
      currentLesson = allLessons.find((l: any) => l.id === requestedId);
    }
    // Ultimate fallback
    if (!currentLesson) {
       currentLesson = allLessons["unit-1"] || Object.values(allLessons)[0];
    }

    if (!currentLesson) {
       console.error("Lesson not found!"); 
       // Create a dummy lesson to prevent crash
       currentLesson = { title: "Basic Chat", vocabulary: [], grammar: [] };
    }

    console.log(`[API] Chatting about: ${currentLesson.title}`);

    // 2. Prepare Messages
    const systemPrompt = formatSystemInstruction(currentLesson);
    
    const recentHistory = (history || []).slice(-10).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content
    }));

    const messages = [
      { role: "system", content: systemPrompt },
      ...recentHistory,
      { role: "user", content: message }
    ];

    // 3. Call OpenAI
    const response = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: messages as any,
    });

    const aiContent = response.choices[0].message.content || "Sorry, I couldn't understand that.";

    // 4. Send Response
    return res.status(200).json({
      message: aiContent,
      role: "assistant"
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
}