import { Lock, FileCheck, Server } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import SOCBadge from "@/assets/soc.png";
import ISOBadge from "@/assets/iso.png";
import GDPRBadge from "@/assets/gdpr.png";

const securityFeatures = [
  {
    icon: Lock,
    title: "Data Privacy",
    description: "GDPR compliant with full data control. Your emails remain encrypted and private, with zero-knowledge architecture ensuring only you can access your data.",
  },
  {
    icon: FileCheck,
    title: "Compliance Ready",
    description: "SOC 2, ISO 27001 certified infrastructure. Meet regulatory requirements with enterprise-grade security standards and comprehensive audit trails.",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "Hosted on enterprise cloud with 99.9% uptime. Multi-region redundancy and automated backups ensure your data is always safe and accessible.",
  },
];

export const SecurityCompliance = () => {
  return (
    <section id="security-compliance" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Security & Compliance"
          title="Enterprise-Grade Security"
          description="Your data security is our top priority. We implement industry-leading security measures to protect your sensitive information."
        />

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-16">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Card */}
                <div 
                  className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] border border-primary/20 rounded-2xl p-8 h-[450px] transition-all duration-500 ease-out group-hover:border-primary/40 overflow-hidden"
                >
                  {/* Grid overlay */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(${index === 0 ? '#a78bfa' : index === 1 ? '#009773' : '#4a4453'}40 1px, transparent 1px),
                        linear-gradient(90deg, ${index === 0 ? '#a78bfa' : index === 1 ? '#009773' : '#4a4453'}40 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                    }}
                  />

                  {/* 3D Image Container */}
                  <div className="relative h-48 mb-6 flex items-center justify-center">
                    {/* Background glow */}
                    <div 
                      className="absolute inset-0 rounded-xl opacity-30 blur-2xl"
                      style={{
                        background: `radial-gradient(circle at center, ${
                          index === 0 ? '#a78bfa' : index === 1 ? '#009773' : '#4a4453'
                        }60 0%, transparent 70%)`,
                      }}
                    />
                    
                    {/* 3D Icon representation */}
                    <div 
                      className="relative z-10 w-32 h-32 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                      style={{
                        transform: 'perspective(800px) rotateY(-15deg) rotateX(10deg)',
                      }}
                    >
                      {/* Icon platform */}
                      <div 
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${
                            index === 0 ? '#a78bfa' : index === 1 ? '#009773' : '#4a4453'
                          }40, ${
                            index === 0 ? '#a78bfa' : index === 1 ? '#009773' : '#4a4453'
                          }10)`,
                          boxShadow: `0 10px 40px ${
                            index === 0 ? '#a78bfa' : index === 1 ? '#009773' : '#4a4453'
                          }30`,
                        }}
                      />
                      <Icon 
                        className="relative z-10 w-16 h-16"
                        style={{
                          color: index === 0 ? '#a78bfa' : index === 1 ? '#009773' : '#4a4453',
                          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                        }}
                      />
                      
                      {/* Grid lines on icon */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-40"
                        style={{
                          backgroundImage: `
                            linear-gradient(${index === 0 ? '#a78bfa' : index === 1 ? '#009773' : '#4a4453'} 1px, transparent 1px),
                            linear-gradient(90deg, ${index === 0 ? '#a78bfa' : index === 1 ? '#009773' : '#4a4453'} 1px, transparent 1px)
                          `,
                          backgroundSize: '16px 16px',
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${
                        index === 0 ? '#a78bfa' : index === 1 ? '#009773' : '#4a4453'
                      }, transparent)`,
                    }}
                  />
                </div>

                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${
                      index === 0 ? '#a78bfa' : index === 1 ? '#009773' : '#4a4453'
                    }30 0%, transparent 70%)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-12 mt-20">
          <div className="group flex flex-col items-center gap-3 px-6 py-4 rounded-lg transition-all hover:bg-primary/5">
            <img src={SOCBadge} alt="SOC 2 Type II Certified" className="h-20 w-20 object-contain group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xs font-medium text-muted-foreground">SOC 2 Type II</span>
          </div>
          <div className="group flex flex-col items-center gap-3 px-6 py-4 rounded-lg transition-all hover:bg-primary/5">
            <img src={ISOBadge} alt="ISO 27001 Certified" className="h-20 w-20 object-contain group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xs font-medium text-muted-foreground">ISO 27001</span>
          </div>
          <div className="group flex flex-col items-center gap-3 px-6 py-4 rounded-lg transition-all hover:bg-primary/5">
            <img src={GDPRBadge} alt="GDPR Compliant" className="h-20 w-20 object-contain group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xs font-medium text-muted-foreground">GDPR Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
};