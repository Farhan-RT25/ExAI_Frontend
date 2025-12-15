import React from "react";

const ProfilePattern = () => {
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
      {/* Base gradient with purple northern lights theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-[#009773]/20" />
      
      {/* Animated aurora effect */}
      <div className="absolute inset-0 opacity-60">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(167, 139, 250, 0.4) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 70% 60%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 50% 30% at 50% 30%, rgba(0, 151, 115, 0.25) 0%, transparent 50%)
            `,
          }}
        />
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Floating orbs */}
      <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-xl" />
      <div className="absolute bottom-2 left-12 w-12 h-12 rounded-full bg-gradient-to-br from-[#009773]/30 to-transparent blur-lg" />
      
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
};

export default ProfilePattern;
