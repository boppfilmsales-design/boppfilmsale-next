/**
 * AEC GROUP — single source of truth for all site copy.
 * Bilingual (en / zh). Every page reads from here so wording stays consistent
 * and can be reviewed in one place.
 */

export type Lang = "en" | "zh";

export const SITE = {
  name: "AEC GROUP",
  legalName: "Anhui Eastern Progress Imp. & Exp. Co., Ltd.",
  legalNameZh: "安徽东渐进出口有限公司",
  shortNameZh: "安徽东渐",
  founded: 2011,
  baseUrl: "https://second.boppfilmsale.com",
  email: "sale@boppfilmsale.com",
  phone: "+86-551-64687285",
  mobile: "+86-18919659471",
  whatsapp: "+86-18919659471",
  address: "No.1158 Huizhou Ave., Baohe District, Hefei, Anhui 230051, China",
  addressZh: "安徽省合肥市包河区徽州大道1158号 230051",
  hours: "Mon–Fri 08:30–17:30 (UTC+8)",
  hoursZh: "周一至周五 08:30–17:30（UTC+8）",
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const NAV: Record<Lang, { href: string; label: string }[]> = {
  en: [
    { href: "/en/products", label: "Products" },
    { href: "/en/capabilities", label: "Capabilities" },
    { href: "/en/cases", label: "Case Studies" },
    { href: "/en/about", label: "About" },
    { href: "/en/faq", label: "FAQ" },
    { href: "/en/contact", label: "Contact" },
  ],
  zh: [
    { href: "/zh/products", label: "产品中心" },
    { href: "/zh/capabilities", label: "服务能力" },
    { href: "/zh/cases", label: "合作案例" },
    { href: "/zh/about", label: "关于我们" },
    { href: "/zh/faq", label: "常见问题" },
    { href: "/zh/contact", label: "联系我们" },
  ],
};

/* ------------------------------------------------------------------ */
/* Shared microcopy                                                    */
/* ------------------------------------------------------------------ */

export const UI: Record<Lang, Record<string, string>> = {
  en: {
    getQuote: "Get a Quote",
    requestSample: "Request a Sample",
    viewProducts: "Browse Products",
    viewAll: "View All",
    readMore: "Read More",
    learnMore: "Learn More",
    backProducts: "Back to Products",
    home: "Home",
    skip: "Skip to main content",
    menu: "Open menu",
    closeMenu: "Close menu",
    language: "中文",
    responseTime: "Quotation within 24 hours",
    noObligation: "No obligation · Samples available · Technical data on request",
    productsLabel: "Product Catalogue",
    categoriesLabel: "Categories",
    allProducts: "All Products",
    productCount: "products",
    requestThis: "Enquire About This Product",
    specifications: "Technical Specifications",
    applications: "Typical Applications",
    related: "Related Products",
    seeCategory: "View full category",
  },
  zh: {
    getQuote: "获取报价",
    requestSample: "索取样品",
    viewProducts: "浏览产品",
    viewAll: "查看全部",
    readMore: "阅读更多",
    learnMore: "了解更多",
    backProducts: "返回产品列表",
    home: "首页",
    skip: "跳到主要内容",
    menu: "打开菜单",
    closeMenu: "关闭菜单",
    language: "English",
    responseTime: "24 小时内报价",
    noObligation: "免费咨询 · 可寄样 · 提供技术数据表",
    productsLabel: "产品目录",
    categoriesLabel: "产品分类",
    allProducts: "全部产品",
    productCount: "个产品",
    requestThis: "咨询该产品",
    specifications: "技术规格",
    applications: "典型应用",
    related: "相关产品",
    seeCategory: "查看该分类全部产品",
  },
};

/* ------------------------------------------------------------------ */
/* 1 + 2 + 3 — High-end homepage: first impression + conversion copy   */
/* ------------------------------------------------------------------ */

export interface HomeCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  sub: string;
  primaryCta: string;
  secondaryCta: string;
  trustLine: string;
  stats: { value: string; label: string }[];
  proofStrip: string[];
  problem: {
    label: string;
    title: string;
    lead: string;
    items: { title: string; body: string }[];
  };
  solution: {
    label: string;
    title: string;
    lead: string;
    items: { n: string; title: string; body: string }[];
  };
  catalog: { label: string; title: string; lead: string; cta: string };
  capability: {
    label: string;
    title: string;
    lead: string;
    items: { title: string; body: string; points: string[] }[];
    cta: string;
  };
  cases: {
    label: string;
    title: string;
    lead: string;
    items: { region: string; sector: string; title: string; body: string; result: string }[];
    cta: string;
  };
  about: {
    label: string;
    title: string;
    paragraphs: string[];
    facts: { value: string; label: string }[];
    cta: string;
  };
  faq: { label: string; title: string; lead: string; cta: string };
  finalCta: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
    note: string;
  };
}

