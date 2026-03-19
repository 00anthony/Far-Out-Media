
import { client } from '../sanity/lib/client';
import Hero from '../components/Hero';
import type { HeroData } from '../components/Hero';
import FeaturedWork from '../components/FeaturedWork';
import About from '../components/About';
import Services from '../components/Services';
import WhyVideo from '../components/WhyVideo';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

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

export default async function Home() {
  const heroData: HeroData | null = await client.fetch(HERO_QUERY);
  const featuredWorkData = await client.fetch(FEATURED_WORK_QUERY);
  const aboutData = await client.fetch(ABOUT_QUERY);

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white selection:bg-[#C2B280] selection:text-black">
      <main>
        <Hero data={heroData ?? undefined} />
        <FeaturedWork data={featuredWorkData ?? undefined} />
        <About data={aboutData ?? undefined} />
        <Services />
        <WhyVideo />
        <Process />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

