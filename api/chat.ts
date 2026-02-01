import { lessons } from "./lessons";
import OpenAI from "openai";

export default async function handler(req: any, res: any) {
  // 1. Basic Setup Check
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // 2. DIAGNOSTIC: Check API Key immediately
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("CRITICAL: OPENROUTER_API_KEY is missing from Vercel Environment Variables.");
    }

    // 3. DIAGNOSTIC: Check Lessons Data
    if (!lessons) {
      throw new Error("CRITICAL: 'lessons' failed to import. Check api/lessons.ts.");
    }
    
    // Check if the requested unit exists
    const { message, unitId, history } = req.body;
    const requestedId = unitId || "unit-1";
    const currentLesson = lessons[requestedId];

    if (!currentLesson) {
       // Just a warning, not a crash
       console.warn(`Lesson ${requestedId} not found, defaulting...`);
    }

    // 4. Initialize OpenAI
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: { "X-Title": "My Chinese Tutor App" },
    });

    // 5. Run the Chat
    const systemPrompt = `You are a helpful Chinese Tutor. Current Lesson: ${currentLesson?.title || "General"}`;
    
    const response = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...(history || []),
        { role: "user", content: message }
      ] as any,
    });

    const aiContent = response.choices[0].message.content || "No response generated.";

    return res.status(200).json({ message: aiContent, role: "assistant" });

  } catch (error: any) {
    console.error("SERVER CRASH:", error);
    
    // THIS IS THE FIX: Instead of 500, return the error as a chat message
    // so you can see exactly what is wrong in the UI.
    return res.status(200).json({ 
      message: `❌ SYSTEM ERROR: ${error.message}`, 
      role: "assistant" 
    });
  }
}