// app/work/[slug]/Projectclient.tsx
"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import type { ProjectData } from "./page";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProjectClient({ project: p }: { project: ProjectData }) {
  const [playerReady, setPlayerReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const embedUrl = buildEmbedUrl(p.videoEmbedUrl, p.videoProvider);
  const isSelfHosted = p.videoProvider === "self-hosted" && !!p.videoFileUrl;

  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-[#C2B280]/30">

      {/* ── Grain overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* ════════════════════════════════════
          BACK NAV
      ════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between bg-linear-to-b from-black/70 to-transparent pointer-events-none"
      >
        <a
          href="/"
          className="mt-16 pointer-events-auto flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400 hover:text-white transition-colors duration-200"
        >
          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          Go Home
        </a>
      </motion.div>

      {/* ════════════════════════════════════
          VIDEO PLAYER
      ════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full pt-0">

        {/* ── A: Self-hosted file from Sanity CDN ── */}
        {isSelfHosted ? (
          <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
            {!playerReady && (
              <div className="absolute inset-0 z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.thumbnail}
                  alt={p.thumbnailAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center animate-pulse">
                    <svg className="w-6 h-6 ml-1" fill="white" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            <video
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                playerReady ? "opacity-100" : "opacity-0"
              }`}
              controls
              playsInline
              preload="metadata"
              poster={p.thumbnail}
              onCanPlay={() => setPlayerReady(true)}
            >
              <source src={p.videoFileUrl!} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

        /* ── B: Vimeo / YouTube embed ── */
        ) : embedUrl ? (
          <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
            {!playerReady && (
              <div className="absolute inset-0 z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.thumbnail}
                  alt={p.thumbnailAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center animate-pulse">
                    <svg className="w-6 h-6 ml-1" fill="white" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={embedUrl}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                playerReady ? "opacity-100" : "opacity-0"
              }`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              onLoad={() => setPlayerReady(true)}
              title={p.title}
            />
          </div>

        /* ── C: No video — thumbnail placeholder ── */
        ) : (
          <div className="relative w-full aspect-video bg-zinc-900 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.thumbnail}
              alt={p.thumbnailAlt}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
              <p className="text-white text-xs font-bold tracking-[0.5em] uppercase">
                Video coming soon
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ════════════════════════════════════
          PROJECT INFO
      ════════════════════════════════════ */}
      <section ref={infoRef} className="relative z-10">
        <div className="container mx-auto px-6 md:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* ── Left: title + description ── */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-8 bg-[#C2B280]/50" />
                  <span className="text-[#C2B280] text-[10px] font-bold tracking-[0.5em] uppercase">
                    {p.category}
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-10">
                  {p.title}
                </h1>

                {p.description && (
                  <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
                    {p.description}
                  </p>
                )}
              </motion.div>
            </div>

            {/* ── Right: meta details ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="flex flex-col gap-8 lg:pt-24"
            >
              <div className="h-px w-full bg-white/6" />

              {p.client && <MetaRow label="Client" value={p.client} />}
              {p.category && <MetaRow label="Category" value={p.category} />}
              {p.projectDate && (
                <MetaRow
                  label="Date"
                  value={new Date(p.projectDate).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                />
              )}
              {p.videoProvider && (
                <MetaRow
                  label="Platform"
                  value={
                    p.videoProvider === "vimeo"
                      ? "Vimeo"
                      : p.videoProvider === "youtube"
                      ? "YouTube"
                      : "Self-hosted"
                  }
                />
              )}

              <div className="h-px w-full bg-white/6" />

              <a
                href="/#contact"
                className="group relative px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] overflow-hidden text-center"
              >
                <span className="absolute inset-0 bg-[#C2B280] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10">Start a Project</span>
              </a>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12">
          <div className="h-px bg-linear-to-r from-[#C2B280]/20 via-zinc-700/20 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════
          PREV / NEXT NAVIGATION
      ════════════════════════════════════ */}
      {(p.prevProject || p.nextProject) && (
        <section className="container mx-auto px-6 md:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {p.prevProject ? (
              <ProjectNavCard project={p.prevProject} direction="prev" />
            ) : (
              <div />
            )}
            {p.nextProject && (
              <ProjectNavCard project={p.nextProject} direction="next" />
            )}
          </motion.div>
        </section>
      )}
    </main>
  );
}

/* ─── Helpers ────────────────────────────────────────────────────────── */

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#657886] mb-1">
        {label}
      </p>
      <p className="text-sm text-white/80">{value}</p>
    </div>
  );
}

function ProjectNavCard({
  project,
  direction,
}: {
  project: { title: string; slug: string; thumbnail: string };
  direction: "prev" | "next";
}) {
  return (
    <a
      href={`/work/${project.slug}`}
      className={`group relative overflow-hidden aspect-video bg-zinc-900 flex items-end p-6 ${
        direction === "next" ? "md:col-start-2" : ""
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.thumbnail}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
      <div className="relative z-10 w-full flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 mb-1">
            {direction === "prev" ? "← Previous" : "Next →"}
          </p>
          <p className="text-lg font-black tracking-tight text-white">{project.title}</p>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:border-[#C2B280]/50 group-hover:rotate-45 transition-all duration-500">
          <svg
            className={`w-4 h-4 ${direction === "prev" ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </a>
  );
}

/* ─── Embed URL builder ──────────────────────────────────────────────── */
function buildEmbedUrl(
  url: string | null,
  provider: "vimeo" | "youtube" | "self-hosted" | null
): string | null {
  if (!url || provider === "self-hosted") return null;

  if (provider === "vimeo") {
    const base = url.includes("player.vimeo.com")
      ? url
      : url.replace("vimeo.com/", "player.vimeo.com/video/");
    const separator = base.includes("?") ? "&" : "?";
    return `${base}${separator}autoplay=0&color=C2B280&title=0&byline=0&portrait=0&dnt=1`;
  }

  if (provider === "youtube") {
    const base = url.includes("youtube.com/embed")
      ? url
      : url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/");
    const separator = base.includes("?") ? "&" : "?";
    return `${base}${separator}rel=0&modestbranding=1&color=white`;
  }

  return url;
}