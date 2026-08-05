'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function LeaderRow({ leader }: { leader: { name: string, role: string, image: string } }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    // Move up to 30px in any direction based on cursor position
    mouseX.set(x * 60); 
    mouseY.set(y * 60);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col space-y-4 group relative z-10 hover:z-20"
    >
      {/* Hover Image Box */}
      <motion.div 
        style={{ x: smoothX, y: smoothY }}
        className="hidden md:block absolute top-1/2 -translate-y-1/2 right-[25%] lg:right-[35%] w-[200px] lg:w-[240px] aspect-[4/5] bg-[#D9D9D9] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none z-30 shadow-2xl overflow-hidden"
      >
        {leader.image && (
          <img src={leader.image} alt={leader.name} className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out" />
        )}
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-20">
        <div className="flex flex-col items-start gap-1 bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-r-lg pr-4">
          <h4 className="text-[24px] md:text-[28px] font-semibold text-[#090909] tracking-tight group-hover:text-[#D02717] transition-colors duration-300 mix-blend-difference">
            {leader.name}
          </h4>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-black/40 text-[12px] md:text-[13px] font-medium hover:text-[#D02717] transition-all duration-300 transform origin-left hover:scale-105 inline-block mt-1">
            LinkedIn
          </a>
        </div>
        <span className="text-[#D02717] font-medium text-[14px] md:text-[15px] uppercase tracking-wide pb-1 md:pb-3 bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-l-lg pl-4">
          {leader.role}
        </span>
      </div>
      <div className="w-full h-[1px] bg-black/10 mt-6 group-hover:bg-[#D02717]/30 transition-colors duration-500 relative z-20"></div>
    </div>
  );
}

export function AboutLeadership() {
  const leaders = [
    { name: "Vichitra Malhotra", role: "Partner", image: "/vichitra.png" },
    { name: "Khushwant Singh", role: "Partner", image: "/khushwant.png" },
    { name: "Varnika Malhotra", role: "Principal Consultant", image: "/varnika.png" }
  ];

  return (
    <section className="w-full bg-white text-black py-24 md:py-32 overflow-hidden relative font-sans z-20">
      
      <div className="w-full px-6 md:px-16 relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 xl:gap-32 items-start">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex flex-col items-start lg:pr-8"
          >
            <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
              Leadership Team
            </h2>
            <h3 className="text-3xl md:text-[42px] font-semibold tracking-tighter leading-[1.1] mb-6 max-w-[380px] text-[#090909]">
              The minds behind the design.
            </h3>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 flex flex-col w-full"
          >
            <div className="w-full h-[1px] bg-black/10 mb-12"></div>
            
            <div className="flex flex-col space-y-12">
              {leaders.map((leader, index) => (
                <LeaderRow key={index} leader={leader} />
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
