
const steps = [
  { id: '01', title: 'Discover', desc: 'We dive deep into your goals, audience, and the story that needs to be told.' },
  { id: '02', title: 'Create', desc: 'Planning, storyboarding, and scouting for the perfect cinematic shots.' },
  { id: '03', title: 'Capture', desc: 'High-production filming with professional equipment and elite drone operation.' },
  { id: '04', title: 'Deliver', desc: 'Expert editing, color grading, and ready-to-use social/web assets.' }
];

export default function Process() {
  return (
    <section id="process" className="py-32 bg-black border-y border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between mb-20 gap-8">
          <h2 className="text-4xl font-bold tracking-tight">Our Workflow</h2>
          <div className="h-px grow bg-white/10 mx-10 hidden md:block self-center"></div>
          <span className="text-xs font-bold tracking-widest text-gray-500 uppercase self-center">From concept to screen</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="relative p-8 border border-white/5 bg-zinc-950 hover:bg-zinc-900 transition-all duration-500 overflow-hidden group">
              <span className="text-6xl font-black text-white/5 absolute -top-4 -right-2 group-hover:text-[#C2B280]/10 transition-colors">
                {step.id}
              </span>
              <div className="relative z-10">
                <span className="text-[#C2B280] font-bold text-xs uppercase tracking-widest mb-4 block">Step {step.id}</span>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
