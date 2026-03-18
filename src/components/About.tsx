
export default function About() {
  return (
    <section id="about" className="py-32 bg-[#0E0E0E] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="relative z-10 aspect-4/5 overflow-hidden grayscale">
              <img 
                src="https://picsum.photos/id/1062/800/1000" 
                alt="Founder Portrait"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Background elements for Apple/A24 aesthetic */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-l border-t border-[#C2B280]/30 hidden lg:block"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 border-r border-b border-white/10 hidden lg:block"></div>
          </div>
          
          <div className="space-y-8">
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#C2B280]">Our Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              We Don’t Just Film. <br />
              <span className="serif italic font-normal text-gray-400">We Craft Experiences.</span>
            </h2>
            <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
              <p>
                At Far Out Media, we believe every project deserves more than just a camera operator. It deserves a storyteller with intent. Our approach blends technical precision with cinematic emotion to create visual assets that don't just sit on a shelf—they drive engagement.
              </p>
              <p>
                Based in Charlotte, we've spent years mastering the art of the frame, both on the ground and from the air. From high-stakes commercial campaigns to intimate wedding narratives, we treat every frame as a piece of art.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div>
                <span className="text-3xl font-bold block mb-1">100+</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Projects Delivered</span>
              </div>
              <div>
                <span className="text-3xl font-bold block mb-1">FAA</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Licensed Operators</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
