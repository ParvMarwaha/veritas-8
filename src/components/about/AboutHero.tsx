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
    <section className="relative w-full h-[80vh] min-h-[600px] flex flex-col items-center justify-center bg-[#090909] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111] to-[#090909] pointer-events-none" />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`relative z-30 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl transition-opacity duration-500 mt-8 md:mt-12`}
      >
        <motion.h3 variants={itemVariants} className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-6">
          About Veritas
        </motion.h3>
        <motion.h1 variants={itemVariants} className={`text-[2.5rem] sm:text-5xl md:text-[3.5rem] font-sans font-bold tracking-tighter leading-[1.1] mb-2 text-white`}>
          Purposeful ownership structures
        </motion.h1>
        <motion.h2 variants={itemVariants} className={`text-[1.75rem] sm:text-4xl md:text-[2.75rem] font-sans font-medium tracking-tighter leading-[1.1] mb-6 md:whitespace-nowrap text-white/80`}>
          designed for modern organizations
        </motion.h2>
        <motion.p variants={itemVariants} className={`max-w-lg mx-auto text-[14px] md:text-[15px] font-sans font-light tracking-tight leading-relaxed mb-8 text-white/70`}>
          We empower companies with the strategic insights required to design equity programs that drive long-term value.
        </motion.p>
      </motion.div>
    </section>
  );
}
