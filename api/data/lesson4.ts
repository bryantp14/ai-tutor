// server/data/lesson4.ts
import { Module } from "./types";

export const lesson4: Module = {
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