export const HOME: Record<Lang, HomeCopy> = {
  en: {
    metaTitle: "BOPP, BOPET & Flexible Packaging Films | AEC GROUP",
    metaDescription:
      "AEC GROUP supplies BOPP, BOPET, CPP, POF, metallized and coated films, thermal ribbons and packaging machinery to 80+ countries. Custom slitting, FDA/EU compliant grades, quotation within 24 hours.",
    eyebrow: "Film engineering & global supply · Since 2011",
    h1: "The right film, specified once,",
    h1Accent: "delivered everywhere.",
    sub: "BOPP, BOPET, CPP and specialty packaging films — engineered to your thickness, width and converting line, then shipped to your plant from Hefei, China. One technical partner from sample to container.",
    primaryCta: "Tell us your specification",
    secondaryCta: "Browse the catalogue",
    trustLine: "Trusted by converters, printers and brand owners in 80+ countries",
    stats: [
      { value: "14+", label: "Years exporting" },
      { value: "80+", label: "Countries served" },
      { value: "11", label: "Product divisions" },
      { value: "24h", label: "Quotation turnaround" },
    ],
    proofStrip: [
      "ISO-grade QA on every lot",
      "Custom slit widths & roll length",
      "FDA / EU food-contact grades",
      "Export documentation handled",
      "Samples before you commit",
    ],
    problem: {
      label: "The problem",
      title: "A film that looks right on paper can still stop your line.",
      lead: "Most sourcing problems aren't about price. They show up three weeks later — on the convertor, at the sealer, or in a customs file.",
      items: [
        {
          title: "Specification drift",
          body: "Micron tolerance, corona level or slip that varies between lots turns a smooth run into constant re-setting.",
        },
        {
          title: "Wrong grade for the line",
          body: "A film chosen for printability may fail on a high-speed heat-seal line. The cost is downtime, not material.",
        },
        {
          title: "Fragmented supply",
          body: "Film from one mill, metallizing from another, slitting from a third — and nobody owns the final result.",
        },
        {
          title: "Slow answers",
          body: "When a production slot is at risk, waiting three days for a datasheet is not a minor inconvenience.",
        },
      ],
    },
    solution: {
      label: "How we work",
      title: "One specification. One accountable partner.",
      lead: "We start from your converting process, not from a price list. Then we hold the whole chain together — production, secondary processing, testing and export.",
      items: [
        {
          n: "01",
          title: "Tell us the application",
          body: "Substrate, line speed, sealing method, print process, target market and compliance needs. A short technical brief is enough.",
        },
        {
          n: "02",
          title: "Get a matched grade + sample",
          body: "We recommend the exact structure with thickness, treatment, COF and roll geometry, then send samples and a datasheet.",
        },
        {
          n: "03",
          title: "Trial, approve, repeat",
          body: "Once approved, the specification is locked. Every subsequent lot is produced and inspected against that same reference.",
        },
        {
          n: "04",
          title: "Delivered to your door",
          body: "Slitting, packing, palletising, certificates and shipping documents handled by one team, with consolidated loads across divisions.",
        },
      ],
    },
    catalog: {
      label: "Product range",
      title: "Eleven divisions, one supply chain.",
      lead: "From base BOPP and BOPET film to coated, metallized and converted products — plus the ribbons, labels and machinery that run alongside them.",
      cta: "Explore all products",
    },
    capability: {
      label: "Capabilities",
      title: "More than a trading company.",
      lead: "Production, secondary processing, quality control and export logistics are coordinated in-house, so the specification you approve is the one that arrives.",
      items: [
        {
          title: "Manufacturing & converting",
          body: "Co-extrusion, metallizing, coating, printing and precision slitting under one coordinated supply chain.",
          points: ["8–500 µm thickness range", "Custom roll width & length", "One-side / both-side treatment"],
        },
        {
          title: "Quality & compliance",
          body: "Batch inspection with retained samples and documentation for regulated markets.",
          points: ["Lot-level test reports", "FDA / EU food-contact grades", "MSDS & TDS on request"],
        },
        {
          title: "Global logistics",
          body: "Consolidated containers across product divisions, with export paperwork prepared before the vessel sails.",
          points: ["80+ countries", "Multi-currency settlement", "FCL / LCL & mixed loads"],
        },
      ],
      cta: "See how we work",
    },
    cases: {
      label: "Selected work",
      title: "What a correct specification changes.",
      lead: "Representative projects from food, labelling, electrical and industrial packaging. Details are available on request.",
      items: [
        {
          region: "Europe",
          sector: "Food packaging",
          title: "High-clarity lamination film for a snack converter",
          body: "Replaced a three-supplier structure with a single BOPP grade tuned to the customer's gravure line and sealing window.",
          result: "Fewer line stops · one certificate set per lot",
        },
        {
          region: "Middle East",
          sector: "Labels & ribbons",
          title: "Thermal transfer ribbon base film programme",
          body: "Supplied 4.5 µm BOPET base film with tight thickness control plus matching ribbons and slitting service.",
          result: "Consistent yield across repeat orders",
        },
        {
          region: "South America",
          sector: "Industrial packaging",
          title: "Mixed container of films, tapes and machinery",
          body: "Consolidated BOPP film, adhesive tape jumbo rolls and a slitting machine into one shipment with unified documentation.",
          result: "One order · one invoice · one arrival",
        },
      ],
      cta: "Read more case studies",
    },
    about: {
      label: "Who we are",
      title: "A film specialist built in Hefei, working worldwide.",
      paragraphs: [
        "AEC GROUP began in 2011 as a specialised packaging-film exporter. Today we coordinate production, deep processing and international distribution across flexible packaging films, film-based electronic materials, adhesive products and packaging machinery.",
        "We are engineers and traders in equal measure: the person who answers your enquiry can read a datasheet, discuss a sealing curve and arrange the container. That combination is why customers stay with us across product lines and years.",
      ],
      facts: [
        { value: "2011", label: "Established" },
        { value: "80+", label: "Export markets" },
        { value: "11", label: "Product divisions" },
        { value: "4", label: "Languages supported" },
      ],
      cta: "Our story",
    },
    faq: {
      label: "Before you enquire",
      title: "The questions buyers ask us first.",
      lead: "Minimum order quantities, samples, lead times, certification and payment — answered plainly.",
      cta: "Read all FAQs",
    },
    finalCta: {
      title: "Send us the specification. We'll send back a solution.",
      body: "Tell us the film type, thickness, width and application. You'll get a matched grade, a technical datasheet and a firm quotation within 24 hours.",
      primary: "Request a quotation",
      secondary: "Email our technical team",
      note: "Samples available · No obligation · English / 中文 / Français / Русский / Español",
    },
  },
  zh: {
    metaTitle: "BOPP、BOPET 及软包装薄膜供应商 | 安徽东渐 AEC GROUP",
    metaDescription:
      "安徽东渐（AEC GROUP）供应 BOPP、BOPET、CPP、POF、镀铝膜、涂布膜、热转印碳带及包装机械，出口 80+ 国家。支持定制分切、FDA/EU 食品接触级，24 小时内报价。",
    eyebrow: "薄膜工艺与全球供应 · 始于 2011",
    h1: "一次定准规格，",
    h1Accent: "全球稳定交付。",
    sub: "BOPP、BOPET、CPP 及特种包装薄膜 —— 按您的厚度、幅宽与复合线定制，从中国合肥直发工厂。从打样到装柜，一个技术伙伴全程负责。",
    primaryCta: "告诉我们您的规格",
    secondaryCta: "浏览产品目录",
    trustLine: "服务于全球 80+ 国家的复合厂、印刷厂与品牌方",
    stats: [
      { value: "14+", label: "年出口经验" },
      { value: "80+", label: "服务国家" },
      { value: "11", label: "产品事业部" },
      { value: "24h", label: "报价响应" },
    ],
    proofStrip: ["每批次质量检验", "定制分切幅宽与卷长", "FDA / EU 食品接触级", "代办出口单证", "先看样再下单"],
    problem: {
      label: "常见问题",
      title: "参数表看着没问题，上了机才知道不对。",
      lead: "采购的麻烦往往不在价格，而在三周后 —— 复合机、热封工位，或卡在通关单证上。",
      items: [
        { title: "批次漂移", body: "厚度公差、电晕值或摩擦系数在批次间浮动，产线只能反复调机。" },
        { title: "等级与产线不匹配", body: "为印刷性选的膜，未必扛得住高速热封。损失的是停机时间，不是膜钱。" },
        { title: "供应链分散", body: "基膜一家、镀铝一家、分切又一家，最终成品出了问题没人负责。" },
        { title: "响应太慢", body: "产线等着开机，一张技术数据表却要等三天，这不是小问题。" },
      ],
    },
    solution: {
      label: "合作方式",
      title: "一份规格，一个责任主体。",
      lead: "我们从您的加工工艺出发，而不是从报价单出发；再把生产、深加工、检测与出口串成一条链。",
      items: [
        { n: "01", title: "说明应用场景", body: "基材、线速、热封方式、印刷工艺、目标市场与合规要求。一份简短技术说明即可。" },
        { n: "02", title: "匹配等级并寄样", body: "给出厚度、电晕处理、摩擦系数与卷径卷长的明确建议，附样品与技术数据表。" },
        { n: "03", title: "试用、确认、复购", body: "确认后锁定规格，后续每一批都按同一基准生产与检验。" },
        { n: "04", title: "送达工厂", body: "分切、包装、打托、证书与单证由同一团队完成，支持多品类拼柜。" },
      ],
    },
    catalog: {
      label: "产品范围",
      title: "十一大事业部，一条供应链。",
      lead: "从 BOPP、BOPET 基膜到涂布、镀铝及深加工制品，并配套碳带、标签与包装机械。",
      cta: "查看全部产品",
    },
    capability: {
      label: "服务能力",
      title: "不只是贸易公司。",
      lead: "生产、深加工、质量管控与出口物流统一协调，确保您确认的规格就是到货的规格。",
      items: [
        { title: "生产与深加工", body: "共挤、镀铝、涂布、印刷与精密分切，在同一供应链体系内协同完成。", points: ["8–500 µm 厚度范围", "定制幅宽与卷长", "单面 / 双面处理"] },
        { title: "质量与合规", body: "逐批检验并留样，为受监管市场提供完整文件。", points: ["批次检测报告", "FDA / EU 食品接触级", "MSDS 与 TDS 备索"] },
        { title: "全球物流", body: "多品类拼柜，船开前备齐出口单证。", points: ["出口 80+ 国家", "多币种结算", "整柜 / 拼箱"] },
      ],
      cta: "了解我们的工作方式",
    },
    cases: {
      label: "精选案例",
      title: "选对规格，改变的不只是成本。",
      lead: "来自食品、标签、电子电气与工业包装领域的代表性项目，详情可索取。",
      items: [
        { region: "欧洲", sector: "食品包装", title: "休闲食品复合厂高透明复合膜", body: "以单一 BOPP 等级替代三家供应商结构，按其凹印线与热封窗口定制。", result: "减少停机 · 每批一套证书" },
        { region: "中东", sector: "标签与碳带", title: "热转印碳带基膜长期供货", body: "供应厚度控制严格的 4.5 µm BOPET 基膜，配套碳带与分切服务。", result: "复购批次得率稳定" },
        { region: "南美", sector: "工业包装", title: "薄膜、胶带与设备拼柜项目", body: "将 BOPP 膜、胶带母卷与分切机合并为一票货，单证统一。", result: "一张订单 · 一次到货" },
      ],
      cta: "查看更多案例",
    },
    about: {
      label: "关于我们",
      title: "扎根合肥的薄膜专业团队，服务全球。",
      paragraphs: [
        "东渐集团成立于 2011 年，从专业包装薄膜出口商起步，如今统筹软包装薄膜、薄膜电子材料、胶粘制品与包装机械的生产、深加工与国际分销。",
        "我们既是工程师，也是外贸人：回复您询盘的人，看得懂技术数据表，聊得了热封曲线，也能安排装柜。这正是客户跨品类、跨年份持续合作的原因。",
      ],
      facts: [
        { value: "2011", label: "成立年份" },
        { value: "80+", label: "出口市场" },
        { value: "11", label: "产品事业部" },
        { value: "4", label: "服务语种" },
      ],
      cta: "了解我们的故事",
    },
    faq: {
      label: "询价之前",
      title: "采购最常问我们的几个问题。",
      lead: "起订量、样品、交期、认证与付款方式，直接说清楚。",
      cta: "查看全部常见问题",
    },
    finalCta: {
      title: "把规格发过来，我们回一份方案。",
      body: "告知薄膜类型、厚度、幅宽与用途，24 小时内您将收到匹配等级、技术数据表与明确报价。",
      primary: "立即询价",
      secondary: "邮件联系技术团队",
      note: "可寄样 · 无义务 · 中文 / English / Français / Русский / Español",
    },
  },
};

