
const projects = [
  { id: 1, title: 'Desert Nights', category: 'Cinematic Narrative', image: 'https://picsum.photos/id/1015/800/1000' },
  { id: 2, title: 'Elevation', category: 'Drone Landscape', image: 'https://picsum.photos/id/1016/800/1000' },
  { id: 3, title: 'Forever Begins', category: 'Wedding Film', image: 'https://picsum.photos/id/1025/800/1000' },
  { id: 4, title: 'Momentum', category: 'Brand Action', image: 'https://picsum.photos/id/1036/800/1000' },
  { id: 5, title: 'Pure State', category: 'Wellness Campaign', image: 'https://picsum.photos/id/1041/800/1000' },
  { id: 6, title: 'Urban Flow', category: 'Commercial', image: 'https://picsum.photos/id/1043/800/1000' },
];

export default function FeaturedWork() {
  return (
    <section id="work" className="py-32 bg-[#0E0E0E]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C2B280] mb-4 block">Selected Works</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Our Portfolio</h2>
          </div>
          <p className="max-w-md text-gray-500 text-sm leading-relaxed">
            A collection of visual experiences tailored to capture the essence of every brand and moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative aspect-3/4 overflow-hidden bg-zinc-900 cursor-pointer">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C2B280] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
              </div>

              <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <a 
            href='/'
            className="pointer-clicker text-sm font-bold tracking-[0.3em] uppercase border-b border-white/20 pb-2 hover:border-[#C2B280] transition-colors"
          >
            Explore All Projects
          </a>
        </div>
      </div>
    </section>
  );
};
