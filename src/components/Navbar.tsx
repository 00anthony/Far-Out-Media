'use client'

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-inter ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-lg border-b border-neutral-500/10 py-4' 
          : 'bg-transparent py-6 border-b border-white/0'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a 
          href='/'
          className="flex items-center space-x-2"
        >
          <span className="text-xl font-bold tracking-widest uppercase">
            Far Out <span className="text-[#C2B280]">Media</span>
          </span>
        </a>
        
        <nav className="hidden md:flex space-x-10 text-xs font-semibold tracking-widest uppercase text-gray-400">
          <a href="/#work" className="hover:text-white transition-colors">Work</a>
          <a href="/#about" className="hover:text-white transition-colors">About</a>
          <a href="/services" className="hover:text-white transition-colors">Services</a>
          <a href="/#process" className="hover:text-white transition-colors">Process</a>
        </nav>

        <div>
          <a 
            href="/#contact" 
            className="px-6 py-2 border border-white/20 hover:border-[#C2B280] hover:text-[#C2B280] transition-all duration-300 text-xs font-bold tracking-widest uppercase"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
}