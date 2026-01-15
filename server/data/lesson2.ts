// server/data/lesson2.ts
import { Module } from "./types";

export const lesson2: Module = {
  id: "unit-2",
  title: "Lesson 2: Family",
  vocabulary: [
    { word: "家", pinyin: "jiā", english: "family; home" },
    { word: "几", pinyin: "jǐ", english: "how many; some; a few" },
    { word: "口", pinyin: "kǒu", english: "(measure word for number of family members)" },
    { word: "哥哥", pinyin: "gēge", english: "older brother" },
    { word: "两", pinyin: "liǎng", english: "two; a couple of" },
    { word: "妹妹", pinyin: "mèimei", english: "younger sister" },
    { word: "和", pinyin: "hé", english: "and" },
    { word: "大姐", pinyin: "dàjiě", english: "eldest sister" },
    { word: "二姐", pinyin: "èrjiě", english: "second oldest sister" },
    { word: "做", pinyin: "zuò", english: "to do" },
    { word: "工作", pinyin: "gōngzuò", english: "job; to work" },
    { word: "律师", pinyin: "lǜshī", english: "lawyer" },
    { word: "英文", pinyin: "Yīngwén", english: "English (language)" },
    { word: "都", pinyin: "dōu", english: "both; all" },
    { word: "大学生", pinyin: "dàxuéshēng", english: "college student" },
    { word: "大学", pinyin: "dàxué", english: "university; college" },
    { word: "医生", pinyin: "yīshēng", english: "doctor; physician" },
    { word: "白英爱", pinyin: "Bái Yīng'ài", english: "Bai Ying'ai" },
    { word: "那", pinyin: "nà", english: "that" },
    { word: "的", pinyin: "de", english: "(possessive particle)" },
    { word: "照片", pinyin: "zhàopiàn", english: "picture; photo" },
    { word: "这", pinyin: "zhè", english: "this" },
    { word: "爸爸", pinyin: "bàba", english: "father; dad" },
    { word: "妈妈", pinyin: "māma", english: "mother; mom" },
    { word: "个", pinyin: "gè", english: "(measure word)" },
    { word: "女", pinyin: "nǚ", english: "female" },
    { word: "孩子", pinyin: "háizi", english: "child" },
    { word: "谁", pinyin: "shéi", english: "who" },
    { word: "她", pinyin: "tā", english: "she; her" },
    { word: "姐姐", pinyin: "jiějie", english: "older sister" },
    { word: "男", pinyin: "nán", english: "male" },
    { word: "弟弟", pinyin: "dìdi", english: "younger brother" },
    { word: "他", pinyin: "tā", english: "he; him" },
    { word: "大哥", pinyin: "dàgē", english: "eldest brother" },
    { word: "儿子", pinyin: "érzi", english: "son" },
    { word: "有", pinyin: "yǒu", english: "to have; to exist" },
    { word: "女儿", pinyin: "nǚ'ér", english: "daughter" },
    { word: "没", pinyin: "méi", english: "not" },
    { word: "高文中", pinyin: "Gāo Wénzhōng", english: "Gao Wenzhong" },
    { word: "高", pinyin: "gāo", english: "tall; high" }
  ],
  conversations: [
    {
      title: "Sample Conversation 1",
      context: "Looking at a family photo",
      dialogue: [
        { speaker: "白英爱", chinese: "那是你的照片吗？", pinyin: "Nà shì nǐ de zhàopiàn ma?", english: "Is that your picture?", function: "Ask if it’s someone’s photo" },
        { speaker: "高文中", chinese: "是。这是我爸爸、妈妈。", pinyin: "Shì. Zhè shì wǒ bàba, māma.", english: "Yes. This is my dad and mom.", function: "Confirm and identify family members" },
        { speaker: "白英爱", chinese: "这个女孩子是谁？", pinyin: "Zhè ge nǚ háizi shì shéi?", english: "Who is this girl?", function: "Ask about person in picture" },
        { speaker: "高文中", chinese: "她是我姐姐。", pinyin: "Tā shì wǒ jiějie.", english: "She is my older sister.", function: "Identify person" },
        { speaker: "白英爱", chinese: "这个男孩子是你弟弟吗？", pinyin: "Zhè ge nán háizi shì nǐ dìdi ma?", english: "Is this boy your younger brother?", function: "Ask yes-no question" },
        { speaker: "高文中", chinese: "不是，他是我大哥。", pinyin: "Bú shì, tā shì wǒ dàgē.", english: "No, he is my oldest brother.", function: "Correct false assumption" },
        { speaker: "白英爱", chinese: "你有几个哥哥？", pinyin: "Nǐ yǒu jǐ ge gēge?", english: "How many older brothers do you have?", function: "Ask quantity" },
        { speaker: "高文中", chinese: "我有两个哥哥。", pinyin: "Wǒ yǒu liǎng ge gēge.", english: "I have two older brothers.", function: "Provide number" },
        { speaker: "白英爱", chinese: "他们都做什么工作？", pinyin: "Tāmen dōu zuò shénme gōngzuò?", english: "What jobs do they both do?", function: "Ask occupations" },
        { speaker: "高文中", chinese: "一个是律师，一个是医生。", pinyin: "Yí ge shì lǜshī, yí ge shì yīshēng.", english: "One is a lawyer, one is a doctor.", function: "Provide information" }
      ]
    },
    {
      title: "Sample Conversation 2",
      context: "Visiting a home",
      dialogue: [
        { speaker: "白英爱", chinese: "高文中，那是你的家吗？", pinyin: "Gāo Wénzhōng, nà shì nǐ de jiā ma?", english: "Gao Wenzhong, is that your home?", function: "Ask if it’s someone’s home" },
        { speaker: "高文中", chinese: "是，这是我家。请进，请坐。", pinyin: "Shì, zhè shì wǒ jiā. Qǐng jìn, qǐng zuò.", english: "Yes, this is my home. Please come in, please sit.", function: "Confirm and invite guest" },
        { speaker: "白英爱", chinese: "你家有几口人？", pinyin: "Nǐ jiā yǒu jǐ kǒu rén?", english: "How many people are in your family?", function: "Ask family size" },
        { speaker: "高文中", chinese: "我家有五口人：爸爸、妈妈、大姐、二姐和我。", pinyin: "Wǒ jiā yǒu wǔ kǒu rén: bàba, māma, dàjiě, èrjiě hé wǒ.", english: "There are five people in my family: dad, mom, oldest sister, second oldest sister, and me.", function: "State family members" },
        { speaker: "白英爱", chinese: "你爸爸、妈妈做什么工作？", pinyin: "Nǐ bàba, māma zuò shénme gōngzuò?", english: "What do your dad and mom do?", function: "Ask parents' occupations" },
        { speaker: "高文中", chinese: "我爸爸是律师，妈妈是英文老师。", pinyin: "Wǒ bàba shì lǜshī, māma shì Yīngwén lǎoshī.", english: "My dad is a lawyer, mom is an English teacher.", function: "Provide occupation info" },
        { speaker: "白英爱", chinese: "你姐妹都做什么工作？", pinyin: "Nǐ jiěmèi dōu zuò shénme gōngzuò?", english: "What do your sisters do?", function: "Ask sisters' occupations" },
        { speaker: "高文中", chinese: "她们都是大学生。", pinyin: "Tāmen dōu shì dàxuéshēng.", english: "They are both college students.", function: "Answer using 'dou'" }
      ]
    }
  ],
  patterns: [
    {
      function: "Introduce a family member",
      patterns: [
        "这是我(的)[Family Member]。",
        "他/她是[Profession]。",
        "这个[Boy/Girl]是谁？"
      ]
    },
    {
      function: "Describe family size and possession",
      patterns: [
        "你家有几口人？ / 我家有...口人。",
        "你有...吗？ / 我没有...",
        "我有[Number]个[Family Member]。",
        "那/这是你的照片吗？"
      ]
    },
    {
      function: "Similarities (All/Both)",
      patterns: [
        "他们都是[Noun/Adj]。",
        "...和...都 [Verb Phrase]。"
      ]
    }
  ],
  grammar: [
    {
      topic: "1. The possessive particle 的 (de)",
      points: [
        {
          structure: "Possessor + 的 + Noun",
          usage: "Shows possession. Often omitted for close relationships (family).",
          examples: [
            { statement: "我的妈妈 -> 我妈妈 (My mom)" },
            { statement: "王朋的照片 (Wang Peng's photo)" }
          ]
        }
      ]
    },
    {
      topic: "2. Measure words (个 vs 口)",
      points: [
        {
          structure: "Number + Measure Word + Noun",
          usage: "'个' is common. '口' is strictly for family member counts.",
          examples: [
            { statement: "一个老师 (A teacher)" },
            { statement: "三口人 (Three family members)" }
          ]
        }
      ]
    },
    {
      topic: "3. The numeral 两 (liǎng) vs 二 (èr)",
      points: [
        {
          structure: "两 + Measure Word",
          usage: "Use 两 for counting quantity. Use 二 for counting numbers/math.",
          examples: [
            { statement: "两个姐姐 (Two older sisters)" },
            { statement: "十二 (Twelve)" }
          ]
        }
      ]
    },
    {
      topic: "4. The adverb 都 (dōu)",
      points: [
        {
          structure: "Subject + 都 + Verb",
          usage: "Indicates 'both' or 'all'. Must come BEFORE the verb.",
          examples: [
            { statement: "他们都是大学生 (They are all college students)." }
          ]
        }
      ]
    },
    {
      topic: "5. The negative 没有 (méiyǒu)",
      points: [
        {
          structure: "Subject + 没(有) + Noun",
          usage: "To negate 'to have'. Do NOT use 'bu'.",
          examples: [
            { statement: "我没有姐姐 (I don't have an older sister)." }
          ]
        }
      ]
    },
    {
      topic: "6. The verb 是 (shì) with professions",
      points: [
        {
          structure: "Subject + 是 + Profession",
          usage: "Links subject to identity.",
          examples: [
            { statement: "他是医生 (He is a doctor)." }
          ]
        }
      ]
    },
    {
      topic: "7. The question word 谁 (shéi)",
      points: [
        {
          structure: "谁 + Verb / Verb + 谁",
          examples: [
            { question: "谁是你爸爸？ (Who is your father?)" },
            { question: "照片里是谁？ (Who is in the photo?)" }
          ]
        }
      ]
    },
    {
      topic: "8. The conjunction 和 (hé)",
      points: [
        {
          structure: "Noun + 和 + Noun",
          usage: "Connects nouns. Cannot connect sentences.",
          examples: [
            { statement: "爸爸和妈妈 (Dad and Mom)" }
          ]
        }
      ]
    }
  ]
};