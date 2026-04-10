// components/Benefits.tsx

/* ─────────────────────────────────────────────────────────────────────
   TYPES — mirror the Sanity `benefits` schema
───────────────────────────────────────────────────────────────────── */
export interface Benefit {
  value: string;   // e.g. "540%" or "24h"
  body: string;    // the explanatory sentence
}

export interface BenefitsData {
  eyebrow: string;
  headingFirst: string;     // e.g. "Video Isn't Optional."
  headingAccent: string;    // e.g. "It's Your Competitive Edge." — rendered muted
  accentColor: string;      // e.g. "#C2B280"
  benefits: Benefit[];
  calloutHeading: string;   // bold line inside the bottom callout box
  calloutQuote: string;     // italic quote inside the callout box
}

const DEFAULTS: BenefitsData = {
  eyebrow: "Impact & Results",
  headingFirst: "Video Isn't Optional.",
  headingAccent: "It's Your Competitive Edge.",
  accentColor: "#C2B280",
  benefits: [
    { value: "540%", body: "Video content outperforms static images on social platforms by up to 540% in engagement." },
    { value: "91%",  body: "Of consumers say they want to see more high-quality video content from the brands they follow." },
    { value: "80%",  body: "Retention rate. People remember video ads they saw 30 days ago significantly better than text." },
    { value: "24h",  body: "Fast turnaround. Our optimized workflow ensures you get high-end assets ready for use immediately." },
  ],
  calloutHeading: "Anyone can shoot video. The difference is intent.",
  calloutQuote: "Far Out Media doesn't just deliver footage; they deliver visual assets that tell a strategic story.",
};

/* ─────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────── */
export default function Benefits({ data }: { data?: BenefitsData | null }) {
  const d: BenefitsData = data ?? DEFAULTS;

  // Split benefits into two columns preserving Sanity order
  const col1 = d.benefits.filter((_, i) => i % 2 === 0);
  const col2 = d.benefits.filter((_, i) => i % 2 !== 0);

  return (
    <section className="py-16 bg-[#0E0E0E]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">

          {/* Eyebrow */}
          <span
            className="text-xs font-bold tracking-[0.4em] uppercase mb-6 block text-center"
            style={{ color: d.accentColor }}
          >
            {d.eyebrow}
          </span>

          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6">
            <h2 className="pr-2 text-4xl text-center md:text-6xl font-black tracking-tighter leading-none">
              {d.headingFirst}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-500">
                {d.headingAccent}
              </span>
            </h2>
            
          </div>

          {/* Benefits grid — columns derived from ordered Sanity array */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {d.benefits.map((benefit, i) => (
              <div key={i} className="p-8 border-l border-white/10 space-y-4">
                <span
                  className="text-5xl font-extrabold block"
                  style={{ color: d.accentColor }}
                >
                  {benefit.value}
                </span>
                <p className="text-white font-medium">{benefit.body}</p>
              </div>
            ))}
          </div>

          {/* Callout box */}
          

        </div>
      </div>
    </section>
  );
}