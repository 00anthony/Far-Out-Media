// app/work/[slug]/not-found.tsx
// Rendered automatically by Next.js when the page calls notFound()

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[#C2B280] text-[10px] font-bold tracking-[0.5em] uppercase mb-6">
        404
      </p>
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
        Project Not Found
      </h1>
      <p className="text-zinc-500 text-sm max-w-sm mb-12 leading-relaxed">
        This project doesn't exist or may have been removed. Head back to see all our work.
      </p>
      <a
        href="/work"
        className="group relative px-10 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] overflow-hidden"
      >
        <span className="absolute inset-0 bg-[#C2B280] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        <span className="relative z-10 flex items-center gap-2">
          View All Work
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </a>
    </main>
  );
}