/* ------------------------------------------------------------------ */
/* 4 + 5 + 6 — Case studies, capabilities (service page), about story  */
/* ------------------------------------------------------------------ */

export const ABOUT: Record<Lang, { metaTitle: string; metaDescription: string; eyebrow: string; h1: string; lead: string; story: { year: string; title: string; body: string }[]; values: { title: string; body: string }[]; human: string[]; ctaTitle: string; ctaBody: string }> = {
  en: {
    metaTitle: "About AEC GROUP | Film specialists since 2011",
    metaDescription: "From a Hefei-based packaging film exporter to an integrated flexible packaging supply partner serving 80+ countries. Our story, capabilities and the people behind your orders.",
    eyebrow: "About us",
    h1: "We built this company around a simple complaint.",
    lead: "“The film passed inspection, but it didn't run on our line.” We heard it often enough to organise the whole business around preventing it.",
    story: [
      { year: "2011", title: "Started with one product", body: "AEC GROUP was founded in Hefei as a specialised exporter of BOPP packaging film, working with a small group of converters in Asia and Europe." },
      { year: "2014–2018", title: "Added deep processing", body: "Metallizing, coating, printing and slitting were brought into the same coordinated chain, so customers could specify a finished roll instead of a base film plus three subcontractors." },
      { year: "2019–2022", title: "Expanded the catalogue", body: "BOPET electronic films, thermal transfer ribbons, labels, adhesive products, paper and packaging machinery were added as customers asked to consolidate suppliers." },
      { year: "Today", title: "80+ countries, one accountable team", body: "Eleven product divisions, multilingual technical support and lot-level quality records — still with the same principle: recommend for the process, not for the invoice." },
    ],
    values: [
      { title: "Specify for the process", body: "We ask about your line speed, sealing window and print method before quoting. A cheaper film that stops production is never cheaper." },
      { title: "Own the whole chain", body: "One team coordinates production, converting, inspection and shipping. If something is wrong, there is exactly one call to make." },
      { title: "Repeatable, not just good once", body: "Approved specifications are locked and every repeat lot is checked against them, with retained samples and test reports." },
      { title: "Say the hard part early", body: "If a grade is wrong for your application or a lead time is unrealistic, you hear it before the order, not after." },
    ],
    human: [
      "The engineer who reads your enquiry is the person who will discuss the datasheet with you — not a ticket queue.",
      "We support technical consultation in English, French, Russian and Spanish, plus 中文, and settle in multiple currencies.",
      "Samples are kept on file for repeat orders, so your third container matches your first.",
    ],
    ctaTitle: "Let's talk about your line, not just your price.",
    ctaBody: "Send a short brief on your application and we'll come back with a grade recommendation, a datasheet and a quotation within 24 hours.",
  },
  zh: {
    metaTitle: "关于我们 | 安徽东渐 AEC GROUP",
    metaDescription: "从合肥的包装薄膜出口商，成长为服务 80+ 国家的软包装供应链伙伴。了解我们的发展历程、服务能力与团队。",
    eyebrow: "关于我们",
    h1: "公司是从一句抱怨里长出来的。",
    lead: "「膜检没问题，可就是上不了机。」这句话听得多了，我们就把整个业务流程改成了围着它转。",
    story: [
      { year: "2011", title: "从一个品类起步", body: "东渐成立于合肥，专注 BOPP 包装薄膜出口，最初服务于亚洲与欧洲的少数复合厂。" },
      { year: "2014–2018", title: "补齐深加工", body: "把镀铝、涂布、印刷与分切纳入同一协调体系，客户只需指定成品卷，不必再对接三家外协厂。" },
      { year: "2019–2022", title: "扩展产品版图", body: "应客户整合供应商的需求，陆续加入 BOPET 电子膜、热转印碳带、标签、胶粘制品、纸品与包装机械。" },
      { year: "今天", title: "80+ 国家，一个责任团队", body: "十一大产品事业部、多语种技术支持、逐批质量留档，原则始终没变：按工艺选材，不按发票选材。" },
    ],
    values: [
      { title: "按工艺定规格", body: "报价前先问线速、热封窗口与印刷方式。让产线停下来的便宜膜，从来都不便宜。" },
      { title: "整条链自己兜", body: "生产、深加工、检验、发运由同一团队协调。出了问题，您只需要打一个电话。" },
      { title: "不只是好一次", body: "确认后锁定规格，后续每批复购都对标检验，留样与检测报告同步归档。" },
      { title: "难听的话先说", body: "某个等级不适合、交期做不到，会在下单前告诉您，而不是之后。" },
    ],
    human: [
      "读您询盘的工程师，就是之后和您对技术数据表的人，不是工单队列。",
      "支持中、英、法、俄、西语技术咨询，多币种结算。",
      "复购订单留存样品，确保第三柜和第一柜一致。",
    ],
    ctaTitle: "聊聊您的产线，而不只是价格。",
    ctaBody: "发一份简短应用说明，我们 24 小时内回复等级建议、技术数据表与报价。",
  },
};

