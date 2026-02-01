// api/server.cjs
const express = require('express');
const app = express();

app.use(express.json());

// 1. ADD THIS DEBUGGER: Log every request so we can see what's happening in the logs
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// 2. FIX THE ROUTE PATH: Ensure it includes "/api"
// Also, define BOTH GET and POST to catch the error.
app.post('/api/chat', async (req, res) => {
  try {
    // ... Your OpenRouter Fetch Code Here ...
    console.log("Processing chat POST...");
    // Return dummy data to test if needed, or your real fetch
    res.json({ message: "Connected successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// 3. Catch-all for GET requests (to fix the 404 you see in logs)
app.get('/api/chat', (req, res) => {
  res.status(200).json({ message: "Chat API is ready. Please use POST to send messages." });
});

module.exports = app;