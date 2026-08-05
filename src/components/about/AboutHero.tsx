'use client';

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';

export function AboutHero() {
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
    <section className="relative w-full min-h-[70vh] flex flex-col justify-end bg-[#090909] text-white pb-24 pt-48 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#090909] pointer-events-none" />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-30 flex flex-col items-start justify-end w-full max-w-7xl mx-auto"
      >
        <motion.h3 variants={itemVariants} className="text-[#D02717] font-sans font-semibold tracking-[0.15em] text-[12px] md:text-[14px] uppercase mb-8 md:mb-12">
          About Veritas
        </motion.h3>
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-12">
          <div className="flex flex-col max-w-4xl">
            <motion.h1 variants={itemVariants} className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-sans font-semibold tracking-[-0.02em] leading-[1.05] text-white mb-6">
              Purposeful ownership structures.
            </motion.h1>
            <motion.h2 variants={itemVariants} className="text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] font-sans font-light tracking-tight leading-[1.2] text-white/70 max-w-2xl">
              We empower companies with the strategic insights required to design equity programs that drive long-term value.
            </motion.h2>
          </div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-start md:items-end text-left md:text-right hidden lg:flex">
            <p className="text-white/40 text-[0.8rem] uppercase tracking-widest font-medium mb-2">Scroll</p>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
