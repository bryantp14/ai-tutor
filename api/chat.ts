import OpenAI from "openai";

// --- 1. EMBEDDED DATA (The "Brain") ---
// We put the lesson data right here so it can't get lost.
const lesson1 = {
  id: "unit-1",
  title: "Lesson 1: Greetings and Introductions",
  vocabList: "你 (you), 好 (good), 请 (please), 问 (ask), 贵 (honorable), 姓 (surname), 我 (I/me), 呢 (particle), 小姐 (Miss), 叫 (to be called), 什么 (what), 名字 (name), 先生 (Mr.)",
  grammarList: "Pronoun + 姓 (surname), Pronoun + 叫 (name), Subject + 是 (is/am/are) + noun",
  patterns: "你/您好! (Hello), 你贵姓? (Your surname?), 我姓... (My surname is...), 你叫什么名字? (What is your name?)"
};

// Simple helper to pick the lesson
function getLessonData(unitId: string) {
  // In the future, we can add 'if (unitId === "unit-2") ...'
  return lesson1; 
}

// --- 2. THE SERVER SETUP ---
const apiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;
const baseURL = process.env.OPENROUTER_API_KEY ? "https://openrouter.ai/api/v1" : undefined;

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: baseURL,
});

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: "Missing API Key configuration" });
  }

  try {
    const { message, history, unitId } = req.body;

    // Load the embedded data
    const lesson = getLessonData(unitId || "unit-1");

    console.log(`Using Lesson: ${lesson.title}`);

    const systemPrompt = `
      You are a specialized Chinese language tutor.
      
      CURRENT LESSON: ${lesson.title}
      VOCABULARY: ${lesson.vocabList}
      GRAMMAR: ${lesson.grammarList}
      SENTENCE PATTERNS: ${lesson.patterns}

      INSTRUCTIONS:
      1. Engage in conversation related to the Topic.
      2. Prioritize using the vocabulary listed above.
      3. If the user makes a mistake, gently correct them using the grammar points listed.
      4. Keep responses short (under 3 sentences).
      5. Speak mostly in Chinese (Simplified), but use English for explanations if needed.
    `;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []),
      { role: "user", content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Or "google/gemini-2.0-flash-001"
      messages: messages as any,
    });

    return res.status(200).json({ 
      message: completion.choices[0].message.content 
    });

  } catch (error: any) {
    console.error("Handler Error:", error);
    return res.status(500).json({ 
      error: "Error processing request", 
      details: error.message 
    });
  }
}