// app/page.tsx
import { client } from "@/src/sanity/lib/client";

// Section components
import Hero           from "@/src/components/Hero";
import FeaturedWork   from "@/src/components/FeaturedWork";
import Services       from "@/src/components/Services";
import About          from "@/src/components/About";
import Benefits       from "@/src/components/Benefits";
import Process        from "@/src/components/Process";
import Testimonials   from "@/src/components/Testimonials";
import ContactSection from "@/src/components/ContactSection";

// Types
import type { HeroData }            from "@/src/components/Hero";
import type { FeaturedWorkData }    from "@/src/components/FeaturedWork";
import type { ServicesData }        from "@/src/components/Services";
import type { AboutData }           from "@/src/components/About";
import type { BenefitsData }        from "@/src/components/Benefits";
import type { ProcessData }         from "@/src/components/Process";
import type { TestimonialsData }    from "@/src/components/Testimonials";
import type { ContactSectionData }  from "@/src/components/ContactSection";

/* ─────────────────────────────────────────────────────────────────────
   REVALIDATION
   Change to 0 while actively editing in Studio.
───────────────────────────────────────────────────────────────────── */
export const revalidate = 3600;

/* ─────────────────────────────────────────────────────────────────────
   TYPES
   SectionKey must stay in sync with the `section` option values
   in schemas/homepage.ts
───────────────────────────────────────────────────────────────────── */
type SectionKey =
  | "featuredWork"
  | "services"
  | "about"
  | "benefits"
  | "process"
  | "testimonials"
  | "contact";

interface SectionOrderItem {
  section: SectionKey;
  visible: boolean;
}

/* ─────────────────────────────────────────────────────────────────────
   DEFAULT ORDER
   Used when the homepage Sanity document hasn't been created yet.
───────────────────────────────────────────────────────────────────── */
const DEFAULT_ORDER: SectionOrderItem[] = [
  { section: "featuredWork",  visible: true },
  { section: "services",      visible: true },
  { section: "about",         visible: true },
  { section: "benefits",      visible: true },
  { section: "process",       visible: true },
  { section: "testimonials",  visible: true },
  { section: "contact",       visible: true },
];

/* ─────────────────────────────────────────────────────────────────────
   GROQ QUERIES
───────────────────────────────────────────────────────────────────── */
const HOMEPAGE_ORDER_QUERY = `*[_type == "homepage"][0] {
  sectionOrder[] { section, visible }
}`;

const HERO_QUERY = `*[_type == "hero"][0] {
  eyebrow, headingFirst, headingAccent,
  accentColorFrom, accentColorTo, primaryAccentColor,
  subheading,
  buttons[] { label, href, style },
  "videoWebm": videoWebm.asset->url,
  "videoMp4":  videoMp4.asset->url,
  "poster":    poster.asset->url,
  videoOpacity
}`;

const FEATURED_WORK_QUERY = `*[_type == "featuredWork"][0] {
  eyebrow, heading, subheading, accentColor,
  ctaEyebrow, ctaLabel, ctaHref,
  projects[]-> {
    _id, title, category,
    "thumbnail":        thumbnail.asset->url,
    thumbnailAlt,
    "slug":             slug.current,
    "previewVideoMp4":  previewVideoMp4.asset->url,
    "previewVideoWebm": previewVideoWebm.asset->url
  }
}`;

const SERVICES_HOME_QUERY = `*[_type == "servicePackage"] | order(order asc) {
  _id, title, category,
  "description": tagline,
  "bullets": deliverables[0..3][].label,
  featured, order
}`;

const ABOUT_QUERY = `*[_type == "about"][0] {
  eyebrow, headingFirst, headingAccent, accentColor,
  paragraphs,
  achievements[] { value, label },
  "image": image.asset->url,
  imageAlt
}`;

const BENEFITS_QUERY = `*[_type == "benefits"][0] {
  eyebrow, headingFirst, headingAccent, accentColor,
  benefits[] { value, body },
  calloutHeading, calloutQuote
}`;

