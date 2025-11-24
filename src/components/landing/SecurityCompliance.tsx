import { Shield, Lock, Eye, FileCheck, Server, Zap } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const securityFeatures = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption for all your email data",
    size: "large",
  },
  {
    icon: Lock,
    title: "Data Privacy",
    description: "GDPR compliant with full data control",
    size: "small",
  },
  {
    icon: Eye,
    title: "Access Control",
    description: "Role-based permissions",
    size: "small",
  },
  {
    icon: FileCheck,
    title: "Compliance Ready",
    description: "SOC 2, ISO 27001 certified infrastructure",
    size: "medium",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "Hosted on enterprise cloud with 99.9% uptime",
    size: "medium",
  },
  {
    icon: Zap,
    title: "Real-time Monitoring",
    description: "24/7 security monitoring and threat detection",
    size: "small",
  },
];

export const SecurityCompliance = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Security & Compliance"
          title="Enterprise-Grade Security"
          description="Your data security is our top priority. We implement industry-leading security measures to protect your sensitive information."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {/* Large card */}
          <div className="md:col-span-2 md:row-span-2 bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                {securityFeatures[0].title}
              </h3>
              <p className="text-muted-foreground text-lg mb-6">
                {securityFeatures[0].description}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  End-to-end encryption
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Zero-knowledge architecture
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Advanced threat protection
                </li>
              </ul>
            </div>
          </div>

          {/* Small cards - top right */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {securityFeatures.slice(1, 3).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Medium cards - bottom right */}
          {securityFeatures.slice(3, 5).map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="md:col-span-1 bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}

          {/* Last small card */}
          <div className="md:col-span-2 bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {securityFeatures[5].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {securityFeatures[5].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
