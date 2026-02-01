import { lessons } from "./lessons";
import OpenAI from "openai";

// 1. Define the Handler
export default async function handler(req: any, res: any) {
  
  // 2. Set CORS Headers (Crucial for frontend to talk to backend)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 3. Handle Pre-flight Check
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 4. Ensure POST method
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // 5. Check API Key INSIDE the function
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("Missing API Key");
      return res.status(200).json({ 
        role: "assistant", 
        message: "❌ System Error: OPENROUTER_API_KEY is missing in Vercel settings." 
      });
    }

    // 6. Connect to OpenAI (Only happens now)
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: { "X-Title": "Chinese Tutor App" },
    });

    // 7. Get Data from Request
    const { message, unitId, history } = req.body;
    
    // Default to unit-1 if id is missing or invalid
    const requestedId = unitId || "unit-1";
    const currentLesson = lessons[requestedId] || lessons["unit-1"];

    // 8. Create System Prompt
    const systemPrompt = `You are a helpful Chinese Tutor. 
    Current Lesson Context: ${currentLesson?.title || "General Chat"}.
    Vocabulary to use: ${currentLesson?.vocabulary?.map((v: any) => v.word).join(", ") || "Simple words"}.
    Keep responses encouraging and suitable for a beginner.`;

    // 9. Call AI
    const response = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...(history || []),
        { role: "user", content: message }
      ] as any,
    });

    const aiContent = response.choices[0].message.content || "Sorry, I couldn't generate a response.";

    // 10. Send Success Response
    return res.status(200).json({ message: aiContent, role: "assistant" });

  } catch (error: any) {
    console.error("Handler Error:", error);
    // Send error to chat UI so you can see it
    return res.status(200).json({ 
      role: "assistant", 
      message: `❌ Error: ${error.message}` 
    });
  }
}