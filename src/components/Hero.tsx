
export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover scale-105 opacity-60"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-wide-shot-of-a-scenic-mountain-landscape-42862-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-[#0E0E0E]"></div>
      </div>

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
          Cinematic films crafted to elevate brands, capture moments, and create lasting impact through intentional storytelling and elite drone artistry.
        </p>
        
        <div className="font-inter flex flex-col md:flex-row items-center justify-center gap-6">
          <a 
            href="#work" 
            className="group relative px-10 py-5 bg-[#C2B280] text-black font-bold uppercase tracking-widest text-xs transition-all hover:bg-white overflow-hidden w-full md:w-auto"
          >
            <span className="relative z-10">View Our Work</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          <a 
            href="#contact" 
            className="px-10 py-5 border border-white/30 hover:border-white text-white font-bold uppercase tracking-widest text-xs transition-all w-full md:w-auto"
          >
            Start a Project
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
        <div className="w-px h-10 bg-linear-to-b from-gray-500 to-transparent"></div>
      </div>
    </section>
  );
};
