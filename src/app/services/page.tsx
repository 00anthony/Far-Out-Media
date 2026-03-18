"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

/* ─────────────────────────────────────────────────────────────────────────
   DATA — mirrors the Sanity `servicePackage` schema.
   When Sanity is live, replace this with a GROQ fetch:

   const PACKAGES = await client.fetch(`
     *[_type == "servicePackage"] | order(category asc, order asc) {
       title, slug, category, featured, tagline, description,
       pricing, timeline, deliverables, addOns, faq
     }
   `)
───────────────────────────────────────────────────────────────────────── */
const PACKAGES: Package[] = [
  // ── VIDEO MARKETING ──────────────────────────────────────────────────
  {
    id: "essentials",
    category: "video-marketing",
    title: "Essentials",
    tagline: "Your launch point for professional brand storytelling.",
    description:
      "A focused shoot that delivers stunning visuals and social-ready content. Perfect for first-time clients or single-project features.",
    pricing: { startingAt: 800, upTo: 1200 },
    timeline: { minDays: 7, maxDays: 10 },
    deliverables: [
      { label: "1× Highlight Video (60–90 sec)", detail: "Cinematic promo blending drone & ground footage" },
      { label: "2× Vertical Videos (15–30 sec each)", detail: "Optimised for Reels, TikTok & YouTube Shorts" },
      { label: "Professional colour grading" },
      { label: "Branded title text" },
      { label: "Optional music licensing" },
      { label: "4–6 High-Res Drone Photos" },
      { label: "4–6 High-Res Ground Photos" },
      { label: "1 round of revisions" },
    ],
    addOns: [
      { title: "Extra Revision Round", price: "+$100", description: "One additional round of feedback & changes." },
      { title: "Music Licensing", price: "+$75", description: "Premium licensed track matched to your brand." },
      { title: "Rush Delivery (3–4 days)", price: "+$250", description: "Priority editing queue, delivered in under 4 days." },
      { title: "Additional Vertical Cut", price: "+$120", description: "Extra platform-optimised short-form video." },
    ],
    faq: [
      { question: "How long does a typical shoot day take?", answer: "Most Essentials shoots run 2–4 hours depending on the location and scope. We plan every shot in advance so there's no wasted time on set." },
      { question: "Do I need to provide a script or shot list?", answer: "No — we handle all creative direction. You'll receive a brief questionnaire beforehand so we understand your brand, and we build the shot plan from there." },
      { question: "Can I use the videos on my website?", answer: "Absolutely. All delivered files are yours to use across any owned channel — website, social, paid ads, email, or presentations." },
      { question: "What if I'm not happy with the first edit?", answer: "Your package includes 1 revision round. You'll provide consolidated feedback and we'll turn around the updated cut within 48 hours." },
    ],
  },
  {
    id: "growth",
    category: "video-marketing",
    title: "Growth",
    tagline: "Expand your reach with a full content suite.",
    description:
      "Balances cinematic storytelling with social strategy. Designed for businesses ready to stand out across web and social platforms.",
    pricing: { startingAt: 1600, upTo: 2400 },
    timeline: { minDays: 7, maxDays: 12 },
    deliverables: [
      { label: "Pre-shoot strategy call & shot planning" },
      { label: "2× Highlight Videos (60–90 sec each)", detail: "Cinematic promos blending drone & ground footage" },
      { label: "3× Vertical Videos (15–30 sec each)", detail: "Optimised for Reels, TikTok & YouTube Shorts" },
      { label: "Professional colour grading" },
      { label: "Branded title text & logo animation" },
      { label: "Optional music licensing" },
      { label: "8–10 High-Res Drone Photos" },
      { label: "8–10 High-Res Ground Photos" },
      { label: "2 rounds of revisions" },
    ],
    addOns: [
      { title: "Extra Vertical Cut", price: "+$120", description: "Additional short-form video for a new platform or campaign." },
      { title: "Music Licensing", price: "+$75", description: "Premium licensed track matched to your brand." },
      { title: "Rush Delivery (4–5 days)", price: "+$300", description: "Priority queue for time-sensitive launches." },
      { title: "Extended Highlight (2–3 min)", price: "+$200", description: "Longer cut for website hero or YouTube." },
      { title: "Captions & Subtitles", price: "+$80", description: "Burned-in or .srt file for all vertical videos." },
    ],
    faq: [
      { question: "What happens on the strategy call?", answer: "We spend 30–45 minutes understanding your brand, goals, audience, and any specific moments or angles you want captured. We leave with a full shot list ready for shoot day." },
      { question: "How are the two highlight videos different?", answer: "Typically one is a longer brand story (hero video for your website) and one is a punchier, faster-cut version built for paid social. We plan the distinction during your strategy call." },
      { question: "Can I split the deliverables across two shoot days?", answer: "Yes — for Growth packages we're happy to schedule a two-day shoot if your project requires different locations or conditions (e.g. golden hour drone + interior ground)." },
      { question: "Are the photos edited?", answer: "All drone and ground photos are colour-graded and exported at full resolution, ready for web and print use." },
    ],
  },
  {
    id: "brand-builder",
    category: "video-marketing",
    title: "Brand Builder",
    tagline: "Premium storytelling from every angle.",
    description:
      "More footage, more story depth, and more creative direction. Built for brands that want a complete, cinematic showcase across every channel.",
    pricing: { startingAt: 2800, upTo: 4500 },
    timeline: { label: "Priority 5–7 days" },
    featured: true,
    deliverables: [
      { label: "Pre-shoot strategy call & shot planning" },
      { label: "3× Highlight Videos (60–90 sec each)", detail: "Cinematic promos blending drone & ground footage" },
      { label: "5× Vertical Videos (15–30 sec each)", detail: "Optimised for Reels, TikTok & YouTube Shorts" },
      { label: "Professional colour grading" },
      { label: "Branded titles, logo animation & sound design" },
      { label: "Optional music licensing" },
      { label: "12–15 High-Res Drone Photos" },
      { label: "12–15 High-Res Ground Photos" },
      { label: "Priority delivery (5–7 days)" },
      { label: "2 rounds of revisions" },
    ],
    addOns: [
      { title: "Behind-the-Scenes Reel", price: "+$150", description: "Raw + lightly edited BTS content for authentic social storytelling." },
      { title: "Extended Brand Film (3–5 min)", price: "+$400", description: "Long-form documentary-style video for web, pitch decks, and investors." },
      { title: "Music Licensing", price: "+$75", description: "Premium licensed track matched to your brand." },
      { title: "Captions & Subtitles", price: "+$80", description: "Burned-in or .srt file for all vertical videos." },
      { title: "Monthly Retainer (priority booking)", price: "From $1,200/mo", description: "Ongoing content creation — one shoot per month at a reduced rate." },
    ],
    faq: [
      { question: "Is this suitable for a product launch?", answer: "It's ideal for launches. The multi-video output gives you a hero video, supporting social content, and a deep photo library to fuel weeks of campaign activity." },
      { question: "How does sound design work?", answer: "Beyond music, our sound design layer adds ambient audio, transitions, and subtle SFX to give your video a cinematic texture that separates it from standard productions." },
      { question: "What does priority delivery mean?", answer: "Brand Builder clients go to the front of our editing queue. Your first draft is typically delivered within 5 days of shoot completion." },
      { question: "Can I brief the team on our brand guidelines?", answer: "Absolutely — we encourage it. Send over your brand guide, colour palette, font stack, and any reference videos before the strategy call. The better the brief, the better the output." },
    ],
  },

  // ── AERIAL MARKETING ─────────────────────────────────────────────────
  {
    id: "hover",
    category: "aerial-marketing",
    title: "Hover",
    tagline: "Sharp aerial content, no fluff.",
    description:
      "A focused entry into drone content. One cinematic aerial edit and a vertical cut — everything you need to showcase your space from above.",
    pricing: { startingAt: 450, upTo: 650 },
    timeline: { minDays: 5, maxDays: 7 },
    deliverables: [
      { label: "1× Aerial Highlight Video (45–60 sec)", detail: "Cinematic edit showcasing your space or brand" },
      { label: "1× Vertical Video (15–30 sec)", detail: "Optimised for Reels, TikTok & YouTube Shorts" },
      { label: "Professional colour grading" },
      { label: "Optional music licensing" },
      { label: "Branded titles & logo" },
      { label: "6 High-Res Drone Photos" },
      { label: "1 round of revisions" },
    ],
    addOns: [
      { title: "Extra Vertical Cut", price: "+$100", description: "Additional short-form cut for a new platform." },
      { title: "Music Licensing", price: "+$75", description: "Premium licensed track matched to your brand." },
      { title: "Rush Delivery (2–3 days)", price: "+$150", description: "Fast-tracked delivery for time-sensitive use." },
      { title: "Upgrade to Elevate", price: "Price difference", description: "Seamlessly upgrade mid-project if scope grows." },
    ],
    faq: [
      { question: "Is FAA licensing included?", answer: "Yes — every Far Out Media shoot is conducted by FAA Part 107 certified pilots. We handle all airspace authorisations so you don't have to." },
      { question: "What if weather conditions are poor on shoot day?", answer: "We monitor forecasts closely. If conditions are unsafe for flight, we'll reschedule at no extra charge — typically within 48 hours." },
      { question: "Can this be combined with ground-level footage?", answer: "Hover is a drone-only package. If you'd like to combine aerial and ground footage, our Essentials or Growth video marketing packages are a better fit." },
    ],
  },
  {
    id: "elevate",
    category: "aerial-marketing",
    title: "Elevate",
    tagline: "Double the aerial coverage, double the impact.",
    description:
      "Two polished edits and a wider photo library for brands that need more range from their aerial content.",
    pricing: { startingAt: 750, upTo: 1100 },
    timeline: { minDays: 5, maxDays: 8 },
    deliverables: [
      { label: "2× Aerial Highlight Videos (45–60 sec each)", detail: "Cinematic edits showcasing your space or brand" },
      { label: "2× Vertical Videos (15–30 sec each)", detail: "Optimised for Reels, TikTok & YouTube Shorts" },
      { label: "Professional colour grading" },
      { label: "Optional music licensing" },
      { label: "Branded titles & logo" },
      { label: "10 High-Res Drone Photos" },
      { label: "2 rounds of revisions" },
    ],
    addOns: [
      { title: "Extra Aerial Highlight", price: "+$180", description: "A third cut edited for a specific platform or campaign." },
      { title: "Music Licensing", price: "+$75", description: "Premium licensed track matched to your brand." },
      { title: "Rush Delivery (3–4 days)", price: "+$200", description: "Priority editing queue." },
      { title: "Ground Photography (10 shots)", price: "+$150", description: "Professionally edited ground-level companion photos." },
    ],
    faq: [
      { question: "How are the two highlights differentiated?", answer: "One is typically a wider establishing tour of the space and the other is a tighter, faster-paced cut for social. We plan the split before shoot day." },
      { question: "Do you shoot in RAW?", answer: "All drone footage is captured in a log profile for maximum dynamic range, then colour-graded in post. Photos are shot and delivered in full-resolution JPG with optional RAW files on request." },
      { question: "Can I request specific flight paths or angles?", answer: "Absolutely. Bring a map or reference images to your pre-shoot brief and we'll incorporate them into the flight plan, subject to airspace permissions." },
    ],
  },
  {
    id: "skyline",
    category: "aerial-marketing",
    title: "Skyline",
    tagline: "The complete aerial package.",
    description:
      "Three polished edits, a deep photo library, sound design, and priority delivery for high-stakes launches and premium properties.",
    pricing: { startingAt: 1400, upTo: 2000 },
    timeline: { label: "Priority 3–5 days" },
    deliverables: [
      { label: "Pre-shoot planning call" },
      { label: "3× Aerial Highlight Videos (60–90 sec each)", detail: "Cinematic edits showcasing your space or brand" },
      { label: "3× Vertical Videos (15–30 sec)", detail: "Optimised for Reels, TikTok & YouTube Shorts" },
      { label: "Professional colour grading" },
      { label: "Optional music licensing" },
      { label: "Branded titles, logo outro & sound design" },
      { label: "15–20 High-Res Drone Photos" },
      { label: "Priority 3–5 day delivery" },
      { label: "2 rounds of revisions" },
    ],
    addOns: [
      { title: "Ground Photography Session", price: "+$200", description: "Full edited ground-level photo set to accompany your aerials." },
      { title: "Extended Aerial Film (2–3 min)", price: "+$300", description: "Longer narrative cut for property listings, YouTube, or pitch decks." },
      { title: "Music Licensing", price: "+$75", description: "Premium licensed track matched to your brand." },
      { title: "Captions & Subtitles", price: "+$80", description: "Burned-in or .srt file for vertical cuts." },
      { title: "Monthly Retainer", price: "From $900/mo", description: "Recurring aerial shoots at reduced rate — ideal for real estate agencies." },
    ],
    faq: [
      { question: "Is this good for real estate marketing?", answer: "It's our most popular package for luxury real estate. Three edits give you a property tour, a social teaser, and a short Instagram Reel — enough to fuel an entire listing campaign." },
      { question: "What does sound design add?", answer: "Beyond music, sound design layers in ambient environmental audio and subtle transitions that make aerial footage feel immersive rather than like a raw video clip set to music." },
      { question: "Do you handle multi-location shoots?", answer: "Yes — Skyline can span up to two nearby locations in a single session. Additional locations can be added as a custom line item." },
      { question: "How far do you travel for shoots?", answer: "We're based in Charlotte, NC and routinely travel within the Carolinas at no extra charge. Shoots beyond 60 miles may include a small travel fee — ask us for a custom quote." },
    ],
  },
];

