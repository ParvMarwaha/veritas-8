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
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center bg-[#F6F5F2] text-[#18181B] pb-24 pt-48 px-6 md:px-16 overflow-hidden">
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-30 flex flex-col w-full max-w-7xl mx-auto h-full justify-center"
      >
        <motion.h1 variants={itemVariants} className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] font-sans font-medium tracking-tight leading-[1] text-[#18181B] mb-16 md:mb-24">
          About Us
        </motion.h1>
        
        <div className="flex flex-col md:flex-row items-start justify-between w-full gap-12 md:gap-24">
          <motion.div variants={itemVariants} className="flex flex-col max-w-lg space-y-6">
            <p className="text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] font-sans font-light tracking-tight leading-[1.4] text-[#18181B]/80">
              Built around four essential pillars, our services combine financial precision, legal clarity, governance expertise, and employee engagement to create ownership structures that scale with your business.
            </p>
            <p className="text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] font-sans font-light tracking-tight leading-[1.4] text-[#18181B]/80">
              We empower companies with the strategic insights required to design equity programs that drive long-term value, aligning incentives and attracting top tier talent to push your vision forward.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="w-full md:w-1/2 lg:w-[600px] aspect-[4/3] bg-[#d9d9d9] relative overflow-hidden rounded-sm">
            {/* Image Placeholder */}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
