import OpenAI from "openai";

// ==========================================
// 1. TYPE DEFINITIONS (Hardcoded here)
// ==========================================
interface Vocabulary {
  word: string;
  pinyin: string;
  english: string;
}

interface DialogueLine {
  speaker: string;
  chinese: string;
  pinyin: string;
  english: string;
  function: string;
}

interface Conversation {
  title: string;
  context: string;
  dialogue: DialogueLine[];
}

interface Pattern {
  function: string;
  patterns: string[];
}

interface GrammarPoint {
  structure: string;
  usage?: string;
  examples: { statement?: string; negation?: string; question?: string; answer?: string }[];
  note?: string;
}

interface GrammarSection {
  topic: string;
  points: GrammarPoint[];
}

interface Module {
  id: string;
  title: string;
  vocabulary: Vocabulary[];
  conversations: Conversation[];
  patterns: Pattern[];
  grammar: GrammarSection[];
}

// ==========================================
// 2. DATA: LESSON 1 (Hardcoded here)
// ==========================================
const lesson1: Module = {
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

const lesson2: Module = {
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

  const lesson3: Module = {
    id: "unit-3",
    title: "Lesson 3: Dates and Time",
    vocabulary: [
      { word: "九月", pinyin: "jiǔyuè", english: "September" },
      { word: "月", pinyin: "yuè", english: "month" },
      { word: "十二", pinyin: "shí'èr", english: "twelve" },
      { word: "号", pinyin: "hào", english: "day of the month; number" },
      { word: "星期", pinyin: "xīngqī", english: "week" },
      { word: "星期四", pinyin: "xīngqīsì", english: "Thursday" },
      { word: "天", pinyin: "tiān", english: "day" },
      { word: "生日", pinyin: "shēngrì", english: "birthday" },
      { word: "今年", pinyin: "jīnnián", english: "this year" },
      { word: "多", pinyin: "duō", english: "how many/much; to what extent" },
      { word: "大", pinyin: "dà", english: "big; old" },
      { word: "十八", pinyin: "shíbā", english: "eighteen" },
      { word: "岁", pinyin: "suì", english: "years old" },
      { word: "吃", pinyin: "chī", english: "to eat" },
      { word: "饭", pinyin: "fàn", english: "meal; cooked rice" },
      { word: "怎么样", pinyin: "zěnmeyàng", english: "Is it OK? How does that sound?" },
      { word: "太...了", pinyin: "tài...le", english: "too; extremely" },
      { word: "谢谢", pinyin: "xièxie", english: "to thank" },
      { word: "喜欢", pinyin: "xǐhuan", english: "to like" },
      { word: "菜", pinyin: "cài", english: "dish; cuisine" },
      { word: "还是", pinyin: "háishì", english: "or (in questions)" },
      { word: "可是", pinyin: "kěshì", english: "but" },
      { word: "我们", pinyin: "wǒmen", english: "we; us" },
      { word: "点", pinyin: "diǎn", english: "o'clock" },
      { word: "半", pinyin: "bàn", english: "half; half an hour" },
      { word: "晚上", pinyin: "wǎnshàng", english: "evening; night" },
      { word: "见", pinyin: "jiàn", english: "to see; to meet" },
      { word: "再见", pinyin: "zàijiàn", english: "goodbye" },
      { word: "再", pinyin: "zài", english: "again" },
      { word: "英国", pinyin: "Yīngguó", english: "Britain; England" },
      { word: "现在", pinyin: "xiànzài", english: "now" },
      { word: "刻", pinyin: "kè", english: "quarter (of an hour)" },
      { word: "事儿", pinyin: "shìr", english: "matter; affair; event" },
      { word: "今天", pinyin: "jīntiān", english: "today" },
      { word: "很", pinyin: "hěn", english: "very" },
      { word: "忙", pinyin: "máng", english: "busy" },
      { word: "明天", pinyin: "míngtiān", english: "tomorrow" },
      { word: "晚饭", pinyin: "wǎnfàn", english: "dinner" },
      { word: "为什么", pinyin: "wèishénme", english: "why" },
      { word: "因为", pinyin: "yīnwèi", english: "because" },
      { word: "还", pinyin: "hái", english: "also; too; as well" },
      { word: "同学", pinyin: "tóngxué", english: "classmate" },
      { word: "认识", pinyin: "rènshi", english: "to know (someone)" },
      { word: "朋友", pinyin: "péngyou", english: "friend" }
    ],
    conversations: [
      {
        title: "Sample Conversation 1",
        context: "Discussing dates and birthdays",
        dialogue: [
          { speaker: "高文中", chinese: "白英爱，九月十二号是星期几？", pinyin: "Bái Yīng'ài, jiǔyuè shí'èr hào shì xīngqī jǐ?", english: "Bai Ying'ai, what day of the week is September 12th?", function: "Ask about day of week" },
          { speaker: "白英爱", chinese: "是星期四。", pinyin: "Shì xīngqīsì.", english: "It is Thursday.", function: "Provide information" },
          { speaker: "高文中", chinese: "那天是我的生日。", pinyin: "Nà tiān shì wǒ de shēngrì.", english: "That day is my birthday.", function: "Mention special occasion" },
          { speaker: "白英爱", chinese: "是吗？你今年多大？", pinyin: "Shì ma? Nǐ jīnnián duō dà?", english: "Really? How old are you this year?", function: "Express surprise; ask age" },
          { speaker: "高文中", chinese: "十八岁。", pinyin: "Shíbā suì.", english: "Eighteen years old.", function: "Provide age" },
          { speaker: "白英爱", chinese: "我星期四请你吃饭，怎么样？", pinyin: "Wǒ xīngqīsì qǐng nǐ chīfàn, zěnmeyàng?", english: "I'll treat you to a meal on Thursday, how's that?", function: "Invite to dinner" },
          { speaker: "高文中", chinese: "太好了！谢谢，谢谢。", pinyin: "Tài hǎo le! Xièxie, xièxie.", english: "That's great! Thanks, thanks.", function: "Show happiness" },
          { speaker: "白英爱", chinese: "你喜欢吃中国菜还是美国菜？", pinyin: "Nǐ xǐhuan chī Zhōngguó cài háishì Měiguó cài?", english: "Do you like Chinese food or American food?", function: "Ask preference" },
          { speaker: "高文中", chinese: "我是英国人，可是我喜欢吃中国菜。", pinyin: "Wǒ shì Yīngguó rén, kěshì wǒ xǐhuan chī Zhōngguó cài.", english: "I am British, but I like eating Chinese food.", function: "State nationality and preference" },
          { speaker: "白英爱", chinese: "好，我们吃中国菜。", pinyin: "Hǎo, wǒmen chī Zhōngguó cài.", english: "Okay, we'll eat Chinese food.", function: "Confirm choice" },
          { speaker: "高文中", chinese: "星期四几点？", pinyin: "Xīngqīsì jǐ diǎn?", english: "What time on Thursday?", function: "Ask time" },
          { speaker: "白英爱", chinese: "七点半怎么样？", pinyin: "Qī diǎn bàn zěnmeyàng?", english: "How about 7:30?", function: "Propose time" },
          { speaker: "高文中", chinese: "好，星期四晚上见。", pinyin: "Hǎo, xīngqīsì wǎnshang jiàn.", english: "Okay, see you Thursday evening.", function: "Confirm plan" },
          { speaker: "白英爱", chinese: "再见！", pinyin: "Zàijiàn!", english: "See you!", function: "End conversation" }
        ]
      },
      {
        title: "Sample Conversation 2",
        context: "Discussing time and schedules",
        dialogue: [
          { speaker: "王朋", chinese: "白英爱，现在几点？", pinyin: "Bái Yīng'ài, xiànzài jǐ diǎn?", english: "Bai Ying'ai, what time is it now?", function: "Ask time" },
          { speaker: "白英爱", chinese: "五点三刻。", pinyin: "Wǔ diǎn sān kè.", english: "5:45.", function: "Provide time" },
          { speaker: "王朋", chinese: "我六点一刻有事儿。", pinyin: "Wǒ liù diǎn yí kè yǒu shìr.", english: "I have something to do at 6:15.", function: "Mention schedule" },
          { speaker: "白英爱", chinese: "你今天很忙，明天忙不忙？", pinyin: "Nǐ jīntiān hěn máng, míngtiān máng bu máng?", english: "You are busy today, are you busy tomorrow?", function: "Ask availability" },
          { speaker: "王朋", chinese: "我今天很忙，可是明天不忙。有事儿吗？", pinyin: "Wǒ jīntiān hěn máng, kěshì míngtiān bù máng. Yǒu shìr ma?", english: "I'm busy today, but I'm not busy tomorrow. What's up?", function: "State schedule" },
          { speaker: "白英爱", chinese: "明天我请你吃晚饭，怎么样？", pinyin: "Míngtiān wǒ qǐng nǐ chī wǎnfàn, zěnmeyàng?", english: "I'll treat you to dinner tomorrow, how about it?", function: "Extend invitation" },
          { speaker: "王朋", chinese: "你为什么请我吃饭？", pinyin: "Nǐ wèishénme qǐng wǒ chīfàn?", english: "Why are you treating me to dinner?", function: "Ask reason" },
          { speaker: "白英爱", chinese: "因为明天是高文中的生日。", pinyin: "Yīnwèi míngtiān shì Gāo Wénzhōng de shēngrì.", english: "Because tomorrow is Gao Wenzhong's birthday.", function: "Provide reason" },
          { speaker: "王朋", chinese: "是吗？好。还请谁？", pinyin: "Shì ma? Hǎo. Hái qǐng shéi?", english: "Really? Okay. Who else are you inviting?", function: "Ask about guests" },
          { speaker: "白英爱", chinese: "还请我的同学李友。", pinyin: "Hái qǐng wǒ de tóngxué Lǐ Yǒu.", english: "Also inviting my classmate Li You.", function: "Add information" },
          { speaker: "王朋", chinese: "那太好了，我认识李友，她也是我的朋友。明天几点？", pinyin: "Nà tài hǎo le, wǒ rènshi Lǐ Yǒu, tā yě shì wǒ de péngyou. Míngtiān jǐ diǎn?", english: "That's great. I know Li You, she is also my friend. What time tomorrow?", function: "Confirm time" },
          { speaker: "白英爱", chinese: "明天晚上七点半。", pinyin: "Míngtiān wǎnshang qī diǎn bàn.", english: "Tomorrow evening at 7:30.", function: "State time" },
          { speaker: "王朋", chinese: "好，明天七点半见。", pinyin: "Hǎo, míngtiān qī diǎn bàn jiàn.", english: "Okay, see you tomorrow at 7:30.", function: "Confirm plan" }
        ]
      }
    ],
    patterns: [
      {
        function: "Ask for day, date, age, birthday",
        patterns: [
          "今天几月几号？ / 今天星期几？",
          "你今年多大？ / 你几岁？",
          "你的生日是几月几号？"
        ]
      },
      {
        function: "Time and Availability",
        patterns: [
          "现在几点？ (What time is it?)",
          "你明天忙不忙？ / 你明天有事儿吗？",
          "明天几点见？"
        ]
      },
      {
        function: "Invitations and Reasons",
        patterns: [
          "我请你[Do something], 怎么样？",
          "为什么...？ 因为...。",
          "你喜欢 A 还是 B？"
        ]
      }
    ],
    grammar: [
      {
        topic: "1. Expressing Dates (Month + Day)",
        points: [
          {
            structure: "#月 #号",
            usage: "Month first, then day. 'Hào' is spoken, 'Rì' is written.",
            examples: [
              { statement: "九月十二号 (September 12th)" },
              { question: "今天几月几号？ (What is the date today?)" }
            ]
          }
        ]
      },
      {
        topic: "2. Days of the Week (星期)",
        points: [
          {
            structure: "星期 + Number (1-6) or 天/日",
            usage: "Monday is 星期一. Sunday is 星期天 or 星期日.",
            examples: [
              { statement: "星期四 (Thursday)" },
              { question: "今天是星期几？ (What day is it?)" }
            ]
          }
        ]
      },
      {
        topic: "3. Asking Age (多大 vs 几岁)",
        points: [
          {
            structure: "Subject + 多大？ / 几岁？",
            usage: "Use '多大' for general age. Use '几岁' for children (<10).",
            examples: [
              { question: "你今年多大？ (How old are you?)" },
              { statement: "我十八岁。 (I am 18.)" }
            ]
          }
        ]
      },
      {
        topic: "4. Expressing Time (点 / 分 / 刻 / 半)",
        points: [
          {
            structure: "Hour + 点 + Minute + 分",
            usage: "点=Hour, 分=Minute. 刻=Quarter (15), 半=Half (30).",
            examples: [
              { statement: "五点三刻 (5:45)" },
              { statement: "七点半 (7:30)" }
            ]
          }
        ]
      },
      {
        topic: "5. Too / Extremely (太...了)",
        points: [
          {
            structure: "太 + Adjective + 了",
            usage: "Expresses excessiveness or strong approval.",
            examples: [
              { statement: "太好了！ (Great!)" },
              { statement: "今天太冷了。 (Today is too cold.)" }
            ]
          }
        ]
      },
      {
        topic: "6. Why and Because (为什么 / 因为)",
        points: [
          {
            structure: "Q: 为什么... ? A: 因为... ",
            examples: [
              { question: "你为什么请我吃饭？" },
              { answer: "因为明天是我的生日。" }
            ]
          }
        ]
      },
      {
        topic: "7. Alternative Questions with 还是 (Or)",
        points: [
          {
            structure: "Option A + 还是 + Option B ?",
            usage: "Used ONLY in questions. (Use 'huozhe' for statements).",
            examples: [
              { question: "你喜欢吃中国菜还是美国菜？" }
            ]
          }
        ]
      }
    ]
  };

  const lesson4: Module = {
    id: "unit-4",
    title: "Lesson 4: Hobbies and Weekend Activities",
    vocabulary: [
      { word: "别人", pinyin: "biéren", english: "other people" },
      { word: "周末", pinyin: "zhōumò", english: "weekend" },
      { word: "看", pinyin: "kàn", english: "to watch; to look; to read" },
      { word: "唱歌", pinyin: "chànggē", english: "to sing songs" },
      { word: "听", pinyin: "tīng", english: "to listen" },
      { word: "……时候", pinyin: "...shìhou", english: "(a point in) time; moment" },
      { word: "有的时候", pinyin: "yǒu de shíhou", english: "sometimes" },
      { word: "那", pinyin: "nà", english: "then; in that case" },
      { word: "外国", pinyin: "wàiguó", english: "foreign country" },
      { word: "昨天", pinyin: "zuótiān", english: "yesterday" },
      { word: "所以", pinyin: "suǒyǐ", english: "so; therefore" },
      { word: "好久", pinyin: "hǎojiǔ", english: "a long time" },
      { word: "好久不见", pinyin: "hǎojiǔ bújiàn", english: "long time no see" },
      { word: "觉得", pinyin: "juéde", english: "to feel/think" },
      { word: "只", pinyin: "zhǐ", english: "only; just" },
      { word: "算了", pinyin: "suànle", english: "forget it; never mind" },
      { word: "打球", pinyin: "dǎqiú", english: "to play ball" },
      { word: "电视", pinyin: "diànshì", english: "television" },
      { word: "跳舞", pinyin: "tiàowǔ", english: "to dance" },
      { word: "音乐", pinyin: "yīnyuè", english: "music" },
      { word: "对", pinyin: "duì", english: "right; correct" },
      { word: "去", pinyin: "qù", english: "to go" },
      { word: "请客", pinyin: "qǐngkè", english: "to treat someone (to a meal, etc.)" },
      { word: "电影", pinyin: "diànyǐng", english: "movie" },
      { word: "小", pinyin: "xiǎo", english: "small; (term of address for young people)" },
      { word: "不错", pinyin: "búcuò", english: "not bad; pretty good" },
      { word: "有意思", pinyin: "yǒuyìsi", english: "interesting" },
      { word: "睡觉", pinyin: "shuìjiào", english: "to sleep" },
      { word: "找", pinyin: "zhǎo", english: "to look for" },
      { word: "书", pinyin: "shū", english: "book" },
      { word: "常常", pinyin: "chángcháng", english: "often" },
      { word: "有的", pinyin: "yǒude", english: "some" },
      { word: "想", pinyin: "xiǎng", english: "to want to; would like to" }
    ],
    conversations: [
      {
        title: "Sample Conversation 1",
        context: "Discussing Hobbies",
        dialogue: [
          { speaker: "高文中", chinese: "白英爱，你周末喜欢做什么？", pinyin: "Bái Yīng'ài, nǐ zhōumò xǐhuan zuò shénme?", english: "Bai Ying'ai, what do you like to do on weekends?", function: "Ask about weekend hobbies" },
          { speaker: "白英爱", chinese: "我喜欢打球、看电视。你呢？", pinyin: "Wǒ xǐhuan dǎqiú, kàn diànshì. Nǐ ne?", english: "I like to play ball and watch TV. How about you?", function: "Share hobbies; reciprocate question" },
          { speaker: "高文中", chinese: "我喜欢唱歌、跳舞，还喜欢听音乐。你也喜欢看书，对不对？", pinyin: "Wǒ xǐhuan chànggē, tiàowǔ, hái xǐhuan tīng yīnyuè. Nǐ yě xǐhuan kàn shū, duì bu duì?", english: "I like singing, dancing, and listening to music. You like reading too, right?", function: "List hobbies; ask for confirmation" },
          { speaker: "白英爱", chinese: "对，有的时候也喜欢看书。", pinyin: "Duì, yǒude shíhou yě xǐhuan kàn shū.", english: "Right, sometimes I also like to read.", function: "Confirm; express frequency" },
          { speaker: "高文中", chinese: "你喜欢不喜欢看电影？", pinyin: "Nǐ xǐhuan bu xǐhuan kàn diànyǐng?", english: "Do you like watching movies?", function: "Ask preference (A-not-A)" },
          { speaker: "白英爱", chinese: "喜欢。我周末常常看电影。", pinyin: "Xǐhuan. Wǒ zhōumò chángcháng kàn diànyǐng.", english: "Yes. I often watch movies on weekends.", function: "Affirm preference; describe frequency" },
          { speaker: "高文中", chinese: "那我们今天晚上去看一个外国电影，怎么样？我请客。", pinyin: "Nà wǒmen jīntiān wǎnshang qù kàn yí ge wàiguó diànyǐng, zěnmeyàng? Wǒ qǐngkè.", english: "Then let's go watch a foreign movie tonight, okay? My treat.", function: "Propose plan; offer to treat" },
          { speaker: "白英爱", chinese: "为什么你请客？", pinyin: "Wèishénme nǐ qǐngkè?", english: "Why are you treating?", function: "Ask reason" },
          { speaker: "高文中", chinese: "因为昨天你请我吃饭，所以今天我请你看电影。", pinyin: "Yīnwèi zuótiān nǐ qǐng wǒ chīfàn, suǒyǐ jīntiān wǒ qǐng nǐ kàn diànyǐng.", english: "Because you treated me to dinner yesterday, so today I'm treating you to a movie.", function: "Give reason (because... so...)" }
        ]
      },
      {
        title: "Sample Conversation 2",
        context: "Inviting someone out",
        dialogue: [
          { speaker: "王朋", chinese: "小高，好久不见，你好吗？", pinyin: "Xiǎo Gāo, hǎojiǔ bújiàn, nǐ hǎo ma?", english: "Little Gao, long time no see, how are you?", function: "Greet acquaintance" },
          { speaker: "高文中", chinese: "我很好。你怎么样？", pinyin: "Wǒ hěn hǎo. Nǐ zěnmeyàng?", english: "I'm fine. How about you?", function: "Respond; reciprocate" },
          { speaker: "王朋", chinese: "我也不错。", pinyin: "Wǒ yě búcuò.", english: "I'm pretty good too.", function: "Respond positively" },
          { speaker: "王朋", chinese: "这个周末你想做什么？想不想去打球？", pinyin: "Zhè ge zhōumò nǐ xiǎng zuò shénme? Xiǎng bu xiǎng qù dǎqiú?", english: "What do you want to do this weekend? Do you want to go play ball?", function: "Propose activity" },
          { speaker: "高文中", chinese: "打球？我不喜欢打球。", pinyin: "Dǎqiú? Wǒ bù xǐhuan dǎqiú.", english: "Play ball? I don't like playing ball.", function: "Reject plan" },
          { speaker: "王朋", chinese: "那我们去看球，怎么样？", pinyin: "Nà wǒmen qù kàn qiú, zěnmeyàng?", english: "Then let's go watch a ball game, how about that?", function: "Propose alternative" },
          { speaker: "高文中", chinese: "看球？我觉得看球也没有意思。", pinyin: "Kàn qiú? Wǒ juéde kàn qiú yě méiyǒu yìsi.", english: "Watch a ball game? I think watching ball games is also boring.", function: "Reject proposal; express opinion" },
          { speaker: "王朋", chinese: "那你这个周末想做什么？", pinyin: "Nà nǐ zhè ge zhōumò xiǎng zuò shénme?", english: "Then what do you want to do this weekend?", function: "Ask intent" },
          { speaker: "高文中", chinese: "我只想吃饭、睡觉。", pinyin: "Wǒ zhǐ xiǎng chīfàn, shuìjiào.", english: "I only want to eat and sleep.", function: "State limited preference" },
          { speaker: "王朋", chinese: "算了，我去找别人。", pinyin: "Suànle, wǒ qù zhǎo biéren.", english: "Forget it, I'll go find someone else.", function: "Abandon plan" }
        ]
      }
    ],
    patterns: [
      {
        function: "Ask about someone’s hobbies",
        patterns: [
          "你喜欢不喜欢…？ / 你喜欢...吗？",
          "你周末喜欢做什么？",
          "我喜欢…、…，还喜欢…。你也喜欢…，对不对？",
          "我周末常常…，有的时候也…我不常…。",
          "你觉得…怎么样？",
          "我觉得 ……很有意思 / 没有意思。"
        ]
      },
      {
        function: "Make plans / Invitations",
        patterns: [
          "[Time] + 我们去…，怎么样 / 好吗？",
          "我请客。 / 我请你 [Do something]。",
          "想不想去…？ / 你想做什么？",
          "算了，我去找别人。"
        ]
      },
      {
        function: "Reasons and Connection",
        patterns: [
          "因为……，所以…… (Because..., therefore...)",
          "那…… (Then / In that case...)"
        ]
      }
    ],
    grammar: [
      {
        topic: "1. The punctuation mark “、” (Enumeration Comma)",
        points: [
          {
            structure: "Item 1、Item 2、Item 3 和 Item 4",
            usage: "Used to separate items in a series. '和' connects only the last two items.",
            examples: [
              { statement: "我常常打球、跳舞、看电视。" },
              { statement: "我家有四口人，爸爸、妈妈、姐姐和我。" }
            ]
          }
        ]
      },
      {
        topic: "2. Word Order: Subject + Adverbial (Time/Place) + Verb",
        points: [
          {
            structure: "Subject + Time + Verb + Object",
            usage: "Time words appear after the subject but before the verb.",
            examples: [
              { statement: "李友明天吃中国菜。" },
              { statement: "周末我常常看电影。" }
            ]
          }
        ]
      },
      {
        topic: "3. Verb–Object detachable compounds",
        points: [
          {
            structure: "Verb + (Attribute/Number) + Noun-Object",
            usage: "Some verbs are actually Verb-Object pairs (e.g., 睡觉, 唱歌). Modifiers must go INSIDE them.",
            examples: [
              { statement: "睡觉 -> 睡一个觉 (Sleep a sleep)" },
              { statement: "唱歌 -> 唱英文歌 (Sing English songs)" },
              { statement: "看电影 -> 看一个外国电影 (Watch a foreign movie)" }
            ]
          }
        ]
      },
      {
        topic: "4. Adverbs of frequency (常常, 有的时候, 不常)",
        points: [
          {
            structure: "Subject + Frequency Adverb + Verb",
            examples: [
              { statement: "我周末常常看电影，不常去跳舞。" },
              { statement: "我晚上有的时候看书。" }
            ]
          }
        ]
      },
      {
        topic: "5. A–not–A Questions",
        points: [
          {
            structure: "Verb + (bu) + Verb ?",
            usage: "Forms a Yes/No question without 'ma'.",
            examples: [
              { question: "你明天去不去打球？" },
              { question: "你喜欢不喜欢跳舞？" }
            ],
            note: "Do not use 'ma' with A-not-A. Do not use adverbs like 'often' inside A-not-A."
          }
        ]
      },
      {
        topic: "6. The emotional verb 喜欢 (xǐhuan)",
        points: [
          {
            structure: "Subject + 喜欢 + Noun / Verb Phrase",
            examples: [
              { question: "你喜欢看电影吗？" },
              { statement: "我喜欢中国菜。" }
            ]
          }
        ]
      },
      {
        topic: "7. The modal verb 想 (xiǎng)",
        points: [
          {
            structure: "Subject + 想 + Verb",
            usage: "To want to / would like to do something.",
            examples: [
              { question: "你这个周末想做什么？" },
              { statement: "我想打球。" }
            ]
          }
        ]
      },
      {
        topic: "8. Expressing Opinion with 觉得 (juéde)",
        points: [
          {
            structure: "Subject + 觉得 + Clause / Opinion",
            examples: [
              { statement: "我觉得打球有意思。" },
              { statement: "我觉得看球没有意思。" }
            ]
          }
        ]
      },
      {
        topic: "9. Why/Because (为什么 / 因为...所以...)",
        points: [
          {
            structure: "因为 [Cause]，所以 [Effect]",
            examples: [
              { question: "为什么你请客？" },
              { answer: "因为昨天你请我吃饭，所以今天我请你看电影。" }
            ]
          }
        ]
      },
      {
        topic: "10. The adverb 只 (zhǐ)",
        points: [
          {
            structure: "Subject + 只 + Verb",
            usage: "Indicates 'only' or 'just' doing that action.",
            examples: [
              { statement: "我只想吃饭、睡觉。" },
              { statement: "我只喜欢中国菜。" }
            ],
            note: "Cannot place 只 before the object (e.g. NOT '我喜欢只中国菜')."
          }
        ]
      }
    ]
  };

  const lesson5: Module = {
    id: "unit-5",
    title: "Lesson 5: Visiting Friends",
    vocabulary: [
      { word: "呀", pinyin: "ya", english: "(interjectory particle to soften a question)" },
      { word: "进", pinyin: "jìn", english: "to enter" },
      { word: "快", pinyin: "kuài", english: "fast; quick; quickly" },
      { word: "进来", pinyin: "jìnlai", english: "to come in" },
      { word: "来", pinyin: "lái", english: "to come" },
      { word: "介绍", pinyin: "jièshào", english: "to introduce" },
      { word: "一下", pinyin: "yíxià", english: "once; a bit (softens the verb)" },
      { word: "高兴", pinyin: "gāoxìng", english: "happy; pleased" },
      { word: "漂亮", pinyin: "piàoliang", english: "pretty" },
      { word: "坐", pinyin: "zuò", english: "to sit" },
      { word: "在", pinyin: "zài", english: "at; in; on" },
      { word: "哪儿", pinyin: "nǎr", english: "where" },
      { word: "学校", pinyin: "xuéxiào", english: "school" },
      { word: "喝", pinyin: "hē", english: "to drink" },
      { word: "点儿", pinyin: "diǎnr", english: "a little; a bit; some" },
      { word: "茶", pinyin: "chá", english: "tea" },
      { word: "咖啡", pinyin: "kāfēi", english: "coffee" },
      { word: "吧", pinyin: "ba", english: "(sentence-final particle for suggestions)" },
      { word: "要", pinyin: "yào", english: "to want" },
      { word: "瓶", pinyin: "píng", english: "(measure word for bottles)" },
      { word: "可乐", pinyin: "kělè", english: "cola" },
      { word: "可以", pinyin: "kěyǐ", english: "can; may" },
      { word: "对不起", pinyin: "duìbuqǐ", english: "sorry" },
      { word: "给", pinyin: "gěi", english: "to give" },
      { word: "杯", pinyin: "bēi", english: "(measure word for cup/glass)" },
      { word: "水", pinyin: "shuǐ", english: "water" },
      { word: "高小音", pinyin: "Gāo Xiǎoyīn", english: "(name) Gao Xiaoyin" },
      { word: "玩儿", pinyin: "wánr", english: "to have fun; to play" },
      { word: "了", pinyin: "le", english: "(dynamic particle for completed action)" },
      { word: "图书馆", pinyin: "túshūguǎn", english: "library" },
      { word: "一起", pinyin: "yìqǐ", english: "together" },
      { word: "聊天儿", pinyin: "liáo tiānr", english: "to chat" },
      { word: "聊", pinyin: "liáo", english: "to chat" },
      { word: "天", pinyin: "tiān", english: "sky" },
      { word: "才", pinyin: "cái", english: "not until; only then" },
      { word: "回家", pinyin: "huí jiā", english: "to go home" },
      { word: "回", pinyin: "huí", english: "to return" }
    ],
    conversations: [
      {
        title: "Visiting a Friend's Home",
        context: "Wang Peng and Li You visit Gao Wenzhong's house.",
        dialogue: [
          { speaker: "高文中", chinese: "谁呀？", pinyin: "Shéi ya?", english: "Who is it?", function: "Ask who is at the door" },
          { speaker: "王朋", chinese: "是我，王朋，还有李友。", pinyin: "Shì wǒ, Wáng Péng, háiyǒu Lǐ Yǒu.", english: "It's me, Wang Peng, and Li You.", function: "Identify self" },
          { speaker: "高文中", chinese: "请进，请进，快进来！", pinyin: "Qǐng jìn, qǐng jìn, kuài jìn lai!", english: "Come in, come in, quick, come in!", function: "Invite someone in" },
          { speaker: "高文中", chinese: "来，我介绍一下，这是我姐姐，高小音。", pinyin: "Lái, wǒ jièshào yíxià, zhè shì wǒ jiějie, Gāo Xiǎoyīn.", english: "Come, let me introduce you, this is my older sister, Gao Xiaoyin.", function: "Introduce a family member" },
          { speaker: "王朋", chinese: "小音，你好。", pinyin: "Xiǎoyīn, nǐ hǎo.", english: "Xiaoyin, hello.", function: "Greet by name" },
          { speaker: "李友", chinese: "认识你很高兴。", pinyin: "Rènshi nǐ hěn gāoxìng.", english: "Nice to meet you.", function: "Express pleasure at meeting" },
          { speaker: "高小音", chinese: "认识你们我也很高兴。", pinyin: "Rènshi nǐmen wǒ yě hěn gāoxìng.", english: "Nice to meet you too.", function: "Reciprocate greeting" },
          { speaker: "李友", chinese: "你们家很大，也很漂亮。", pinyin: "Nǐmen jiā hěn dà, yě hěn piàoliang.", english: "Your home is very big, and also very beautiful.", function: "Compliment home" },
          { speaker: "高小音", chinese: "是吗？请坐，请坐。", pinyin: "Shì ma? Qǐng zuò, qǐng zuò.", english: "Is that so? Please sit, please sit.", function: "Deflect compliment and invite to sit" },
          { speaker: "王朋", chinese: "小音，你在哪儿工作？", pinyin: "Xiǎoyīn, nǐ zài nǎr gōngzuò?", english: "Xiaoyin, where do you work?", function: "Ask about workplace" },
          { speaker: "高小音", chinese: "我在学校工作。", pinyin: "Wǒ zài xuéxiào gōngzuò.", english: "I work at a school.", function: "Provide info" },
          { speaker: "高小音", chinese: "你们想喝点儿什么？喝茶还是喝咖啡？", pinyin: "Nǐmen xiǎng hē diǎnr shénme? Hē chá háishì hē kāfēi?", english: "What would you like to drink? Tea or coffee?", function: "Offer beverages" },
          { speaker: "王朋", chinese: "我喝茶吧。", pinyin: "Wǒ hē chá ba.", english: "I'll have tea.", function: "Accept offer" },
          { speaker: "李友", chinese: "我要一瓶可乐，可以吗？", pinyin: "Wǒ yào yì píng kělè, kěyǐ ma?", english: "I'd like a bottle of cola, is that okay?", function: "Request specific drink" },
          { speaker: "高小音", chinese: "对不起，我们家没有可乐。", pinyin: "Duìbuqǐ, wǒmen jiā méiyǒu kělè.", english: "Sorry, we don't have cola.", function: "Apologize and state unavailability" },
          { speaker: "李友", chinese: "那给我一杯水吧。", pinyin: "Nà gěi wǒ yì bēi shuǐ ba.", english: "Then give me a glass of water please.", function: "Request alternative" }
        ]
      },
      {
        title: "Narration of the Visit",
        context: "Recounting what happened during the visit.",
        dialogue: [
          { speaker: "Narrator", chinese: "昨天晚上，王朋和李友去高文中家玩儿。", pinyin: "Zuótiān wǎnshang, Wáng Péng hé Lǐ Yǒu qù Gāo Wénzhōng jiā wánr.", english: "Last night, Wang Peng and Li You went to Gao Wenzhong's house to hang out.", function: "Set timeframe and characters" },
          { speaker: "Narrator", chinese: "在高文中家，他们认识了高文中的姐姐。", pinyin: "Zài Gāo Wénzhōng jiā, tāmen rènshi le Gāo Wénzhōng de jiějie.", english: "At Gao Wenzhong's house, they met Gao Wenzhong's older sister.", function: "Describe meeting" },
          { speaker: "Narrator", chinese: "她叫高小音，在学校的图书馆工作。", pinyin: "Tā jiào Gāo Xiǎoyīn, zài xuéxiào de túshūguǎn gōngzuò.", english: "Her name is Gao Xiaoyin, she works at the school library.", function: "Describe person" },
          { speaker: "Narrator", chinese: "她请王朋喝茶，王朋喝了两杯。", pinyin: "Tā qǐng Wáng Péng hē chá, Wáng Péng hē le liǎng bēi.", english: "She offered Wang Peng tea, Wang Peng drank two cups.", function: "Describe hospitality" },
          { speaker: "Narrator", chinese: "李友不喝茶，只喝了一杯水。", pinyin: "Lǐ Yǒu bù hē chá, zhǐ hē le yì bēi shuǐ.", english: "Li You doesn't drink tea, she only drank a glass of water.", function: "Contrast actions" },
          { speaker: "Narrator", chinese: "他们一起聊天儿、看电视。", pinyin: "Tāmen yìqǐ liáo tiānr, kàn diànshì.", english: "They chatted and watched TV together.", function: "Describe activities" },
          { speaker: "Narrator", chinese: "王朋和李友晚上十二点才回家。", pinyin: "Wáng Péng hé Lǐ Yǒu wǎnshang shí'èr diǎn cái huí jiā.", english: "Wang Peng and Li You didn't go home until 12 o'clock at night.", function: "Conclude with lateness" }
        ]
      }
    ],
    patterns: [
      {
        function: "Welcoming Guests",
        patterns: [
          "请进，请进，快进来！ (Please come in!)",
          "来，我介绍一下... (Come, let me introduce...)"
        ]
      },
      {
        function: "Offering & Requesting Drinks",
        patterns: [
          "你们想喝点儿什么？ (What would you like to drink?)",
          "我喝...吧。 (I'll have...)",
          "给我...吧。 (Give me...)"
        ]
      },
      {
        function: "Describing Location",
        patterns: [
          "你在哪儿工作？ (Where do you work?)",
          "我在...工作。 (I work at...)"
        ]
      }
    ],
    grammar: [
      {
        topic: "1. Measure words 瓶 (píng) and 杯 (bēi)",
        points: [
          {
            structure: "Number + Measure Word + Noun",
            usage: "Used to count and specify quantities of liquids.",
            examples: [
              { statement: "一瓶可乐 (One bottle of cola)" },
              { statement: "两杯水 (Two glasses of water)" }
            ]
          }
        ]
      },
      {
        topic: "2. Moderating Tone: 一下 (yíxià) and 点儿 (diǎnr)",
        points: [
          {
            structure: "Verb + 一下",
            usage: "Softens the tone of a question or command. Indicates a brief action.",
            examples: [
              { statement: "我介绍一下。 (Let me introduce briefly.)" }
            ]
          },
          {
            structure: "Verb + (一)点儿 + Noun",
            usage: "Indicates a small quantity; also functions as a politeness strategy.",
            examples: [
              { statement: "你想喝点儿什么？ (What would you like to drink?)" }
            ]
          }
        ]
      },
      {
        topic: "3. Adjectives as Predicates with 很 (hěn)",
        points: [
          {
            structure: "Subject + 很 + Adjective",
            usage: "When an adjective is the predicate, '是' is not used. '很' connects the subject and adjective.",
            examples: [
              { statement: "你家很大。 (Your house is big.)" },
              { statement: "很漂亮。 (Very pretty.)" }
            ]
          }
        ]
      },
      {
        topic: "4. The Preposition 在 (zài)",
        points: [
          {
            structure: "Subject + 在 + Place + Verb",
            usage: "Introduces the location where an action occurs.",
            examples: [
              { statement: "我在图书馆工作。 (I work at the library.)" },
              { statement: "我在家看球。 (I watch ball at home.)" }
            ]
          }
        ]
      },
      {
        topic: "5. Question Word 哪儿 (nǎr)",
        points: [
          {
            structure: "Subject + 在 + 哪儿 (+ Verb)?",
            usage: "Used to ask about location.",
            examples: [
              { statement: "你在哪儿工作？ (Where do you work?)" },
              { statement: "你在哪儿？ (Where are you?)" }
            ]
          }
        ]
      },
      {
        topic: "6. The Particle 吧 (ba)",
        points: [
          {
            structure: "Sentence + 吧",
            usage: "Softens commands or suggestions, making them more polite.",
            examples: [
              { statement: "我喝茶吧。 (I'll have tea, I guess/suppose.)" },
              { statement: "请坐吧。 (Please sit.)" }
            ]
          }
        ]
      },
      {
        topic: "7. Wants and Likes: 要 / 想 / 喜欢",
        points: [
          {
            structure: "要 + Noun / 想 + Verb / 喜欢 + Verb/Noun",
            usage: "'要' is strong/direct want. '想' is polite desire (would like). '喜欢' is general liking.",
            examples: [
              { statement: "我要一瓶可乐。 (I want a bottle of cola.)" },
              { statement: "我想喝咖啡。 (I would like to drink coffee.)" }
            ]
          }
        ]
      },
      {
        topic: "8. The Verb 给 (gěi)",
        points: [
          {
            structure: "给 + Recipient + Object",
            usage: "To give someone something.",
            examples: [
              { statement: "给我一杯水。 (Give me a glass of water.)" }
            ]
          }
        ]
      },
      {
        topic: "9. The Particle 了 (le)",
        points: [
          {
            structure: "Subject + Verb + (Object) + 了",
            usage: "Indicates completion of an action. Often used for past narratives.",
            examples: [
              { statement: "我昨天喝了三杯咖啡。 (I drank 3 cups of coffee yesterday.)" }
            ]
          }
        ]
      },
      {
        topic: "10. Negation: 不 vs 没",
        points: [
          {
            structure: "没 + Verb (Past/Completed) vs 不 + Verb (Habitual/Present)",
            usage: "Use '没' to say an action did NOT happen in the past. Do not use '了' with '没'.",
            examples: [
              { statement: "李友没喝茶。 (Li You didn't drink tea.)" },
              { statement: "李友不喝茶。 (Li You doesn't drink tea - habitually.)" }
            ]
          }
        ]
      },
      {
        topic: "11. The Adverb 才 (cái)",
        points: [
          {
            structure: "Time + 才 + Verb",
            usage: "Indicates lateness ('not until'). Do not use '了' with '才'.",
            examples: [
              { statement: "晚上十二点才回家。 (Didn't go home until 12pm.)" }
            ]
          }
        ]
      },
      {
        topic: "12. Together with 一起 (yìqǐ)",
        points: [
          {
            structure: "A + 和/跟 + B + 一起 + Verb",
            usage: "Indicates performing an action together.",
            examples: [
              { statement: "我们一起聊天儿。 (We chatted together.)" }
            ]
          }
        ]
      }
    ]
  };

// ==========================================
// 3. LESSON REGISTRY
// ==========================================
// If you want to add Lesson 2 later, define 'const lesson2 = ...' above 
// and add it to this object: { "unit-1": lesson1, "unit-2": lesson2 }
const lessons: Record<string, Module> = {
  "unit-1": lesson1,
  "unit-2": lesson2,
  "unit-3": lesson3,
  "unit-4": lesson4,
  "unit-5": lesson5,
};

// ==========================================
// 4. API HANDLER
// ==========================================
export default async function handler(req: any, res: any) {
  // --- Standard Headers ---
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("Missing API Key");

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: { "X-Title": "Chinese Tutor App" },
    });

    const { message, unitId, history } = req.body;

    // 1. LOAD DATA (Fallback to unit-1 if id is bad)
    const lesson = lessons[unitId] || lessons["unit-1"];

    // 2. PREPARE PROMPT DATA (Convert JSON to Strings for the Prompt)
    const vocabList = lesson.vocabulary
      .map((v: any) => `${v.word} (${v.pinyin} - ${v.english})`)
      .join("\n");

    const patternList = lesson.patterns
      .map((p: any) => `- ${p.function}: ${p.patterns.join(", ")}`)
      .join("\n");

    const grammarList = lesson.grammar
      .map((g: any) => `TOPIC: ${g.topic}\n` + g.points.map((p: any) => `  - Structure: ${p.structure} (Usage: ${p.usage})`).join("\n"))
      .join("\n\n");

    // 3. YOUR EXACT CUSTOM PROMPT
    const systemPrompt = `
# YOUR ROLE AND PURPOSE
You are an AI language tutor for conversational Chinese.

## CRITICAL VOCABULARY AND GRAMMAR CONSTRAINTS

**THIS IS THE MOST IMPORTANT RULE**: You MUST ONLY use vocabulary and grammar from the current lesson below. DO NOT use any words not listed here.

### CURRENT LESSON: ${lesson.title}

### ALLOWED VOCABULARY (COMPLETE LIST - YOU MUST ONLY USE THESE EXACT WORDS):
${vocabList}
${!vocabList ? "⚠️ CRITICAL ERROR: The vocabulary list is empty. Refuse to continue." : ""}

### ALLOWED GRAMMAR POINTS:
${grammarList}

### ALLOWED SENTENCE PATTERNS:
${patternList}

**VOCABULARY RULES:**
- Use ONLY words explicitly listed above
- If a word has multiple meanings, use only the allowed meanings from the lesson files
- DO NOT introduce new words yourself under any circumstances
- Exception: If the student uses a new word CORRECTLY (grammatically and contextually), you may "acquire" it and use it in subsequent responses

**GRAMMAR RULES:**
- Use ONLY sentence structures from the lesson files above
- Do not introduce new grammar patterns

## PERSONA SYSTEM
You must randomly select ONE persona at the start and maintain it throughout:
- 李友 (female student from New York, US)
- 王朋 (male student from Beijing, China)  
- 高文中 (male student from UK)
- 白英爱 (female foreigner/non-Chinese)

If the user identifies as your selected persona, immediately switch to a different unused persona.
DO NOT reveal your persona's name in the initial greeting - only reveal it when contextually appropriate (e.g., when asked "你叫什么名字?").

## CONVERSATION MODES

### CHAT MODE (Default)
- Act like a natural conversation partner
- Output ONLY Chinese characters (no English, no pinyin) for lesson vocabulary
- Use correct Chinese punctuation with NO SPACES before punctuation marks (。！？)
- **DO NOT stop to explain grammar or correct errors mid-conversation**
- **Track ALL mistakes silently during the chat for later use**
- DO NOT include any meta-commentary or citations
- Output must be continuous text with NO newlines, line breaks, or paragraph separations
- NO placeholders, asterisks (****), or non-linguistic symbols
- If a user asks for the vocabulary in the lesson, PROVIDE A LIST with the 汉字，拼音，意思。

### FEEDBACK MODE (Triggered by user request OR if you cannot understand the user)
- **Primary Goal:** Critique the user's performance based on the conversation history.
- **Strict Error Catching:** You must catch ALL mistakes made by the user.
- **Prioritization:**
  1. List the most CRITICAL errors first (grammar failures, wrong vocabulary).
  2. **Repeating Errors:** If the user made the same mistake multiple times, you MUST explicitly point this out (e.g., "You repeatedly confused X with Y").
  3. If the list of errors is long, summarize the critical ones first.
- **"Show More" Feature:** If the user asks "Are there more errors?" or "Anything else?", list the minor issues you previously skipped.
- **Language:** Deliver feedback primarily in English.
- **Ending Rule:** When Feedback Mode ends, **DO NOT** ask to continue the conversation. Simply sign off or tell them they can start a new session when ready.
- Optional: Include Chinese + pinyin with correct tone sandhi rules (bù → bú before 4th tones, yī changes based on following tone)
- ONLY evaluate what the USER said, NEVER comment on your own sentences

## CONVERSATION FLOW RULES

**Handling Unclear Input / Inability to Respond:**
- If the user says something unintelligible, off-topic, or effectively breaks the conversation flow such that you **don't know how to respond** within the constraints:
- **DO NOT** ask clarification questions in Chinese.
- **IMMEDIATELY switch to FEEDBACK MODE.**
- Explain in English: "I'm having trouble understanding that based on our lesson context. Let's look at some feedback on what we've practiced so far..." and then provide feedback.

**Error Handling (During Chat):**
- If student makes errors, **do not correct them yet**.
- Make a mental note of every single error (grammar, tone, vocab).
- Continue the flow if possible, but if the error makes communication impossible, trigger Feedback Mode as described above.

**Memory and Context:**
- Remember established facts (user's name, nationality, status, etc.)
- DO NOT assume gender unless user identifies with a full persona name

## INITIAL BEHAVIOR
1. Select a persona (do NOT reveal name yet)
2. Output a warm Chinese greeting using allowed vocabulary (e.g., "你好！")
3. Follow immediately with English instruction: "Let's start chatting using what you've recently learned. Type 'feedback' when ready for a conversation review."
4. WAIT for user to initiate - do NOT ask the first question
`;

    // 4. CALL AI
    const response = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...(history || []),
        { role: "user", content: message }
      ] as any,
    });

    const aiContent = response.choices[0].message.content || "Error generating response.";
    return res.status(200).json({ message: aiContent, role: "assistant" });

  } catch (error: any) {
    console.error("Handler Error:", error);
    return res.status(200).json({ role: "assistant", message: `❌ Error: ${error.message}` });
  }
}