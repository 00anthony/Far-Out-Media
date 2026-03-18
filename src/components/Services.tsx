"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FULL_PACKAGES = [
  {
    category: "Video Marketing",
    tag: "Full-Service",
    title: "Essentials",
    description:
      "Your launch point for professional brand storytelling. One focused shoot — cinematic highlight video, social-ready verticals, and drone photography.",
    bullets: ["1x Highlight Video (60–90 sec)", "2x Vertical Videos for Reels & TikTok", "4–6 Drone + 4–6 Ground Photos", "Color grading & branded titles"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    category: "Video Marketing",
    tag: "Full-Service",
    title: "Growth",
    description:
      "A full content suite balancing cinematic storytelling with social strategy. Built to make your brand stand out across every platform.",
    bullets: ["2x Highlight Videos + strategy call", "3x Vertical Videos for Reels & TikTok", "8–10 Drone + 8–10 Ground Photos", "Logo animation & 2 revision rounds"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    category: "Video Marketing",
    tag: "Full-Service",
    title: "Brand Builder",
    description:
      "Premium storytelling from every angle — more footage, deeper narrative, and full creative direction for brands that want a cinematic showcase.",
    bullets: ["3x Highlight Videos + shot planning", "5x Vertical Videos for Reels & TikTok", "12–15 Drone + 12–15 Ground Photos", "Sound design & priority 5–7 day delivery"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
    featured: true,
  },
  {
    category: "Aerial Marketing",
    tag: "Drone-Only",
    title: "Hover",
    description:
      "A sharp entry into aerial content. One cinematic drone edit and a vertical cut — everything you need to showcase your space from above.",
    bullets: ["1x Aerial Highlight (45–60 sec)", "1x Vertical Video for Reels & TikTok", "6 High-Res Drone Photos", "Color grading, titles & logo"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
  {
    category: "Aerial Marketing",
    tag: "Drone-Only",
    title: "Elevate",
    description:
      "Double the aerial coverage for brands that need more range. Two edits, two verticals, and a fuller photo library to work with.",
    bullets: ["2x Aerial Highlights (45–60 sec each)", "2x Vertical Videos for Reels & TikTok", "10 High-Res Drone Photos", "Color grading & 2 revision rounds"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    category: "Aerial Marketing",
    tag: "Drone-Only",
    title: "Skyline",
    description:
      "The complete aerial package. Three polished edits, a deep photo library, sound design, and priority delivery for high-stakes launches.",
    bullets: ["3x Aerial Highlights (60–90 sec each)", "3x Vertical Videos for Reels & TikTok", "15–20 High-Res Drone Photos", "Sound design & priority 3–5 day delivery"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
  },
];

// Split into two rows of 3
const ROW_ONE = FULL_PACKAGES.slice(0, 3);
const ROW_TWO = FULL_PACKAGES.slice(3, 6);

const OFFSETS = [0, 40, 80]; // px vertical offset per card in a row

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const row1InView = useInView(row1Ref, { once: true, margin: "-60px" });
  const row2InView = useInView(row2Ref, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" });

  return (
    <section id="services" className="relative py-36 bg-zinc-950 overflow-hidden">
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

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-[#C2B280]/50" />
            <span className="text-[#C2B280] text-[10px] font-bold tracking-[0.5em] uppercase">
              Our Packages
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              Services &amp;<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-500">
                Packages
              </span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs md:text-right">
              Every package is built around your goals — from a single shoot to a full brand content suite.
            </p>
          </div>
        </motion.div>

        {/* ── Category label: Video Marketing ── */}
        <CategoryLabel label="Video Marketing · Full-Service" inView={row1InView} />

        {/* ── Row 1 ── */}
        <div ref={row1Ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 md:items-start">
          {ROW_ONE.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              offsetY={OFFSETS[i]}
              inView={row1InView}
            />
          ))}
        </div>

        {/* ── Category label: Aerial Marketing ── */}
        <CategoryLabel label="Aerial Marketing · Drone-Only" inView={row2InView} delay={0.1} />

        {/* ── Row 2 ── */}
        <div ref={row2Ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROW_TWO.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              offsetY={OFFSETS[i]}
              inView={row2InView}
            />
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 24 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-20 flex flex-col items-center gap-6 text-center"
        >
          <p className="text-zinc-500 text-sm max-w-sm">
            Need something custom? Every project is different — let's build the right package for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="/services"
              className="group relative px-10 py-4 border border-white/10 text-white text-xs font-black uppercase tracking-[0.2em] overflow-hidden transition-all hover:border-[#C2B280]/50"
            >
              <span className="absolute inset-0 bg-[#C2B280]/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="relative z-10 flex items-center gap-3">
                View All Services
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a
              href="/#contact"
              className="group relative px-10 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] overflow-hidden transition-all hover:scale-[1.02] active:scale-95"
            >
              <span className="absolute inset-0 bg-[#C2B280] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="relative z-10">Get a Free Quote</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

/* ─── Sub-components ─── */

function CategoryLabel({
  label,
  inView,
  delay = 0,
}: {
  label: string;
  inView: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className="flex items-center gap-3 mb-5"
    >
      <div className="h-px w-6 bg-[#657886]/60" />
      <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#657886]">
        {label}
      </span>
    </motion.div>
  );
}

interface ServiceCardProps {
  service: (typeof FULL_PACKAGES)[number];
  index: number;
  offsetY: number;
  inView: boolean;
}

function ServiceCard({ service, index, offsetY, inView }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 + offsetY * 0.5 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      // The key visual offset: push each card down by its offsetY in normal flow
      style={{ marginTop: offsetY }}
      className="group relative flex flex-col border border-white/6 bg-black hover:border-[#C2B280]/30 transition-all duration-500"
    >
      {/* Featured badge */}
      {service.featured && (
        <div className="absolute -top-px left-6">
          <span className="inline-block bg-[#C2B280] text-black text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1">
            Most Popular
          </span>
        </div>
      )}

      {/* Top accent line — animates in on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#C2B280]/0 to-transparent group-hover:via-[#C2B280]/60 transition-all duration-700" />

      <div className="p-8 flex flex-col flex-1">
        {/* Icon */}
        <div className="mb-6 w-10 h-10 flex items-center justify-center border border-white/10 text-[#C2B280] group-hover:border-[#C2B280]/40 transition-colors group-hover:-translate-y-1 transform duration-500">
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-black tracking-tight mb-3 text-white">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-500 text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-6" />

        {/* Bullets */}
        <ul className="space-y-2 mb-8 flex-1">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-xs text-zinc-500">
              <span className="mt-1 w-1 h-1 rounded-full bg-[#C2B280]/60 shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="/services"
          className="mt-auto flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-white/30 group-hover:text-[#C2B280] transition-colors duration-300"
        >
          See Details
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}