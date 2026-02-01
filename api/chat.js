// api/chat.js

export default async function handler(req, res) {
    // 1. Handle CORS (So your frontend can talk to it)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
  
    // Handle the "preflight" check
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    // 2. Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    }
  
    // 3. The "Dummy" Response (Test)
    try {
      console.log("Request received at /api/chat");
      return res.status(200).json({
        message: "Connection Successful! This is api/chat.js speaking.",
        reply: "I am the new Vercel Function. I work automatically!"
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }