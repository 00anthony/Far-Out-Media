
import Hero from '../components/Hero';
import FeaturedWork from '../components/FeaturedWork';
import About from '../components/About';
import Services from '../components/Services';
import WhyVideo from '../components/WhyVideo';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white selection:bg-[#C2B280] selection:text-black">
      <main>
        <Hero />
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

