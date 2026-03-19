"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────── */
export interface ProcessStep {
  id: string;        // e.g. "01"
  title: string;     // e.g. "Discover"
  desc: string;      // body copy
}

export interface ProcessData {
  eyebrow: string;
  heading: string;
  subheading: string;
  accentColor: string;
  steps: ProcessStep[];
}

/* ─────────────────────────────────────────────────────────────────────
   DEFAULTS
───────────────────────────────────────────────────────────────────── */
const DEFAULTS: ProcessData = {
  eyebrow: "How We Work",
  heading: "Our Workflow",
  subheading: "From concept to screen",
  accentColor: "#C2B280",
  steps: [
    { id: "01", title: "Discover",  desc: "We dive deep into your goals, audience, and the story that needs to be told." },
    { id: "02", title: "Create",    desc: "Planning, storyboarding, and scouting for the perfect cinematic shots." },
    { id: "03", title: "Capture",   desc: "High-production filming with professional equipment and elite drone operation." },
    { id: "04", title: "Deliver",   desc: "Expert editing, color grading, and ready-to-use social and web assets." },
  ],
};

const ease = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────── */
export default function Process({ data }: { data?: ProcessData | null }) {
  const d: ProcessData = data ?? DEFAULTS;

  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const stepsRef    = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const stepsInView  = useInView(stepsRef,  { once: true, margin: "-60px" });

  // Subtle parallax on the large background number
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-36 bg-black border-y border-white/5 overflow-hidden"
    >
      {/* ── Ambient glow ── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 rounded-full blur-[160px] opacity-[0.07]"
          style={{ background: d.accentColor }}
        />
      </div>

      {/* ── Grain ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* ── Large parallax background word ── */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        aria-hidden
      >
        <span className="text-[22vw] font-black tracking-tighter text-white/2 uppercase leading-none whitespace-nowrap">
          Process
        </span>
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
          className="mb-24"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8">
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

          {/* Heading row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              {d.heading}
            </h2>
            <span className="text-xs font-bold tracking-[0.4em] text-zinc-600 uppercase self-center md:self-end">
              {d.subheading}
            </span>
          </div>
        </motion.div>

        {/* ── Steps ── */}
        <div ref={stepsRef} className="relative">

          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-11 left-0 right-0 h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={stepsInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease }}
              style={{ transformOrigin: "left" }}
              className="h-full bg-linear-to-r from-transparent via-white/10 to-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {d.steps.map((step, i) => (
              <StepCard
                key={step.id}
                step={step}
                index={i}
                inView={stepsInView}
                accentColor={d.accentColor}
                isLast={i === d.steps.length - 1}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Step card ──────────────────────────────────────────────────────── */
function StepCard({
  step,
  index,
  inView,
  accentColor,
  isLast,
}: {
  step: ProcessStep;
  index: number;
  inView: boolean;
  accentColor: string;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cardInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
      className="group relative"
    >
      {/* Vertical connector line — mobile only */}
      {!isLast && (
        <div className="lg:hidden absolute bottom-0 left-10 w-px h-8 bg-white/10 translate-y-full" />
      )}

      {/* Card inner */}
      <div className="relative p-8 lg:pt-0 border-l border-white/5 lg:border-l-0 lg:pr-10">

        {/* Step indicator — the dot on the horizontal line */}
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={cardInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.12 + 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative w-5 h-5 rounded-full border flex items-center justify-center shrink-0"
            style={{ borderColor: `${accentColor}60` }}
          >
            {/* Pulsing ring on hover */}
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-[2] transition-all duration-700"
              style={{ background: `${accentColor}15` }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: accentColor }}
            />
          </motion.div>

          <span
            className="text-[10px] font-black tracking-[0.3em] uppercase"
            style={{ color: `${accentColor}80` }}
          >
            Step {step.id}
          </span>
        </div>

        {/* Large ghost number */}
        <div className="relative mb-6 overflow-hidden">
          <motion.span
            initial={{ y: "60%", opacity: 0 }}
            animate={cardInView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            className="block text-[5rem] font-black leading-none tracking-tighter text-white/4 group-hover:text-white/[0.07] transition-colors duration-500 select-none"
            aria-hidden
          >
            {step.id}
          </motion.span>

          {/* Title overlaps the ghost number */}
          <motion.h3
            initial={{ y: 12, opacity: 0 }}
            animate={cardInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.25, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-2xl font-black tracking-tight text-white -mt-10 relative z-10"
          >
            {step.title}
          </motion.h3>
        </div>

        {/* Bottom accent line — grows on hover */}
        <div className="relative mb-5 h-px bg-white/6 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 h-full"
            style={{ background: accentColor }}
            initial={{ width: "0%" }}
            whileInView={{ width: "30%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.12 + 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          />
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={cardInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-zinc-500 text-sm leading-relaxed"
        >
          {step.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}