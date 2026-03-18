
export default function ContactSection() {
  return (
    <section id="contact" className="py-40 relative bg-zinc-950 overflow-hidden">
      {/* Abstract background blur for high-end feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-[#C2B280]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <span className="text-xs font-bold tracking-[0.5em] uppercase text-[#C2B280] mb-8 block">Ready to Begin?</span>
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12">
          Let's Create <br />
          <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-gray-600">Something Far Out.</span>
        </h2>
        
        {/* cta button */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <button className="group relative px-16 py-8 bg-white text-black font-black uppercase tracking-[0.2em] text-sm overflow-hidden transition-all hover:scale-105 active:scale-95">
             <span className="relative z-10">Get a Free Quote</span>
             <div className="absolute inset-0 bg-[#C2B280] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </button>
        </div>
        
        <p className="mt-12 text-gray-500 text-sm tracking-widest uppercase">
          Serving Charlotte, NC & Worldwide
        </p>
      </div>
    </section>
  );
};
