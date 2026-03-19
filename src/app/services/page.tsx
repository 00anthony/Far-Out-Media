// app/services/page.tsx
//
// This is an async React Server Component — no "use client" at the top level.
// The data fetch happens on the server at request time (or build time with caching).
// The interactive parts (tabs, accordion, filter) live in a separate Client Component below.

import { client } from "../../sanity/lib/client";
import ServicesClient from "./ServicesClient"; // we split the interactive UI out
import { Package } from "./types";
import Footer from "@/src/components/Footer";

/* ─────────────────────────────────────────────────────────────────────
   GROQ QUERY
   - *[_type == "servicePackage"]  →  fetch all documents of this type
   - | order(...)                  →  sort by category then display order
   - { ... }                       →  project only the fields we need
     "id": slug.current            →  rename slug.current → id to match
                                      our Package type
───────────────────────────────────────────────────────────────────── */
const SERVICES_QUERY = `
  *[_type == "servicePackage"] | order( order asc) {
    "id": slug.current,
    category,
    title,
    tagline,
    description,
    featured,
    pricing {
      startingAt,
      upTo,
      label
    },
    timeline {
      minDays,
      maxDays,
      label
    },
    deliverables[] {
      label,
      detail
    },
    addOns[] {
      title,
      price,
      description
    },
    faq[] {
      question,
      answer
    }
  }
`;

/* ─────────────────────────────────────────────────────────────────────
   SERVER COMPONENT (the actual Next.js page)

   Next.js caching options:
   - Default (no option): cached at build time (static)
   - revalidate: 60       → ISR — rebuild this page every 60 seconds
   - cache: "no-store"    → always fresh (fully dynamic, no cache)

   For a services page that rarely changes, revalidate: 3600 (1 hour)
   is a good balance. Flip to "no-store" during active Sanity editing.
───────────────────────────────────────────────────────────────────── */
export const revalidate = 3600; // revalidate every hour

export default async function ServicesPage() {
  // This runs on the server — Sanity credentials never reach the browser.
  const packages: Package[] = await client.fetch(
    SERVICES_QUERY,
    {},              // query params (none needed here)
    {
      // Optional: override the cache behaviour per-fetch
      // next: { revalidate: 3600 }
      // next: { cache: "no-store" }
    }
  );

  // Pass the fetched data down to the interactive Client Component
  return (
    <>
      <ServicesClient packages={packages} />
      <Footer />
    </>
    
  );
}