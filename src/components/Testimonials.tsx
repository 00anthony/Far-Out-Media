"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Far Out Media captured the soul of our brand. The cinematic quality they delivered surpassed our expectations and completely transformed our digital footprint.",
    name: "Jameson Reed",
    title: "CEO, Altitude Outdoor",
    initials: "JR",
  },
  {
    quote:
      "From the first drone shot to the final edit, every frame told our story. We saw a 3× increase in social engagement within a week of launching the video.",
    name: "Sofia Marchetti",
    title: "Marketing Director, Vela Hospitality",
    initials: "SM",
  },
  {
    quote:
      "They handled everything — planning, shooting, editing — and delivered ahead of schedule. The result felt like a Super Bowl commercial on an indie budget.",
    name: "Derek Calloway",
    title: "Founder, Ironside Fitness",
    initials: "DC",
  },
];

const AUTOPLAY_MS = 6000;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (index: number) => {
      setDirection(index > active ? 1 : -1);
      setActive(index);
    },
    [active]
  );

  const next = useCallback(() => {
    const nextIndex = (active + 1) % TESTIMONIALS.length;
    setDirection(1);
    setActive(nextIndex);
  }, [active]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused, next]);

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 48 : -48,
      filter: "blur(4px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -48 : 48,
      filter: "blur(4px)",
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  const t = TESTIMONIALS[active];

  return (
    <section className="relative py-36 bg-[#0E0E0E] overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#C2B280]/5 rounded-full blur-[130px]" />
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto">

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-px w-10 bg-[#C2B280]/50" />
            <span className="text-[#C2B280] text-[18px] font-bold tracking-[0.5em] uppercase">
              Client Stories
            </span>
            <div className="h-px w-10 bg-[#C2B280]/50" />
          </div>

          {/* Card */}
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Decorative border */}
            <div className="absolute -inset-px rounded-sm bg-linear-to-b from-[#C2B280]/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative border border-white/6 bg-white/2 backdrop-blur-sm px-8 md:px-16 py-14 md:py-20 overflow-hidden">

              {/* Large background quote mark */}
              <span
                className="pointer-events-none absolute -top-4 -left-2 text-[160px] md:text-[220px] font-black leading-none text-[#C2B280]/4 select-none"
                aria-hidden
              >
                "
              </span>

              {/* Animated testimonial content */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-center"
                >
                  {/* Quote */}
                  <p className="text-xl md:text-3xl font-medium tracking-tight leading-[1.45] text-white/90 italic mb-12">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Attribution */}
                  <div className="flex flex-col items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full border border-[#C2B280]/30 bg-[#C2B280]/10 flex items-center justify-center mb-1">
                      <span className="text-[11px] font-black tracking-wider text-[#C2B280]">
                        {t.initials}
                      </span>
                    </div>
                    <span className="text-sm font-black uppercase tracking-[0.25em] text-white">
                      {t.name}
                    </span>
                    <span className="text-[11px] text-zinc-500 uppercase tracking-[0.3em]">
                      {t.title}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Progress indicators ── */}
          <div className="mt-10 flex items-center justify-center gap-5">
            {/* Prev arrow */}
            <button
              onClick={() => go((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              aria-label="Previous testimonial"
              className="group w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-[#C2B280] transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 3L5 8L10 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Track bars */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="relative h-0.5 rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: i === active ? 40 : 16 }}
                >
                  {/* Track background */}
                  <span className="absolute inset-0 bg-white/10 rounded-full" />
                  {/* Animated fill */}
                  {i === active && (
                    <motion.span
                      className="absolute inset-y-0 left-0 bg-[#C2B280] rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: paused ? undefined : "100%" }}
                      transition={
                        paused
                          ? { duration: 0 }
                          : { duration: AUTOPLAY_MS / 1000, ease: "linear" }
                      }
                      key={`${active}-${paused}`}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Next arrow */}
            <button
              onClick={() => go((active + 1) % TESTIMONIALS.length)}
              aria-label="Next testimonial"
              className="group w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-[#C2B280] transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Review count */}
          <p className="text-center mt-5 text-[10px] tracking-[0.4em] uppercase text-zinc-700">
            {active + 1} / {TESTIMONIALS.length}
          </p>

        </div>
      </div>
    </section>
  );
}