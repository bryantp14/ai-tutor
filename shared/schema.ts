import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const chat_logs = pgTable("chat_logs", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(), // "user" or "assistant"
  content: text("content").notNull(),
  unitId: text("unit_id"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertChatLogSchema = createInsertSchema(chat_logs).omit({ 
  id: true,
  timestamp: true 
});

export type InsertChatLog = z.infer<typeof insertChatLogSchema>;
export type ChatLog = typeof chat_logs.$inferSelect;

// Request/Response types for the API
export const chatRequestSchema = z.object({
  message: z.string(),
  unitId: z.string(),
  history: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string()
  })).optional()
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

export const chatResponseSchema = z.object({
  message: z.string(),
  role: z.literal("assistant")
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;

export * from "./models/chat";
