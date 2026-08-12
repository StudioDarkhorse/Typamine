import { dynamicTextStyle, dynamicBgStyle } from "@/lib/dynamicStyle";

interface HomepageBannerProps {
  text: string;
  textColorClassName?: string;
  bgColorClassName?: string;
}

// Banner scorrevole a larghezza piena sotto l'hero, per il placement
// "homepage_banner" (vedi /admin/settings, tab "Promo Website Communication").
// Stessa tecnica di scroll di MarqueeBar (testo duplicato + animate-marquee-track),
// solo più alto/con testo più grande — a differenza di MarqueeBar è in normale
// flusso di documento (non fixed): non serve coordinarsi con l'offset dell'header.
export default function HomepageBanner({ text, textColorClassName, bgColorClassName }: HomepageBannerProps) {
  if (!text) return null;

  return (
    <div
      className="w-full h-16 sm:h-20 overflow-hidden flex items-center dyn-bg"
      style={dynamicBgStyle(bgColorClassName)}
    >
      <div className="flex w-max animate-marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <span
                key={idx}
                className="px-8 font-crenzo text-xl sm:text-2xl whitespace-nowrap dyn-text"
                style={dynamicTextStyle(textColorClassName)}
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
