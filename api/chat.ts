import OpenAI from "openai";

// --- 1. EXPANDED DATA SECTION (Internalizing the lessons) ---
// You can paste your real content into these blocks later.

const lessons: Record<string, any> = {
  "unit-1": {
    title: "Greetings (你好)",
    vocabulary: [
      { word: "你好", pinyin: "nǐ hǎo", translation: "Hello" },
      { word: "谢谢", pinyin: "xiè xie", translation: "Thank you" },
      { word: "再见", pinyin: "zài jiàn", translation: "Goodbye" }
    ]
  },
  "unit-2": {
    title: "Family (家人)",
    vocabulary: [
      { word: "爸爸", pinyin: "bà ba", translation: "Father" },
      { word: "妈妈", pinyin: "mā ma", translation: "Mother" },
      { word: "哥哥", pinyin: "gē ge", translation: "Older Brother" }
    ]
  },
  "unit-3": {
    title: "Dates & Time (日期与时间)",
    vocabulary: [
      { word: "今天", pinyin: "jīn tiān", translation: "Today" },
      { word: "明天", pinyin: "míng tiān", translation: "Tomorrow" },
      { word: "几点", pinyin: "jǐ diǎn", translation: "What time?" }
    ]
  },
  "unit-4": {
    title: "Hobbies (爱好)",
    vocabulary: [
      { word: "看书", pinyin: "kàn shū", translation: "Reading" },
      { word: "听音乐", pinyin: "tīng yīn yuè", translation: "Listening to music" },
      { word: "运动", pinyin: "yùn dòng", translation: "Sports" }
    ]
  },
  "unit-5": {
    title: "Visiting Friends (拜访朋友)",
    vocabulary: [
      { word: "请进", pinyin: "qǐng jìn", translation: "Please come in" },
      { word: "坐", pinyin: "zuò", translation: "Sit" },
      { word: "茶", pinyin: "chá", translation: "Tea" }
    ]
  }
};
// -----------------------------------------------------------

export default async function handler(req: any, res: any) {
  // Setup CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(200).json({ role: "assistant", message: "❌ Error: API Key missing." });
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: { "X-Title": "Chinese Tutor" },
    });

    const { message, unitId, history } = req.body;

    // ✅ DYNAMIC SELECTION: Now this will actually find Unit 3, 4, etc.
    // If unitId is missing, it falls back to unit-1.
    const selectedUnit = lessons[unitId] || lessons["unit-1"];

    const systemPrompt = `You are a helpful Chinese Tutor. 
    Current Lesson Context: ${selectedUnit.title}.
    Target Vocabulary: ${selectedUnit.vocabulary.map((v:any) => `${v.word} (${v.translation})`).join(", ")}.
    
    Instructions:
    1. Prioritize using the Target Vocabulary in your response.
    2. Keep sentences simple.
    3. If the user makes a mistake, gently correct them.
    4. Speak in Chinese, but provide English translations in parentheses if the sentence is complex.`;

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
    console.error("Handler Error:", error);
    return res.status(200).json({ role: "assistant", message: `❌ Error: ${error.message}` });
  }
}