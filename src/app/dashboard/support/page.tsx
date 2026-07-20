import { Mail, Search } from "lucide-react";

export default function StudentSupportPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] relative pb-20 md:pb-0">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-emerald-600 rounded-sm p-6 text-white text-center shadow-sm">
          <div className="text-3xl font-bold mb-1">0</div>
          <div className="text-xs font-medium">Opened Tickets</div>
        </div>
        <div className="bg-emerald-600 rounded-sm p-6 text-white text-center shadow-sm">
          <div className="text-3xl font-bold mb-1">0</div>
          <div className="text-xs font-medium">Closed Tickets</div>
        </div>
        <div className="bg-emerald-600 rounded-sm p-6 text-white text-center shadow-sm">
          <div className="text-3xl font-bold mb-1">0</div>
          <div className="text-xs font-medium">All Tickets</div>
        </div>
      </div>

      {/* Recent Tickets Section */}
      <h2 className="text-xl font-bold text-slate-800 mb-4 font-serif">Recent Tickets</h2>
      
      {/* Empty State Card */}
      <div className="bg-white flex-1 border border-slate-200 rounded-sm shadow-sm flex flex-col items-center justify-center py-20 px-4">
        {/* Abstract Illustration Mimic */}
        <div className="relative flex items-center justify-center mb-8 w-64 h-64">
          <div className="absolute inset-0 bg-[#2b2d42] rounded-full flex items-center justify-center">
            <div className="w-48 h-48 bg-[#252739] rounded-full flex items-center justify-center">
              <div className="w-32 h-32 bg-[#1f2030] rounded-full"></div>
            </div>
          </div>
          {/* Small decorative circles mimicking the mockup */}
          <div className="absolute -bottom-2 -left-4 w-12 h-12 bg-emerald-500 rounded-full opacity-90"></div>
          <div className="absolute bottom-4 -left-2 w-8 h-8 bg-emerald-400 rounded-full opacity-90"></div>
          <div className="absolute -bottom-4 right-4 w-10 h-10 bg-emerald-600 rounded-full opacity-90"></div>
          
          <Search size={64} className="text-white relative z-10 opacity-50" strokeWidth={1} />
        </div>
        
        <h3 className="text-lg font-bold font-serif text-slate-800">No Records Found.</h3>
      </div>

      {/* Floating Action Button */}
      <button 
        className="fixed bottom-24 right-6 md:bottom-16 md:right-10 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 z-40 flex items-center justify-center"
        title="New Ticket"
      >
        <Mail size={24} />
      </button>

      {/* Footer */}
      <div className="mt-12 pt-4 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between text-xs text-slate-700 w-full pb-4">
        <div>Copyright © 2026 All Rights Reserved.</div>
        <div className="flex items-center gap-6 mt-4 md:mt-0 font-medium">
          <a href="#" className="hover:text-emerald-700 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-emerald-700 transition-colors">Terms of Use</a>
          <button className="flex items-center gap-1 hover:text-emerald-700 transition-colors">
            English <span className="text-[9px]">▼</span>
          </button>
        </div>
      </div>
    </div>
  );
}
