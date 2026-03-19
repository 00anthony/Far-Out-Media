"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────── */
export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  initials: string;
}

export interface TestimonialsData {
  eyebrow: string;
  accentColor: string;
  testimonials: Testimonial[];
}

/* ─────────────────────────────────────────────────────────────────────
   DEFAULTS
───────────────────────────────────────────────────────────────────── */
const DEFAULTS: TestimonialsData = {
  eyebrow: "Client Stories",
  accentColor: "#C2B280",
  testimonials: [
    {
      quote: "Far Out Media captured the soul of our brand. The cinematic quality they delivered surpassed our expectations and completely transformed our digital footprint.",
      name: "Jameson Reed",
      title: "CEO, Altitude Outdoor",
      initials: "JR",
    },
    {
      quote: "From the first drone shot to the final edit, every frame told our story. We saw a 3× increase in social engagement within a week of launching the video.",
      name: "Sofia Marchetti",
      title: "Marketing Director, Vela Hospitality",
      initials: "SM",
    },
    {
      quote: "They handled everything — planning, shooting, editing — and delivered ahead of schedule. The result felt like a Super Bowl commercial on an indie budget.",
      name: "Derek Calloway",
      title: "Founder, Ironside Fitness",
      initials: "DC",
    },
  ],
};

const ease = [0.16, 1, 0.3, 1] as const;
const OFFSETS = [0, 32, 16]; // desktop stagger offsets

/* ─────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────── */
export default function Testimonials({ data }: { data?: TestimonialsData | null }) {
  const d: TestimonialsData = data ?? DEFAULTS;

  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const gridInView   = useInView(gridRef,   { once: true, margin: "-60px" });

  // Track which card is snapped into view on mobile for the dot indicator
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    // Each card is 85vw wide + 1rem gap — find the closest snapped card
    const cardWidth = el.scrollWidth / d.testimonials.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, d.testimonials.length - 1));
  };

  return (
    <section className="relative py-18 bg-[#0E0E0E] overflow-hidden">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 rounded-full blur-[150px] opacity-[0.06]"
          style={{ background: d.accentColor }}
        />
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10">

        {/* ── Header — respects container padding ── */}
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.9, ease }}
                style={{ transformOrigin: "left", background: `${d.accentColor}80` }}
                className="h-px w-12"
              />
              <span
                className="text-[10px] font-bold tracking-[0.5em] uppercase"
                style={{ color: d.accentColor }}
              >
                {d.eyebrow}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                What Our <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-600">
                  Clients Say.
                </span>
              </h2>
              <p className="text-zinc-600 text-xs tracking-[0.3em] uppercase max-w-xs md:text-right">
                Real results from real brands
              </p>
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════
            DESKTOP — 3-column staggered grid
            (hidden on mobile)
        ════════════════════════════════════ */}
        <div className="container mx-auto px-6 md:px-12">
          <div
            ref={gridRef}
            className="hidden md:grid md:grid-cols-3 gap-6 md:items-start"
          >
            {d.testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 + (OFFSETS[i % OFFSETS.length] ?? 0) * 0.5 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: i * 0.12, ease }}
                style={{ marginTop: OFFSETS[i % OFFSETS.length] ?? 0 }}
              >
                <TestimonialCard
                  testimonial={t}
                  accentColor={d.accentColor}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════
            MOBILE — horizontal snap scroll
            (hidden on desktop)
            Bleeds to the right edge of the screen
            so the user can see the next card peeking.
        ════════════════════════════════════ */}
        <div className="md:hidden">
          {/* Scroll track — starts at the same left padding as the container
              but bleeds to the right with no right padding so the next card peeks */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto pl-6 pr-6 snap-x snap-mandatory"
            style={{
              // Hide scrollbar across browsers
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {d.testimonials.map((t, i) => (
              <div
                key={i}
                // 85vw makes the current card fill most of the screen
                // while the next one peeks from the right
                className="snap-start shrink-0 w-[85vw]"
              >
                <TestimonialCard
                  testimonial={t}
                  accentColor={d.accentColor}
                />
              </div>
            ))}

            {/* Right padding spacer so the last card can fully snap */}
            <div className="shrink-0 w-6" aria-hidden />
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-6 px-6">
            {d.testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  const cardWidth = el.scrollWidth / d.testimonials.length;
                  el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
                  setActiveIndex(i);
                }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activeIndex ? 24 : 6,
                  height: 6,
                  background: i === activeIndex
                    ? d.accentColor
                    : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          {/* Scroll hint — fades after first interaction */}
          <p className="text-center mt-4 text-[10px] tracking-[0.35em] uppercase text-zinc-700">
            Swipe to explore
          </p>
        </div>

      </div>
    </section>
  );
}

/* ─── Shared card — used by both desktop grid and mobile scroll ──────── */
function TestimonialCard({
  testimonial: t,
  accentColor,
}: {
  testimonial: Testimonial;
  accentColor: string;
}) {
  return (
    <div className="group relative flex flex-col h-full border border-white/6 bg-white/2 backdrop-blur-sm hover:border-white/12 transition-colors duration-500">
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to right, transparent, ${accentColor}60, transparent)`,
        }}
      />

      <div className="p-8 flex flex-col flex-1">
        {/* Decorative quote mark */}
        <span
          className="block text-6xl font-black leading-none select-none"
          style={{ color: `${accentColor}20` }}
          aria-hidden
        >
          "
        </span>

        {/* Quote */}
        <p className="text-zinc-300 text-sm md:text-base leading-[1.75] italic flex-1 mb-10">
          &ldquo;{t.quote}&rdquo;
        </p>

        {/* Divider */}
        <div className="h-px bg-white/6 mb-6" />

        {/* Attribution */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
            style={{
              borderColor: `${accentColor}40`,
              background: `${accentColor}12`,
            }}
          >
            <span
              className="text-[10px] font-black tracking-wider"
              style={{ color: accentColor }}
            >
              {t.initials}
            </span>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white leading-none mb-0.5">
              {t.name}
            </p>
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
              {t.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}