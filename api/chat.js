import OpenAI from 'openai';

// 1. Initialize the AI Client
// We check for both keys. If you use OpenRouter, it sets the correct Base URL automatically.
const apiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;
const baseURL = process.env.OPENROUTER_API_KEY ? "https://openrouter.ai/api/v1" : undefined;

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: baseURL,
});

export default async function handler(req, res) {
  // --- A. CORS Headers (Keep these!) ---
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
    console.error("Missing API Key");
    return res.status(500).json({ 
      error: "Server Configuration Error: API Key missing. Please check Vercel Environment Variables." 
    });
  }

  // --- C. The Logic ---
  try {
    const { message, history } = req.body;

    // Construct the messages array for the AI
    // We put a System Prompt first to tell the bot how to behave
    const systemPrompt = "You are a helpful Chinese language tutor. You help the user practice vocabulary. Keep your responses concise and helpful.";
    
    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []), // Previous chat history
      { role: "user", content: message } // The new message
    ];

    console.log("Sending to AI:", messages.length, "messages");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Or "google/gemini-2.0-flash-001" if using OpenRouter
      messages: messages,
    });

    const reply = completion.choices[0].message.content;

    // Return the real AI response
    return res.status(200).json({ 
      message: reply 
    });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ 
      error: "Error communicating with AI provider.", 
      details: error.message 
    });
  }
}