import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// CONTENT DATA
// ─────────────────────────────────────────────
const CHAPTERS = [
  {
    num: "一", title: "价值与货币", subtitle: "价值从何而来？", accent: "#C9922B",
    sections: [
      {
        title: "价值不住在事物里",
        beats: [
          { type: "question", text: "先做一个思想实验：一瓶水值多少钱？", sub: "在超市，大概两块钱。在撒哈拉沙漠被困第三天，你愿意用全部积蓄换它。——水变了吗？" },
          { type: "insight", label: "第一颗炸弹", text: "价值不是事物的内在属性。水本身没有价格，钻石本身也没有价格——价值是主体与对象之间「关系」的产物。" },
          { type: "deeper", text: "更精确地说：价值 = 欲望 × 距离。你越渴望某物，获得它的障碍越高，它对你的价值就越大。" },
          { type: "implication", text: "推论：如果明天全人类都不再想要黄金，黄金立刻价值归零。价值是社会性事实，不是物理事实。" },
          { type: "bridge", text: "既然价值是关系性的，那它是怎么「固定下来」，让陌生人之间也能认可同一套价格？→ 靠交换。" }
        ]
      },
      {
        title: "交换创造价值",
        beats: [
          { type: "question", text: "是先有价值，才有交换？还是先有交换，才有价值？大多数人直觉上认为是前者。" },
          { type: "insight", label: "反直觉的核心论点", text: "齐美尔认为：是交换行为本身创造了价值，而不是价值导致了交换。" },
          { type: "example", text: "当A用苹果换B的梨时，这个交换行为确立了「一个苹果 ≈ 一个梨」的价值比率。在交换发生之前，这个比率并不客观存在。" },
          { type: "contrast", label: "与马克思的根本分歧", text: "马克思：价值来自劳动时间（客观实体）。齐美尔：价值来自交换关系（关系性过程）。这不是小修正，是完全不同的本体论。" },
          { type: "bridge", text: "如果价值来自交换关系，货币又是什么？→ 货币是这种关系的「结晶」——它把亿万次交换关系凝固成一个符号。" }
        ]
      },
      {
        title: "货币是交换关系的符号",
        beats: [
          { type: "question", text: "为什么一张纸（人民币）能买到东西？纸本身没有价值，它凭什么有效？" },
          { type: "insight", label: "货币的本质定义", text: "货币是整个社会交换网络的「符号化」。它有效，不是因为它本身有价值，而是因为所有人都相信它可以换取任何事物。" },
          { type: "deeper", text: "货币是「社会信任」的物质化形式。每一张钞票背后，站着整个社会的集体认可。" },
          { type: "implication", text: "这意味着货币的基础是「关系」，不是「物质」——这为下一章「货币去物质化」的论证埋下了伏笔。" }
        ]
      }
    ]
  },
  {
    num: "二", title: "货币的实体价值", subtitle: "从金属走向符号的必然进化", accent: "#6A9E7A",
    sections: [
      {
        title: "货币曾经「本身有价值」",
        beats: [
          { type: "context", text: "古代货币是金、银、铜——它们本身就是有价值的商品。你手中的钱币，就是一块真实的金属财富。" },
          { type: "question", text: "那从金属货币到纸币，是进步还是退步？很多人直觉上觉得纸币「不可靠」，没有实物支撑。齐美尔怎么看这件事？" },
          { type: "insight", label: "反常识的判断", text: "齐美尔认为：货币的「去物质化」不是退化，而是货币本质的完成。" },
          { type: "bridge", text: "理由是什么？→ 因为货币的本质不是「被储藏」，而是「被流通」。" }
        ]
      },
      {
        title: "功能越纯粹，符号越强大",
        beats: [
          { type: "analogy", text: "类比：语言的本质是「传递意义」，不是「木头刻痕本身」。从甲骨文到印刷术，文字越来越去物质化，但传递意义的功能反而越来越强大。" },
          { type: "insight", label: "货币的进化逻辑", text: "货币越是纯粹的符号（纸币、数字货币），就越轻便、越可分割、越可流通——作为交换媒介的功能反而越完美。" },
          { type: "deeper", text: "黄金货币有一个内在矛盾：人们越「储藏」它（把它当商品），它就越不能「流通」（不能当货币）。符号货币消除了这个矛盾。" },
          { type: "implication", text: "货币去物质化，是手段越来越「纯粹化」的过程——它在趋近自己的本质。这里悄悄预示了下一章的核心概念：纯粹手段。" }
        ]
      },
      {
        title: "信任：货币的真正基础",
        beats: [
          { type: "question", text: "如果货币不靠金属支撑，它靠什么存在？" },
          { type: "insight", label: "货币即社会信任", text: "货币靠「对整个社会经济秩序的信任」支撑。你接受一张百元钞票，是因为你相信明天别人也会接受它。" },
          { type: "deeper", text: "这种信任不是针对某个具体的人，而是对「整个社会秩序」的信任——一种高度抽象的社会纽带。货币是现代社会最大规模的集体信念。" },
          { type: "bridge", text: "货币是最纯粹的「社会信任凭证」。现在新问题来了：这个「纯粹手段」，在人类的目的体系里处于什么奇特的位置？→ 第三章。" }
        ]
      }
    ]
  },
  {
    num: "三", title: "目的序列中的货币", subtitle: "纯粹手段如何反噬人心", accent: "#7A8CBF",
    sections: [
      {
        title: "人的行动是目的—手段链条",
        beats: [
          { type: "question", text: "你今天为什么工作？试着把理由一层层追下去，看能追到哪里……" },
          { type: "example", text: "工作 → 赚钱 → 买食物 → 维持生命 → 享受生活 → 实现幸福 → ……然后呢？" },
          { type: "insight", label: "目的—手段结构", text: "人类所有行动都嵌套在「目的—手段」链条里。每个手段都指向某个更高的目的，直到某个终极目的。" },
          { type: "bridge", text: "货币在这个链条里处于极其特殊的位置——它既是最「纯粹」的手段，又有着最「宽广」的覆盖范围。" }
        ]
      },
      {
        title: "货币是「纯粹手段」",
        beats: [
          { type: "insight", label: "货币的哲学定位", text: "货币是所有手段中最纯粹的手段——它本身没有任何内在价值，全部意义都在于「可以换取其他东西」。" },
          { type: "deeper", text: "面包可以直接吃，艺术品可以直接欣赏——但货币本身什么都做不了。它只有作为手段才有意义，是「手段」这个概念的极致形式。" },
          { type: "paradox", label: "关键悖论", text: "但货币同时又是「通向一切目的」的手段——几乎没有什么目的是它原则上不能服务的。「纯粹手段」取得了无限的覆盖范围。" },
          { type: "implication", text: "结果：「纯粹手段」在心理上会篡夺「目的」的地位——尽管它从未真正成为目的。这是现代人精神困境的根源之一。" }
        ]
      },
      {
        title: "守财奴与挥霍者：两种极端人格",
        beats: [
          { type: "insight", label: "守财奴的心理结构", text: "守财奴把货币当作目的本身。他积累财富，但从不使用。钱的数字本身就是满足——这是「手段」彻底篡夺「目的」地位的极端案例。" },
          { type: "insight", label: "挥霍者的心理结构", text: "挥霍者是反面极端。他享受的不是钱买来的东西，而是「花出去」这个动作本身——他迷恋的是货币流通的感觉。" },
          { type: "deeper", text: "两者看似相反，实则同构：都是被「手段」本身迷住了，遗忘了手段背后应当追求的终极目的。" },
          { type: "bridge", text: "这不只是个人心理问题，它是整个现代文化的缩影——货币经济在结构上制造了目的的迷失。" }
        ]
      },
      {
        title: "目的的空洞化",
        beats: [
          { type: "insight", label: "链条越长，目的越模糊", text: "当「手段—目的」链条越来越长，人离最终目的越来越远，终极目的本身变得越来越模糊——我究竟为什么而活？" },
          { type: "example", text: "现代人：努力工作 → 升职 → 赚更多钱 → 住更好的房子 → 开更好的车 → ……然后呢？很多人到这里就卡住了。" },
          { type: "implication", text: "货币经济越发达，手段链条越复杂，人离「终极意义」越远。这不是个人的失败，而是货币经济的结构性后果。" },
          { type: "bridge", text: "货币重构了人的目的体系，也带来了历史性的个人解放——尽管这种自由并不完整。→ 第四章。" }
        ]
      }
    ]
  },
  {
    num: "四", title: "个人自由", subtitle: "货币如何解放，又如何空洞化个体", accent: "#BF7A7A",
    sections: [
      {
        title: "前货币时代：人格性控制",
        beats: [
          { type: "context", text: "中世纪欧洲农奴制：农民不只要交粮食，还要为地主服劳役——每周多少天、做什么活，地主说了算。" },
          { type: "insight", label: "人格性义务的本质", text: "这种义务是「人格性的」：地主控制的不只是你的劳动，而是你整个人——时间、行动、婚姻、人身。你不是在履行合同，你是在臣服于一个人。" },
          { type: "question", text: "货币出现后，这种人格性控制是如何被瓦解的？" }
        ]
      },
      {
        title: "货币将义务「量化」，解放了人格",
        beats: [
          { type: "insight", label: "货币地租的革命", text: "当地主改收「货币地租」：农民只需每年交一笔钱，其余时间完全自由。地主不再管你怎么种地、什么时候干活——他只关心一个数字。" },
          { type: "deeper", text: "货币把「整体性的人格臣服」转化为「局部性的数量关系」。义务量化之后，履行义务只需达到一个数字，而不是把整个人交出去。" },
          { type: "implication", text: "这是真实的历史解放。现代人比农奴自由，在结构上正是因为货币经济将义务抽象化、量化——人格从义务关系中撤离了。" },
          { type: "bridge", text: "但这个自由是完整的吗？→ 齐美尔说：不。" }
        ]
      },
      {
        title: "空洞的自由",
        beats: [
          { type: "question", text: "农民交完地租，「自由」了。但他能去哪里？做什么？谁来给他意义感和归属感？" },
          { type: "insight", label: "负面自由的局限", text: "货币带来的是「免于干涉的自由」（negative freedom）——你不再被人格性地控制，但没有人给你指引、归属感或生命意义。" },
          { type: "deeper", text: "旧的枷锁（封建依附）是沉重的，但它同时提供了确定性：你知道自己的位置，知道对谁忠诚，知道自己是谁。货币解放打碎了枷锁，也打碎了这种确定性。" },
          { type: "implication", text: "现代人的孤独感、无根感，部分来源于此——被解放出来，却没有被给予新的意义框架。自由而茫然。" }
        ]
      }
    ]
  },
  {
    num: "五", title: "人格价值的货币等价物", subtitle: "当货币入侵不该被量化的领域", accent: "#9E7ABF",
    sections: [
      {
        title: "货币是伟大的「均等化者」",
        beats: [
          { type: "insight", label: "均等化力量", text: "货币最根本的功能之一，是把「质的差异」转化为「量的差异」。不同性质的东西，被折算到同一个尺度——价格。" },
          { type: "example", text: "一幅画、一斤猪肉、一小时律师咨询——它们性质完全不同，但都可以标上价格，在同一个市场里被比较和交换。" },
          { type: "question", text: "这种均等化能力，有没有边界？有没有什么东西不该被货币均等化？" }
        ]
      },
      {
        title: "货币侵入「人格性价值」",
        beats: [
          { type: "context", text: "古代惩罚：打板子、游街示众、砍手——针对的是「人格」本身。现代惩罚：罚款——把对人格的惩处换算成一个数字。" },
          { type: "question", text: "罚款代替体罚，是进步吗？齐美尔的回答很微妙……" },
          { type: "insight", label: "降格效应", text: "一方面，罚款更人道。另一方面，它意味着：你的过错被「定价」了——只要付钱，就一笔勾销。道德过错的重量被货币稀释了。" },
          { type: "example", text: "名誉损害赔偿：法院判你赔偿100万精神损失费。尊严被折算成金钱——你的痛苦值100万还是1000万？这是个荒诞的问题，但我们每天都在回答它。" },
          { type: "example", text: "性交易：把「亲密与爱」的关系商品化。金钱进入了本质上不可交换的领域，根本性地改变了关系的性质。" }
        ]
      },
      {
        title: "去神圣化：货币的文化代价",
        beats: [
          { type: "insight", label: "质的差异消失", text: "当一切都可以被定价，质的差异就消失了。神圣的、庄严的、不可替代的——全部被拉平到同一个价格坐标轴上。" },
          { type: "deeper", text: "这是货币的「去神圣化」效应（desacralization）。它不是有意为之，而是货币逻辑的自然延伸——均等化本能地破坏等级差异。" },
          { type: "implication", text: "现代人觉得「很多东西都没什么意思」，部分原因正在于此：货币经济将所有事物纳入同一个比较框架，消解了崇高感与神圣感。" }
        ]
      }
    ]
  },
  {
    num: "六", title: "生活风格", subtitle: "货币塑造了什么样的人", accent: "#6A9EB0",
    sections: [
      {
        title: "理智主义：计算取代感受",
        beats: [
          { type: "question", text: "现代城市人和传统农村人，在「感受世界」的方式上有什么不同？" },
          { type: "insight", label: "计算性人格的诞生", text: "货币交换要求精确计算：多少钱、多少利息、多少成本。长期浸泡在这种逻辑里，人的思维方式逐渐「计算化」——凡事先问「值不值」「划不划算」。" },
          { type: "deeper", text: "这不只是经济习惯，它渗透进整个生活：人际关系、时间安排、情感投入——都开始被「收益—成本」框架评估。" },
          { type: "implication", text: "理智主义的代价：直觉、感受、非理性的美与庄严，在生活中逐渐退场。世界变得更清晰，也变得更干燥。" }
        ]
      },
      {
        title: "冷漠态度：对一切失去区分感",
        beats: [
          { type: "insight", label: "Blasé attitude", text: "现代城市人对一切事物都提不起真正的劲儿——见过太多，什么都觉得「没什么」。这不是坏情绪，而是一种结构性的感知迟钝。" },
          { type: "deeper", text: "根源：货币把所有东西变成「可比较的价格」，抹平了事物之间的质的差异。当一切都只是「不同价位」时，就没有什么真正「独一无二」了。" },
          { type: "example", text: "站在一幅伟大的画作前，内心第一个念头是「这幅画多少钱？」——这就是冷漠态度侵入审美体验的瞬间。" },
          { type: "implication", text: "冷漠态度是现代人的保护壳：面对信息过载，它是心理防御机制。但代价是：它也隔绝了真正的感动、惊奇与意义体验。" }
        ]
      },
      {
        title: "精确性与守时：时间货币化",
        beats: [
          { type: "insight", label: "时间就是金钱的深层含义", text: "「时间就是金钱」不只是励志格言，它描述了一个结构性事实：在货币经济里，时间被「标准化」并「定价」了。" },
          { type: "deeper", text: "当所有人的协作都需要货币结算，准时就成了道德义务：你迟到，意味着让别人损失了金钱价值的时间。守时从礼貌变成了道德规范。" },
          { type: "implication", text: "时钟成为现代城市的神，精确性成为现代人的美德。生活被切割成「分钟」和「小时」——时间的流动感被「时间的管理」取代。" }
        ]
      },
      {
        title: "客观文化压倒主观文化",
        beats: [
          { type: "question", text: "传统工匠可以独力完成一把椅子的全部制作。今天的工厂工人能掌握整个生产链条吗？" },
          { type: "insight", label: "两种文化的分离", text: "「客观文化」：人类积累的知识、技术、制度、商品的总和，不断膨胀。「主观文化」：个体真正内化、能灵活运用的文化能力。" },
          { type: "deeper", text: "货币经济推动了极度的社会分工。分工越细，客观文化积累越快；但每个个体只掌握体系的极小一部分，主观文化能力相对萎缩。" },
          { type: "implication", text: "结果：世界越来越复杂、丰富，个体却越来越感到渺小、无能为力——这是现代异化感的结构性根源。" }
        ]
      },
      {
        title: "现代性的根本困境",
        beats: [
          { type: "synthesis", label: "全书的终点，也是起点", text: "货币是人类创造的最伟大的工具之一：它协调了亿万陌生人的合作，带来了前所未有的自由与繁荣。这是真实的成就。" },
          { type: "deeper", text: "但货币的逻辑——均等化、计算化、手段化——在悄悄重塑我们：让我们更理性、更冷漠、更精确、更自由，也更空洞、更孤独、更无根。" },
          { type: "final", label: "齐美尔的终极洞见", text: "货币不只是经济工具，它是一种「文化力量」——它在重新定义何为价值、何为自由、何为人格，以及生命意味着什么。" },
          { type: "question", text: "齐美尔不给你答案，他只是让你再也无法「无意识地」生活在货币经济里。这，就是哲学的功能——让习以为常的世界变得陌生，让你真正看见它。" }
        ]
      }
    ]
  }
];

