"use client";

import { useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────── */
export interface WorkProject {
  _id: string;
  title: string;
  category: string;
  thumbnail: string;
  thumbnailAlt: string;
  slug: string;
  previewVideoMp4?: string | null;
  previewVideoWebm?: string | null;
}

export interface FeaturedWorkData {
  eyebrow: string;
  heading: string;
  subheading: string;
  accentColor: string;
  ctaEyebrow: string;
  ctaLabel: string;
  ctaHref: string;
  projects: WorkProject[];
}

/* ─────────────────────────────────────────────────────────────────────
   DEFAULTS
───────────────────────────────────────────────────────────────────── */
const DEFAULTS: FeaturedWorkData = {
  eyebrow: "Selected Works",
  heading: "Our Portfolio",
  subheading:
    "A collection of visual experiences tailored to capture the essence of every brand and moment.",
  accentColor: "#C2B280",
  ctaEyebrow: "Interested?",
  ctaLabel: "Start Your Project",
  ctaHref: "/#contact",
  projects: [
    { _id: "1", title: "Desert Nights",  category: "Cinematic Narrative", thumbnail: "https://picsum.photos/id/1015/800/1000", thumbnailAlt: "Desert Nights",  slug: "desert-nights" },
    { _id: "2", title: "Elevation",      category: "Drone Landscape",     thumbnail: "https://picsum.photos/id/1016/800/1000", thumbnailAlt: "Elevation",      slug: "elevation" },
    { _id: "3", title: "Forever Begins", category: "Wedding Film",        thumbnail: "https://picsum.photos/id/1025/800/1000", thumbnailAlt: "Forever Begins", slug: "forever-begins" },
    { _id: "4", title: "Momentum",       category: "Brand Action",        thumbnail: "https://picsum.photos/id/1036/800/1000", thumbnailAlt: "Momentum",       slug: "momentum" },
    { _id: "5", title: "Pure State",     category: "Wellness Campaign",   thumbnail: "https://picsum.photos/id/1041/800/1000", thumbnailAlt: "Pure State",     slug: "pure-state" },
    { _id: "6", title: "Urban Flow",     category: "Commercial",          thumbnail: "https://picsum.photos/id/1043/800/1000", thumbnailAlt: "Urban Flow",     slug: "urban-flow" },
  ],
};

/* ─────────────────────────────────────────────────────────────────────
   PROJECT CARD — shared between desktop grid and mobile scroll
───────────────────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  accentColor,
}: {
  project: WorkProject;
  accentColor: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const hasPreview = !!(project.previewVideoMp4 || project.previewVideoWebm);

  const handleMouseEnter = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setVideoReady(false);
  };

  return (
    <a
      href={`/work/${project.slug}`}
      className="group relative w-full h-full overflow-hidden bg-zinc-900 cursor-pointer block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.thumbnail}
        alt={project.thumbnailAlt || project.title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
          hasPreview
            ? "group-hover:opacity-0 scale-100"
            : "grayscale group-hover:grayscale-0 group-hover:scale-110 opacity-70 group-hover:opacity-100"
        }`}
      />

      {/* Preview video */}
      {hasPreview && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          onCanPlay={() => setVideoReady(true)}
        >
          {project.previewVideoWebm && (
            <source src={project.previewVideoWebm} type="video/webm" />
          )}
          {project.previewVideoMp4 && (
            <source src={project.previewVideoMp4} type="video/mp4" />
          )}
        </video>
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <span
          className="text-[10px] uppercase tracking-[0.3em] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ color: accentColor }}
        >
          {project.category}
        </span>
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">{project.title}</h3>
      </div>

      {/* Arrow */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SECTION
───────────────────────────────────────────────────────────────────── */
export default function FeaturedWork({ data }: { data?: FeaturedWorkData | null }) {
  const d: FeaturedWorkData = data ?? DEFAULTS;

  const scrollRef   = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / d.projects.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, d.projects.length - 1));
  };

  return (
    <section id="work" className="py-16 bg-[#0E0E0E]">

      {/* Header */}
      <div className="container mx-auto px-6 md:px-12">
        <div className=" mb-16 gap-8">
          <div className="flex items-center gap-4 mb-6">
            <div
              style={{ transformOrigin: "left", background: `${d.accentColor}80` }}
              className="h-px w-12"
            />
            <span
              className="text-xs font-bold tracking-[0.5em] uppercase "
              style={{ color: d.accentColor }}
            >
              {d.eyebrow}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="pr-2 text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-600">
              {d.heading}
              
            </h2>
            <p className="max-w-md text-white text-sm leading-relaxed">
              {d.subheading}
            </p>
          </div>
          
        </div>
        
      </div>

      {/* ════════════════════════════════════
          DESKTOP — 3-column grid
      ════════════════════════════════════ */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {d.projects.map((project) => (
            <div key={project._id} className="aspect-3/4">
              <ProjectCard project={project} accentColor={d.accentColor} />
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════
          MOBILE — horizontal snap scroll
          pl-6 aligns first card with the rest
          of the page; no pr so next card peeks
      ════════════════════════════════════ */}
      <div className="md:hidden">
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
          {d.projects.map((project) => (
            // 80vw — fills most of the screen so the next card peeks right
            <div
              key={project._id}
              className="snap-start shrink-0 w-[80vw]"
              style={{ aspectRatio: "3/4" }}
            >
              <ProjectCard project={project} accentColor={d.accentColor} />
            </div>
          ))}

          {/* Trailing spacer so the last card can fully snap into place */}
          <div className="shrink-0 w-6" aria-hidden />
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-6 px-6">
          {d.projects.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to project ${i + 1}`}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const cardWidth = el.scrollWidth / d.projects.length;
                el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
                setActiveIndex(i);
              }}
              className="rounded-full transition-all duration-300"
              style={{
                width:  i === activeIndex ? 24 : 6,
                height: 6,
                background: i === activeIndex
                  ? d.accentColor
                  : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        <p className="text-center mt-4 text-[10px] tracking-[0.35em] uppercase text-zinc-700">
          Swipe to explore
        </p>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="mt-16 text-center">
          <span
            className="text-[10px] uppercase tracking-[0.5em] mb-2 block"
            style={{ color: d.accentColor }}
          >
            {d.ctaEyebrow}
          </span>
          <a
            href={d.ctaHref}
            className="group inline-flex items-center gap-2 text-sm font-bold tracking-[0.5em] uppercase border-b border-white/20 pb-2 transition-colors"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = d.accentColor;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
            }}
          >
            <span>{d.ctaLabel}</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}