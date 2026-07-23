import Link from "next/link";
import { Linkedin, Twitter, Youtube, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0f16] text-slate-400 py-16 px-8 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          
          {/* Brand & Description */}
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3b82f6] flex items-center justify-center text-white">
                <Zap size={20} className="fill-white stroke-white" />
              </div>
              <span className="text-white text-xl font-bold tracking-wide">VTOLUTION</span>
            </div>
            <p className="text-[14px] leading-relaxed text-slate-400">
              Pioneering the next generation of heavy-lift vertical takeoff and landing aircraft for defense, logistics, and critical infrastructure.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Linkedin size={18} className="text-slate-400 hover:text-white transition-colors" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Twitter size={18} className="text-slate-400 hover:text-white transition-colors" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Youtube size={18} className="text-slate-400 hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24 w-full lg:w-auto">
            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-white text-[15px] font-semibold">Company</h3>
              <ul className="flex flex-col gap-4 text-[14px]">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Technology</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Roadmap</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-white text-[15px] font-semibold">Markets</h3>
              <ul className="flex flex-col gap-4 text-[14px]">
                <li><Link href="#" className="hover:text-white transition-colors">Defense</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Logistics</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Emergency Response</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Infrastructure</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-white text-[15px] font-semibold">Resources</h3>
              <ul className="flex flex-col gap-4 text-[14px]">
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">White Papers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">News</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-800/60 text-[13px]">
          <p>© 2024 VTOLution. All rights reserved.</p>
          
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
