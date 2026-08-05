'use client';

import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

function StoryCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Sweep originates from opposite corners for visual balance
  const sweepPos = index === 0 
    ? "bottom-0 right-0 translate-x-1/2 translate-y-1/2" 
    : "bottom-0 left-0 -translate-x-1/2 translate-y-1/2";
    
  return (
    <div 
      onMouseMove={handleMouseMove}
      className={`group relative bg-[#EAEAEA] px-8 lg:px-12 py-10 lg:py-14 h-full min-h-[260px] lg:min-h-[280px] flex flex-col justify-center overflow-hidden cursor-pointer transition-transform duration-700 hover:z-20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]`}
    >
      <div 
        className={`absolute ${sweepPos} w-[300%] aspect-square bg-[#2A2A2A] rounded-full transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] scale-0 group-hover:scale-100 z-0 will-change-transform transform-gpu`}
      />

      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 z-0 mix-blend-overlay will-change-opacity"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className={`relative z-10 transform transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1 group-hover:scale-[1.01] flex flex-col items-start text-left will-change-transform transform-gpu`}>
        <h4 className="text-[24px] lg:text-[28px] font-bold mb-4 tracking-tight text-[#090909] group-hover:text-white transition-colors duration-700">
          {title}
        </h4>
        <p className="text-[14px] lg:text-[15px] leading-[1.65] text-[#090909]/70 group-hover:text-white/80 font-light transition-colors duration-700">
          {desc}
        </p>
      </div>
    </div>
  );
}

export function AboutStory() {
  const cards = [
    {
      title: "Our Vision",
      desc: "To create a business landscape where every stakeholder is genuinely invested in the collective success of the organization. We envision a future where ownership structures are transparent, fair, and incredibly motivating."
    },
    {
      title: "Our Mission",
      desc: "To empower companies with the structural frameworks and strategic insights required to design, implement, and manage equity programs that attract top talent and drive long-term value creation."
    }
  ];

  return (
    <section className="w-full bg-white text-black py-24 md:py-32 px-6 md:px-16 font-sans relative z-20">
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        
        {/* Left Column - Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-4 flex flex-col items-start"
        >
          <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
            Our Story & Mission
          </h2>
          <h3 className="text-3xl md:text-[42px] font-semibold tracking-tighter leading-[1.1] mb-6 max-w-[380px] text-[#090909]">
            Driven by a singular purpose to redefine equity.
          </h3>
        </motion.div>

        {/* Right Column - Content */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-8 flex flex-col w-full"
        >
          <div className="text-[#D02717] font-medium text-[16px] lg:text-[18px] leading-[1.5] max-w-[600px] mb-8 lg:mb-10">
            We believe that ownership is the ultimate driver of alignment, engagement, and sustainable growth.
          </div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-[1px] bg-[#D02717] mb-12 lg:mb-16 origin-left"
          ></motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[4px] lg:gap-[6px]">
            {cards.map((card, i) => (
              <StoryCard key={i} title={card.title} desc={card.desc} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
