import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";
import { lessonData } from "./lessonData";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";

// Initialize OpenAI with Replit integration env vars
const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || "dummy-key",
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || "https://api.openai.com/v1",
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Register integration routes
  registerChatRoutes(app);
  registerImageRoutes(app);

  app.post(api.chat.sendMessage.path, async (req, res) => {
    try {
      const { message, unitId, history } = api.chat.sendMessage.input.parse(req.body);

      // Log user message
      await storage.logChat({
        role: "user",
        content: message,
        unitId: unitId
      });

      // Get context from lesson data
      const context = lessonData[unitId] || "General Chinese practice.";

      // Construct messages for OpenAI
      // Filter history to last 10 messages to keep context relevant but concise
      const recentHistory = (history || []).slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const systemPrompt = `You are an AI Chinese Tutor for elementary students. You must ONLY use vocabulary and grammar structures found in the provided context. You are helpful and patient. Do not do the student's homework; offer hints instead. If a student makes a mistake, gently label it and guide them to correct it. Context: ${context}`;

      const messages = [
        { role: "system" as const, content: systemPrompt },
        ...recentHistory,
        { role: "user" as const, content: message }
      ];

      // Call OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // Using a capable model for language tutoring
        messages: messages,
      });

      const aiContent = response.choices[0].message.content || "Sorry, I couldn't understand that.";

      // Log AI response
      await storage.logChat({
        role: "assistant",
        content: aiContent,
        unitId: unitId
      });

      res.json({
        message: aiContent,
        role: "assistant"
      });

    } catch (err) {
      console.error("Chat error:", err);
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid input",
          field: err.errors[0].path.join('.')
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}
