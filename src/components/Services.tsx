"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────── */
export interface ServiceCardData {
  _id: string;
  title: string;
  category: "video-marketing" | "aerial-marketing";
  description: string;
  bullets: string[];
  featured?: boolean;
  order: number;
}

export interface ServicesData {
  eyebrow: string;
  headingFirst: string;
  headingAccent: string;
  subheading: string;
  accentColor: string;
  ctaText: string;
  ctaHref: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  packages: ServiceCardData[];
}

/* ─────────────────────────────────────────────────────────────────────
   DEFAULTS
───────────────────────────────────────────────────────────────────── */
const DEFAULTS: ServicesData = {
  eyebrow: "Our Packages",
  headingFirst: "Services &",
  headingAccent: "Packages",
  subheading: "Every package is built around your goals — from a single shoot to a full brand content suite.",
  accentColor: "#C2B280",
  ctaText: "Need something custom? Every project is different — let's build the right package for you.",
  ctaHref: "/services",
  ctaPrimaryLabel: "Get a Free Quote",
  ctaPrimaryHref: "/#contact",
  packages: [
    { _id: "1", title: "Essentials",    category: "video-marketing",  order: 1, description: "Your launch point for professional brand storytelling. One focused shoot — cinematic highlight video, social-ready verticals, and drone photography.", bullets: ["1x Highlight Video (60–90 sec)", "2x Vertical Videos for Reels & TikTok", "4–6 Drone + 4–6 Ground Photos", "Color grading & branded titles"] },
    { _id: "2", title: "Growth",        category: "video-marketing",  order: 2, description: "A full content suite balancing cinematic storytelling with social strategy. Built to make your brand stand out across every platform.", bullets: ["2x Highlight Videos + strategy call", "3x Vertical Videos for Reels & TikTok", "8–10 Drone + 8–10 Ground Photos", "Logo animation & 2 revision rounds"] },
    { _id: "3", title: "Brand Builder", category: "video-marketing",  order: 3, featured: true, description: "Premium storytelling from every angle — more footage, deeper narrative, and full creative direction.", bullets: ["3x Highlight Videos + shot planning", "5x Vertical Videos for Reels & TikTok", "12–15 Drone + 12–15 Ground Photos", "Sound design & priority 5–7 day delivery"] },
    { _id: "4", title: "Hover",         category: "aerial-marketing", order: 4, description: "A sharp entry into aerial content. One cinematic drone edit and a vertical cut.", bullets: ["1x Aerial Highlight (45–60 sec)", "1x Vertical Video for Reels & TikTok", "6 High-Res Drone Photos", "Color grading, titles & logo"] },
    { _id: "5", title: "Elevate",       category: "aerial-marketing", order: 5, description: "Double the aerial coverage for brands that need more range. Two edits, two verticals, and a fuller photo library.", bullets: ["2x Aerial Highlights (45–60 sec each)", "2x Vertical Videos for Reels & TikTok", "10 High-Res Drone Photos", "Color grading & 2 revision rounds"] },
    { _id: "6", title: "Skyline",       category: "aerial-marketing", order: 6, description: "The complete aerial package. Three polished edits, a deep photo library, sound design, and priority delivery.", bullets: ["3x Aerial Highlights (60–90 sec each)", "3x Vertical Videos for Reels & TikTok", "15–20 High-Res Drone Photos", "Sound design & priority 3–5 day delivery"] },
  ],
};

/* ─────────────────────────────────────────────────────────────────────
   ICON MAP
───────────────────────────────────────────────────────────────────── */
const ICONS: Record<string, React.ReactNode> = {
  Essentials: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  Growth: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  "Brand Builder": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3l14 9-14 9V3z" />
    </svg>
  ),
  Hover: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  Elevate: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  Skyline: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3l14 9-14 9V3z" />
    </svg>
  ),
};

const FALLBACK_ICON = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const OFFSETS = [0, 40, 80];
const ease = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────────────
   MOBILE SCROLL ROW
   Each category gets its own independent scroll track + dot indicators.
