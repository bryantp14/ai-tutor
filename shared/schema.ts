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
  // ✅ CHANGE: Added .optional() so it doesn't crash if unitId is missing
  unitId: z.string().optional(), 
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

// Remove this line if you don't actually have a models/chat file
// export * from "./models/chat";