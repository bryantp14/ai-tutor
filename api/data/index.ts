import { lesson1 } from "./lesson1";
import { lesson2 } from "./lesson2";
import { lesson3 } from "./lesson3";
import { Module } from "./types";

// Register all available lessons here
const lessons: Record<string, Module> = {
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

  // Schema Normalization:
  // Combine 'patterns' (Lesson 1/2) and 'key_sentence_patterns' (Lesson 3)
  // so the AI prompt gets the data regardless of which field is used.
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