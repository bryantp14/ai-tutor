// server/data/types.ts

export interface Word {
    word: string;
    pinyin: string;
    english: string;
  }
  
  export interface DialogueLine {
    speaker: string;
    chinese: string;
    pinyin: string;
    english: string;
    function?: string;
  }
  
  export interface Conversation {
    title: string;
    context?: string;
    dialogue: DialogueLine[];
  }
  
  // New interfaces for rich grammar data
  export interface GrammarExample {
    statement?: string;
    negation?: string;
    question?: string;
    answer?: string; // from lesson 1/2 data
  }
  
  export interface GrammarSubPoint {
    structure?: string;
    usage?: string;
    rule?: string; // from lesson 2 data
    examples: (string | GrammarExample)[]; // Can be simple strings or objects
    note?: string;
  }
  
  export interface GrammarPoint {
    topic: string;
    // This allows 'points' to be an array of objects OR simple strings/any
    points: (GrammarSubPoint | any)[]; 
  }
  
  export interface Pattern {
    function: string;
    patterns: string[];
  }
  
  export interface Module {
    id: string;
    title: string;
    vocabulary: Word[];
    grammar: GrammarPoint[];
    conversations?: Conversation[];
    patterns?: Pattern[];
    key_sentence_patterns?: Pattern[]; // Lesson 3 uses this name
  }