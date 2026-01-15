// server/data/lesson1.ts
import { Module } from "./types"; // This imports the "Module" interface from your current types.ts

export const lesson1: Module = {
  id: "unit-1",
  title: "Lesson 1: Greetings and Introductions",
  vocabulary: [
    { word: "你", pinyin: "nǐ", english: "you" },
    { word: "好", pinyin: "hǎo", english: "fine; good; nice; ok; it's settled" },
    { word: "请", pinyin: "qǐng", english: "please (polite form of request); to treat; to invite" },
    { word: "问", pinyin: "wèn", english: "to ask (a question)" },
    { word: "贵", pinyin: "guì", english: "honorable; expensive" },
    { word: "姓", pinyin: "xìng", english: "surname; to be surnamed" },
    { word: "我", pinyin: "wǒ", english: "I; me" },
    { word: "呢", pinyin: "ne", english: "particle for reciprocating questions" },
    { word: "小姐", pinyin: "xiǎojiě", english: "Miss; young lady" },
    { word: "叫", pinyin: "jiào", english: "to be called; to call" },
    { word: "什么", pinyin: "shénme", english: "what" },
    { word: "名字", pinyin: "míngzi", english: "name" },
    { word: "先生", pinyin: "xiānsheng", english: "Mr.; husband; teacher" },
    { word: "李友", pinyin: "lǐ yǒu", english: "Li You (female name)" },
    { word: "李", pinyin: "lǐ", english: "a surname; plum" },
    { word: "王朋", pinyin: "wáng péng", english: "Wang Peng (male name)" },
    { word: "王", pinyin: "wáng", english: "a surname; king" },
    { word: "是", pinyin: "shì", english: "to be" },
    { word: "老师", pinyin: "lǎoshī", english: "teacher" },
    { word: "吗", pinyin: "ma", english: "yes-no question particle" },
    { word: "不", pinyin: "bù", english: "not; no" },
    { word: "学生", pinyin: "xuésheng", english: "student" },
    { word: "也", pinyin: "yě", english: "too; also (before verb)" },
    { word: "人", pinyin: "rén", english: "person; people" },
    { word: "中国", pinyin: "Zhōngguó", english: "China" },
    { word: "北京", pinyin: "Běijīng", english: "Beijing" },
    { word: "美国", pinyin: "Měiguó", english: "America" },
    { word: "纽约", pinyin: "Niǔyuē", english: "New York" }
  ],
  conversations: [
    {
      title: "Sample Conversation 1",
      context: "Greetings and asking for names",
      dialogue: [
        { speaker: "王朋", chinese: "你好！", pinyin: "Nǐ hǎo!", english: "Hello!", function: "Greet someone unfamiliar" },
        { speaker: "李友", chinese: "你好！", pinyin: "Nǐ hǎo!", english: "Hello!", function: "Respond to a greeting" },
        { speaker: "王朋", chinese: "请问，你贵姓？", pinyin: "Qǐng wèn, nǐ guìxìng?", english: "May I ask your surname?", function: "Politely ask for surname" },
        { speaker: "李友", chinese: "我姓李。你呢？", pinyin: "Wǒ xìng Lǐ. Nǐ ne?", english: "My surname is Li. How about you?", function: "Respond with surname and reciprocate the question" },
        { speaker: "王朋", chinese: "我姓王。李小姐，你叫什么名字？", pinyin: "Wǒ xìng Wáng. Lǐ xiǎojiě, nǐ jiào shénme míngzi?", english: "My surname is Wang. Miss Li, what is your full name?", function: "Respond with surname and politely ask full name" },
        { speaker: "李友", chinese: "我叫李友。王先生，你叫什么名字？", pinyin: "Wǒ jiào Lǐ Yǒu. Wáng xiānsheng, nǐ jiào shénme míngzi?", english: "My name is Li You. Mr. Wang, what is your full name?", function: "Respond with full name and reciprocate" },
        { speaker: "王朋", chinese: "我叫王朋。", pinyin: "Wǒ jiào Wáng Péng.", english: "My name is Wang Peng.", function: "Respond with full name" }
      ]
    },
    {
      title: "Sample Conversation 2",
      context: "Asking about professions and nationalities",
      dialogue: [
        { speaker: "李友", chinese: "王先生，你是老师吗？", pinyin: "Wáng xiānsheng, nǐ shì lǎoshī ma?", english: "Mr. Wang, are you a teacher?", function: "Politely inquire about profession" },
        { speaker: "王朋", chinese: "我不是老师，我是学生。李友，你呢？", pinyin: "Wǒ bú shì lǎoshī, wǒ shì xuésheng. Lǐ Yǒu, nǐ ne?", english: "I’m not a teacher, I’m a student. Li You, how about you?", function: "Clarify profession and reciprocate the question" },
        { speaker: "李友", chinese: "我也是学生。你是中国人吗？", pinyin: "Wǒ yě shì xuésheng. Nǐ shì Zhōngguó rén ma?", english: "I’m also a student. Are you Chinese?", function: "State own profession and inquire about nationality" },
        { speaker: "王朋", chinese: "是，我是北京人。你是美国人吗？", pinyin: "Shì, wǒ shì Běijīng rén. Nǐ shì Měiguó rén ma?", english: "Yes, I’m from Beijing. Are you American?", function: "Confirm nationality and inquire about other’s origin" },
        { speaker: "李友", chinese: "是，我是纽约人。", pinyin: "Shì, wǒ shì Niǔyuē rén.", english: "Yes, I’m from New York.", function: "Confirm nationality and specify hometown" }
      ]
    }
  ],
  patterns: [
    {
      function: "Exchange basic greetings",
      patterns: [
        "你/您好！",
        "Address someone by title + 先生/小姐/老师 (e.g. 王先生, 李小姐, 张老师)"
      ]
    },
    {
      function: "Ask for and provide names",
      patterns: [
        "你叫什么名字？ — 我叫……。",
        "你/您贵姓？ — 我姓……。",
        "你姓什么？ — 我姓……。",
        "请问，+ question? (e.g. 请问，你贵姓？)"
      ]
    },
    {
      function: "Confirm someone’s profession or origin",
      patterns: [
        "我是……，你呢？ (e.g. 我是老师/学生/中国人/美国人/北京人/纽约人)",
        "我也是……。",
        "我不是……。"
      ]
    }
  ],
  grammar: [
    {
      topic: "Verbs Related to Names and Identities",
      points: [
        {
          structure: "Pronoun + 姓(xìng) + surname",
          usage: "Somebody's surname is...",
          examples: [
            { statement: "我姓王。", negation: "我不姓李。", question: "你姓什么？" }
          ],
          note: "贵姓 (guìxìng) is a polite expression for 'your surname'."
        },
        {
          structure: "Pronoun + 叫(jiào) + full name/given name",
          usage: "Somebody is called...",
          examples: [
            { statement: "我叫王朋。", negation: "我不叫李友。", question: "你叫什么名字？" }
          ]
        },
        {
          structure: "Subject + 是(shì) + occupation/origin",
          usage: "The subject is...",
          examples: [
            { statement: "我是北京人，我不是纽约人。", negation: "我不是学生，我是老师。" }
          ],
          note: "不 (bù) becomes 'bú' before fourth tones."
        }
      ]
    },
    {
      topic: "Ways to Form Questions",
      points: [
        {
          structure: "Subject + Verb + Question Word",
          examples: [
            { question: "你姓什么？", answer: "我姓李。" },
            { question: "李小姐，你叫什么名字？", answer: "我叫李友。" }
          ]
        },
        {
          structure: "Subject + ... + 你呢?",
          examples: [
            { statement: "我叫李友，", question: "你呢？" },
            { statement: "你姓王，", question: "老师呢？" }
          ]
        },
        {
          structure: "Statement + 吗?",
          examples: [
            { question: "你是老师吗？", answer: "我是老师。 / 我不是老师。" },
            { question: "你姓王吗？", answer: "我姓王。 / 我不姓王。" }
          ]
        }
      ]
    },
    {
      topic: "Basic Word Order",
      points: [
        {
          structure: "Subject (S) + Verb (V) + Object (O)",
          examples: [
            { statement: "我姓王，你姓什么？" },
            { question: "我叫李友，你叫什么名字？" }
          ]
        }
      ]
    },
    {
      topic: "Use of 也 (yě)",
      points: [
        {
          structure: "Subject + 也 + Verb + Object",
          usage: "Subject ... also ...",
          examples: [
            { statement: "王朋是学生，李友也是学生。", negation: "王朋不是老师，李友也不是老师。" }
          ],
          note: "When using 也 with 不, 也 comes before 不."
        }
      ]
    }
  ]
};