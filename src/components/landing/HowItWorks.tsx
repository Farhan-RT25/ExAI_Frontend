import { Check, Zap, RefreshCw, Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { motion } from "framer-motion";

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
      {/* Space ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="The Process"
            title="Your Inbox, on Autopilot"
            description="We don't just organize your emails; we understand them."
          />
        </motion.div>

        <div className="max-w-6xl mx-auto mt-20 space-y-24 md:space-y-32">
          
          {/* Step 1: Integration */}
          <motion.div 
            className="flex flex-col md:flex-row gap-12 items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-indigo-500/20 blur-2xl rounded-full opacity-50" />
              <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 h-[320px] flex items-center justify-center overflow-hidden shadow-2xl">
                {/* Central Hub */}
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                  <Zap className="text-white w-10 h-10 fill-white" />
                </div>
                
                {/* Orbiting Providers */}
                {['Gmail', 'Outlook', 'Zoho'].map((provider, i) => (
                  <motion.div 
                    key={provider}
                    className="absolute bg-card border border-border/50 px-4 py-2 rounded-lg text-foreground text-sm font-medium shadow-xl flex items-center gap-2"
                    style={{ 
                      top: i === 0 ? '20%' : i === 1 ? '75%' : '45%',
                      left: i === 0 ? '20%' : i === 1 ? '30%' : '75%',
                    }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    <div className={`w-2 h-2 rounded-full ${i===0 ? 'bg-red-500' : i===1 ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                    {provider}
                  </motion.div>
                ))}

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <line x1="50%" y1="50%" x2="28%" y2="28%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="38%" y2="78%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-foreground">Universal Integration</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Connect securely in one click. Whether you use Gmail, Outlook, or enterprise Zoho, our engine syncs your history without storing sensitive data.
              </p>
              <ul className="space-y-3">
                {["One-click OAuth connection", "256-bit Encrypted Sync", "Historical data import"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Step 2: Analysis */}
          <motion.div 
            className="flex flex-col md:flex-row-reverse gap-12 items-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full md:w-1/2 relative">
               <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-2xl rounded-full opacity-40" />
               <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 h-[320px] flex flex-col justify-center shadow-2xl overflow-hidden">
                  
                  {/* Mock Chat UI */}
                  <div className="space-y-4 w-full max-w-[85%] mx-auto">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted shrink-0" />
                      <div className="bg-muted p-3 rounded-r-xl rounded-bl-xl text-xs text-muted-foreground">
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
                          <motion.div 
                            className="h-full bg-emerald-500"
                            animate={{ width: ["0%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
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

            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-foreground">It Learns Your Voice</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our neural engine reads your past emails to understand your vocabulary, tone, and sentence structure.
              </p>
              <div className="border-l-2 border-emerald-500/30 pl-4 py-1">
                <p className="text-foreground italic">"It sounds exactly like me, but without the typos."</p>
              </div>
            </div>
          </motion.div>

          {/* Step 3: Output */}
          <motion.div 
            className="flex flex-col md:flex-row gap-12 items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl rounded-full opacity-40" />
              <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 h-[320px] flex flex-col shadow-2xl overflow-hidden hover:border-primary/30 transition-colors">
                
                {/* Mock Inbox Header */}
                <div className="flex items-center justify-between border-b border-border/30 pb-4 mb-4">
                  <div className="text-sm font-semibold text-foreground">Inbox (3)</div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                </div>

                {/* Mock Email Rows */}
                <div className="space-y-3">
                  {[1, 2].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-transparent">
                      <div className="w-4 h-4 rounded border border-border" />
                      <div className="h-2 w-12 bg-muted rounded" />
                      <div className="h-2 flex-1 bg-muted/50 rounded" />
                    </div>
                  ))}

                  {/* Active AI Draft Row */}
                  <div className="relative p-3 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border border-primary/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                         <div className="w-4 h-4 rounded border border-primary bg-primary/20 flex items-center justify-center">
                            <Sparkles className="w-2 h-2 text-primary" />
                         </div>
                         <span className="text-xs font-medium text-primary">Draft Ready</span>
                      </div>
                      <span className="text-[10px] text-primary/70">Just now</span>
                    </div>
                    <div className="h-2 w-3/4 bg-primary/20 rounded mb-2" />
                    <div className="flex gap-2">
                       <button className="text-[10px] bg-primary text-primary-foreground px-3 py-1 rounded-md shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                          Review & Send
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-foreground">Instant, Categorized Drafts</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Wake up to an inbox that is already organized. Sales inquiries are flagged, invoices are categorized, and replies are 90% written for you.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-card border border-border/50">
                   <div className="text-2xl font-bold text-foreground mb-1">2h+</div>
                   <div className="text-sm text-muted-foreground">Saved daily</div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/50">
                   <div className="text-2xl font-bold text-foreground mb-1">0</div>
                   <div className="text-sm text-muted-foreground">Inbox anxiety</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