export const CAPABILITIES: Record<Lang, { metaTitle: string; metaDescription: string; eyebrow: string; h1: string; lead: string; services: { n: string; title: string; body: string; includes: string[] }[]; process: { n: string; title: string; body: string }[]; ctaTitle: string; ctaBody: string }> = {
  en: {
    metaTitle: "Capabilities | From film specification to delivered container",
    metaDescription: "Manufacturing coordination, precision slitting, metallizing and coating, lot-level QA, compliance documentation and export logistics — what AEC GROUP handles for every order.",
    eyebrow: "Capabilities",
    h1: "Everything between a resin and a running production line.",
    lead: "These are the services included in a typical supply programme. Pick what you need — most customers use three or four of them together.",
    services: [
      { n: "01", title: "Grade selection & specification", body: "We translate your converting conditions into a concrete film structure: polymer, thickness, treatment, COF, seal threshold and roll geometry.", includes: ["Application review", "Written grade recommendation", "Technical datasheet (TDS)", "Sample dispatch"] },
      { n: "02", title: "Manufacturing & secondary processing", body: "Co-extrusion, vacuum metallizing, PVDC / acrylic / EVA coating, rotogravure printing and precision slitting coordinated under one specification.", includes: ["8–500 µm films", "Custom widths & roll lengths", "Matte, glossy, pearlized, metallized", "Single & double-side treatment"] },
      { n: "03", title: "Quality control & compliance", body: "Each lot is inspected against the approved reference, with records retained for traceability across repeat orders.", includes: ["Thickness / COF / haze / tension checks", "Lot test report & retained sample", "FDA / EU food-contact grades", "MSDS, COA and certificates on request"] },
      { n: "04", title: "Consolidation & export", body: "Mixed containers across film, tape, ribbon and machinery divisions, with documents prepared before the vessel sails.", includes: ["FCL / LCL and mixed loads", "Export packing & palletising", "Certificate of origin, COA, packing list", "Multi-currency settlement"] },
    ],
    process: [
      { n: "1", title: "Brief", body: "Application, target market, line conditions and compliance needs." },
      { n: "2", title: "Recommend", body: "Matched grade, datasheet and quotation within 24 hours." },
      { n: "3", title: "Sample & trial", body: "Physical samples, then a supervised production trial." },
      { n: "4", title: "Lock & repeat", body: "Specification frozen; every lot checked against it." },
      { n: "5", title: "Ship", body: "Consolidation, documents and delivery to your warehouse." },
    ],
    ctaTitle: "Not sure which service you need?",
    ctaBody: "Describe the outcome you want — we'll tell you which steps apply and which you can skip.",
  },
  zh: {
    metaTitle: "服务能力 | 从薄膜选型到装柜交付",
    metaDescription: "生产协调、精密分切、镀铝涂布、逐批质检、合规文件与出口物流 —— 了解东渐为每张订单承担的工作。",
    eyebrow: "服务能力",
    h1: "从树脂到稳定开机的产线，中间的事我们管。",
    lead: "以下是常规供货项目包含的服务。按需选用即可，多数客户会同时用到其中三到四项。",
    services: [
      { n: "01", title: "等级选型与规格制定", body: "把您的加工条件翻译成明确的薄膜结构：材质、厚度、处理面、摩擦系数、热封起点与卷型。", includes: ["应用场景评估", "书面等级建议", "技术数据表 TDS", "样品寄送"] },
      { n: "02", title: "生产与深加工", body: "共挤、真空镀铝、PVDC / 丙烯酸 / EVA 涂布、凹版印刷与精密分切，按同一规格协同。", includes: ["8–500 µm 薄膜", "定制幅宽与卷长", "消光 / 亮光 / 珠光 / 镀铝", "单面与双面处理"] },
      { n: "03", title: "质量管控与合规", body: "每批按已确认基准检验，留档可追溯，复购订单保持一致。", includes: ["厚度 / 摩擦系数 / 雾度 / 张力检测", "批次报告与留样", "FDA / EU 食品接触级", "MSDS、COA 与证书备索"] },
      { n: "04", title: "拼柜与出口", body: "薄膜、胶带、碳带与设备跨事业部拼柜，开船前备齐单证。", includes: ["整柜 / 拼箱 / 混装", "出口包装与打托", "产地证、COA、装箱单", "多币种结算"] },
    ],
    process: [
      { n: "1", title: "提需求", body: "用途、目标市场、产线条件与合规要求。" },
      { n: "2", title: "给方案", body: "24 小时内回复等级、数据表与报价。" },
      { n: "3", title: "寄样试用", body: "先寄实物样品，再跟进上机试产。" },
      { n: "4", title: "锁定复购", body: "规格冻结，每批对标检验。" },
      { n: "5", title: "发运", body: "拼柜、单证、送达仓库。" },
    ],
    ctaTitle: "不确定需要哪些服务？",
    ctaBody: "说说您想达成的结果，我们告诉您哪些步骤必须做、哪些可以省。",
  },
};

