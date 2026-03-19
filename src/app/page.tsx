
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

export default async function Home() {
  const heroData: HeroData | null = await client.fetch(HERO_QUERY);
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white selection:bg-[#C2B280] selection:text-black">
      <main>
        <Hero data={heroData ?? undefined} />
        <FeaturedWork />
        <About />
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

