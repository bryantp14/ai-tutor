import { getLessonContext } from "../server/data/index";
import OpenAI from "openai";

// 1. Initialize OpenAI / OpenRouter
const apiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;
const baseURL = process.env.OPENROUTER_API_KEY ? "https://openrouter.ai/api/v1" : undefined;

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: baseURL,
});

export default async function handler(req: any, res: any) {
  // --- A. CORS Headers (Essential for Vercel) ---
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

  // --- B. Validation ---
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: "Missing API Key in Environment Variables" });
  }

  // --- C. The Logic ---
  try {
    // 1. Get the User's input AND the Unit ID (e.g., "lesson-1")
    const { message, history, unitId } = req.body;

    // 2. Retrieve the specific lesson data from your data folder
    // We default to "lesson-1" if the frontend forgets to send an ID
    const lessonContext = getLessonContext(unitId || "unit-1");

    console.log(`Processing message for unit: ${unitId}`);
    console.log(`Topic: ${lessonContext.topic}`);

    // 3. Build the "Brain" (System Prompt)
    // This tells the AI exactly what to teach based on your files.
    const systemPrompt = `
      You are a specialized Chinese language tutor.
      
      CURRENT LESSON CONTEXT:
      - Topic: ${lessonContext.topic}
      - Vocabulary to prioritize: ${lessonContext.vocabList}
      - Grammar points to reinforce: ${lessonContext.grammarList}
      - Key Sentence Patterns: ${lessonContext.patterns}

      INSTRUCTIONS:
      1. Engage in conversation related to the Topic.
      2. Prioritize using the vocabulary listed above.
      3. If the user makes a mistake, gently correct them using the grammar points listed.
      4. Keep responses concise (under 3 sentences) to encourage conversation.
      5. Speak mostly in Chinese, but use English for explanations if the user seems confused.
    `;

    // 4. Send to AI
    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []),
      { role: "user", content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Or "google/gemini-2.0-flash-001"
      messages: messages as any,
    });

    const reply = completion.choices[0].message.content;

    return res.status(200).json({ message: reply });

  } catch (error: any) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: "Error communicating with AI", details: error.message });
  }
}