const PROCESS_QUERY = `*[_type == "process"][0] {
  eyebrow, heading, subheading, accentColor,
  steps[] { id, title, desc }
}`;

const TESTIMONIALS_QUERY = `*[_type == "testimonials"][0] {
  eyebrow, accentColor,
  testimonials[] { quote, name, title, initials }
}`;

const CONTACT_QUERY = `*[_type == "contactSection"][0] {
  eyebrow, headingFirst, headingAccent, accentColor, subheading,
  projectTypes,
  formFields[] { name, label, type, required, colSpan },
  submitLabel, successHeading, successBody, successFooter,
  footerLeft, footerRight
}`;

/* ─────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────── */
export default async function HomePage() {
  // All data fetched in parallel — single Sanity round-trip
  const [
    homepageData,
    heroData,
    featuredWorkData,
    packagesData,
    aboutData,
    benefitsData,
    processData,
    testimonialsData,
    contactData,
  ] = await Promise.all([
    client.fetch<{ sectionOrder: SectionOrderItem[] } | null>(HOMEPAGE_ORDER_QUERY),
    client.fetch<HeroData | null>(HERO_QUERY),
    client.fetch<FeaturedWorkData | null>(FEATURED_WORK_QUERY),
    client.fetch<ServicesData["packages"] | null>(SERVICES_HOME_QUERY),
    client.fetch<AboutData | null>(ABOUT_QUERY),
    client.fetch<BenefitsData | null>(BENEFITS_QUERY),
    client.fetch<ProcessData | null>(PROCESS_QUERY),
    client.fetch<TestimonialsData | null>(TESTIMONIALS_QUERY),
    client.fetch<ContactSectionData | null>(CONTACT_QUERY),
  ]);

  // Resolve section order — fall back to default if doc not created yet
  const sectionOrder = homepageData?.sectionOrder ?? DEFAULT_ORDER;

  // Filter to only visible sections
  const visibleSections = sectionOrder.filter((s) => s.visible !== false);

  // Assemble ServicesData from the packages array + static section copy.
  // If you want the section text editable in Sanity too, create a
  // `servicesSection` singleton and merge it here.
  const servicesData: ServicesData | null = packagesData
    ? {
        eyebrow: "Let's Create Something Far Out",
        headingFirst: "Our",
        headingAccent: "Services",
        subheading: "Every video is built around your goals. From a single shoot to a full brand campaign.",
        accentColor: "#C2B280",
        ctaText: "Every project is different. Let’s build the right package for your goals.",
        ctaHref: "/services",
        ctaPrimaryLabel: "Get a Free Quote",
        ctaPrimaryHref: "/#contact",
        packages: packagesData,
      }
    : null;

  /* ─── SECTION MAP ─────────────────────────────────────────────────
     Maps each SectionKey → its rendered JSX.

     To add a new section later:
       1. Build the component + Sanity schema
       2. Add its key to SectionKey type above
       3. Add it to SECTION_OPTIONS in schemas/homepage.ts
       4. Add its GROQ query and fetch above
       5. Add it to SECTION_MAP here
  ─────────────────────────────────────────────────────────────────── */
  const SECTION_MAP: Record<SectionKey, React.ReactNode> = {
    featuredWork:  <FeaturedWork  data={featuredWorkData  ?? undefined} />,
    services:      <Services      data={servicesData      ?? undefined} />,
    about:         <About         data={aboutData         ?? undefined} />,
    benefits:      <Benefits      data={benefitsData      ?? undefined} />,
    process:       <Process       data={processData       ?? undefined} />,
    testimonials:  <Testimonials  data={testimonialsData  ?? undefined} />,
    contact:       <ContactSection data={contactData      ?? undefined} />,
  };

  return (
    <main>
      {/* Hero is always first and is not reorderable */}
      <Hero data={heroData ?? undefined} />

      {/* Render sections in Studio-defined order, skip any unknown keys */}
      {visibleSections.map(({ section }) => {
        const node = SECTION_MAP[section];
        if (!node) return null;
        return <div key={section}>{node}</div>;
      })}
    </main>
  );
}