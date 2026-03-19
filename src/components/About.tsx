// components/About.tsx

/* ─────────────────────────────────────────────────────────────────────
   TYPES — mirror the Sanity `about` schema
───────────────────────────────────────────────────────────────────── */
export interface Achievement {
  value: string;   // e.g. "100+" or "FAA"
  label: string;   // e.g. "Projects Delivered"
}

export interface AboutData {
  eyebrow: string;
  headingFirst: string;        // e.g. "We Don't Just Film."
  headingAccent: string;       // e.g. "We Craft Experiences." — rendered italic
  accentColor: string;         // e.g. "#C2B280"
  paragraphs: string[];        // array of body copy paragraphs
  achievements: Achievement[];
  image: string;               // resolved Sanity asset URL
  imageAlt: string;
}

/* ─────────────────────────────────────────────────────────────────────
   DEFAULTS
   Used when Sanity returns null or no data prop is passed.

   GROQ query — run in app/page.tsx (server component):
   ──────────────────────────────────────────────────────
   const ABOUT_QUERY = `*[_type == "about"][0] {
     eyebrow,
     headingFirst,
     headingAccent,
     accentColor,
     paragraphs,
     achievements[] { value, label },
     "image":    image.asset->url,
     imageAlt
   }`;
   const aboutData = await sanityClient.fetch(ABOUT_QUERY);
   // Then: <About data={aboutData ?? undefined} />
───────────────────────────────────────────────────────────────────── */
const DEFAULTS: AboutData = {
  eyebrow: "Our Philosophy",
  headingFirst: "We Don't Just Film.",
  headingAccent: "We Craft Experiences.",
  accentColor: "#C2B280",
  paragraphs: [
    "At Far Out Media, we believe every project deserves more than just a camera operator. It deserves a storyteller with intent. Our approach blends technical precision with cinematic emotion to create visual assets that don't just sit on a shelf—they drive engagement.",
    "Based in Charlotte, we've spent years mastering the art of the frame, both on the ground and from the air. From high-stakes commercial campaigns to intimate wedding narratives, we treat every frame as a piece of art.",
  ],
  achievements: [
    { value: "100+", label: "Projects Delivered" },
    { value: "FAA",  label: "Licensed Operators" },
  ],
  image: "https://picsum.photos/id/1062/800/1000",
  imageAlt: "Founder Portrait",
};

/* ─────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────── */
export default function About({ data }: { data?: AboutData | null }) {
  const d: AboutData = data ?? DEFAULTS;

  return (
    <section id="about" className="py-32 bg-[#0E0E0E] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ── Image ── */}
          <div className="relative">
            <div className="relative z-10 aspect-4/5 overflow-hidden grayscale">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={d.image}
                alt={d.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative corner borders */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-l border-t border-[#C2B280]/30 hidden lg:block" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 border-r border-b border-white/10 hidden lg:block" />
          </div>

          {/* ── Copy ── */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <span
              className="text-xs font-bold tracking-[0.4em] uppercase block"
              style={{ color: d.accentColor }}
            >
              {d.eyebrow}
            </span>

            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              {d.headingFirst}
              {d.headingFirst && <br />}
              <span className="serif italic font-normal text-gray-400">
                {d.headingAccent}
              </span>
            </h2>

            {/* Body paragraphs — driven by the array from Sanity */}
            <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
              {d.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Achievements */}
            {d.achievements.length > 0 && (
              <div
                className="pt-8 border-t border-white/5"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${Math.min(d.achievements.length, 4)}, minmax(0, 1fr))`,
                  gap: "2rem",
                }}
              >
                {d.achievements.map((a, i) => (
                  <div key={i}>
                    <span className="text-3xl font-bold block mb-1">{a.value}</span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">
                      {a.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}