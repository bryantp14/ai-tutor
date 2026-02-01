import { Module } from "./types";

export const lesson5: Module = {
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