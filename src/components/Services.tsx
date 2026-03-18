
const services = [
  {
    title: 'Brand Films',
    description: 'Elevated storytelling that communicates your vision, values, and impact. We create the visual anchor for your entire digital presence.',
    icon: <svg className="w-8 h-8 text-[#C2B280]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
  },
  {
    title: 'Drone Mastery',
    description: 'Cinematic aerial footage that provides scale and visual impact. As FAA licensed operators, we capture perspectives that standard gear simply can’t reach.',
    icon: <svg className="w-8 h-8 text-[#C2B280]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
  },
  {
    title: 'Commercial Ads',
    description: 'Strategic video marketing assets built for how people watch content today. Vertical, high-energy, and conversion-focused social campaigns.',
    icon: <svg className="w-8 h-8 text-[#C2B280]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-zinc-950/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#C2B280] mb-4 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Core Services</h2>
        </div>
        
        <a 
          href='/'
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {services.map((service, index) => (
            <div key={index} className="p-10 border border-white/5 bg-black hover:border-[#C2B280]/40 transition-all group">
              <div className="mb-8 transform transition-transform group-hover:-translate-y-2 group-hover:scale-110 duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {service.description}
              </p>
              <div className="pointer-clicker mt-8 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </div>
          ))}
        </a>
      </div>
    </section>
  );
};
