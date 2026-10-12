'use client';

import React, { useMemo, useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { InteractiveHeroBackground } from '../InteractiveHeroBackground';

export function FrameworkHero() {
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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-20">
          
          {/* Main Title */}
          <motion.div 
            variants={itemVariants}
            style={{ y: textY }}
            className="flex flex-col"
          >
            <h1 className="text-5xl sm:text-[4.5rem] md:text-[6rem] lg:text-[8.5rem] font-sans font-medium tracking-tighter leading-[0.9] text-[#18181B] transform-gpu will-change-transform">
              Our <br/> Framework
            </h1>
          </motion.div>
          
          {/* Description */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col w-full lg:max-w-[480px] mb-2 lg:mb-3"
          >
            <p className="type-lead font-sans font-light tracking-tight leading-[1.5] text-[#18181B]/80 mb-6">
              A comprehensive, end-to-end approach to designing, implementing, and managing ownership structures that drive true alignment between your company and its people.
            </p>
            <p className="type-lead font-sans font-light tracking-tight leading-[1.5] text-[#18181B]/80">
              From mathematical pool sizing to risk mitigation, precise legal documentation, and employee communication, we cover every aspect of the equity lifecycle.
            </p>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
}
