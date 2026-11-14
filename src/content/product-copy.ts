// Product-page editorial layer.
//
// The source catalogue (old.boppfilmsale.com) contains product names, model
// references and photos, but almost no technical prose. Rather than invent
// supplier data, this module supplies honest, division-level application
// knowledge and clearly flags every value that must be confirmed on the
// datasheet. Content is selected deterministically per product id, so the
// 465 static pages are not near-duplicates of each other.

import type { CatalogProduct } from "@/data/catalog";
import { CATEGORIES } from "@/data/categories";
import type { Lang } from "./site";

export interface CopyItem {
  t: string;
  d: string;
}
export interface CopySpec {
  label: string;
  value: string;
}
export interface CopyFaq {
  q: string;
  a: string;
}
export interface ProductCopy {
  intro: string[];
  highlights: CopyItem[];
  applications: CopyItem[];
  specs: CopySpec[];
  faqs: CopyFaq[];
  checklist: string[];
  noteEn: string;
}

type Pair = { en: string; zh: string };
type Item = { t: Pair; d: Pair };
type Spec = { label: Pair; value: Pair };
type Faq = { q: Pair; a: Pair };

interface DivContent {
  intro: Pair[];
  highlights: Item[];
  applications: Item[];
  specs: Spec[];
  faqs: Faq[];
}

const P = (en: string, zh: string): Pair => ({ en, zh });
const I = (te: string, tz: string, de: string, dz: string): Item => ({ t: P(te, tz), d: P(de, dz) });
const S = (le: string, lz: string, ve: string, vz: string): Spec => ({ label: P(le, lz), value: P(ve, vz) });
const F = (qe: string, qz: string, ae: string, az: string): Faq => ({ q: P(qe, qz), a: P(ae, az) });

/* ------------------------------------------------------------------ */
/* Shared, service-level statements — true for every grade we supply.  */
/* ------------------------------------------------------------------ */
const SHARED_HIGHLIGHTS: Item[] = [
  I(
    "Samples before commitment",
    "先寄样再下单",
    "Trial reels or sample sheets can be dispatched for standard grades so you can run a line trial before placing a production order.",
    "常规等级可寄送试样卷或样片，方便您在下单前先上机试产。",
  ),
  I(
    "Documents that clear customs",
    "随货单证齐全",
    "TDS, lot COA, MSDS, packing list and export documents are prepared per shipment; food-contact declarations are available where the grade applies.",
    "每批可提供 TDS、批次 COA、MSDS、装箱单与出口单证；适用等级可提供食品接触声明。",
  ),
  I(
    "Slit to your unwind",
    "按机台分切",
    "Roll width, roll length, roll OD and core ID are set against your unwinding and splicing conditions rather than a fixed stock list.",
    "幅宽、卷长、卷径与卷芯按您的放卷、接卷条件确定，而不是只给固定库存规格。",
  ),
  I(
    "One engineer, one specification",
    "一个工程师跟到底",
    "A single technical contact confirms the construction, follows the trial and stays on the order — no hand-off between sales and plant.",
    "由同一名技术联系人确认结构、跟进试机并负责订单，不在销售与工厂之间反复转手。",
  ),
];

const SHARED_SPECS: Spec[] = [
  S("Core ID", "卷芯内径", '3" (76 mm) or 6" (152 mm), confirmed at order', '3"（76 mm）或 6"（152 mm），下单时确认'),
  S("Roll build", "卷径与卷长", "Set to your unwind tension and shipping limits", "按放卷张力与运输限制确定"),
  S("Packing", "包装方式", "Individual reel wrap, export carton, palletised", "单卷包装、出口纸箱、托盘加固"),
  S("Documentation", "随货文件", "TDS · lot COA · MSDS · packing list · export docs", "TDS · 批次 COA · MSDS · 装箱单 · 出口单证"),
  S("MOQ & lead time", "起订量与交期", "Confirmed in the quotation; depends on grade and width", "报价时确认，取决于等级与幅宽"),
];

const SHARED_FAQS: Faq[] = [
  F(
    "Can you slit to an exact width?",
    "可以按指定幅宽分切吗？",
    "Yes. Give us the target width, tolerance, maximum roll OD and core ID, and we will confirm what the slitting setup can hold before quoting.",
    "可以。请提供目标幅宽、公差、最大卷径与卷芯内径，我们确认分切条件后报价。",
  ),
  F(
    "Do you supply samples?",
    "可以提供样品吗？",
    "Sample sheets and trial reels are available for standard grades. Tell us the application and the line you run so the sample is representative.",
    "常规等级可提供样片或试样卷。请说明用途与机台，以便寄送有代表性的样品。",
  ),
  F(
    "What do you need to quote accurately?",
    "准确报价需要提供什么？",
    "Thickness, width, roll length, quantity, application, printing or laminating process, destination port and target delivery date. A current datasheet helps us match an existing grade.",
    "厚度、幅宽、卷长、数量、用途、印刷或复合工艺、目的港与交期。若有现用等级的数据表，可帮助我们配对。",
  ),
];

const CHECKLIST: Record<Lang, string[]> = {
  en: [
    "Target thickness and tolerance",
    "Slit width and roll length",
    "Core ID and maximum roll OD",
    "Printing, laminating or sealing process",
    "End use and any food-contact requirement",
    "Monthly or per-order quantity",
    "Destination port and required delivery date",
  ],
  zh: [
    "目标厚度与公差",
    "分切幅宽与卷长",
    "卷芯内径与最大卷径",
    "印刷、复合或热封工艺",
    "最终用途及是否有食品接触要求",
    "月用量或单次订量",
    "目的港与要求交期",
  ],
};

