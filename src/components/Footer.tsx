
export default function Footer() {
  return (
    <footer className="bg-black py-20 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <span className="text-2xl font-bold tracking-widest uppercase block mb-6">
              Far Out <span className="text-[#C2B280]">Media</span>
            </span>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Premium cinematic videography and storytelling. Elevating brands through intentional motion and drone artistry.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>cam@faroutmediaco.com</li>
              <li>Charlotte, NC</li>
              <li>FAA Licensed Drone Operator</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Follow</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-[#C2B280] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#C2B280] transition-colors">Vimeo</a></li>
              <li><a href="#" className="hover:text-[#C2B280] transition-colors">TikTok</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-gray-600">
          <span>&copy; {new Date().getFullYear()} Far Out Media Co. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