export const CASES: Record<Lang, { metaTitle: string; metaDescription: string; eyebrow: string; h1: string; lead: string; items: { region: string; sector: string; title: string; challenge: string; approach: string; outcome: string }[]; note: string; ctaTitle: string; ctaBody: string }> = {
  en: {
    metaTitle: "Case Studies | Film specification in practice | AEC GROUP",
    metaDescription: "Representative projects across food packaging, thermal transfer labels and industrial consolidation — the problem, the specification decision and the result.",
    eyebrow: "Selected work",
    h1: "Three problems, three specifications.",
    lead: "Each project started with a line that wasn't running the way it should. Here is what changed. Customer names are withheld by agreement; technical detail is available on request.",
    items: [
      { region: "Europe", sector: "Food packaging / BOPP", title: "Snack converter, high-speed lamination", challenge: "Film from three mills caused frequent tension re-adjustment and inconsistent seal strength on a high-speed vertical form-fill line.", approach: "Consolidated to a single co-extruded BOPP grade with a defined corona level, controlled COF and a narrowed thickness tolerance; roll geometry matched to the unwind.", outcome: "Stable running at line speed, one certificate set per lot, and a locked specification used for every repeat order." },
      { region: "Middle East", sector: "Labels / BOPET base film", title: "Thermal transfer ribbon programme", challenge: "4.5 µm base film thickness variation was changing coating yield between batches for a ribbon converter.", approach: "Specified a tight-tolerance BOPET base film, added in-house slitting to the customer's widths and supplied matching thermal transfer ribbons.", outcome: "Consistent coating yield across repeat orders and a single point of accountability for film and ribbon." },
      { region: "South America", sector: "Industrial packaging / consolidation", title: "First order across four divisions", challenge: "A distributor needed BOPP film, tape jumbo rolls, labels and a slitting machine, but could not justify four separate shipments.", approach: "Built a mixed container with unified packing, one invoice and a complete document set prepared before loading.", outcome: "One arrival, one customs file, and a repeat programme covering all four product divisions." },
    ],
    note: "These are representative engagements. We can share test data, grade references and a reference contact for comparable applications on request.",
    ctaTitle: "Have a similar problem?",
    ctaBody: "Describe the line and the symptom. We'll tell you whether the fix is a different grade, a different roll, or a different process setting.",
  },
  zh: {
    metaTitle: "合作案例 | 薄膜选型的实际应用 | 安徽东渐",
    metaDescription: "食品包装、热转印标签与工业包装拼柜的代表性项目：问题、规格决策与结果。",
    eyebrow: "精选案例",
    h1: "三个问题，三份规格。",
    lead: "每个项目都从一条「不太对劲」的产线开始。客户名称依约定隐去，技术细节可索取。",
    items: [
      { region: "欧洲", sector: "食品包装 / BOPP", title: "休闲食品复合厂高速复合线", challenge: "三家基膜厂供货导致张力频繁重调，高速立式包装线上热封强度不稳定。", approach: "整合为单一共挤 BOPP 等级，明确电晕值、控制摩擦系数、收窄厚度公差，并按放卷条件匹配卷型。", outcome: "线速稳定运行，每批一套证书，复购沿用锁定规格。" },
      { region: "中东", sector: "标签 / BOPET 基膜", title: "热转印碳带基膜长期项目", challenge: "4.5 µm 基膜厚度波动，导致碳带涂布得率在批次间起伏。", approach: "指定严公差 BOPET 基膜，按客户幅宽配套分切，并供应匹配的热转印碳带。", outcome: "复购批次涂布得率稳定，基膜与碳带由同一责任方负责。" },
      { region: "南美", sector: "工业包装 / 拼柜", title: "四事业部首单", challenge: "经销商需要 BOPP 膜、胶带母卷、标签与分切机，但四票货不划算。", approach: "组合混装柜，统一包装、一张发票，装柜前备齐全套单证。", outcome: "一次到货、一套报关文件，并形成覆盖四个事业部的复购计划。" },
    ],
    note: "以上为代表性项目。可按需提供检测数据、等级参照及同类应用的推荐证明人。",
    ctaTitle: "遇到类似问题？",
    ctaBody: "说明产线与症状，我们判断该换等级、换卷型，还是调工艺参数。",
  },
};

