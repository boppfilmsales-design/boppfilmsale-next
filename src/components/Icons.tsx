/** Inline SVG icon set — no external requests, no emoji. */
type P = { className?: string; size?: number };

const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
});

export const IconArrow = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconCheck = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M20 6 9 17l-5-5" /></svg>
);
export const IconPlus = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconChevron = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="m6 9 6 6 6-6" /></svg>
);
export const IconFilm = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" /></svg>
);
export const IconLayers = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17l9 5 9-5" /></svg>
);
export const IconShield = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M12 3 4 6v6c0 5 3.4 8.2 8 9 4.6-.8 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const IconGlobe = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" /></svg>
);
export const IconBox = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" /><path d="m3 8 9 5 9-5M12 13v8" /></svg>
);
export const IconCog = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1-2 3.4-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21h-4v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-2-3.4.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2-3.4.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3h4v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 2 3.4-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1H21v4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></svg>
);
export const IconSun = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const IconTag = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M20.6 13.4 12 22l-9-9V4h9l8.6 8.6a1.4 1.4 0 0 1 0 2Z" /><circle cx="7.5" cy="8.5" r="1.2" /></svg>
);
export const IconPaper = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M6 3h8l5 5v13H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5M9 13h7M9 17h7" /></svg>
);
export const IconPhone = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M21 16.4v2.6a2 2 0 0 1-2.2 2 18 18 0 0 1-7.9-2.8 17.6 17.6 0 0 1-5.4-5.4A18 18 0 0 1 2.7 4.9 2 2 0 0 1 4.7 3h2.6a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.4 10.8a14 14 0 0 0 4.8 4.8l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 1.7Z" /></svg>
);
export const IconMail = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
export const IconPin = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></svg>
);
export const IconClock = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
);
export const IconMessage = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M21 12a8 8 0 0 1-8 8H7l-4 3 1.2-4.2A8 8 0 1 1 21 12Z" /><path d="M8 11h8M8 14h5" /></svg>
);
export const IconMenu = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M3 6h18M3 12h18M3 18h18" /></svg>
);
export const IconClose = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M18 6 6 18M6 6l12 12" /></svg>
);

/** Icon chosen for a category slug. */
export function CategoryIcon({ slug, size = 20 }: { slug: string; size?: number }) {
  if (slug.includes("bopp") || slug.includes("bopet") || slug.includes("ps-cpp") || slug.includes("pe-pvc")) return <IconFilm size={size} />;
  if (slug.includes("coated")) return <IconLayers size={size} />;
  if (slug.includes("tape") || slug.includes("glue")) return <IconTag size={size} />;
  if (slug.includes("ribbon") || slug.includes("label")) return <IconTag size={size} />;
  if (slug.includes("paper")) return <IconPaper size={size} />;
  if (slug.includes("machinery")) return <IconCog size={size} />;
  if (slug.includes("solar")) return <IconSun size={size} />;
  if (slug.includes("auto")) return <IconBox size={size} />;
  return <IconLayers size={size} />;
}
