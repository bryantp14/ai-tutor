import OpenAI from "openai";

// --- 1. DATA SECTION (Moved here to fix the "Missing Module" crash) ---
const lesson1 = {
  id: "unit-1",
  title: "Greetings (你好)",
  content: "Basic Chinese greetings.",
  vocabulary: [
    { word: "你好", pinyin: "nǐ hǎo", translation: "Hello" },
    { word: "谢谢", pinyin: "xiè xie", translation: "Thank you" },
    { word: "再见", pinyin: "zài jiàn", translation: "Goodbye" }
  ]
};

const lessons: Record<string, any> = {
  "unit-1": lesson1
};
// ---------------------------------------------------------------------

export default async function handler(req: any, res: any) {
  // 2. Setup CORS (To fix browser connection issues)
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    console.log("🚀 API Handler started..."); // Check Vercel logs for this

    // 3. Check API Key
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("❌ CRITICAL: Missing API Key");
      return res.status(200).json({ 
        role: "assistant", 
        message: "❌ System Error: API Key is missing in Vercel." 
      });
    }

    // 4. Initialize OpenAI
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: { "X-Title": "Chinese Tutor" },
    });

    // 5. Get User Message
    const { message, unitId, history } = req.body;
    
    // Use the internal data (No external file lookup needed)
    const currentLesson = lessons[unitId || "unit-1"] || lesson1;

    const systemPrompt = `You are a helpful Chinese Tutor. 
    Lesson: ${currentLesson.title}.
    Vocab: ${currentLesson.vocabulary.map((v:any) => v.word).join(", ")}.
    Please keep your reply simple and helpful for a beginner.`;

    // 6. Call AI
    const response = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...(history || []),
        { role: "user", content: message }
      ] as any,
    });

    const aiContent = response.choices[0].message.content || "No response.";

    return res.status(200).json({ message: aiContent, role: "assistant" });

  } catch (error: any) {
    console.error("❌ SERVER CRASH:", error);
    return res.status(200).json({ 
      role: "assistant", 
      message: `❌ Error: ${error.message}` 
    });
  }
}