/* ------------------------------------------------------------------ */
/* 8 — FAQ + footer                                                    */
/* ------------------------------------------------------------------ */

export const FAQS: Record<Lang, { q: string; a: string }[]> = {
  en: [
    { q: "What is your minimum order quantity?", a: "It depends on the grade. Stocked standard films can start from a single pallet or one roll for trial; custom thicknesses, widths and coated structures are quoted per production run. Tell us the specification and target quantity and we'll give you the exact MOQ with the quotation." },
    { q: "Can I get samples before ordering?", a: "Yes. We send sample rolls or sheets for evaluation together with the technical datasheet. Samples are free for standard grades; courier freight is normally collected at your side and deducted from the first order." },
    { q: "How fast is a quotation?", a: "Within 24 hours on working days for a complete specification. If the brief needs clarification, we'll come back with targeted questions rather than a generic price." },
    { q: "What are typical lead times?", a: "Stocked grades are usually ready in 7–10 days; made-to-order slitting, coating or metallizing generally takes 15–25 days depending on the run schedule. Sea freight is quoted separately by destination." },
    { q: "Which certifications and documents do you provide?", a: "Lot test reports / COA, MSDS, technical datasheets, packing list, certificate of origin and other standard export documents. FDA and EU food-contact compliant grades are available for direct food packaging; tell us your market so we match the right declaration." },
    { q: "Can you slit to our exact width and roll length?", a: "Yes — custom width, roll length, core size and winding direction are part of the specification we lock at approval. Send your unwind constraints if the line is sensitive." },
    { q: "Do you consolidate different products in one container?", a: "Yes. This is one of the main reasons customers work with us: film, tape jumbo rolls, ribbons, labels and even machinery can ship together with one invoice and one document set." },
    { q: "Which payment terms and currencies do you accept?", a: "T/T is standard, with L/C available for established programmes. We settle in USD, EUR and CNY; other arrangements can be discussed for long-term contracts." },
    { q: "What if a lot doesn't match the approved specification?", a: "Every lot is inspected against the frozen specification and retained samples are kept on file. If a deviation is confirmed, we replace or credit the affected material — the discussion starts from the test record, not from opinion." },
    { q: "Do you work with distributors as well as end users?", a: "Both. We support converters, printers, brand owners and regional distributors, including mixed-product programmes and market-specific documentation." },
  ],
  zh: [
    { q: "最小起订量是多少？", a: "视等级而定。常规现货膜可从一托或一卷试单起；定制厚度、幅宽与涂布结构按生产批次报价。提供规格与目标数量后，我们会在报价中写明准确 MOQ。" },
    { q: "下单前可以寄样吗？", a: "可以。我们会随技术数据表寄送样品卷或样品片。常规等级样品免费，快递费通常由贵方到付，并在首单中抵扣。" },
    { q: "报价需要多久？", a: "规格完整的情况下，工作日 24 小时内回复。若信息不足，我们会先提出针对性问题，而不是给一个笼统价格。" },
    { q: "常规交期多久？", a: "现货等级一般 7–10 天；定制分切、涂布或镀铝通常 15–25 天，视排产而定。海运费按目的港单独报。" },
    { q: "能提供哪些认证与单证？", a: "批次检测报告 / COA、MSDS、技术数据表、装箱单、产地证及其他常规出口单证。直接食品接触可提供 FDA / EU 合规等级，请说明目标市场以便匹配声明。" },
    { q: "可以按指定幅宽与卷长分切吗？", a: "可以。幅宽、卷长、卷芯尺寸与收卷方向都会在确认时写入锁定规格；若产线对放卷敏感，请一并提供限制条件。" },
    { q: "不同产品能拼一个柜吗？", a: "可以，这也是客户选择我们的主要原因之一：薄膜、胶带母卷、碳带、标签，甚至设备，都能一票发运、一张发票、一套单证。" },
    { q: "支持哪些付款方式与币种？", a: "常规为 T/T，长期合作可开 L/C；支持 USD、EUR、CNY 结算，长期合同可另议。" },
    { q: "批次与确认规格不符怎么办？", a: "每批按冻结规格检验并留存样品。若确认偏差，我们更换或抵扣受影响材料 —— 依据检测记录沟通，不靠主观判断。" },
    { q: "经销商和终端客户都合作吗？", a: "都合作。服务复合厂、印刷厂、品牌方与区域经销商，支持多品类组合供货及面向特定市场的单证。" },
  ],
};

export const FOOTER: Record<Lang, { tagline: string; navTitle: string; productTitle: string; contactTitle: string; ctaTitle: string; ctaBody: string; ctaButton: string; legal: string }> = {
  en: {
    tagline: "Flexible packaging films, converted products and machinery — specified for your process, delivered worldwide from Hefei, China.",
    navTitle: "Company",
    productTitle: "Products",
    contactTitle: "Get in touch",
    ctaTitle: "Have a specification in mind?",
    ctaBody: "Send it over. A technical answer and a firm quotation within 24 hours.",
    ctaButton: "Request a quotation",
    legal: "All rights reserved. Product names and specifications are indicative; final values are confirmed in the technical datasheet.",
  },
  zh: {
    tagline: "软包装薄膜、深加工制品与包装机械 —— 按您的工艺定制规格，从中国合肥发往全球。",
    navTitle: "公司",
    productTitle: "产品",
    contactTitle: "联系方式",
    ctaTitle: "已有明确规格？",
    ctaBody: "发给我们，24 小时内回复技术建议与确定报价。",
    ctaButton: "立即询价",
    legal: "版权所有。产品名称与参数为示意，最终数值以技术数据表为准。",
  },
};
