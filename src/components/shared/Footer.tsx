import Link from "next/link";
import { Zap } from "lucide-react";

const Linkedin = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const Twitter = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const Youtube = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);
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
              <span className="text-white text-xl font-bold tracking-wide">UniSuite</span>
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
          <p>© 2024 UniSuite. All rights reserved.</p>
          
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
