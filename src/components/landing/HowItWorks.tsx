import { Check, Webhook, Settings, Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="Getting Started"
            title="Up and Running in Minutes"
            description="From connection to automation—your personalized email assistant is just a few clicks away."
          />
        </motion.div>

        <div className="max-w-6xl mx-auto mt-20 space-y-24 md:space-y-32">
          
          {/* Step 1: Connect Your Email */}
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
                  <Webhook className="text-white w-10 h-10" />
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
              <h3 className="text-3xl font-bold text-foreground">Secure One-Click Integration</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Sign up using your Google, Microsoft, or Zoho account. Grant secure authorization through OAuth—we never store your password. Your email provider remains your single source of truth.
              </p>
              <ul className="space-y-3">
                {["Choose your email provider", "Authorize secure access", "Instant connection established"].map((item) => (
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

          {/* Step 2: Personalize Your Setup */}
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
                  
                  {/* Mock Onboarding UI */}
                  <div className="space-y-4 w-full max-w-[90%] mx-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-foreground">Setup Progress</span>
                      <span className="text-xs text-muted-foreground">Step 2 of 3</span>
                    </div>

                    {/* Question */}
                    <div className="bg-muted/50 p-4 rounded-xl">
                      <p className="text-sm text-foreground font-medium mb-3">What's your primary role?</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 border border-primary/30">
                          <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                          <span className="text-sm text-foreground">Sales & Marketing</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg border border-border/30">
                          <div className="w-4 h-4 rounded-full border-2 border-border" />
                          <span className="text-sm text-muted-foreground">Project Manager</span>
                        </div>
                      </div>
                    </div>

                    {/* Recommended Categories */}
                    <div className="border border-emerald-500/30 bg-emerald-500/5 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Settings className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-semibold text-emerald-400">Recommended Categories</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-md">Clients</span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-md">Leads</span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-md">Campaigns</span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-md">Internal</span>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-foreground">Tell Us About Your Workflow</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Answer a few quick questions about your role and email habits. Our AI analyzes your responses and recommends relevant categories like Clients, Projects, Internal, or Invoices. Accept our suggestions or customize them to fit your needs.
              </p>
              <div className="border-l-2 border-emerald-500/30 pl-4 py-1">
                <p className="text-foreground italic">"The AI knew exactly what categories I needed."</p>
              </div>
            </div>
          </motion.div>

          {/* Step 3: AI Takes Over */}
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
                
                {/* Mock Processing Header */}
                <div className="flex items-center justify-between border-b border-border/30 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-sm font-semibold text-foreground">AI Processing</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                </div>

                {/* Processing Status */}
                <div className="space-y-4">
                  {/* Completed */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Categorizing Emails</div>
                      <div className="text-xs text-muted-foreground">143 emails organized</div>
                    </div>
                  </div>

                  {/* In Progress */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/30">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Generating Draft Replies</div>
                      <div className="text-xs text-muted-foreground">27 of 48 complete</div>
                    </div>
                  </div>

                  {/* Queued */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Extracting Calendar Events</div>
                      <div className="text-xs text-muted-foreground">Queued</div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-auto pt-4">
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-purple-500"
                      animate={{ width: ["0%", "65%"] }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-2">Processing your inbox...</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-foreground">Automation Starts Immediately</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Once configured, our AI processes your last 15 days of unread emails plus all new incoming messages. Emails are automatically categorized, draft replies are generated, and calendar events are extracted—all happening in the background.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-card border border-border/50">
                   <div className="text-2xl font-bold text-foreground mb-1">15</div>
                   <div className="text-xs text-muted-foreground">Days processed</div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/50">
                   <div className="text-2xl font-bold text-foreground mb-1">24/7</div>
                   <div className="text-xs text-muted-foreground">Continuous</div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/50">
                   <div className="text-2xl font-bold text-foreground mb-1">Live</div>
                   <div className="text-xs text-muted-foreground">Real-time</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}