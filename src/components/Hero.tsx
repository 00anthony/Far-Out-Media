"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt to play — on iOS low power mode this promise rejects,
    // which is our signal to fall back to the poster image.
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was blocked (low power mode, browser policy, etc.)
        // Hide the video entirely so iOS doesn't render its play button overlay.
        setVideoFailed(true);
      });
    }

    // Also listen for the suspend event — iOS fires this instead of an error
    // when it refuses to load media in low power mode.
    const handleSuspend = () => {
      // Only treat as failure if the video hasn't started playing yet
      if (video.paused && video.readyState < 2) {
        setVideoFailed(true);
      }
    };

    video.addEventListener("suspend", handleSuspend);
    return () => video.removeEventListener("suspend", handleSuspend);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* ── Background media ── */}
      <div className="absolute inset-0 z-0">
        {!videoFailed ? (
          <video
            ref={videoRef}
            // iOS Safari requires all four of these attributes to be present
            // as HTML attributes (not just React props) for inline autoplay to work.
            autoPlay
            muted          // required for autoplay on all browsers
            loop
            playsInline    // prevents iOS from going full-screen
            disablePictureInPicture
            preload="auto"
            // Poster is shown while the video loads — also used as the
            // low-power-mode fallback via the videoFailed state below.
            poster="/hero/hero-poster.png"
            className="w-full h-full object-cover scale-105 opacity-60"
            // If the video file itself errors (404, codec, etc.) fall back too
            onError={() => setVideoFailed(true)}
          >
            {/*
              Serve WebM first — smaller file, faster load on Android/desktop.
              iOS Safari doesn't support WebM so it falls through to MP4.
              Make sure hero-video.mp4 is H.264 encoded (not H.265/HEVC) —
              H.264 is the only codec guaranteed across all iOS versions.
            */}
            <source src="/hero/hero-video.webm" type="video/webm" />
            <source src="/hero/hero-video.mp4" type="video/mp4" />
          </video>
        ) : (
          // Low power mode / autoplay blocked — render a plain img so there's
          // zero chance of the browser showing a video play button overlay.
          // Replace with your actual poster/hero image.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/images/hero-poster.png"
            alt=""
            aria-hidden="true"
            className="bg-fixed w-full h-full object-cover scale-105 opacity-60"
          />
        )}

        {/* Gradient overlay — sits above both video and fallback image */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-[#0E0E0E]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="inline-block mb-6 overflow-hidden">
          <span className="block text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-[#C2B280] animate-pulse">
            Charlotte based cinematic studio
          </span>
        </div>

        <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-6 leading-[0.9] animate-fade-in">
          Stories <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">
            That Move.
          </span>
        </h1>

        <p className="font-inter max-w-xl mx-auto text-gray-400 text-sm md:text-lg mb-12 font-medium leading-relaxed tracking-wide">
          Cinematic films crafted to elevate brands, capture moments, and create
          lasting impact through intentional storytelling and elite drone artistry.
        </p>

        <div className="font-inter flex flex-col md:flex-row items-center justify-center gap-6">
          <a
            href="/#work"
            className="group relative px-10 py-5 bg-[#C2B280] text-black font-bold uppercase tracking-widest text-xs transition-all hover:bg-white overflow-hidden w-full md:w-auto"
          >
            <span className="relative z-10">View Our Work</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="/#contact"
            className="px-10 py-5 border border-white/30 hover:border-white text-white font-bold uppercase tracking-widest text-xs transition-all w-full md:w-auto"
          >
            Start a Project
          </a>
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