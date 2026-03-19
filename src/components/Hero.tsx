"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────
   TYPES — mirror the Sanity `hero` schema
───────────────────────────────────────────────────────────────────── */
export interface HeroButton {
  label: string;
  href: string;
  style: "primary" | "outline";
}

export interface HeroData {
  eyebrow: string;
  headingFirst: string;       // e.g. "Stories"
  headingAccent: string;      // e.g. "That Move." — rendered as gradient
  accentColorFrom: string;    // gradient start hex, e.g. "#ffffff"
  accentColorTo: string;      // gradient end hex, e.g. "#6b7280"
  primaryAccentColor: string; // eyebrow + primary button bg, e.g. "#C2B280"
  subheading: string;
  buttons: HeroButton[];
  videoWebm: string | null;   // resolved URL (can be null if not uploaded)
  videoMp4: string;           // required resolved URL
  poster: string;             // resolved URL — shown while loading + low power fallback
  videoOpacity: number;       // 0–100 integer stored in Sanity
}

/* ─────────────────────────────────────────────────────────────────────
   DEFAULTS
   Used when Sanity returns null (document not yet created) or when the
   component is rendered without a data prop.

   GROQ query — run in your page.tsx or layout.tsx server component:
   ──────────────────────────────────────────────────────────────────
   const HERO_QUERY = `*[_type == "hero"][0] {
     eyebrow,
     headingFirst,
     headingAccent,
     accentColorFrom,
     accentColorTo,
     primaryAccentColor,
     subheading,
     buttons[] { label, href, style },
     "videoWebm": videoWebm.asset->url,
     "videoMp4":  videoMp4.asset->url,
     "poster":    poster.asset->url,
     videoOpacity
   }`;
   const heroData = await sanityClient.fetch(HERO_QUERY);
   // Then pass to the component:  <Hero data={heroData ?? undefined} />
───────────────────────────────────────────────────────────────────── */
const DEFAULTS: HeroData = {
  eyebrow: "Charlotte based cinematic studio",
  headingFirst: "Stories",
  headingAccent: "That Move.",
  accentColorFrom: "#ffffff",
  accentColorTo: "#6b7280",
  primaryAccentColor: "#C2B280",
  subheading:
    "Cinematic films crafted to elevate brands, capture moments, and create lasting impact through intentional storytelling and elite drone artistry.",
  buttons: [
    { label: "View Our Work",   href: "/#work",    style: "primary" },
    { label: "Start a Project", href: "/#contact", style: "outline" },
  ],
  videoWebm: "/hero/hero-video.webm",
  videoMp4:  "/hero/hero-video.mp4",
  poster:    "/hero/hero-poster.png",
  videoOpacity: 60,
};

/* ─────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────── */
export default function Hero({ data }: { data?: HeroData | null }) {
  // null-safe: if Sanity returns null (no document yet), use defaults
  const d: HeroData = data ?? DEFAULTS;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay — iOS low power mode rejects this promise
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => setVideoFailed(true));
    }

    // iOS fires 'suspend' instead of rejecting when it refuses to load
    const handleSuspend = () => {
      if (video.paused && video.readyState < 2) setVideoFailed(true);
    };

    video.addEventListener("suspend", handleSuspend);
    return () => video.removeEventListener("suspend", handleSuspend);
  }, []);

  const videoOpacityDecimal = (d.videoOpacity ?? 60) / 100;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* ── Background media ── */}
      <div className="absolute inset-0 z-0">
        {!videoFailed ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="auto"
            poster={d.poster}
            className="w-full h-full object-cover scale-105"
            style={{ opacity: videoOpacityDecimal }}
            onError={() => setVideoFailed(true)}
          >
            {/* WebM first — smaller file on Android/desktop. iOS ignores it. */}
            {d.videoWebm && <source src={d.videoWebm} type="video/webm" />}
            <source src={d.videoMp4} type="video/mp4" />
          </video>
        ) : (
          // Low power mode / blocked — plain img, never shows a play button
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={d.poster}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover scale-105"
            style={{ opacity: Math.min(videoOpacityDecimal + 0.2, 1) }}
          />
        )}

        {/* Gradient overlay — always rendered above video/image */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-[#0E0E0E]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-6 text-center">

        {/* Eyebrow */}
        <div className="inline-block mb-6 overflow-hidden">
          <span
            className="block text-xs md:text-sm font-bold tracking-[0.4em] uppercase animate-pulse"
            style={{ color: d.primaryAccentColor }}
          >
            {d.eyebrow}
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-6 leading-[0.9]">
          {d.headingFirst}
          {d.headingFirst && <br />}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(to right, ${d.accentColorFrom}, ${d.accentColorTo})`,
            }}
          >
            {d.headingAccent}
          </span>
        </h1>

        {/* Subheading */}
        <p className="font-inter max-w-xl mx-auto text-gray-400 text-sm md:text-lg mb-12 font-medium leading-relaxed tracking-wide">
          {d.subheading}
        </p>

        {/* Buttons — driven entirely by Sanity data */}
        <div className="font-inter flex flex-col md:flex-row items-center justify-center gap-6">
          {d.buttons.map((btn, i) =>
            btn.style === "primary" ? (
              <a
                key={i}
                href={btn.href}
                className="group relative px-10 py-5 text-black font-bold uppercase tracking-widest text-xs transition-all overflow-hidden w-full md:w-auto"
                style={{ background: d.primaryAccentColor }}
              >
                {/* White fill sweeps up on hover */}
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">{btn.label}</span>
              </a>
            ) : (
              <a
                key={i}
                href={btn.href}
                className="px-10 py-5 border border-white/30 hover:border-white text-white font-bold uppercase tracking-widest text-xs transition-all w-full md:w-auto"
              >
                {btn.label}
              </a>
            )
          )}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
        <div className="w-px h-10 bg-linear-to-b from-gray-500 to-transparent" />
      </div>
    </section>
  );
}