───────────────────────────────────────────────────────────────────── */
function MobileScrollRow({
  packages,
  accentColor,
  categoryLabel,
}: {
  packages: ServiceCardData[];
  accentColor: string;
  categoryLabel: string;
}) {
  const scrollRef    = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / packages.length;
    setActive(Math.min(Math.round(el.scrollLeft / cardWidth), packages.length - 1));
  };

  return (
    <div className="mb-10">
      {/* Category label */}
      <div className="flex items-center gap-3 mb-5 px-6">
        <div className="h-px w-6 bg-[#657886]/60" />
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#657886]">
          {categoryLabel}
        </span>
      </div>

      {/* Scroll track — pl-6 aligns with the rest of the page, no pr so next card peeks */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pl-6 snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            // 82vw gives enough room for the card content while
            // keeping the next card visibly peeking from the right
            className="snap-start shrink-0 w-[82vw]"
          >
            <MobileServiceCard service={pkg} accentColor={accentColor} />
          </div>
        ))}
        {/* Trailing spacer so the last card can fully snap */}
        <div className="shrink-0 w-6" aria-hidden />
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-5 px-6">
        {packages.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to package ${i + 1}`}
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const cardWidth = el.scrollWidth / packages.length;
              el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
              setActive(i);
            }}
            className="rounded-full transition-all duration-300"
            style={{
              width:  i === active ? 24 : 6,
              height: 6,
              background: i === active ? accentColor : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   MOBILE SERVICE CARD
   No marginTop stagger — that's a desktop-only visual.
───────────────────────────────────────────────────────────────────── */
function MobileServiceCard({
  service,
  accentColor,
}: {
  service: ServiceCardData;
  accentColor: string;
}) {
  const icon = ICONS[service.title] ?? FALLBACK_ICON;

  return (
    <div className="group relative flex flex-col border border-white/6 bg-black h-full">
      {service.featured && (
        <div className="absolute -top-px left-6">
          <span
            className="inline-block text-black text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1"
            style={{ background: accentColor }}
          >
            Most Popular
          </span>
        </div>
      )}

      <div className="p-7 flex flex-col flex-1">
        <div
          className="mb-5 w-10 h-10 flex items-center justify-center border border-white/10 shrink-0"
          style={{ color: accentColor }}
        >
          {icon}
        </div>

        <h3 className="text-lg font-black tracking-tight mb-2 text-white">
          {service.title}
        </h3>

        <p className="text-zinc-500 text-sm leading-relaxed mb-5">
          {service.description}
        </p>

        <div className="h-px bg-white/5 mb-5" />

        <ul className="space-y-2 mb-6 flex-1">
          {service.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-500">
              <span
                className="mt-1 w-1 h-1 rounded-full shrink-0"
                style={{ background: `${accentColor}99` }}
              />
              {b}
            </li>
          ))}
        </ul>

        <a
          href="/services"
          className="mt-auto flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase transition-colors duration-300"
          style={{ color: `${accentColor}70` }}
        >
          See Details
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SECTION
───────────────────────────────────────────────────────────────────── */
export default function Services({ data }: { data?: ServicesData | null }) {
  const d: ServicesData = data ?? DEFAULTS;

  const videoPackages  = d.packages.filter((p) => p.category === "video-marketing");
  const aerialPackages = d.packages.filter((p) => p.category === "aerial-marketing");

  const headerRef = useRef<HTMLDivElement>(null);
  const row1Ref   = useRef<HTMLDivElement>(null);
  const row2Ref   = useRef<HTMLDivElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const row1InView   = useInView(row1Ref,   { once: true, margin: "-60px" });
  const row2InView   = useInView(row2Ref,   { once: true, margin: "-60px" });
  const ctaInView    = useInView(ctaRef,    { once: true, margin: "-40px" });

  return (
    <section id="services" className="relative py-18 bg-zinc-950 overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-[#C2B280]/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-[#657886]/5 rounded-full blur-[120px]" />
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* ── Header ── */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10" style={{ background: `${d.accentColor}80` }} />
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color: d.accentColor }}>
              {d.eyebrow}
            </span>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              {d.headingFirst}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-500">
                {d.headingAccent}
              </span>
            </h2>
            <p className="text-zinc-500 text-sm">
              {d.subheading}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════
          MOBILE — two independent scroll rows
          (hidden on desktop via md:hidden)
      ════════════════════════════════════ */}
      <div className="md:hidden relative z-10">
        {videoPackages.length > 0 && (
          <MobileScrollRow
            packages={videoPackages}
            accentColor={d.accentColor}
            categoryLabel="Video Marketing · Full-Service"
          />
        )}
        {aerialPackages.length > 0 && (
          <MobileScrollRow
            packages={aerialPackages}
            accentColor={d.accentColor}
            categoryLabel="Aerial Marketing · Drone-Only"
          />
        )}
      </div>

      {/* ════════════════════════════════════
          DESKTOP — two staggered grid rows
          (hidden on mobile via hidden md:block)
      ════════════════════════════════════ */}
      <div className="hidden md:block container mx-auto px-6 md:px-12 relative z-10">
        {videoPackages.length > 0 && (
          <>
            <CategoryLabel label="Video Marketing · Full-Service" inView={row1InView} />
            <div ref={row1Ref} className="grid grid-cols-3 gap-6 mb-6 items-start">
              {videoPackages.map((pkg, i) => (
                <ServiceCard
                  key={pkg._id}
                  service={pkg}
                  index={i}
                  offsetY={OFFSETS[i] ?? 0}
                  inView={row1InView}
                  accentColor={d.accentColor}
                />
              ))}
            </div>
          </>
        )}

        {aerialPackages.length > 0 && (
          <>
            <CategoryLabel label="Aerial Marketing · Drone-Only" inView={row2InView} delay={0.1} />
            <div ref={row2Ref} className="grid grid-cols-3 gap-6">
              {aerialPackages.map((pkg, i) => (
                <ServiceCard
                  key={pkg._id}
                  service={pkg}
                  index={i}
                  offsetY={OFFSETS[i] ?? 0}
                  inView={row2InView}
                  accentColor={d.accentColor}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── CTA ── */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 24 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-16 md:mt-20 flex flex-col items-center gap-6 text-center"
        >
          <p className="text-zinc-500 text-sm max-w-sm">{d.ctaText}</p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={d.ctaHref}
              className="group relative px-10 py-4 border border-white/10 text-white text-xs font-black uppercase tracking-[0.2em] overflow-hidden transition-all hover:border-[#C2B280]/50"
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ background: `${d.accentColor}1a` }}
              />
              <span className="relative z-10 flex items-center gap-3">
                View All Services
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a
              href={d.ctaPrimaryHref}
              className="group relative px-10 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] overflow-hidden transition-all hover:scale-[1.02] active:scale-95"
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ background: d.accentColor }}
              />
              <span className="relative z-10">{d.ctaPrimaryLabel}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CategoryLabel — desktop only ──────────────────────────────────── */
function CategoryLabel({ label, inView, delay = 0 }: { label: string; inView: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className="flex items-center gap-3 mb-5"
    >
      <div className="h-px w-6 bg-[#657886]/60" />
      <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#657886]">{label}</span>
    </motion.div>
  );
}

/* ─── ServiceCard — desktop only ────────────────────────────────────── */
function ServiceCard({ service, index, offsetY, inView, accentColor }: {
  service: ServiceCardData; index: number; offsetY: number; inView: boolean; accentColor: string;
}) {
  const icon = ICONS[service.title] ?? FALLBACK_ICON;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 + offsetY * 0.5 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      style={{ marginTop: offsetY }}
      className="group relative flex flex-col border border-white/6 bg-black hover:border-[#C2B280]/30 transition-colors duration-500"
    >
      {service.featured && (
        <div className="absolute -top-px left-6">
          <span className="inline-block text-black text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1" style={{ background: accentColor }}>
            Most Popular
          </span>
        </div>
      )}

      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#C2B280]/0 to-transparent group-hover:via-[#C2B280]/60 transition-all duration-700" />

      <div className="p-8 flex flex-col flex-1">
        <div
          className="mb-6 w-10 h-10 flex items-center justify-center border border-white/10 group-hover:border-[#C2B280]/40 transition-colors group-hover:-translate-y-1 transform duration-500"
          style={{ color: accentColor }}
        >
          {icon}
        </div>

        <h3 className="text-xl font-black tracking-tight mb-3 text-white">{service.title}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-6">{service.description}</p>
        <div className="h-px bg-white/5 mb-6" />

        <ul className="space-y-2 mb-8 flex-1">
          {service.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-500">
              <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: `${accentColor}99` }} />
              {b}
            </li>
          ))}
        </ul>

        <a href="/services" className="mt-auto flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-white/30 group-hover:text-[#C2B280] transition-colors duration-300">
          See Details
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}