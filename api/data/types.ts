export interface Vocabulary {
  word: string;
  pinyin: string;
  english: string;
}

export interface DialogueLine {
  speaker: string;
  chinese: string;
  pinyin: string;
  english: string;
  function: string;
}

export interface Conversation {
  title: string;
  context: string;
  dialogue: DialogueLine[];
}

export interface Pattern {
  function: string;
  patterns: string[];
}

export interface GrammarPoint {
  structure: string;
  usage?: string;
  examples: { statement?: string; negation?: string; question?: string; answer?: string }[];
  note?: string;
}

export interface GrammarSection {
  topic: string;
  points: GrammarPoint[];
}

export interface Module {
  id: string;
  title: string;
  vocabulary: Vocabulary[];
  conversations: Conversation[];
  patterns: Pattern[];
  grammar: GrammarSection[];
}