const BEAT_CFG = {
  question:    { icon: "？", label: "思考",    color: "#A08060" },
  insight:     { icon: "◆", label: "核心论点", color: "#D4A843" },
  deeper:      { icon: "↓", label: "深入",     color: "#7A9CB5" },
  example:     { icon: "∷", label: "举例",     color: "#8BA87A" },
  implication: { icon: "→", label: "推论",     color: "#B07A9E" },
  bridge:      { icon: "⟶", label: "由此引出", color: "#C9922B" },
  contrast:    { icon: "⇆", label: "对比",     color: "#C47A5A" },
  paradox:     { icon: "⊗", label: "悖论",     color: "#C45A5A" },
  context:     { icon: "◎", label: "背景",     color: "#7A8C8B" },
  analogy:     { icon: "≈", label: "类比",     color: "#8B7AAA" },
  synthesis:   { icon: "◉", label: "综合",     color: "#D4A843" },
  final:       { icon: "★", label: "终极洞见", color: "#D4A843" },
};

// ─────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────
function buildFlatBeats() {
  const flat = [];
  CHAPTERS.forEach((ch, ci) => {
    ch.sections.forEach((sec, si) => {
      sec.beats.forEach((beat, bi) => {
        flat.push({ ch: ci, sec: si, beat: bi });
      });
    });
  });
  return flat;
}
const FLAT_BEATS = buildFlatBeats();

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function SimmelGuide() {
  const [view, setView] = useState("overview");
  const [loc, setLoc] = useState({ ch: 0, sec: 0, beat: 0 });
  const [fading, setFading] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const chatRef = useRef(null);

  const flatIdx = FLAT_BEATS.findIndex(b => b.ch === loc.ch && b.sec === loc.sec && b.beat === loc.beat);
  const total = FLAT_BEATS.length;

  const ch = CHAPTERS[loc.ch];
  const sec = ch.sections[loc.sec];
  const beat = sec.beats[loc.beat];
  const cfg = BEAT_CFG[beat?.type] || BEAT_CFG.insight;

  const navigate = (newLoc) => {
    setFading(true);
    setTimeout(() => { setLoc(newLoc); setFading(false); }, 180);
  };

  const goNext = () => { if (flatIdx < total - 1) navigate(FLAT_BEATS[flatIdx + 1]); };
  const goPrev = () => { if (flatIdx > 0) navigate(FLAT_BEATS[flatIdx - 1]); };

  const startAt = (ci, si = 0) => {
    setLoc({ ch: ci, sec: si, beat: 0 });
    setView("reading");
  };

  useEffect(() => {
    if (view !== "reading" || askOpen) return;
    const h = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      if (e.key === "Escape") setView("overview");
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const sendQuestion = async () => {
    if (!question.trim() || aiLoading) return;
    const q = question.trim();
    setQuestion("");
    const newMsgs = [...messages, { role: "user", content: q }];
    setMessages(newMsgs);
    setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `你是齐美尔《货币哲学》的专家解读者，正帮助读者逐步理解这本书。
当前位置：第${ch.num}章《${ch.title}》，"${sec.title}"部分。
请用清晰、生动的中文回答。联系书中具体论证，使用例子或类比帮助理解。回答不超过200字，不要使用markdown格式符号。`,
          messages: newMsgs
        })
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "抱歉，暂时无法获取回答。";
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMsgs, { role: "assistant", content: "网络错误，请稍后重试。" }]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F0D0A", fontFamily: "'Noto Serif SC', 'STSong', Georgia, serif", color: "#C4B49A" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #2A2010; border-radius: 2px; }
        .ch-card { transition: transform 0.18s, border-color 0.18s; }
        .ch-card:hover { transform: translateY(-2px); }
        .sec-tag:hover { background: rgba(255,255,255,0.08) !important; color: #C4B49A !important; }
        .btn:hover { opacity: 0.85; } .btn:active { transform: scale(0.97); }
        .fade-beat { transition: opacity 0.18s, transform 0.18s; }
        .fade-beat.out { opacity: 0; transform: translateY(6px); }
        @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{opacity:0.5;} 50%{opacity:1;} }
        .ask-modal { animation: slideUp 0.25s ease; }
        textarea { outline: none !important; }
        textarea:focus { border-color: rgba(212,168,67,0.35) !important; }
      `}</style>

      {view === "overview"
        ? <Overview chapters={CHAPTERS} onStart={startAt} />
        : <Reading
            ch={ch} sec={sec} beat={beat} cfg={cfg}
            loc={loc} flatIdx={flatIdx} total={total}
            fading={fading}
            onPrev={goPrev} onNext={goNext}
            onBack={() => setView("overview")}
            onJumpBeat={(bi) => navigate({ ...loc, beat: bi })}
            onAsk={() => setAskOpen(true)}
          />
      }

      {askOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
          onClick={(e) => { if (e.target === e.currentTarget) { setAskOpen(false); } }}
        >
          <div className="ask-modal" style={{ width: "100%", maxWidth: 640, height: "75vh", background: "#16120C", border: "1px solid rgba(212,168,67,0.18)", borderRadius: "14px 14px 0 0", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: "#D4A843", fontSize: 13, fontWeight: 600 }}>问问题</div>
                <div style={{ color: "#5A4A2A", fontSize: 11, marginTop: 2 }}>第{ch.num}章 · {sec.title}</div>
              </div>
              <button onClick={() => setAskOpen(false)} style={{ background: "none", border: "none", color: "#5A4A2A", fontSize: 22, cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>
            <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
              {messages.length === 0 && (
                <div style={{ color: "#3A2E1A", fontSize: 13, textAlign: "center", marginTop: 40, lineHeight: 2 }}>
                  对当前内容有疑问？<br />随时提问，我来解答。
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "88%", background: m.role === "user" ? "rgba(212,168,67,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${m.role === "user" ? "rgba(212,168,67,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: m.role === "user" ? "10px 10px 2px 10px" : "10px 10px 10px 2px", padding: "9px 13px", fontSize: 13, lineHeight: 1.85, color: m.role === "user" ? "#D4A843" : "#C4B49A" }}>
                  {m.content}
                </div>
              ))}
              {aiLoading && <div style={{ color: "#5A4A2A", fontSize: 12, animation: "pulse 1.5s infinite" }}>思考中……</div>}
            </div>
            <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 8 }}>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendQuestion(); } }}
                placeholder="输入问题，Enter 发送…"
                rows={2}
                style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#C4B49A", fontSize: 13, fontFamily: "inherit", resize: "none", lineHeight: 1.6 }}
              />
              <button
                className="btn"
                onClick={sendQuestion}
                disabled={!question.trim() || aiLoading}
                style={{ background: question.trim() && !aiLoading ? "rgba(212,168,67,0.12)" : "rgba(255,255,255,0.03)", border: "1px solid rgba(212,168,67,0.2)", borderRadius: 8, color: "#D4A843", fontSize: 18, cursor: "pointer", padding: "0 16px", opacity: question.trim() && !aiLoading ? 1 : 0.3, transition: "all 0.2s" }}
              >→</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// OVERVIEW
// ─────────────────────────────────────────────
function Overview({ chapters, onStart }) {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "36px 20px 60px" }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ color: "#3A2E1A", fontSize: 10, letterSpacing: 5, textTransform: "uppercase", marginBottom: 10 }}>Georg Simmel · 1900</div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(30px, 7vw, 52px)", color: "#D4A843", lineHeight: 1.15, marginBottom: 8 }}>货币哲学</h1>
        <p style={{ color: "#5A4A2A", fontSize: 13, lineHeight: 1.8 }}>逐章 · 逐节 · 逐论点 · 互动讲解</p>
        <div style={{ marginTop: 14, height: 1, background: "linear-gradient(to right, rgba(212,168,67,0.3), transparent)" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {chapters.map((ch, i) => (
          <div key={i} className="ch-card"
            onClick={() => onStart(i)}
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderLeft: `3px solid ${ch.accent}`, borderRadius: 8, padding: "16px 18px", cursor: "pointer" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: ch.accent, fontSize: 10, letterSpacing: 3, marginBottom: 4 }}>第{ch.num}章</div>
                <div style={{ color: "#D4C9A8", fontSize: 15, fontWeight: 600, marginBottom: 3 }}>{ch.title}</div>
                <div style={{ color: "#5A4A2A", fontSize: 12 }}>{ch.subtitle}</div>
              </div>
              <div style={{ color: ch.accent, fontSize: 16, marginLeft: 10, opacity: 0.5, marginTop: 4 }}>›</div>
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {ch.sections.map((sec, si) => (
                <span key={si} className="sec-tag"
                  onClick={(e) => { e.stopPropagation(); onStart(i, si); }}
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, padding: "3px 8px", fontSize: 11, color: "#6A5A40", cursor: "pointer", transition: "all 0.15s" }}
                >{sec.title}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28, color: "#2A2010", fontSize: 11, textAlign: "center", lineHeight: 2 }}>点击章节开始 · 键盘方向键导航 · 随时点「问」提问</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// READING VIEW
// ─────────────────────────────────────────────
function Reading({ ch, sec, beat, cfg, loc, flatIdx, total, fading, onPrev, onNext, onBack, onJumpBeat, onAsk }) {
  const progress = (flatIdx + 1) / total;
  const isFirst = flatIdx === 0;
  const isLast = flatIdx === total - 1;
  const beatColor = cfg.color;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", maxWidth: 680, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ padding: "11px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <button className="btn" onClick={onBack} style={{ background: "none", border: "none", color: "#5A4A2A", cursor: "pointer", fontSize: 12, padding: 0, fontFamily: "inherit" }}>← 目录</button>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: ch.accent, fontSize: 10, letterSpacing: 3 }}>第{ch.num}章</div>
          <div style={{ color: "#6A5A40", fontSize: 11, marginTop: 1 }}>{ch.title}</div>
        </div>
        <button className="btn" onClick={onAsk} style={{ background: "rgba(212,168,67,0.07)", border: "1px solid rgba(212,168,67,0.18)", borderRadius: 6, color: "#D4A843", fontSize: 11, cursor: "pointer", padding: "4px 10px", fontFamily: "inherit", transition: "all 0.2s" }}>问</button>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: "rgba(255,255,255,0.04)", flexShrink: 0 }}>
        <div style={{ height: "100%", background: ch.accent, width: `${progress * 100}%`, transition: "width 0.3s ease" }} />
      </div>

      {/* Section name */}
      <div style={{ padding: "7px 18px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <span style={{ color: "#3A2E1A", fontSize: 11 }}>{sec.title}</span>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }} />
        <span style={{ color: "#2A2010", fontSize: 10 }}>{flatIdx + 1} / {total}</span>
      </div>

      {/* Beat content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 20px", display: "flex", alignItems: "center" }}>
        <div className={`fade-beat ${fading ? "out" : ""}`} style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}>
          {/* Type badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <div style={{ width: 26, height: 26, borderRadius: 5, background: `${beatColor}12`, border: `1px solid ${beatColor}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: beatColor }}>{cfg.icon}</div>
            <div style={{ fontSize: 10, letterSpacing: 2.5, color: beatColor, opacity: 0.75, textTransform: "uppercase" }}>{cfg.label}</div>
          </div>

          {/* Label */}
          {beat.label && (
            <div style={{ fontSize: 11, color: beatColor, marginBottom: 10, letterSpacing: 0.5, fontWeight: 600 }}>{beat.label}</div>
          )}

          {/* Main text */}
          <div style={{ fontSize: "clamp(15px, 2.8vw, 18px)", lineHeight: 2.1, color: "#D4C9A8", borderLeft: `2px solid ${beatColor}35`, paddingLeft: 16 }}>
            {beat.text}
          </div>

          {/* Sub text */}
          {beat.sub && (
            <div style={{ marginTop: 12, paddingLeft: 18, fontSize: 13, lineHeight: 1.9, color: "#6A5A40", fontStyle: "italic" }}>{beat.sub}</div>
          )}
        </div>
      </div>

      {/* Beat position dots */}
      <div style={{ padding: "8px 18px", display: "flex", justifyContent: "center", gap: 5, flexShrink: 0 }}>
        {sec.beats.map((_, i) => (
          <div key={i} onClick={() => onJumpBeat(i)}
            style={{ width: i === loc.beat ? 18 : 6, height: 6, borderRadius: 3, background: i === loc.beat ? ch.accent : "rgba(255,255,255,0.09)", cursor: "pointer", transition: "all 0.25s" }}
          />
        ))}
      </div>

      {/* Navigation */}
      <div style={{ padding: "10px 18px 18px", display: "flex", gap: 10, borderTop: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
        <button className="btn" onClick={onPrev} disabled={isFirst}
          style={{ flex: 1, padding: "11px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, color: isFirst ? "#2A2010" : "#7A6A50", cursor: isFirst ? "default" : "pointer", fontSize: 13, fontFamily: "inherit", transition: "all 0.2s" }}
        >← 上一条</button>
        <button className="btn" onClick={onNext} disabled={isLast}
          style={{ flex: 2, padding: "11px", background: "rgba(212,168,67,0.07)", border: `1px solid ${ch.accent}35`, borderRadius: 8, color: isLast ? "#3A2E1A" : "#D4A843", cursor: isLast ? "default" : "pointer", fontSize: 13, fontFamily: "inherit", transition: "all 0.2s" }}
        >{isLast ? "已到达终点" : "下一条 →"}</button>
      </div>
    </div>
  );
}
