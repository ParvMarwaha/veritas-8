'use client';

import React, { useMemo, useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { InteractiveHeroBackground } from '../InteractiveHeroBackground';

export function InsightsHero() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
  
  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  }), []);

  const itemVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } 
    }
  }), []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] flex flex-col justify-center bg-white text-[#18181B] pb-16 md:pb-24 pt-32 md:pt-48 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 z-10 opacity-[23%] pointer-events-auto mix-blend-multiply">
        <InteractiveHeroBackground layoutMode="hero" />
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-30 w-full max-w-[1400px] mx-auto flex flex-col justify-center h-full"
      >
        <div className="flex flex-col justify-center items-start w-full h-full pt-20">
          
          <motion.div 
            variants={itemVariants} 
            className="w-full flex justify-start md:justify-end mb-12 md:mb-0 md:-mb-12 lg:-mb-24 relative z-20 pr-0 md:pr-12 lg:pr-[15%]"
          >
            <div className="bg-white/70 backdrop-blur-xl border border-white p-6 md:p-8 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] max-w-[400px]">
              <span className="block text-[#D02717] font-bold tracking-[0.2em] text-[10px] uppercase mb-4">
                Knowledge Hub
              </span>
              <p className="text-[1rem] md:text-[1.1rem] font-sans font-light tracking-tight leading-[1.5] text-[#18181B]/80">
                Explore the latest thinking from our experts on equity structures, global compliance, and building high-performance ownership cultures.
              </p>
            </div>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            style={{ y: textY }}
            className="text-[5.5rem] sm:text-[8rem] md:text-[11rem] lg:text-[14rem] xl:text-[17rem] font-sans font-medium tracking-tighter leading-[0.8] text-[#18181B] relative z-10 transform-gpu will-change-transform -ml-2 md:-ml-4"
          >
            Insights<span className="text-[#D02717]">.</span>
          </motion.h1>

        </div>
      </motion.div>
    </section>
  );
}
