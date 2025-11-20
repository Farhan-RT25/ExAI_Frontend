import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Settings, Eye, Hexagon } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 -mt-20">
      {/* Large gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-purple-900/30 border border-purple-500/20 mb-8">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span className="text-sm text-purple-200">AI + Email</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-6 leading-tight text-white">
              Manage Email Smarter. 
              <br />
              Instantly.
            </h1>
            
            <p className="text-lg text-purple-200/80 mb-8 max-w-lg">
              AI-powered tools that organize your inbox and draft replies, protecting user trust with unmatched transparency and fairness.
            </p>
            
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 h-14 px-8 rounded-xl group">
              Get started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right visual elements */}
          <div className="relative h-[600px] animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {/* Central AI card */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl shadow-2xl flex items-center justify-center border-4 border-purple-400/30 backdrop-blur-xl z-10">
              <div className="text-center">
                <div className="w-3 h-3 bg-purple-300 rounded-full mb-4 mx-auto"></div>
                <div className="text-8xl font-bold text-white">AI</div>
                <div className="w-3 h-3 bg-purple-300 rounded-full mt-4 mx-auto"></div>
              </div>
            </div>

            {/* Floating cards around the main card */}
            <div className="absolute top-8 right-12 w-20 h-20 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-purple-500/20 flex items-center justify-center shadow-xl animate-float">
              <BarChart3 className="w-8 h-8 text-purple-300" />
            </div>

            <div className="absolute top-32 left-4 w-24 h-24 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-purple-500/20 flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="space-y-2">
                <div className="flex gap-1 items-center">
                  <div className="w-4 h-4 rounded-full bg-purple-400"></div>
                  <div className="w-8 h-1 bg-purple-300 rounded"></div>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="w-4 h-4 rounded-full bg-purple-400"></div>
                  <div className="w-8 h-1 bg-purple-300 rounded"></div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-32 left-8 w-20 h-20 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-purple-500/20 flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: "1s" }}>
              <Settings className="w-8 h-8 text-purple-300" />
            </div>

            <div className="absolute bottom-20 right-24 w-20 h-20 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-purple-500/20 flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: "1.5s" }}>
              <Eye className="w-8 h-8 text-purple-300" />
            </div>

            <div className="absolute top-1/2 right-4 w-20 h-20 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-purple-500/20 flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: "0.8s" }}>
              <Hexagon className="w-8 h-8 text-purple-300" />
            </div>

            {/* Decorative diamond shapes */}
            <div className="absolute top-24 right-32 w-4 h-4 bg-purple-400 rotate-45 animate-pulse"></div>
            <div className="absolute top-1/2 left-20 w-3 h-3 bg-purple-300 rotate-45 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
            <div className="absolute bottom-40 right-12 w-3 h-3 bg-indigo-400 rotate-45 animate-pulse" style={{ animationDelay: "1s" }}></div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              <line x1="50%" y1="50%" x2="80%" y2="15%" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" />
              </line>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};