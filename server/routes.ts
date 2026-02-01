import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Chat logic is now handled by api/chat.ts for Vercel compatibility.
  // This file is kept minimal to pass the build process.
  
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  return httpServer;
}