import { lesson1 } from "./lesson1";
import { lesson2 } from "./lesson2";
// If you haven't created lesson3 yet, you might need to comment these out
import { lesson3 } from "./lesson3"; 
import { Module } from "./types";

// Register all available lessons here
export const lessons: Record<string, Module> = {
  [lesson1.id]: lesson1,
  [lesson2.id]: lesson2,
  [lesson3.id]: lesson3,
};

export function getLessonContext(unitId: string) {
  const lesson = lessons[unitId];
  
  // Fallback for unknown IDs
  if (!lesson) {
    return {
      topic: "General Practice",
      vocabList: "No restrictions.",
      grammarList: "Standard grammar.",
      patterns: ""
    };
  }

  // ✅ FIX: Directly use 'patterns'. 
  // If lesson3 uses 'key_sentence_patterns', you must rename it to 'patterns' inside lesson3.ts
  const allPatterns = lesson.patterns || [];

  return {
    topic: lesson.title,
    vocabList: lesson.vocabulary?.map(v => `${v.word} (${v.english})`).join(", ") || "",
    grammarList: lesson.grammar?.map(g => g.topic).join(", ") || "",
    patterns: allPatterns.map(p => p.function).join(", ")
  };
}