/**
 * Copy for the remaining inner pages. Kept separate from site.ts so the
 * homepage copy file stays reviewable, but still bilingual and centralised.
 */
import type { Lang } from "./site";

export const CONTACT: Record<Lang, {
  metaTitle: string; metaDescription: string; eyebrow: string; h1: string; lead: string;
  introTitle: string; intro: string;
  expectations: string[];
  ctaTitle: string; ctaBody: string;
}> = {
  en: {
    metaTitle: "Contact AEC GROUP | Request a quotation or sample",
    metaDescription: "Send your film specification or application brief to AEC GROUP in Hefei, China. Technical answer, datasheet and firm quotation within 24 working hours.",
    eyebrow: "Contact",
    h1: "Send the spec. Get an answer, not an auto-reply.",
    lead: "Tell us what the film has to do on your line. An engineer reads it, recommends a grade, and comes back with a datasheet and a firm quotation within 24 working hours.",
    introTitle: "What happens after you write",
    intro: "We do not run a ticket queue. Your enquiry goes to the person who will discuss thickness, treatment, COF, sealing window and roll geometry with you — and who stays on the order after it is placed.",
    expectations: [
      "A targeted clarification question if the brief is incomplete — never a generic price list.",
      "A written grade recommendation and technical datasheet with the quotation.",
      "Physical samples for standard grades, with freight deducted from the first order.",
      "One accountable contact from enquiry through repeat shipments.",
    ],
    ctaTitle: "Prefer a direct conversation?",
    ctaBody: "Call or WhatsApp during China business hours. Technical questions are welcome — you will not be transferred to a script.",
  },
  zh: {
    metaTitle: "联系我们 | 询价与索样 | 安徽东渐 AEC GROUP",
    metaDescription: "把薄膜规格或应用说明发给位于中国合肥的东渐团队。工作日 24 小时内回复技术建议、数据表与确定报价。",
    eyebrow: "联系我们",
    h1: "把规格发来，收到的是答复，不是自动回复。",
    lead: "告诉我们这卷膜在您的产线上要完成什么。工程师读需求、推荐等级，并在 24 个工作小时内附上技术数据表与确定报价。",
    introTitle: "发出询盘之后",
    intro: "我们没有工单队列。读您询盘的人，就是之后和您讨论厚度、处理面、摩擦系数、热封窗口与卷型的人，下单后也由他跟到底。",
    expectations: [
      "信息不足时只提针对性问题，不甩一份通用报价单。",
      "报价同时附书面等级建议与技术数据表。",
      "常规等级可寄实物样品，快递费在首单中抵扣。",
      "从询盘到复购发运，始终由同一人负责。",
    ],
    ctaTitle: "想直接沟通？",
    ctaBody: "中国工作时间可电话或 WhatsApp 联系。技术问题直接问，不会被转给话术脚本。",
  },
};

export const NEWS: Record<Lang, {
  metaTitle: string; metaDescription: string; eyebrow: string; h1: string; lead: string;
  items: { date: string; tag: string; title: string; body: string }[];
}> = {
  en: {
    metaTitle: "Technical Notes | Film selection insights | AEC GROUP",
    metaDescription: "Practical notes on BOPP and BOPET film selection, thickness and grammage conversion, lamination and export documentation for packaging buyers.",
    eyebrow: "Technical notes",
    h1: "Notes from the specification desk.",
    lead: "Short, practical answers to the questions our engineers get most often. No trend pieces — just things that change an order.",
    items: [
      {
        date: "2026-11-10", tag: "Specification",
        title: "Thickness, density and grammage: the conversion buyers get wrong",
        body: "Gram weight (g/m²) = thickness (µm) × density (g/cm³). A 40 µm BOPP film at 0.90–0.92 g/cm³ is about 36–36.8 g/m². The number is a yield estimate, not a purchase specification: thickness tolerance, corona treatment and slip additives all shift real roll yield. Always confirm with a cut-and-weigh sample from the actual lot.",
      },
      {
        date: "2026-10-28", tag: "Application",
        title: "What “12 micron cold laminating film” actually means",
        body: "The phrase covers two different products: a thin BOPP thermal/soft lamination film used for print protection, and a pressure-sensitive cold laminating film with adhesive. At 12 µm the base film is very thin, so it suits labels, graphic overlays and print finishing — not structural food packaging. Ask for the construction, not just the thickness.",
      },
      {
        date: "2026-10-12", tag: "Quality",
        title: "Why a passing inspection still stops a production line",
        body: "A film can meet every number on a COA and still cause tension re-adjustment on a high-speed line. Thickness distribution across the web, COF drift between lots and roll geometry at the unwind are rarely on the certificate. Specify the converting conditions, not only the material values.",
      },
      {
        date: "2026-09-25", tag: "Export",
        title: "Documents to request before the container sails",
        body: "For a first shipment, agree the set up front: lot test report / COA, MSDS, technical datasheet, packing list, certificate of origin and — where direct food contact is involved — the correct FDA or EU declaration for your market. Mixed containers need one coherent document set, not one per supplier.",
      },
    ],
  },
  zh: {
    metaTitle: "技术笔记 | 薄膜选型与出口实务 | 安徽东渐",
    metaDescription: "关于 BOPP / BOPET 薄膜选型、厚度与克重换算、复合工艺及出口单证的实务笔记，写给采购与工程人员。",
    eyebrow: "技术笔记",
    h1: "来自选型台的笔记。",
    lead: "把工程师最常被问到的问题写成短答案。不追热点，只写会改变订单的事。",
    items: [
      {
        date: "2026-11-10", tag: "规格换算",
        title: "厚度、密度与克重：采购最容易算错的一步",
        body: "克重（g/m²）= 厚度（µm）× 密度（g/cm³）。40 µm、密度 0.90–0.92 的 BOPP 膜约为 36–36.8 g/m²。这个数只是出率估算，不是采购规格：厚度公差、电晕处理与爽滑剂都会影响实际出卷率。请以该批次切样称重为准。",
      },
      {
        date: "2026-10-28", tag: "应用辨析",
        title: "「12 微米冷裱膜」到底指哪一种",
        body: "这个说法对应两类不同产品：用于印刷保护的薄型 BOPP 预涂/即涂膜，以及带胶的压敏冷裱膜。12 µm 基膜很薄，适合标签、画面保护与印后覆膜，不适合作为结构性食品包装。询价时请写明结构，而不只写厚度。",
      },
      {
        date: "2026-10-12", tag: "质量管理",
        title: "为什么检验合格，产线还是开不起来",
        body: "COA 上每个数字都合格，高速线仍可能频繁调张力。横向厚度分布、批次间摩擦系数漂移、放卷端卷型，通常都不写在证书上。规格里应同时写明加工条件，而不只是材料指标。",
      },
      {
        date: "2026-09-25", tag: "出口实务",
        title: "开船前就该确认的单证清单",
        body: "首单建议先把单证范围谈定：批次检测报告 / COA、MSDS、技术数据表、装箱单、产地证；涉及直接食品接触时，还要按目标市场提供对应的 FDA 或 EU 声明。拼柜尤其需要一套统一单证，而不是每家供应商各出一套。",
      },
    ],
  },
};
