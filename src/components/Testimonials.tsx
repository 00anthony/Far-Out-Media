
export default function Testimonials() {
  return (
    <section className="py-32 bg-[#0E0E0E]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
             <svg className="w-12 h-12 mx-auto text-[#C2B280]/40" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.5693 13 4.017 13H2.017V21H5.017Z"/></svg>
          </div>
          
          <p className="text-3xl md:text-5xl font-medium tracking-tight leading-snug mb-12 italic text-glow">
            "Far Out Media captured the soul of our brand. The cinematic quality they delivered surpassed our expectations and transformed our digital footprint."
          </p>
          
          <div className="space-y-2">
            <span className="text-lg font-bold block uppercase tracking-widest">Jameson Reed</span>
            <span className="text-xs text-gray-500 uppercase tracking-[0.3em]">CEO, Altitude Outdoor</span>
          </div>

          <div className="mt-20 flex justify-center gap-4">
             <div className="w-12 h-0.5 bg-[#C2B280]"></div>
             <div className="w-12 h-0.5 bg-white/10"></div>
             <div className="w-12 h-0.5 bg-white/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
