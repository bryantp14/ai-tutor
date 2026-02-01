// server/data/lesson3.ts
import { Module } from "./types";

export const lesson3: Module = {
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