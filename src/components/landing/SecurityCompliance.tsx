import { Shield, Lock, FileCheck, Server } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import SOCBadge from "@/assets/soc.png";
import ISOBadge from "@/assets/iso.png";
import GDPRBadge from "@/assets/gdpr.png";
import { motion } from "framer-motion";

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

const badges = [
  { image: SOCBadge, title: "SOC 2 Type II", subtitle: "Certified" },
  { image: ISOBadge, title: "ISO 27001", subtitle: "Certified" },
  { image: GDPRBadge, title: "GDPR", subtitle: "Compliant" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export const SecurityCompliance = () => {
  return (
    <section id="security-compliance" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="Security & Compliance"
            title="Enterprise-Grade Security"
            description="Your data security is our top priority. We implement industry-leading security measures to protect your sensitive information."
          />
        </motion.div>

        {/* Security Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 h-full transition-all duration-300 hover:border-primary/30 hover:bg-card/70">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          className="mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-8"
            variants={itemVariants}
          >
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Trusted & Certified</span>
          </motion.div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                variants={badgeVariants}
                className="group flex items-center gap-4 px-6 py-4 rounded-xl bg-card/30 border border-border/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-lg bg-background/50 flex items-center justify-center p-2 group-hover:bg-background/80 transition-colors duration-300">
                  <img 
                    src={badge.image} 
                    alt={`${badge.title} ${badge.subtitle}`} 
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-foreground">{badge.title}</div>
                  <div className="text-xs text-muted-foreground">{badge.subtitle}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
