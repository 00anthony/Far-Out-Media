"use client";

// app/services/ServicesClient.tsx
//
// Receives the pre-fetched Sanity data as a prop and handles all
// interactivity: filter tabs, expand/collapse, tab switching, FAQ accordion.

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Package, Deliverable, AddOn, FAQ } from "./types";

/* ─── Helpers ────────────────────────────────────────────────────────── */
function priceLabel(p: Package["pricing"]) {
  if (p.label) return p.label;
  if (p.startingAt && p.upTo)
    return `$${p.startingAt.toLocaleString()} – $${p.upTo.toLocaleString()}`;
  if (p.startingAt) return `From $${p.startingAt.toLocaleString()}`;
  return "Contact for pricing";
}

function timelineLabel(t: Package["timeline"]) {
  if (t.label) return t.label;
  if (t.minDays && t.maxDays) return `${t.minDays}–${t.maxDays} days`;
  return "Contact us";
}

const ease = [0.16, 1, 0.3, 1] as const;

/* ═══════════════════════════════════════════════════════════════════════
   ROOT CLIENT COMPONENT
═══════════════════════════════════════════════════════════════════════ */
export default function ServicesClient({ packages }: { packages: Package[] }) {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "video-marketing" | "aerial-marketing"
  >("all");
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  const filtered = packages.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-[#C2B280]/30">
      {/* Noise grain */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative pt-40 pb-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-[#C2B280]/6 rounded-full blur-[150px]" />
          <div className="absolute top-20 right-0 w-75 h-75 bg-[#94aec2]/5 rounded-full blur-[100px]" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#C2B280 1px, transparent 1px), linear-gradient(90deg, #C2B280 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-10 bg-[#C2B280]/50" />
              <span className="text-[#C2B280] text-[10px] font-bold tracking-[0.5em] uppercase">
                Far Out Media
              </span>
            </div>
            <div className="max-w-4xl">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">
                Services &amp;{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-br from-white via-zinc-300 to-zinc-600">
                  Packages
                </span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl">
                Cinematic drone footage blended with ground-level storytelling —
                from a single focused shoot to a full brand content suite. Every
                package is built around your goals, handled end-to-end.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-16 flex flex-wrap gap-x-16 gap-y-6 border-t border-white/6 pt-10"
          >
            {[
              { value: "FAA", label: "Part 107 Licensed" },
              { value: "3–10", label: "Day Turnaround" },
              { value: `${packages.length}`, label: "Package Tiers" },
              { value: "∞", label: "Creative Scope" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-black tracking-tight text-[#C2B280]">
                  {s.value}
                </p>
                <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Filter tabs ── */}
      <div className="sticky top-15 z-40 bg-[#080808]/90 backdrop-blur-md border-b border-white/6">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-1 py-4 overflow-x-auto">
            {(
              [
                { id: "all", label: "All Packages" },
                { id: "video-marketing", label: "Video Marketing" },
                { id: "aerial-marketing", label: "Aerial / Drone" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`relative px-5 py-2 text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-200 ${
                  activeCategory === tab.id
                    ? "text-black"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {activeCategory === tab.id && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-[#C2B280]"
                    transition={{ duration: 0.35, ease }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Packages ── */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12 space-y-6">
          {/* Empty state if Sanity has no documents yet */}
          {filtered.length === 0 && (
            <div className="py-32 text-center text-zinc-600 text-sm tracking-widest uppercase">
              No packages found — add some in Sanity Studio.
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {filtered.map((pkg, i) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                index={i}
                isExpanded={expandedPackage === pkg.id}
                onToggle={() =>
                  setExpandedPackage(expandedPackage === pkg.id ? null : pkg.id)
                }
              />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <BottomCTA />
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PACKAGE CARD
═══════════════════════════════════════════════════════════════════════ */
function PackageCard({
  pkg,
  index,
  isExpanded,
  onToggle,
}: {
  pkg: Package;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeTab, setActiveTab] = useState<"deliverables" | "addons" | "faq">(
    "deliverables"
  );

  const categoryLabel =
    pkg.category === "video-marketing"
      ? "Video Marketing · Full-Service"
      : "Aerial Marketing · Drone-Only";

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease }}
      className={`group relative border transition-colors duration-500 ${
        pkg.featured
          ? "border-[#C2B280]/40 bg-[#C2B280]/3"
          : "border-white/6 bg-white/1 hover:border-white/10"
      }`}
    >
      {pkg.featured && (
        <div className="absolute -top-px left-8">
          <span className="inline-block bg-[#C2B280] text-black text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1">
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-8 md:p-10"
        aria-expanded={isExpanded}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#657886] mb-2">
              {categoryLabel}
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-2">
              {pkg.title}
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">
              {pkg.tagline}
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-3 md:items-end shrink-0">
            <MetaPill
              icon={
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label={priceLabel(pkg.pricing)}
              highlight={pkg.featured}
            />
            <MetaPill
              icon={
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label={timelineLabel(pkg.timeline)}
            />
            <div
              className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase mt-1 transition-colors duration-200 ${
                isExpanded
                  ? "text-[#C2B280]"
                  : "text-zinc-600 group-hover:text-zinc-400"
              }`}
            >
              {isExpanded ? "Close" : "See Details"}
              <motion.svg
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease }}
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </div>
        </div>
      </button>

      {/* Expanded panel */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/6 px-8 md:px-10 pb-10 pt-0">
              <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl pt-8 mb-8">
                {pkg.description}
              </p>

              {/* Tabs */}
              <div className="flex gap-0 border-b border-white/6 mb-8">
                {(["deliverables", "addons", "faq"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-5 py-3 text-[10px] font-black tracking-[0.25em] uppercase transition-colors duration-200 ${
                      activeTab === tab
                        ? "text-[#C2B280]"
                        : "text-zinc-600 hover:text-zinc-300"
                    }`}
                  >
                    {tab === "deliverables" && "What You Get"}
                    {tab === "addons" && "Add-Ons"}
                    {tab === "faq" && "FAQ"}
                    {activeTab === tab && (
                      <motion.div
                        layoutId={`tab-underline-${pkg.id}`}
                        className="absolute bottom-0 left-0 right-0 h-px bg-[#C2B280]"
                        transition={{ duration: 0.3, ease }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                {activeTab === "deliverables" && (
                  <motion.div
                    key="deliverables"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {pkg.deliverables.map((d: Deliverable, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 border border-white/4 bg-white/1"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C2B280]/70 shrink-0" />
                        <div>
                          <p className="text-sm text-white/80 font-medium">{d.label}</p>
                          {d.detail && (
                            <p className="text-xs text-zinc-600 mt-0.5">{d.detail}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "addons" && (
                  <motion.div
                    key="addons"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {pkg.addOns.map((a: AddOn, i: number) => (
                      <div
                        key={i}
                        className="p-4 border border-white/4 bg-white/1 flex flex-col gap-1"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="text-sm font-black text-white/80 tracking-tight">
                            {a.title}
                          </p>
                          <span className="text-xs font-bold text-[#C2B280] whitespace-nowrap shrink-0">
                            {a.price}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 leading-relaxed">
                          {a.description}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "faq" && (
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                    className="space-y-1 max-w-2xl"
                  >
                    {pkg.faq.map((f: FAQ, i: number) => (
                      <FAQItem
                        key={i}
                        question={f.question}
                        answer={f.answer}
                        packageId={pkg.id}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Card CTA */}
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="/#contact"
                  className="group relative px-10 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] overflow-hidden"
                >
                  <span className="absolute inset-0 bg-[#C2B280] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="relative z-10 flex items-center gap-2">
                    Get a Quote for {pkg.title}
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>
                <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-700">
                  No commitment · 24-hour response
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── FAQ accordion item ─────────────────────────────────────────────── */
function FAQItem({
  question,
  answer,
  packageId,
}: {
  question: string;
  answer: string;
  packageId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-4 text-left"
      >
        <span
          className={`text-sm font-semibold transition-colors duration-200 ${
            open ? "text-white" : "text-zinc-400"
          }`}
        >
          {question}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
            open ? "text-[#C2B280]" : "text-zinc-700"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={`${packageId}-${question}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-sm text-zinc-500 leading-relaxed border-t border-white/4 pt-3">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Meta pill ──────────────────────────────────────────────────────── */
function MetaPill({
  icon,
  label,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-semibold ${
        highlight
          ? "border-[#C2B280]/40 text-[#C2B280] bg-[#C2B280]/5"
          : "border-white/8 text-zinc-400"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

/* ─── Bottom CTA ─────────────────────────────────────────────────────── */
function BottomCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-40 overflow-hidden border-t border-white/4"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-175 h-100 bg-[#C2B280]/5 rounded-full blur-[130px]" />
      </div>
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#C2B280] block mb-6">
            Not Sure Which Package?
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
            Let's Build the{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-600">
              Right Fit.
            </span>
          </h2>
          <p className="text-zinc-500 max-w-md mx-auto mb-12 leading-relaxed">
            Every project is different. Tell us what you're working toward and
            we'll recommend the right package — or build a custom one.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/#contact"
              className="group relative px-14 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.2em] overflow-hidden"
            >
              <span className="absolute inset-0 bg-[#C2B280] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="relative z-10">Get a Free Quote</span>
            </a>
            <a
              href="/"
              className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-600 hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Back to Home
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}