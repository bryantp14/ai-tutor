import OpenAI from "openai";
// We import the specific types. 
// Ensure your api/lessons.ts exports 'lessons' as the Record object we created earlier.
import { lessons, Lesson } from "../api/lessons";

// --------------------
// OpenAI / OpenRouter Configuration
// --------------------
const apiKey =
  process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;

const baseURL = process.env.OPENROUTER_API_KEY
  ? "https://openrouter.ai/api/v1"
  : undefined;

const openai = new OpenAI({
  apiKey,
  baseURL,
});

// --------------------
// Helper: Find lesson (ROBUST VERSION)
// --------------------
function getLessonByUnitId(unitId: string): Lesson {
  // 1. Try to find the lesson in the registry object
  // (We use bracket notation because 'lessons' is a Record/Object, not an array)
  const lesson = lessons[unitId];

  // 2. Fallback if not found
  if (!lesson) {
    console.warn(`⚠️ Unknown unitId received: ${unitId}. Falling back to unit-1.`);
    return lessons["unit-1"] || Object.values(lessons)[0];
  }

  return lesson;
}

// --------------------
// Helper: Build system prompt (CRASH-PROOF VERSION)
// --------------------
function buildSystemPrompt(lesson: Lesson): string {
  // ✅ FIX: specific check for vocabulary existence
  const vocab = (lesson.vocabulary || [])
    .map(v => `${v.word} (${v.pinyin}): ${v.english}`)
    .join("; ");

  // ✅ FIX: specific check for conversations existence
  // This was causing your error: "lesson.conversations is undefined"
  const conversationSamples = (lesson.conversations || [])
    .map(conv =>
      `CONTEXT: ${conv.context}\n` +
      conv.dialogue
        .map(d => `${d.speaker}: ${d.chinese}`)
        .join("\n")
    )
    .join("\n\n");

  // ✅ FIX: specific check for grammar existence
  const grammarPoints = (lesson.grammar || [])
    .map(g =>
      `${g.topic}\n` +
      g.points
        .map(p =>
          `• ${p.structure} — ${p.usage ?? ""}\n` +
          (p.examples
            // Check if examples exists, and handle both string and object formats
            ? p.examples.map(e => typeof e === 'string' ? `  - ${e}` : `  - ${e.statement}`).join("\n") 
            : "")
        )
        .join("\n")
    )
    .join("\n\n");

  // ✅ FIX: specific check for patterns existence
  const patterns = (lesson.patterns || [])
    .map(p =>
      `${p.function}:\n` +
      p.patterns.map(pt => `- ${pt}`).join("\n")
    )
    .join("\n\n");

  return `
You are a highly structured Chinese language tutor.

LESSON TOPIC: ${lesson.title}

VOCABULARY (prioritize usage):
${vocab || "None specified"}

GRAMMAR RULES (enforce and correct gently):
${grammarPoints || "None specified"}

SENTENCE PATTERNS (reuse naturally):
${patterns || "None specified"}

SAMPLE CONVERSATIONS (model tone and structure):
${conversationSamples || "None specified"}

INSTRUCTIONS:
1. Speak mostly in Simplified Chinese.
2. Keep responses concise (1–3 sentences).
3. Use lesson vocabulary and grammar whenever possible.
4. If the user makes a mistake, gently correct it and explain briefly.
5. Stay within the lesson scope unless the user explicitly asks otherwise.
`;
}

// --------------------
// API Handler
// --------------------
export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!apiKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const { message, history = [], unitId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    // Use our safe lookup helper
    const lesson = getLessonByUnitId(unitId || "unit-1");
    console.log(`Using Lesson: ${lesson.title} (ID: ${unitId})`);

    const systemPrompt = buildSystemPrompt(lesson);

    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Use "gpt-4o" if your key supports it for better reasoning
      messages: messages as any,
    });

    return res.status(200).json({
      message: completion.choices[0].message.content,
    });

  } catch (err: any) {
    console.error("Chat API Error:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
}