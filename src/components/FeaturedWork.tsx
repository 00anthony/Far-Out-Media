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
  slug: string;                    // builds href: /work/[slug]
  previewVideoMp4?: string | null; // short silent hover clip
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
   DEFAULTS — used when Sanity returns null / no data prop passed
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

/*
  GROQ query — run in app/page.tsx (server component):
  ─────────────────────────────────────────────────────
  const FEATURED_WORK_QUERY = `*[_type == "featuredWork"][0] {
    eyebrow, heading, subheading, accentColor,
    ctaEyebrow, ctaLabel, ctaHref,
    projects[]-> {
      _id,
      title,
      category,
      "thumbnail":        thumbnail.asset->url,
      thumbnailAlt,
      "slug":             slug.current,
      "previewVideoMp4":  previewVideoMp4.asset->url,
      "previewVideoWebm": previewVideoWebm.asset->url
    }
  }`;
  const featuredWorkData = await sanityClient.fetch(FEATURED_WORK_QUERY);
  // <FeaturedWork data={featuredWorkData ?? undefined} />
*/

/* ─────────────────────────────────────────────────────────────────────
   PROJECT CARD
   Isolated component so each card manages its own hover/video state
   independently — hovering one card doesn't affect the others.
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
    videoRef.current.play().catch(() => {
      // Silently ignore — some browsers block muted autoplay on hover
    });
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    // Reset ready state so next hover fades in cleanly
    setVideoReady(false);
  };

  return (
    <a
      href={`/work/${project.slug}`}
      className="group relative aspect-3/4 overflow-hidden bg-zinc-900 cursor-pointer block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail — always present, fades out when preview video plays */}
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

      {/* Preview video — only rendered if a clip was uploaded in Sanity.
          preload="none" means nothing downloads until the user hovers. */}
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
      <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <span
          className="text-[10px] uppercase tracking-[0.3em] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ color: accentColor }}
        >
          {project.category}
        </span>
        <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
      </div>

      {/* Arrow */}
      <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

  return (
    <section id="work" className="py-32 bg-[#0E0E0E]">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase mb-4 block"
              style={{ color: d.accentColor }}
            >
              {d.eyebrow}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              {d.heading}
            </h2>
          </div>
          <p className="max-w-md text-gray-500 text-sm leading-relaxed">
            {d.subheading}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {d.projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              accentColor={d.accentColor}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
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