/* ------------------------------------------------------------------ */
/* Division knowledge                                                  */
/* ------------------------------------------------------------------ */
const DIV: Record<string, DivContent> = {
  "bopp-film": {
    intro: [
      P(
        "Biaxially oriented polypropylene is the workhorse substrate of flexible packaging: stiff, clear, printable and economical at line speed. {name} is a grade in our BOPP Film division, supplied as roll stock for printing, lamination, overwrapping, bag making or tape coating.",
        "双向拉伸聚丙烯（BOPP）是软包装的基础基材：挺度高、透明度好、适印且在高速机台上经济。{name} 属于 BOPP 薄膜事业部，以卷材形式供印刷、复合、外包、制袋或涂布胶带使用。",
      ),
      P(
        "Plain BOPP does not heat-seal on its own. Depending on your line, the construction is a co-extruded sealing layer, a PVDC or acrylic coating, or a laminate with PE / CPP as the sealant web. We confirm that structure, the corona treatment level and the roll geometry with you before issuing a firm quotation.",
        "普通 BOPP 本身不具热封性。根据产线不同，结构可以是共挤热封层、PVDC 或丙烯酸涂布，或与 PE / CPP 热封层复合。报价前我们会与您确认结构、电晕处理值与卷装参数。",
      ),
    ],
    highlights: [
      I("Dimensional stability", "尺寸稳定", "Orientation keeps shrinkage low, so print registration stays put on high-speed gravure and flexo presses.", "拉伸取向使收缩率低，高速凹印、柔印时套印稳定。"),
      I("Optical performance", "外观表现", "High gloss and low haze give strong shelf impact; matte and pearlised versions give a deliberate premium finish.", "高光泽、低雾度提升货架效果；消光与珠光等级可做哑面质感。"),
      I("Print ready", "适印处理", "Corona treatment on one or both sides is available, with the dyne level agreed and checked per order.", "可单面或双面电晕处理，达因值按订单约定并逐批检测。"),
      I("Moisture barrier", "阻湿性能", "BOPP naturally resists water vapour; metallising or PVDC coating raises the barrier for longer shelf life.", "BOPP 本身阻湿；镀铝或 PVDC 涂布可进一步提高阻隔、延长货架期。"),
      I("Gauge consistency", "厚度均匀", "Thickness is measured across the web and recorded on the lot COA, which matters for yield and sealing.", "沿幅宽检测厚度并记录在批次 COA，直接影响出材率与封合。"),
      I("Yield per kilogram", "每公斤出材", "Oriented film gives more square metres per kilogram than cast film of the same gauge — a real cost lever.", "同等厚度下，取向膜每公斤出材面积高于流延膜，是实际成本杠杆。"),
      I("Seal window", "热封窗口", "Heat-sealable grades offer a defined seal initiation temperature and hot-tack range for VFFS lines.", "热封等级有明确的起封温度与热粘区间，适配立式包装机。"),
      I("Slip and anti-block", "爽滑与防粘", "Coefficient of friction is tuned for vertical form-fill-seal, overwrapping and magazine stacking.", "摩擦系数可按立式包装、外裹包与高速堆垛调整。"),
    ],
    applications: [
      I("Snack and confectionery", "休闲食品与糖果", "Pillow bags, fin-seal packs and twist-wrap for crisps, biscuits and sweets.", "薯片、饼干、糖果的枕式袋、中封袋与扭结包装。"),
      I("Laminated pouches", "复合袋", "BOPP print web laminated to PE or CPP as the sealant layer.", "BOPP 作印刷层，与 PE / CPP 热封层复合。"),
      I("Labels and overwraps", "标签与外裹", "Wrap-around labels, cigarette overwrapping and gift-box films with tear tape.", "环绕标签、香烟外裹膜、带拆封拉线的礼盒膜。"),
      I("Tape base film", "胶带基材", "Corona-treated BOPP as the backing for acrylic or hot-melt packing tape.", "电晕处理后作丙烯酸或热熔胶封箱带基材。"),
      I("Print lamination", "印后覆膜", "Book covers, magazine covers and premium cartons after thermal or wet lamination.", "书刊封面、杂志与精品纸盒的即涂或预涂覆膜。"),
      I("Fresh produce", "生鲜包装", "Anti-fog grades for chilled salads, fruit and bakery flow wrap.", "防雾等级用于冷藏沙拉、水果与烘焙产品枕式包装。"),
      I("Capacitor dielectric", "电容器介质", "Ultra-clean metallised grades with tight gauge tolerance for film capacitors.", "高洁净、厚度公差严格的镀铝等级用于薄膜电容器。"),
      I("Flower and stationery", "花材与文具", "Flower sleeves, envelope windows and clear stationery packaging.", "鲜花套袋、信封窗口与文具透明包装。"),
    ],
    specs: [
      S("Material", "材质", "Biaxially oriented polypropylene (BOPP)", "双向拉伸聚丙烯（BOPP）"),
      S("Structure", "结构", "Mono-layer or co-extruded A/B/A — confirm by grade", "单层或 A/B/A 共挤，按等级确认"),
      S("Surface", "表面处理", "Corona one or both sides; dyne level to order", "单面或双面电晕，达因值按订单"),
      S("Thickness", "厚度", "Confirmed against your line; indicative value shown where available", "按机台确认，有源站数据时给出参考值"),
    ],
    faqs: [
      F("Is this grade food-contact compliant?", "这个等级符合食品接触要求吗？", "Documentation is issued per grade and per lot. Tell us the market you ship to (EU, FDA, GB or other) so we supply the correct declaration instead of a generic statement.", "按等级、按批次出具文件。请告知出口市场（欧盟、FDA、国标等），以便提供对应声明而非笼统说法。"),
      F("Can you match a film we already run?", "能匹配我们正在用的膜吗？", "Send the current datasheet or a retained sample. We compare gauge, treatment, COF, seal window and optical values, then propose the nearest grade and a trial reel.", "提供现用数据表或留样，我们比对厚度、处理值、摩擦系数、热封窗口与光学指标，再推荐最接近等级并寄试样卷。"),
      F("How should BOPP reels be stored?", "BOPP 卷膜如何存放？", "Keep reels in their original wrap, away from direct sunlight, heat and humidity, and allow them to acclimatise in the production area before slitting or printing.", "保留原包装，避免日晒、高温与潮湿；分切或印刷前在生产车间回温平衡。"),
    ],
  },

  "bopet-film": {
    intro: [
      P(
        "Biaxially oriented polyester (BOPET) is chosen when a package or an industrial process needs heat resistance, dimensional stability and mechanical strength that polyolefin films cannot give. {name} sits in our BOPET Film division and is supplied as roll stock for converting, metallising, coating or printing.",
        "当包装或工业制程需要聚烯烃薄膜无法提供的耐热、尺寸稳定与机械强度时，会选用双向拉伸聚酯（BOPET）。{name} 属于 BOPET 事业部，以卷材供深加工、镀铝、涂布或印刷。",
      ),
      P(
        "PET absorbs moisture and is sensitive to web tension at elevated temperature. We therefore confirm the thermal and tension conditions of your process, the surface treatment and the slip level before recommending a grade, rather than quoting from thickness alone.",
        "PET 易吸湿，且在高温下对张力敏感。因此我们会先确认您工艺的温度与张力条件、表面处理和爽滑要求，再推荐等级，而不是只按厚度报价。",
      ),
    ],
    highlights: [
      I("Thermal resistance", "耐温性", "PET holds its dimensions through heat-sealing, retort and hot-fill cycles where BOPP would shrink.", "在热封、蒸煮与热灌装温度下保持尺寸，BOPP 在此条件下会收缩。"),
      I("Tensile strength", "拉伸强度", "High modulus lets you run thinner gauges at high web tension without stretch or registration drift.", "高模量可在高张力下用更薄规格，不易拉伸变形或套印跑位。"),
      I("Barrier base", "阻隔基底", "A good oxygen and aroma barrier on its own, and an excellent substrate for metallising or PVDC coating.", "本身即有良好阻氧、保香性，也是镀铝与 PVDC 涂布的理想基材。"),
      I("Surface quality", "表面质量", "Clean, low-gel surface for vacuum metallising, thermal transfer coating and fine-line printing.", "洁净、低晶点表面，适合真空镀铝、热转印涂布与细线印刷。"),
      I("Chemical resistance", "耐化学性", "Resists oils, solvents and many aggressive contents better than polyolefin films.", "比聚烯烃膜更耐油、耐溶剂及多种侵蚀性内容物。"),
      I("Electrical insulation", "电气绝缘", "Dielectric strength and low shrinkage make PET the standard base for electrical insulation tape.", "介电强度与低收缩率使其成为电气绝缘胶带的标准基材。"),
      I("Clarity", "高透明度", "Low haze grades suit clear windows, display packaging and optical applications.", "低雾度等级适合透明窗口、展示包装与光学用途。"),
      I("Metallising yield", "镀铝适性", "Consistent surface energy gives uniform aluminium adhesion and optical density.", "表面能稳定，镀铝层附着力与光密度均匀。"),
    ],
    applications: [
      I("Retort and hot-fill pouches", "蒸煮与热灌袋", "PET print/outer layer combined with CPP or aluminium foil sealant webs.", "PET 作印刷外层，与 CPP 或铝箔热封层复合。"),
      I("Thermal transfer ribbon", "热转印碳带", "Ultra-thin PET base film for wax, wax-resin and resin ribbon coating.", "超薄 PET 基膜用于蜡基、混合基与树脂基碳带涂布。"),
      I("Metallised packaging", "镀铝包装", "Metallised PET for high-barrier snack, coffee and pharmaceutical packs.", "镀铝 PET 用于高阻隔零食、咖啡与药品包装。"),
      I("Electrical insulation", "电气绝缘", "Insulating tape, motor slot liners, cable wrapping and flexible circuits.", "绝缘胶带、电机槽衬、线缆绕包与柔性电路。"),
      I("Capacitor film", "电容器膜", "Thin gauge PET dielectric for wound film capacitors.", "薄膜电容器用薄规格 PET 介质。"),
      I("Lidding film", "易撕盖材", "Heat-resistant lidding for trays and ready-meal containers.", "托盘与即食餐盒的耐热盖材。"),
      I("Labels and graphics", "标签与图文", "Durable labels, nameplates and industrial graphics substrates.", "耐久标签、铭牌与工业图文基材。"),
      I("Solar backsheets", "光伏背板", "PET outer layer in photovoltaic module backsheet laminates.", "光伏组件背板复合结构中的 PET 外层。"),
    ],
    specs: [
      S("Material", "材质", "Biaxially oriented polyethylene terephthalate (BOPET)", "双向拉伸聚对苯二甲酸乙二醇酯（BOPET）"),
      S("Surface", "表面处理", "Plain, corona-treated, chemically primed or silicone-coated — to order", "光面、电晕、化学预涂或硅油涂布，按订单"),
      S("Thermal", "耐温条件", "Confirm process temperature and dwell time at enquiry", "询价时确认工艺温度与停留时间"),
    ],
    faqs: [
      F("Why does PET need acclimatisation before printing?", "PET 印刷前为什么要回温？", "PET picks up moisture. Condensation on a cold reel causes poor ink adhesion and metallising defects, so reels should reach the production-room temperature in their sealed wrap first.", "PET 易吸湿。冷卷表面结露会造成油墨附着不良与镀铝瑕疵，应在原包装内回温至车间温度后再开卷。"),
      F("Can you supply ultra-thin gauges?", "能提供超薄规格吗？", "Thin PET grades are available for thermal transfer and capacitor use. Availability depends on width and quantity, so send both when enquiring.", "热转印与电容器用途可提供超薄 PET。供货取决于幅宽与数量，询价时请一并说明。"),
    ],
  },

  "coated-film": {
    intro: [
      P(
        "Coated and lamination films add a functional layer to a base web: an EVA adhesive for thermal lamination, PVDC for barrier, acrylic for print protection and gloss, or a holographic / specialty finish for brand security. {name} belongs to our Coated & Lamination Film division.",
        "涂布与预涂膜是在基膜上增加功能层：EVA 胶层用于热覆膜、PVDC 提供阻隔、丙烯酸层保护印刷并提升光泽，全息或特种涂层用于品牌防伪。{name} 属于涂布膜与预涂膜事业部。",
      ),
      P(
        "The right choice depends on the substrate you bond to and the temperature your laminator can hold. We ask for the paper or film grade, machine speed, nip temperature and whether the job is sheet-fed or reel-fed before fixing the coating weight and adhesive type.",
        "选型取决于被复合的基材与覆膜机可稳定保持的温度。确定涂布量与胶种之前，我们会询问纸张或薄膜等级、机速、压合温度，以及是单张还是卷材走料。",
      ),
    ],
    highlights: [
      I("Bond strength", "复合牢度", "Coating weight and adhesive chemistry are matched to the ink film and substrate to avoid delamination.", "涂布量与胶系按油墨层、基材匹配，避免起膜脱层。"),
      I("Barrier performance", "阻隔性能", "PVDC (K-film) grades sharply reduce oxygen and moisture transmission for longer shelf life.", "PVDC（K 膜）等级显著降低氧气与水汽透过率，延长货架期。"),
      I("Print protection", "印面保护", "A clear coating guards against scuffing, fingerprints and fading in transit and on shelf.", "透明涂层可抵御运输与陈列中的擦伤、指纹和褪色。"),
      I("Optical finish", "表面效果", "Gloss, matte, silk and holographic effects are available without a second converting pass.", "可做光、哑、丝光与全息效果，无需二次加工。"),
      I("Laminator window", "覆膜温度窗口", "Each grade has a defined nip temperature and pressure range — we confirm it against your machine.", "每个等级有明确的压合温度与压力范围，按您的设备确认。"),
      I("Ink compatibility", "油墨适配", "Check metallic inks, varnishes and high ink coverage, which are the usual causes of bonding failure.", "重点核对金属墨、上光油与大墨量，这些是复合牢度失效的常见原因。"),
      I("Brand security", "防伪与品牌", "Holographic and laser patterns can be customised and combined with tear tape for tamper evidence.", "全息与镭射图案可定制，并可配合拆封拉线实现防拆封。"),
      I("Clean unwind", "放卷稳定", "Controlled blocking and static behaviour keep sheet-fed and reel-fed laminators running cleanly.", "控制粘连与静电，让单张与卷材覆膜机走料顺畅。"),
    ],
    applications: [
      I("Book and magazine covers", "书刊封面", "Thermal lamination of covers, jackets and premium brochures.", "封面、护封与精装宣传册的热覆膜。"),
      I("Luxury cartons", "精品纸盒", "Cosmetics, spirits, electronics and gift packaging requiring a high-gloss or soft-touch finish.", "化妆品、酒类、电子与礼盒的高光或触感效果。"),
      I("High-barrier food packs", "高阻隔食品包装", "PVDC-coated webs for meat, cheese, snacks and dried foods.", "PVDC 涂布膜用于肉制品、奶酪、零食与干制食品。"),
      I("Paper lamination", "纸张复合", "Posters, menus, maps and documents needing washable, tear-resistant surfaces.", "海报、菜单、地图与文件的耐水耐撕覆膜。"),
      I("Anti-counterfeit labels", "防伪标签", "Holographic films for brand protection, tax stamps and security seals.", "全息膜用于品牌保护、税标与防伪封签。"),
      I("Print finishing", "印后加工", "Pre-coated film as a base for hot stamping, embossing and spot effects after lamination.", "预涂膜作覆膜后烫金、压纹与局部效果的基材。"),
      I("Flexible laminates", "软包装复合", "Coated webs as the barrier or print layer in multi-layer pouch structures.", "涂布膜作为多层袋结构中的阻隔层或印刷层。"),
    ],
    specs: [
      S("Base web", "基膜", "BOPP, BOPET or paper — confirm by grade", "BOPP、BOPET 或纸张，按等级确认"),
      S("Coating", "涂层", "EVA / PVDC / acrylic / holographic — confirm by grade", "EVA / PVDC / 丙烯酸 / 全息，按等级确认"),
      S("Bonding", "复合方式", "Thermal (pre-coated) or wet lamination; nip temperature to confirm", "预涂热复合或即涂湿复合；压合温度待确认"),
      S("Sidedness", "涂布面", "One side, with treatment level confirmed per order", "单面涂布，处理值按订单确认"),
    ],
    faqs: [
      F("Why does lamination peel off metallic ink?", "为什么金属墨部位会起膜？", "Metallic inks and heavy varnish layers reduce adhesive wetting. We normally suggest a higher coating weight, slower line speed or a primer, and a trial on the actual printed sheet before the run.", "金属墨与厚上光层会降低胶层润湿。通常建议提高涂布量、降低机速或加底涂，并先用实际印张试覆。"),
      F("Which do I need: pre-coated or wet lamination?", "该选预涂膜还是即涂膜？", "Pre-coated (thermal) film is cleaner, has no drying step and suits most modern laminators. Wet lamination can be more economical on very long runs and gives a different bond profile. Machine capability decides it.", "预涂（热）膜更洁净、无需烘干，适合多数现代覆膜机；即涂湿法在超长版活上更经济，粘合特性不同。最终由设备条件决定。"),
      F("Can the hologram pattern be customised?", "全息图案可以定制吗？", "Custom patterns are possible for volume orders and normally involve a shim / origination charge. Send the artwork intent and annual volume so we can confirm feasibility and tooling.", "批量订单可定制图案，通常涉及制版费用。请提供图案意向与年用量，以便确认可行性与开版要求。"),
    ],
  },

  "adhesive-tape-glue": {
    intro: [
      P(
        "Our Adhesive Tape & Glue division covers BOPP packing tape, jumbo rolls for converters, masking and double-sided tapes, plus hot-melt and acrylic adhesives. {name} is supplied either as a finished tape or as a semi-finished roll, depending on the grade.",
        "胶粘带与胶水事业部覆盖 BOPP 封箱胶带、供深加工厂使用的母卷、美纹纸与双面胶带，以及热熔胶与丙烯酸胶水。{name} 按等级以成品胶带或半成品卷材供货。",
      ),
      P(
        "Tape performance is a system: backing film, release coating, adhesive chemistry and coating weight all interact. We confirm the carton surface, application temperature, storage conditions and whether the tape is applied by hand or by an automatic case sealer before recommending a construction.",
        "胶带性能是一个系统：基材、离型层、胶系与涂布量相互影响。推荐结构前，我们会确认纸箱表面、使用温度、储存条件，以及手工贴带还是自动封箱机贴带。",
      ),
    ],
    highlights: [
      I("Holding power", "持粘力", "Adhesive formulation is matched to carton board and storage temperature to resist edge lifting.", "胶系按箱板与储存温度匹配，减少翘边。"),
      I("Unwind control", "解卷稳定", "Consistent release force keeps automatic case sealers running without web break or noise spikes.", "解卷力稳定，自动封箱机不易断带或产生异响。"),
      I("Clarity and printability", "透明与印刷", "Crystal-clear backing for retail cartons; printed and branded tape available for volume orders.", "零售纸箱用超透明基材；批量订单可做印刷品牌胶带。"),
      I("Jumbo roll consistency", "母卷一致性", "Uniform coating weight across the full web width, with splice positions declared for converters.", "全幅涂布量均匀，并向深加工客户标明接头位置。"),
      I("Temperature range", "适用温区", "Grades for ambient, chilled and hot-fill warehousing — specify your cold-chain conditions.", "常温、冷藏与高温仓适用等级不同，请说明冷链条件。"),
      I("Low VOC / clean handling", "低气味易操作", "Acrylic water-based grades reduce odour in packed goods and improve operator comfort.", "水性丙烯酸等级气味低，适合对气味敏感的装箱环境。"),
      I("Custom width and length", "规格可定制", "Standard and non-standard widths, lengths and core sizes for hand and machine rolls.", "手工卷与机用卷均可做常规及非标宽、长与卷芯。"),
      I("Shelf life traceability", "批次可追溯", "Each lot is dated and traceable to coating and slitting records.", "每批标注日期，可追溯至涂布与分切记录。"),
    ],
    applications: [
      I("Carton sealing", "纸箱封箱", "E-commerce, warehouse and export carton closure by hand or case sealer.", "电商、仓储与出口纸箱的手工或机器封箱。"),
      I("Tape converting", "胶带深加工", "Jumbo rolls for slitting and rewinding into finished retail rolls.", "母卷供分切复卷成零售成品卷。"),
      I("Masking and painting", "遮蔽与喷涂", "Crepe masking tape for painting, automotive refinishing and surface protection.", "美纹纸胶带用于涂装、汽车修补与表面保护。"),
      I("Mounting and bonding", "贴合与粘接", "Double-sided tape for signage, displays, foam and nameplate mounting.", "双面胶用于标识、展架、泡棉与铭牌贴合。"),
      I("Surface protection", "表面保护", "Temporary protection of metal, glass and plastic sheets during fabrication.", "金属、玻璃与塑料板加工过程中的临时保护。"),
      I("Labelling", "标签应用", "Adhesive systems for self-adhesive label stock and barcode labels.", "不干胶标签材料与条码标签用胶系。"),
      I("Stationery and bundling", "文具与捆扎", "Light-duty sealing, bundling and office tape applications.", "轻型封口、捆扎与办公用胶带。"),
    ],
    specs: [
      S("Backing", "基材", "BOPP, crepe paper, foam or tissue — confirm by grade", "BOPP、美纹纸、泡棉或棉纸，按等级确认"),
      S("Adhesive", "胶系", "Water-based acrylic / hot melt / solvent — confirm by grade", "水性丙烯酸 / 热熔 / 溶剂型，按等级确认"),
      S("Total thickness", "总厚度", "Backing + coating; confirmed against the datasheet", "基材+胶层，以数据表为准"),
      S("Roll format", "卷装形式", "Hand roll, machine roll or jumbo roll; splice declaration for converters", "手用卷、机用卷或母卷；母卷提供接头说明"),
    ],
    faqs: [
      F("Why does tape lift on recycled cartons?", "再生纸箱为什么容易翘带？", "Recycled board is dusty and more porous. A higher coating weight or a hot-melt adhesive usually solves it — we suggest testing on your actual cartons rather than a sample board.", "再生纸板粉尘多、孔隙大，通常需提高涂布量或改用热熔胶；建议用实际纸箱而非样板试贴。"),
      F("Do you supply jumbo rolls?", "供应母卷吗？", "Yes. Give us the master width, coating specification, maximum roll OD, splice allowance and the slitting equipment you run.", "供应。请提供大卷幅宽、涂布要求、最大卷径、允许接头数与分切设备参数。"),
      F("Can we print our logo on the tape?", "胶带可以印 Logo 吗？", "Printed tape is available for volume orders. Send the artwork and repeat length, and we will confirm print method, colour count and cylinder / plate costs.", "批量订单可印刷。请提供图案与印刷周长，我们确认印刷方式、色数与制版费用。"),
    ],
  },

  "ps-cpp-nylon-film": {
    intro: [
      P(
        "This division groups three different webs used to complete a packaging structure: BOPS window and sheet film, cast polypropylene (CPP) sealant film, and biaxially oriented nylon (BOPA). {name} is one of these grades, normally used together with a BOPP or BOPET print web rather than on its own.",
        "本事业部包含三类用于补齐包装结构的材料：BOPS 窗口膜与片材、流延聚丙烯（CPP）热封膜、双向拉伸尼龙（BOPA）。{name} 属于其中一类，通常与 BOPP 或 BOPET 印刷层搭配使用，而非单独成袋。",
      ),
      P(
        "CPP contributes sealability and hot tack, nylon contributes puncture resistance and oxygen barrier, and BOPS gives stiffness and clarity for windows. Tell us the filling temperature, whether the pack is retorted, and the lamination adhesive used, so the correct grade is selected.",
        "CPP 提供热封性与热粘强度，尼龙提供耐穿刺与阻氧性，BOPS 提供窗口所需的挺度与透明度。请说明灌装温度、是否蒸煮、以及复合用胶，以便正确选型。",
      ),
    ],
    highlights: [
      I("Seal integrity", "封口可靠", "CPP sealant layers give a wide seal window and strong hot tack on VFFS and HFFS lines.", "CPP 热封层在立式、卧式包装机上热封窗口宽、热粘强度高。"),
      I("Retort capability", "耐蒸煮", "Retort-grade CPP withstands high-temperature sterilisation without seal failure or delamination.", "蒸煮级 CPP 可承受高温杀菌，不封口失效、不分层。"),
      I("Puncture resistance", "耐穿刺", "BOPA nylon absorbs impact and resists puncture from sharp or bone-in products.", "BOPA 尼龙吸收冲击，抵御带骨、尖锐内容物穿刺。"),
      I("Aroma and oxygen barrier", "阻氧保香", "Nylon improves oxygen barrier in laminates; PVDC-coated versions extend it further.", "尼龙提升复合结构阻氧性，PVDC 涂布等级可进一步提高。"),
      I("Window clarity", "窗口透明", "BOPS offers glass-like clarity and stiffness for envelope windows and folding cartons.", "BOPS 透明度接近玻璃且挺度好，适合信封窗口与折叠纸盒。"),
      I("Thermoforming", "热成型", "Selected grades draw cleanly into trays and lidding applications.", "部分等级可洁净热成型，用于托盘与盖材。"),
      I("Lamination compatibility", "复合适性", "Surface treatment and slip level are set for solvent-based, solventless or extrusion lamination.", "表面处理与爽滑度按干式、无溶剂或挤出复合工艺调整。"),
      I("Low-temperature seal", "低温热封", "Modified CPP grades seal at lower jaw temperatures for heat-sensitive contents.", "改性 CPP 可在较低封刀温度下热封，适合热敏内容物。"),
    ],
    applications: [
      I("Retort pouches", "蒸煮袋", "Ready meals, sauces and pet food sterilised in the pack.", "即食餐、酱料与宠物食品的袋内杀菌包装。"),
      I("Composite bags", "复合袋", "Rice, nuts, frozen food and detergent pouches with a CPP sealant web.", "大米、坚果、冷冻食品与洗涤剂袋的 CPP 热封层。"),
      I("Envelope windows", "信封窗口", "BOPS window film for envelopes and transparent carton windows.", "信封与纸盒透明窗口用 BOPS 膜。"),
      I("Thermoformed trays", "热成型托盘", "Nylon-based webs for formed trays and lidding in chilled food.", "冷藏食品托盘成型与盖材用的尼龙复合膜。"),
      I("Vacuum packaging", "真空包装", "Nylon laminates for vacuum-packed meat, cheese and seafood.", "肉类、奶酪与海产品真空包装的尼龙复合结构。"),
      I("Metallised CPP", "CPP 镀铝", "Metallised CPP as a barrier and decorative layer in snack packaging.", "镀铝 CPP 作零食包装的阻隔与装饰层。"),
      I("Fresh produce bags", "生鲜袋", "Anti-fog CPP for salads and cut fruit with controlled respiration.", "防雾 CPP 用于沙拉与鲜切水果包装。"),
    ],
    specs: [
      S("Material", "材质", "BOPS / CPP / BOPA nylon — confirm by grade", "BOPS / CPP / BOPA 尼龙，按等级确认"),
      S("Function", "功能层", "Sealant, barrier, stiffness or window layer", "热封层、阻隔层、挺度层或窗口层"),
      S("Process", "加工条件", "Filling temperature, retort conditions and lamination adhesive to confirm", "灌装温度、蒸煮条件与复合胶种待确认"),
    ],
    faqs: [
      F("Which layer goes where in a laminate?", "复合结构各层怎么排？", "Typically the print web (BOPP or BOPET) is outside, nylon or barrier layer in the middle, and CPP inside as the sealant. The exact structure depends on filling temperature and drop / puncture requirements.", "通常外层为 BOPP 或 BOPET 印刷膜，中层为尼龙或阻隔层，内层为 CPP 热封层；具体取决于灌装温度与跌落、耐穿刺要求。"),
      F("Is nylon film moisture sensitive?", "尼龙膜怕潮吗？", "Yes. Nylon absorbs moisture, which affects dimensional stability and barrier. Keep reels sealed until use and avoid opening them in a humid area before lamination.", "是的。尼龙吸湿会影响尺寸稳定性与阻隔性，使用前保持原包装密封，避免在潮湿环境提前拆包。"),
    ],
  },

  "tear-tape-ribbon-label": {
    intro: [
      P(
        "This division covers the small components that make a package open cleanly, traceable and secure: tear tapes, thermal transfer ribbons, self-adhesive barcode labels and coding equipment. {name} is supplied as a consumable or a component for converters and packing lines.",
        "本事业部覆盖让包装易开启、可追溯、可防伪的关键小件：拆封拉线、热转印碳带、不干胶条码标签与打码设备。{name} 以耗材或配套件形式供深加工厂与包装线使用。",
      ),
      P(
        "Consumables are only as good as their match to the line. For ribbons we need the printer model, printhead type, speed and the substrate being printed; for tear tape we need the overwrap film, machine type and the required opening behaviour.",
        "耗材必须与产线匹配才有意义。碳带需提供打印机型号、打印头类型、速度与承印材料；拆封拉线需提供外裹膜材质、机台类型与期望的开启效果。",
      ),
    ],
    highlights: [
      I("Clean opening", "开启顺畅", "Controlled tensile strength and adhesion give a straight, predictable tear without film web break.", "拉伸强度与粘性受控，撕口平直，不拉断膜卷。"),
      I("Tamper evidence", "防拆封", "Printed, holographic or security tear tape doubles as a visible authenticity feature.", "印刷、全息或防伪拉线同时提供可视真伪识别。"),
      I("Print density", "打印黑度", "Ribbon formulation matched to label stock for scannable barcodes at your print speed.", "碳带配方与标签材料匹配，在设定机速下条码可读。"),
      I("Printhead protection", "保护打印头", "Back-coating reduces static and abrasion, extending thermal printhead life.", "背涂层降低静电与磨损，延长热敏打印头寿命。"),
      I("Adhesive match", "胶系匹配", "Label adhesives selected for cardboard, film, chilled, frozen or high-moisture surfaces.", "按纸板、薄膜、冷藏、冷冻或高湿表面选择标签胶系。"),
      I("Machine compatibility", "设备适配", "Core size, winding direction and ink-side orientation confirmed against your printer or applicator.", "卷芯、卷向与墨面方向按打印机或贴标机确认。"),
      I("Traceability", "可追溯", "Consistent lot coding supports variable-data printing and recall control.", "批次标识稳定，支持可变数据打印与召回管理。"),
      I("Shelf appearance", "货架效果", "Metallic, coloured and holographic tear tapes add a premium cue at the opening point.", "金属色、彩色与全息拉线在开封处提升质感。"),
    ],
    applications: [
      I("Cigarette and gift overwraps", "烟包与礼盒外裹", "Tear tape integrated into BOPP overwrapping for easy, clean opening.", "BOPP 外裹膜中复合拉线，实现轻松平整开启。"),
      I("Barcode and logistics labels", "条码与物流标签", "Wax and wax-resin ribbons for shipping, carton and pallet labels.", "蜡基与混合基碳带用于运输、箱唛与托盘标签。"),
      I("Product identification", "产品标识", "Resin ribbons for chemical, automotive and outdoor durable labels.", "树脂基碳带用于化工、汽车与户外耐久标签。"),
      I("Food and pharma coding", "食品药品打码", "Date, batch and expiry coding on flexible packaging lines.", "软包装线上的日期、批号与有效期打码。"),
      I("Brand protection", "品牌保护", "Security tear tape and holographic labels against counterfeiting and refilling.", "防伪拉线与全息标签用于防假冒、防灌装。"),
      I("Retail labelling", "零售标签", "Price, shelf-edge and promotional labels with reliable adhesive performance.", "价签、货架标签与促销标签，粘性稳定。"),
      I("Carton opening systems", "纸箱开启结构", "Tear strips for e-commerce cartons and tamper-evident mailers.", "电商纸箱与防拆信封的开启条。"),
    ],
    specs: [
      S("Format", "形式", "Tear tape / thermal transfer ribbon / self-adhesive label — confirm by grade", "拆封拉线 / 热转印碳带 / 不干胶标签，按等级确认"),
      S("Core", "卷芯", "Confirmed against printer or applicator specification", "按打印机或贴标机规格确认"),
      S("Ink side", "墨面方向", "Ink-side in or out, confirmed before winding", "墨面向内或向外，分切前确认"),
      S("Environment", "使用环境", "Ambient, chilled, frozen, chemical or outdoor exposure to confirm", "常温、冷藏、冷冻、化学品或户外暴露条件待确认"),
    ],
    faqs: [
      F("Why are my barcodes failing to scan?", "条码为什么扫不出来？", "Usually a ribbon / label-stock mismatch, insufficient printhead energy or too high a print speed. Send the printer model, speed, darkness setting and a sample label so we can recommend the right ribbon formulation.", "通常是碳带与标签材料不匹配、打印头能量不足或机速过高。请提供机型、速度、浓度设定与标签样张，以便推荐合适配方。"),
      F("Which tear tape works with my overwrap film?", "外裹膜该配哪种拉线？", "It depends on the film gauge, the overwrap machine and whether the tape is applied cold or heat-activated. Share the film specification and machine type and we will propose a trial roll.", "取决于膜厚、外裹机型号以及冷胶贴合还是热激活。提供薄膜规格与机型后我们推荐试用卷。"),
    ],
  },

  "pe-pvc-po-film-bags": {
    intro: [
      P(
        "This division covers polyolefin films and finished bags for protection and distribution: POF shrink film, PE stretch and cling film, PVC film, air bubble film and made-up packaging bags. {name} is supplied as roll stock or as a finished bag depending on the grade.",
        "本事业部覆盖用于防护与流通环节的聚烯烃膜及成品袋：POF 热收缩膜、PE 缠绕膜与保鲜膜、PVC 膜、气泡膜及各类包装袋。{name} 按等级以卷材或成品袋供货。",
      ),
      P(
        "Shrink and stretch films behave very differently on a machine. For shrink film we need the tunnel temperature and dwell time; for stretch film the pre-stretch ratio and load type; for bags the filling method and any food-contact requirement.",
        "收缩膜与缠绕膜在设备上的表现差异很大。收缩膜需确认收缩炉温度与停留时间；缠绕膜需确认预拉伸比与货物类型；成品袋需确认灌装方式与是否有食品接触要求。",
      ),
    ],
    highlights: [
      I("Shrink control", "收缩可控", "Balanced shrinkage gives tight, even wraps without dog-ears or film burn in the tunnel.", "收缩均衡，包裹紧致，不产生狗耳与炉内灼膜。"),
      I("Pre-stretch yield", "预拉伸出材", "PE stretch film holds load integrity at high pre-stretch ratios, reducing film per pallet.", "PE 缠绕膜在高预拉伸比下仍保持裹包稳定，降低单托用膜量。"),
      I("Cling and tack", "自粘与保鲜", "Cling level tuned for food wrap or layer-to-layer pallet adhesion.", "自粘性按食品保鲜或层间托盘粘附调整。"),
      I("Puncture and tear", "耐穿刺抗撕裂", "Multi-layer constructions resist sharp corners and pallet-edge abrasion.", "多层结构抵御尖角与托盘边缘磨损。"),
      I("Clarity", "透明度", "High-clarity POF keeps printed graphics visible after shrinking.", "高透明 POF 收缩后仍清晰呈现印刷图案。"),
      I("Seal strength", "封口强度", "Bag seals are specified for the filling weight and drop conditions.", "袋口封合强度按灌装重量与跌落条件设定。"),
      I("Cushioning", "缓冲防护", "Bubble film grades protect glass, electronics and spare parts in transit.", "气泡膜等级用于玻璃、电子与零配件运输防护。"),
      I("Recyclability", "可回收性", "Mono-material PE and POF structures are easier to route into existing recycling streams.", "单一材质 PE 与 POF 结构更易进入现有回收体系。"),
    ],
    applications: [
      I("Retail shrink wrapping", "零售收缩包装", "Multipacks, boxes, books, cosmetics and gift sets.", "组合装、纸盒、书刊、化妆品与礼盒收缩。"),
      I("Pallet unitising", "托盘缠绕", "Warehouse and export pallet stabilisation with PE stretch film.", "仓储与出口托盘的 PE 缠绕固定。"),
      I("Food cling wrap", "食品保鲜", "Household and catering cling film for fresh food coverage.", "家用与餐饮用生鲜保鲜膜。"),
      I("Protective packaging", "缓冲包装", "Bubble film and air cushion for fragile goods and e-commerce parcels.", "易碎品与电商包裹的气泡膜、气垫防护。"),
      I("Garment and textile bags", "服装包装袋", "Poly bags for apparel, linens and retail packaging.", "服装、家纺与零售用塑料袋。"),
      I("Industrial liners", "工业内衬", "Carton and drum liners for powders, granules and components.", "粉体、颗粒与零配件的纸箱、桶内衬袋。"),
      I("Bundling and collation", "集合包装", "Collation shrink for beverages, cans and multipacks.", "饮料、罐装与组合装的集合收缩。"),
    ],
    specs: [
      S("Material", "材质", "POF / PE / PVC / PO — confirm by grade", "POF / PE / PVC / PO，按等级确认"),
      S("Format", "形式", "Roll stock, centre-folded sheet, tube or finished bag", "卷材、对折膜、筒膜或成品袋"),
      S("Shrink conditions", "收缩条件", "Tunnel temperature and dwell time to confirm", "收缩炉温度与停留时间待确认"),
      S("Food contact", "食品接触", "Declaration issued per grade on request", "按等级应要求出具声明"),
    ],
    faqs: [
      F("Why does shrink film burn or wrinkle in the tunnel?", "收缩膜为什么在炉内灼膜或起皱？", "Usually the tunnel is too hot or the dwell too long for the gauge. Send the gauge, tunnel temperature, conveyor speed and pack size and we will suggest a shrinkage curve that matches.", "通常炉温过高或停留时间过长。请提供厚度、炉温、输送速度与包装尺寸，我们建议匹配的收缩曲线。"),
      F("Can you make bags to a specific size?", "可以按指定尺寸做袋吗？", "Yes. Provide width, length, seal type, printing requirements, filling weight and whether the bag needs a hang hole, zipper or euro slot.", "可以。请提供宽、长、封口形式、印刷要求、灌装重量，以及是否需要挂孔、自封条或飞机孔。"),
    ],
  },

  "paper-products": {
    intro: [
      P(
        "Our Paper Products division supplies printing and imaging consumables: copy paper, lightweight coated paper, photo paper, thermal paper and related office and converting stock. {name} is supplied in sheets or reels depending on the grade.",
        "纸制品事业部提供印刷与影像耗材：复印纸、轻量涂布纸、相纸、热敏纸及办公与深加工用纸。{name} 按等级以平张或卷筒供货。",
      ),
      P(
        "Paper performance depends on the printing method and the climate in which it is stored. We confirm grammage, brightness, coating side, moisture content and the device (laser, inkjet, offset, thermal) before fixing the specification.",
        "纸张表现取决于印刷方式与使用环境湿度。确定规格前，我们会确认克重、白度、涂布面、含水率及设备类型（激光、喷墨、胶印、热敏）。",
      ),
    ],
    highlights: [
      I("Runability", "走纸顺畅", "Controlled moisture and curl keep high-speed copiers and presses jam-free.", "含水率与卷曲受控，高速复印机与印刷机不易卡纸。"),
      I("Print definition", "成像清晰", "Coating formulated for sharp text, even ink absorption and accurate colour.", "涂层保证文字锐利、吸墨均匀与色彩还原。"),
      I("Grammage consistency", "克重稳定", "Basis weight checked per lot and recorded on the COA.", "逐批检测定量并记录于 COA。"),
      I("Opacity", "不透明度", "Sufficient opacity for double-sided printing and publishing grades.", "满足双面打印与出版用纸的不透明度要求。"),
      I("Thermal sensitivity", "热敏适性", "Thermal grades matched to printhead energy and required image life.", "热敏等级按打印头能量与影像保存期匹配。"),
      I("Surface smoothness", "表面平滑", "Smoothness tuned for offset, laser or inkjet as required.", "平滑度按胶印、激光或喷墨用途调整。"),
      I("Archive stability", "保存稳定", "Image durability and yellowing resistance confirmed for the intended storage life.", "按预期保存期确认影像耐久与抗黄变性能。"),
      I("Packing integrity", "包装防护", "Moisture-barrier ream wrap and palletised export packing.", "防潮令纸包装与托盘出口加固。"),
    ],
    applications: [
      I("Office printing", "办公打印", "Copy and laser paper for high-volume office and print-room use.", "大批量办公与文印中心用复印、激光纸。"),
      I("Publishing", "出版印刷", "LWC paper for magazines, catalogues and inserts.", "杂志、目录与插页用轻量涂布纸。"),
      I("Photo and imaging", "影像输出", "Photo paper for inkjet printers and professional output.", "喷墨打印机与专业输出用相纸。"),
      I("Receipt and labels", "小票与标签", "Thermal paper for POS rolls, tickets and logistics labels.", "POS 卷纸、票据与物流标签用热敏纸。"),
      I("Converting stock", "深加工原纸", "Base paper for coating, laminating and label production.", "涂布、复合与标签生产用原纸。"),
      I("Creative and craft", "文创与手工", "Crepe and specialty paper for decoration and packaging.", "装饰与包装用皱纹纸及特种纸。"),
    ],
    specs: [
      S("Form", "形式", "Sheets (reams) or reels — confirm by grade", "平张（令）或卷筒，按等级确认"),
      S("Grammage", "定量", "Confirmed per grade; indicative value shown where available", "按等级确认，有数据时给出参考值"),
      S("Coating", "涂布", "Uncoated / single-sided / double-sided — confirm by grade", "未涂 / 单面 / 双面，按等级确认"),
      S("Storage", "储存条件", "Cool, dry and flat; keep wrapped until use", "阴凉干燥平放，使用前保持包装"),
    ],
    faqs: [
      F("Why does paper curl in the printer?", "纸在打印机里为什么卷曲？", "Mostly moisture imbalance between the paper and the room. Store reams sealed at room humidity and let them acclimatise before opening.", "多因纸张与车间湿度不平衡。令纸保持密封存放于同等湿度环境，拆封前先回温平衡。"),
      F("Can you supply custom sheet sizes?", "可做非标尺寸吗？", "Custom sheet and reel sizes are possible for volume orders. Provide size, quantity, grain direction and packing requirements.", "批量订单可做非标平张与卷筒尺寸。请提供尺寸、数量、丝缕方向与包装要求。"),
    ],
  },

  "machinery-electronics": {
    intro: [
      P(
        "Our Packaging Machinery division supplies converting and end-of-line equipment: slitting and rewinding machines, coating lines, printing presses, packaging machines and shrink equipment. {name} is quoted as a machine configuration rather than a commodity item.",
        "包装机械事业部提供深加工与后道设备：分切复卷机、涂布线、印刷机、包装机与收缩设备。{name} 按设备配置报价，不是标准现货商品。",
      ),
      P(
        "A machine quotation starts with the web you run and the output you need. We ask for substrate, width range, gauge range, line speed, unwind / rewind diameter, power supply, factory layout and operator count before fixing a specification.",
        "设备报价从您加工的材料与产能需求开始。确定配置前需了解基材、幅宽范围、厚度范围、线速、放卷/收卷卷径、电源、厂房布局与操作人员配置。",
      ),
    ],
    highlights: [
      I("Configuration to spec", "按需求配置", "Machine width, speed and tension control are built to your material and output, not a fixed catalog model.", "幅宽、速度与张力控制按您的材料和产能配置，而非固定目录机型。"),
      I("Tension control", "张力控制", "Closed-loop tension control protects thin webs and keeps roll geometry consistent.", "闭环张力控制保护薄膜，保持卷形一致。"),
      I("Web guiding", "纠偏系统", "Edge or line guiding keeps registration and slitting accuracy at production speed.", "边缘或线条纠偏在生产速度下保证套印与分切精度。"),
      I("Changeover time", "换型效率", "Quick-change shafts and recipe storage shorten changeover between jobs.", "快换轴与工艺配方存储缩短换单时间。"),
      I("Safety", "安全防护", "Guarding, emergency stops and interlocks supplied to the destination market's requirements.", "按目的市场要求配置防护罩、急停与联锁。"),
      I("Spare parts", "备件供应", "Wear-part list supplied with the machine and stocked for the model's service life.", "随机提供易损件清单，并在机型生命周期内备货。"),
      I("Commissioning", "安装调试", "Installation supervision, operator training and trial-run acceptance are part of the scope.", "范围包含安装指导、操作培训与试车验收。"),
      I("Documentation", "技术文件", "Manuals, electrical drawings and CE / compliance documents as required.", "提供说明书、电气图及所需的 CE / 合规文件。"),
    ],
    applications: [
      I("Film slitting", "薄膜分切", "Slitting and rewinding master rolls into customer widths.", "母卷分切成客户指定幅宽。"),
      I("Coating and laminating", "涂布复合", "Applying adhesives, primers or functional coatings to film and paper.", "在膜材与纸张上涂布胶、底涂或功能涂层。"),
      I("Printing", "印刷", "Gravure and flexo presses for flexible packaging webs.", "软包装卷材的凹版与柔版印刷。"),
      I("Bag making", "制袋", "Converting laminated webs into finished pouches and bags.", "复合膜制成成品袋与自立袋。"),
      I("End-of-line packing", "后道包装", "Cartoning, wrapping and shrink equipment for dispatch.", "装箱、裹包与收缩等出货包装设备。"),
      I("Tape production", "胶带生产", "Coating and slitting lines for adhesive tape manufacture.", "胶带涂布与分切生产线。"),
    ],
    specs: [
      S("Scope", "供货范围", "Machine, tooling, installation supervision and training — itemised in the quotation", "设备、工装、安装指导与培训，报价中逐项列明"),
      S("Utilities", "动力条件", "Power supply, compressed air and space requirements to confirm", "电源、压缩空气与场地要求待确认"),
      S("Acceptance", "验收方式", "Trial run with your material before shipment or at site", "发货前或现场用您的材料试车验收"),
      S("Warranty & service", "保修与服务", "Terms, spare-parts plan and remote support defined per project", "按项目约定条款、备件计划与远程支持"),
    ],
    faqs: [
      F("Can you run our material during acceptance?", "验收时能用我们的材料试车吗？", "Yes, and we recommend it. Send representative reels in advance so the trial reflects your actual gauge, treatment and roll geometry.", "可以，而且建议这样做。请提前寄送代表性卷材，让试车反映真实厚度、处理值与卷形。"),
      F("Do you handle installation overseas?", "可以海外安装吗？", "Installation supervision and operator training can be included. Scope, travel and any local certification requirements are itemised in the quotation.", "可包含安装指导与操作培训。范围、差旅及当地认证要求在报价中逐项列明。"),
    ],
  },

  "solar-panels": {
    intro: [
      P(
        "Our Solar Panels division covers high-efficiency mono PERC and bifacial double-glass photovoltaic modules for utility and commercial rooftop projects. {name} is quoted as a project-specific module configuration.",
        "光伏太阳能板事业部提供高效单晶 PERC 与双面双玻组件，用于地面电站与工商业屋顶项目。{name} 按项目配置报价。",
      ),
      P(
        "Module supply depends on the project: system voltage, mounting structure, grid code, certification required in the destination market and container loading plan. Send the project brief and we will match the module and the documentation set.",
        "组件供货取决于项目条件：系统电压、支架结构、并网规范、目的市场所需认证与装柜方案。请提供项目资料，我们匹配组件型号与全套文件。",
      ),
    ],
    highlights: [
      I("Module efficiency", "组件效率", "Cell and module binning confirmed on the nameplate and the flash-test report.", "电池片与组件分档以铭牌和闪光测试报告为准。"),
      I("Bifacial gain", "双面发电", "Double-glass bifacial designs capture rear-side irradiance on reflective surfaces.", "双玻双面结构可利用反射面的背面辐照增益。"),
      I("Certification", "认证文件", "Destination-market certificates and test reports supplied with the shipment.", "按目的市场提供认证与测试报告。"),
      I("Mechanical load", "机械载荷", "Frame and glass specification matched to site wind and snow loads.", "边框与玻璃规格按项目风载、雪载匹配。"),
      I("Degradation warranty", "衰减质保", "Performance warranty terms itemised in the project contract.", "功率质保条款在项目合同中逐项列明。"),
      I("Traceability", "溯源管理", "Serial-number level flash data and pallet mapping for each container.", "每柜提供序列号级闪光数据与托盘对应表。"),
    ],
    applications: [
      I("Utility-scale PV", "地面电站", "Large ground-mounted arrays and tracker projects.", "大型地面阵列与跟踪支架项目。"),
      I("Commercial rooftops", "工商业屋顶", "Factory, warehouse and mall rooftop generation.", "厂房、仓库与商业屋顶发电。"),
      I("Agrivoltaics", "农光互补", "Elevated arrays over agricultural land.", "农地上方架空阵列。"),
      I("Carports and canopies", "车棚与遮阳", "PV carports and shade structures.", "光伏车棚与遮阳结构。"),
    ],
    specs: [
      S("Cell technology", "电池技术", "Mono PERC / bifacial double-glass — confirm by project", "单晶 PERC / 双面双玻，按项目确认"),
      S("Documentation", "随货文件", "Flash test data, certificates, packing list, warranty terms", "闪光测试数据、认证、装箱单、质保条款"),
      S("Packing", "包装", "Palletised, container loading plan per project", "托盘包装，按项目提供装柜方案"),
    ],
    faqs: [
      F("Which certificates are available?", "可提供哪些认证？", "Certificate sets depend on the destination market. Tell us the country and grid operator so we supply the applicable documents rather than a generic list.", "认证组合取决于目的市场。请告知国家与电网运营商，以便提供适用文件而非笼统清单。"),
      F("How is module power verified?", "组件功率如何核验？", "Every module carries a serial number linked to flash-test data; the pallet mapping and test summary are shipped with the container.", "每块组件有序列号并关联闪光测试数据，随柜提供托盘对应表与测试汇总。"),
    ],
  },

  "auto-parts-protection": {
    intro: [
      P(
        "This division groups automotive aftermarket components and protective products: wheel hubs, tyres, bicycle components and protective mask products. {name} is quoted against a part number or a product specification rather than a generic description.",
        "本事业部包含汽车后市场配件与防护用品：轮毂、轮胎、自行车配件及防护口罩等。{name} 按件号或产品规格报价，而非笼统描述。",
      ),
      P(
        "For automotive parts we need the vehicle application, part number, finish and required certification; for protective products we need the applicable standard, size and packing format. Send the target market so the documentation matches.",
        "汽配需提供适配车型、件号、表面处理与所需认证；防护用品需提供适用标准、尺码与包装形式。请告知目标市场，以便文件对应。",
      ),
    ],
    highlights: [
      I("Part-number matching", "件号核对", "Fitment confirmed against OEM part numbers before the order is released.", "下单前按 OEM 件号核对适配性。"),
      I("Finish consistency", "表面一致", "Coating and colour standards agreed with approved samples.", "涂层与颜色以确认样品为准。"),
      I("Standard compliance", "标准符合", "Applicable product standards and test reports identified for the destination market.", "按目的市场明确适用标准与检测报告。"),
      I("Packing protection", "运输防护", "Individual protection and palletised packing to prevent transit damage.", "单件防护加托盘包装，降低运输损伤。"),
      I("Batch traceability", "批次追溯", "Lot coding links finished goods to inspection records.", "批号关联成品与检验记录。"),
      I("Mixed container loading", "拼柜配载", "Different SKUs consolidated into one shipment where volumes allow.", "数量允许时多 SKU 合并装柜。"),
    ],
    applications: [
      I("Automotive aftermarket", "汽车后市场", "Replacement wheels, tyres and service parts.", "替换轮毂、轮胎与维修配件。"),
      I("Bicycle assembly", "整车装配", "Components supplied to bicycle assemblers and distributors.", "向自行车整车厂与经销商供配件。"),
      I("Personal protection", "个人防护", "Protective masks for industrial and general use.", "工业与日常用防护口罩。"),
      I("Distribution and retail", "分销零售", "Packaged SKUs for wholesalers and retail channels.", "面向批发与零售渠道的成品包装 SKU。"),
    ],
    specs: [
      S("Identification", "识别信息", "Part number / model / size to confirm at enquiry", "件号 / 型号 / 尺码询价时确认"),
      S("Standard", "执行标准", "Applicable standard and test report per destination market", "按目的市场确认标准与检测报告"),
      S("Packing", "包装", "Retail box, bulk carton or pallet — confirm by SKU", "零售盒、散装纸箱或托盘，按 SKU 确认"),
    ],
    faqs: [
      F("How do you confirm fitment?", "如何确认配件适配？", "We work from the OEM part number and the vehicle / model list. Sending photos of the existing part and its marking greatly reduces cross-reference errors.", "以 OEM 件号与适配车型清单为准。提供现件照片与标识可显著降低错配风险。"),
      F("Can different SKUs ship together?", "不同 SKU 可以拼柜吗？", "Yes, where volumes and packing allow. Send the SKU list with quantities and we will propose a loading plan.", "数量与包装允许时可以。请提供 SKU 清单与数量，我们给出配载方案。"),
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Trait-based extras — makes pages for different grades genuinely      */
/* different, not just a rotated template.                             */
/* ------------------------------------------------------------------ */
const TRAITS: { re: RegExp; item: Item; app?: Item }[] = [
  {
    re: /holographic|laser|镭射|全息|防伪/i,
    item: I("Security detail", "防伪细节", "Custom hologram patterns and laser imagery add a hard-to-copy visual feature at the point of opening.", "定制全息图案与镭射效果在开封处增加难以复制的识别特征。"),
    app: I("Brand protection", "品牌保护", "Security seals, tax stamps and anti-refill features on premium packs.", "精品包装的防伪封签、税标与防灌装结构。"),
  },
  {
    re: /metallized|metallised|镀铝/i,
    item: I("Metallised barrier", "镀铝阻隔", "A vacuum-deposited aluminium layer improves light, oxygen and moisture barrier while giving a metallic shelf finish.", "真空镀铝层提升遮光、阻氧与阻湿性能，并带来金属质感。"),
    app: I("Light-sensitive packs", "避光包装", "Coffee, snacks, powdered drinks and pharmaceutical products needing light protection.", "咖啡、零食、固体饮料与药品的避光包装。"),
  },
  {
    re: /anti-fog|防雾/i,
    item: I("Cold-chain clarity", "冷链防雾", "Anti-fog treatment keeps the pack transparent under chilled display conditions instead of misting over.", "防雾处理让冷藏陈列时包装保持透明，不结雾发白。"),
  },
  {
    re: /heat.?seal|热封/i,
    item: I("Defined seal window", "明确热封窗口", "A specified seal initiation temperature and hot-tack range keep VFFS and HFFS lines running without leakers.", "明确的起封温度与热粘区间，减少立包、卧包机的漏封。"),
  },
  {
    re: /pearl|white opaque|珠光/i,
    item: I("Opaque premium look", "珠光白效果", "A cavitated pearlised core gives opacity, a soft satin sheen and lower density per square metre.", "空化珠光芯层带来不透明、柔和缎面光泽与更低的单位面积密度。"),
  },
  {
    re: /matte|消光|哑光/i,
    item: I("Low-gloss finish", "低光泽质感", "A matte surface reduces glare, improves readability and gives a tactile premium finish.", "哑面降低反光、提升可读性，并带来高级触感。"),
  },
  {
    re: /pvdc|k.?film|k 膜|高阻隔/i,
    item: I("High-barrier coating", "高阻隔涂布", "PVDC coating (K-film) sharply lowers oxygen and moisture transmission for shelf-life-critical packs.", "PVDC 涂布（K 膜）显著降低氧与水汽透过率，适用长货架期包装。"),
  },
  {
    re: /capacitor|电容/i,
    item: I("Tight gauge tolerance", "严格厚度公差", "Capacitor grades require exceptionally uniform gauge and clean surfaces for reliable winding and breakdown strength.", "电容级要求极高厚度均匀性与表面洁净度，保证卷绕与击穿强度。"),
  },
  {
    re: /tear tape|拉线|拆封/i,
    item: I("Easy opening", "易开启结构", "Engineered tear strength gives a straight, predictable opening without breaking the overwrap web.", "撕裂强度经过设计，撕口平直可控，不拉断外裹膜。"),
  },
  {
    re: /thermal transfer|ribbon|碳带/i,
    item: I("Printhead-safe backing", "保护打印头", "Back-coating reduces static and wear so the ribbon protects the thermal printhead at production speed.", "背涂层降低静电与磨损，在生产速度下保护热敏打印头。"),
  },
  {
    re: /shrink|收缩|pof/i,
    item: I("Balanced shrinkage", "均衡收缩率", "Machine- and transverse-direction shrinkage are balanced to avoid dog-ears and distortion after the tunnel.", "纵横向收缩率均衡，避免收缩后出现狗耳与变形。"),
  },
  {
    re: /jumbo|母卷|半成品/i,
    item: I("Converter-ready", "适合深加工", "Master rolls are supplied with declared splice positions and uniform coating across the full web width.", "母卷提供接头位置说明，全幅涂布均匀，便于分切复卷。"),
  },
];

const NOTE_EN =
  "Values shown are indicative and taken from the source catalogue where available. Final gauge, treatment, roll build and tolerances are confirmed on the technical datasheet issued with your quotation.";
const NOTE_ZH =
  "页面参数为源站目录中的参考值。最终厚度、表面处理、卷装参数与公差，以报价时提供的技术数据表为准。";

/* deterministic selection, so `next build` produces identical HTML */
function seedOf(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
function pickN<T>(arr: T[], n: number, seed: number): T[] {
  if (!arr.length) return [];
  const out: T[] = [];
  const step = 1 + (seed % Math.max(1, arr.length - 1));
  let i = seed % arr.length;
  const seen = new Set<number>();
  while (out.length < Math.min(n, arr.length)) {
    if (seen.has(i)) { i = (i + 1) % arr.length; continue; }
    seen.add(i);
    out.push(arr[i]);
    i = (i + step) % arr.length;
  }
  return out;
}

export function buildProductCopy(p: CatalogProduct, lang: Lang): ProductCopy {
  const zh = lang === "zh";
  const L = (pair: Pair): string => (zh ? pair.zh : pair.en);
  const div = DIV[p.cat] || DIV["bopp-film"];
  const cat = CATEGORIES.find((c) => c.slug === p.cat);
  const catName = cat ? (zh ? cat.zh : cat.en) : "";
  const name = zh ? p.nameZh : p.nameEn;
  const seed = seedOf(`${p.id}-${p.slug}`);

  const traitMatches = TRAITS.filter((t) => t.re.test(`${p.nameEn} ${p.nameZh} ${p.code}`)).slice(0, 2);
  const traitItems = traitMatches.map((t) => t.item);
  const traitApps = traitMatches.map((t) => t.app).filter((x): x is Item => Boolean(x));

  const highlightsPool: Item[] = [...traitItems, ...div.highlights, ...SHARED_HIGHLIGHTS];
  const highlights = pickN(highlightsPool, 5, seed).map((x) => ({ t: L(x.t), d: L(x.d) }));

  const appsPool: Item[] = [...traitApps, ...div.applications];
  const applications = pickN(appsPool, 5, seed >>> 3).map((x) => ({ t: L(x.t), d: L(x.d) }));

  const intro = div.intro.map((x) => L(x).replace(/\{name\}/g, name));
  // Add a product-specific third paragraph carrying real, verifiable facts.
  const facts: string[] = [];
  if (p.thickness) facts.push(zh ? `源站标注厚度：${p.thickness}` : `Source catalogue thickness: ${p.thickness}`);
  if (p.width) facts.push(zh ? `源站标注幅宽：${p.width}` : `Source catalogue width: ${p.width}`);
  if (p.length) facts.push(zh ? `源站标注卷长：${p.length}` : `Source catalogue roll length: ${p.length}`);
  if (p.code) facts.push(zh ? `源站型号：${p.code}` : `Source model reference: ${p.code}`);
  intro.push(
    zh
      ? `${catName}事业部下共 ${cat?.count ?? ""} 个条目，本页为其中之一。${facts.length ? `可核对的源站信息：${facts.join("；")}。` : ""}${NOTE_ZH}`
      : `This page is one of ${cat?.count ?? ""} entries in the ${catName} division.${facts.length ? ` Source facts available for cross-checking: ${facts.join("; ")}.` : ""} ${NOTE_EN}`,
  );

  const specRows: Spec[] = [...div.specs, ...SHARED_SPECS];
  const specs: CopySpec[] = specRows.map((x) => ({ label: L(x.label), value: L(x.value) }));
  // Real measured / sourced values lead the table.
  const realSpecs: CopySpec[] = [
    ...(p.thickness ? [{ label: zh ? "厚度（源站标注）" : "Thickness (source)", value: p.thickness }] : []),
    ...(p.width ? [{ label: zh ? "幅宽（源站标注）" : "Roll width (source)", value: p.width }] : []),
    ...(p.length ? [{ label: zh ? "卷长（源站标注）" : "Roll length (source)", value: p.length }] : []),
    ...(p.code ? [{ label: zh ? "源站型号" : "Source reference", value: p.code }] : []),
    { label: zh ? "所属事业部" : "Division", value: catName },
  ];
  const allSpecs = [...realSpecs, ...specs];

  const faqs = pickN([...div.faqs, ...SHARED_FAQS], 4, seed >>> 7).map((x) => ({ q: L(x.q), a: L(x.a) }));

  return {
    intro,
    highlights,
    applications,
    specs: allSpecs,
    faqs,
    checklist: CHECKLIST[lang],
    noteEn: zh ? NOTE_ZH : NOTE_EN,
  };
}