/* ─── Types ─────────────────────────────────────────────────────────── */
interface Deliverable { label: string; detail?: string }
interface AddOn { title: string; price: string; description: string }
interface FAQ { question: string; answer: string }
interface Package {
  id: string;
  category: "video-marketing" | "aerial-marketing";
  title: string;
  tagline: string;
  description: string;
  pricing: { startingAt?: number; upTo?: number; label?: string };
  timeline: { minDays?: number; maxDays?: number; label?: string };
  featured?: boolean;
  deliverables: Deliverable[];
  addOns: AddOn[];
  faq: FAQ[];
}

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
   PAGE
═══════════════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "video-marketing" | "aerial-marketing">("all");
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  const filtered = PACKAGES.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080808] text-white selection:bg-[#C2B280]/30">

        {/* ── Noise grain ── */}
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px",
          }}
        />

        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <section ref={heroRef} className="relative pt-40 pb-32 overflow-hidden">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-[#C2B280]/6 rounded-full blur-[150px]" />
            <div className="absolute top-20 right-0 w-75 h-75 bg-[#94aec2]/5 rounded-full blur-[100px]" />
          </div>

          {/* Subtle grid */}
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
              {/* Eyebrow */}
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
                  Cinematic drone footage blended with ground-level storytelling — from a single focused shoot to a full brand content suite. Every package is built around your goals, handled end-to-end.
                </p>
              </div>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-16 flex flex-wrap gap-x-16 gap-y-6 border-t border-white/6 pt-10"
            >
              {[
                { value: "FAA", label: "Part 107 Licensed" },
                { value: "3–10", label: "Day Turnaround" },
                { value: "6", label: "Package Tiers" },
                { value: "∞", label: "Creative Scope" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-black tracking-tight text-[#C2B280]">{s.value}</p>
                  <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FILTER TABS
        ════════════════════════════════════════ */}
        <div className="sticky top-15 z-40 bg-[#080808]/90 backdrop-blur-md border-b border-white/6">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex items-center gap-1 py-4 overflow-x-auto">
              {([
                { id: "all", label: "All Packages" },
                { id: "video-marketing", label: "Video Marketing" },
                { id: "aerial-marketing", label: "Aerial / Drone" },
              ] as const).map((tab) => (
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

        {/* ════════════════════════════════════════
            PACKAGES
        ════════════════════════════════════════ */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-6 md:px-12 space-y-6">
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

        {/* ════════════════════════════════════════
            BOTTOM CTA
        ════════════════════════════════════════ */}
        <BottomCTA />
      </main>
      <Footer />
    </>
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
  const [activeTab, setActiveTab] = useState<"deliverables" | "addons" | "faq">("deliverables");

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
      {/* Featured badge */}
      {pkg.featured && (
        <div className="absolute -top-px left-8">
          <span className="inline-block bg-[#C2B280] text-black text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1">
            Most Popular
          </span>
        </div>
      )}

      {/* ── Card header (always visible) ── */}
      <button
        onClick={onToggle}
        className="w-full text-left p-8 md:p-10"
        aria-expanded={isExpanded}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          {/* Left: title block */}
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

          {/* Right: meta pills */}
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

            {/* Expand toggle */}
            <div className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase mt-1 transition-colors duration-200 ${isExpanded ? "text-[#C2B280]" : "text-zinc-600 group-hover:text-zinc-400"}`}>
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

      {/* ── Expanded panel ── */}
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

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl pt-8 mb-8">
                {pkg.description}
              </p>

              {/* Tab bar */}
              <div className="flex gap-0 border-b border-white/6 mb-8">
                {(["deliverables", "addons", "faq"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-5 py-3 text-[10px] font-black tracking-[0.25em] uppercase transition-colors duration-200 ${
                      activeTab === tab ? "text-[#C2B280]" : "text-zinc-600 hover:text-zinc-300"
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
                    {pkg.deliverables.map((d, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 border border-white/4 bg-white/1">
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
                    {pkg.addOns.map((a, i) => (
                      <div key={i} className="p-4 border border-white/4 bg-white/1 flex flex-col gap-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="text-sm font-black text-white/80 tracking-tight">{a.title}</p>
                          <span className="text-xs font-bold text-[#C2B280] whitespace-nowrap shrink-0">{a.price}</span>
                        </div>
                        <p className="text-xs text-zinc-600 leading-relaxed">{a.description}</p>
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
                    {pkg.faq.map((f, i) => (
                      <FAQItem key={i} question={f.question} answer={f.answer} packageId={pkg.id} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA row */}
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
        <span className={`text-sm font-semibold transition-colors duration-200 ${open ? "text-white" : "text-zinc-400"}`}>
          {question}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`w-4 h-4 shrink-0 transition-colors duration-200 ${open ? "text-[#C2B280]" : "text-zinc-700"}`}
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
    <section ref={ref} className="relative py-40 overflow-hidden border-t border-white/4">
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
            Every project is different. Tell us what you're working toward and we'll recommend the right package — or build a custom one.
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