import Link from "next/link";
import { SITE, UI, type Lang } from "@/content/site";
import { IconArrow, IconMail, IconClock } from "../Icons";

export default function FinalCta({
  lang,
  title,
  body,
  note,
}: {
  lang: Lang;
  title: string;
  body: string;
  note?: string;
}) {
  const u = UI[lang];
  const base = lang === "zh" ? "/zh" : "/en";
  return (
    <section className="final-cta">
      <div className="wrap final-cta-inner">
        <span className="eyebrow">{u.getQuote}</span>
        <h2>{title}</h2>
        <p>{body}</p>
        <div className="btn-row">
          <Link href={`${base}/contact`} className="btn btn-primary">
            {u.getQuote} <IconArrow size={16} />
          </Link>
          <a href={`mailto:${SITE.email}`} className="btn btn-ghost-light">
            <IconMail size={16} /> {SITE.email}
          </a>
        </div>
        <p className="note">
          <IconClock size={14} /> {u.responseTime} · {note || u.noObligation}
        </p>
      </div>
    </section>
  );
}
