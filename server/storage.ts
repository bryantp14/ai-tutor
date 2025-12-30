import { db } from "./db";
import { chat_logs, type InsertChatLog } from "@shared/schema";

export interface IStorage {
  logChat(log: InsertChatLog): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async logChat(log: InsertChatLog): Promise<void> {
    await db.insert(chat_logs).values(log);
  }
}

export const storage = new DatabaseStorage();
