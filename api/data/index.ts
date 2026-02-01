import { lesson1 } from "./lesson1";
import { lesson2 } from "./lesson2";
import { lesson3 } from "./lesson3";
import { lesson4 } from "./lesson4";
import { lesson5 } from "./lesson5";
import { Module } from "./types";

// Register all available lessons here
export const lessons: Record<string, Module> = {
  [lesson1.id]: lesson1,
  [lesson2.id]: lesson2,
  [lesson3.id]: lesson3,
  [lesson4.id]: lesson4,
  [lesson5.id]: lesson5,
};

export function getLessonContext(unitId: string) {
  const lesson = lessons[unitId];
  
  if (!lesson) {
    return {
      topic: "General Practice",
      vocabList: "No restrictions.",
      grammarList: "Standard grammar.",
      patterns: ""
    };
  }

  // ✅ SAFELY COMBINE BOTH (Now that types.ts allows it)
  const allPatterns = [
    ...(lesson.patterns || []), 
    ...(lesson.key_sentence_patterns || [])
  ];

  return {
    topic: lesson.title,
    vocabList: lesson.vocabulary?.map(v => `${v.word} (${v.english})`).join(", ") || "",
    grammarList: lesson.grammar?.map(g => g.topic).join(", ") || "",
    patterns: allPatterns.map(p => p.function).join(", ")
  };
}