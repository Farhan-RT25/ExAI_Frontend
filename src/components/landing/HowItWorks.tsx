import { Check, Mail, Sparkles, Zap, MessageSquare, ArrowRight, RefreshCw } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* --- Ambient Lighting (Brighter than before) --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          badge="The Process"
          title="Your Inbox, on Autopilot"
          description="We don't just organize your emails; we understand them."
        />

        <div className="max-w-6xl mx-auto mt-20 space-y-24 md:space-y-32">
          
          {/* --- STEP 1: Integration (The Hub) --- */}
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Visual: Connectivity Hub */}
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-2xl rounded-full opacity-50" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-[320px] flex items-center justify-center overflow-hidden shadow-2xl">
                {/* Central Hub */}
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Zap className="text-white w-10 h-10 fill-white" />
                </div>
                
                {/* Orbiting Providers */}
                {['Gmail', 'Outlook', 'Zoho'].map((provider, i) => (
                  <div 
                    key={provider}
                    className="absolute bg-slate-800 border border-white/5 px-4 py-2 rounded-lg text-slate-300 text-sm font-medium shadow-xl flex items-center gap-2 animate-float"
                    style={{ 
                      top: i === 0 ? '20%' : i === 1 ? '75%' : '45%',
                      left: i === 0 ? '20%' : i === 1 ? '30%' : '75%',
                      animationDelay: `${i * 1.5}s`
                    }}
                  >
                    <div className={`w-2 h-2 rounded-full ${i===0 ? 'bg-red-500' : i===1 ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                    {provider}
                    <div className="absolute inset-0 border border-indigo-500/30 rounded-lg animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}

                {/* Connection Lines (CSS SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <line x1="50%" y1="50%" x2="28%" y2="28%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="38%" y2="78%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>
            
            {/* Content */}
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-white">Universal Integration</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Connect securely in one click. Whether you use Gmail, Outlook, or enterprise Zoho, our engine syncs your history without storing sensitive data.
              </p>
              <ul className="space-y-3">
                {["One-click OAuth connection", "256-bit Encrypted Sync", "Historical data import"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- STEP 2: Analysis (The Tone Scanner) --- */}
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            {/* Visual: Chat Analysis */}
            <div className="w-full md:w-1/2 relative">
               <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-2xl rounded-full opacity-40" />
               <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-[320px] flex flex-col justify-center shadow-2xl overflow-hidden">
                  
                  {/* Mock Chat UI */}
                  <div className="space-y-4 w-full max-w-[85%] mx-auto">
                    {/* User Message */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 shrink-0" />
                      <div className="bg-slate-800 p-3 rounded-r-xl rounded-bl-xl text-xs text-slate-400">
                        Hey, just checking in on the project status?
                      </div>
                    </div>

                    {/* AI Scanning Visual */}
                    <div className="relative border border-emerald-500/30 bg-emerald-500/5 p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-emerald-400">AI_ANALYSIS_MODE</span>
                        <RefreshCw className="w-3 h-3 text-emerald-400 animate-spin" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-1.5 w-full bg-emerald-500/20 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-2/3 animate-[shimmer_2s_infinite]" />
                        </div>
                        <div className="flex gap-2 mt-2">
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Friendly</span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Casual</span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Inquisitive</span>
                        </div>
                      </div>
                    </div>
                  </div>

               </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-white">It Learns Your Voice</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Our neural engine reads your past emails to understand your vocabulary, tone, and sentence structure.
              </p>
              <div className="border-l-2 border-emerald-500/30 pl-4 py-1">
                <p className="text-slate-300 italic">"It sounds exactly like me, but without the typos."</p>
              </div>
            </div>
          </div>

          {/* --- STEP 3: The Output (Instant Drafts) --- */}
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Visual: Inbox UI */}
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl rounded-full opacity-40" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-[320px] flex flex-col shadow-2xl overflow-hidden hover:border-purple-500/30 transition-colors">
                
                {/* Mock Inbox Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <div className="text-sm font-semibold text-white">Inbox (3)</div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                </div>

                {/* Mock Email Rows */}
                <div className="space-y-3">
                  {[1, 2].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-transparent">
                      <div className="w-4 h-4 rounded border border-slate-600" />
                      <div className="h-2 w-12 bg-slate-700 rounded" />
                      <div className="h-2 flex-1 bg-slate-700/50 rounded" />
                    </div>
                  ))}

                  {/* Active AI Draft Row */}
                  <div className="relative p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                         <div className="w-4 h-4 rounded border border-purple-400 bg-purple-400/20 flex items-center justify-center">
                            <Sparkles className="w-2 h-2 text-purple-400" />
                         </div>
                         <span className="text-xs font-medium text-purple-200">Draft Ready</span>
                      </div>
                      <span className="text-[10px] text-purple-300">Just now</span>
                    </div>
                    <div className="h-2 w-3/4 bg-purple-500/20 rounded mb-2" />
                    <div className="flex gap-2">
                       <button className="text-[10px] bg-purple-500 text-white px-3 py-1 rounded-md shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform">
                          Review & Send
                       </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-white">Instant, Categorized Drafts</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Wake up to an inbox that is already organized. Sales inquiries are flagged, invoices are categorized, and replies are 90% written for you.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                   <div className="text-2xl font-bold text-white mb-1">2h+</div>
                   <div className="text-sm text-slate-500">Saved daily</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                   <div className="text-2xl font-bold text-white mb-1">0</div>
                   <div className="text-sm text-slate-500">Inbox anxiety</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};