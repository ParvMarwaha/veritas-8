'use client';

import React from 'react';
import { StaticHeroBackground } from './StaticHeroBackground';
import { InteractiveHeroBackground } from './InteractiveHeroBackground';
import { motion } from 'framer-motion';
import { AnimatedButton } from './AnimatedButton';

export function CTASection({ isInteractiveBg = false }: { isInteractiveBg?: boolean }) {
  return (
    <section className="relative w-full bg-[#090909] text-white py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
      {/* Reusing the exact topography physics from the hero section */}
      {isInteractiveBg ? <InteractiveHeroBackground /> : <StaticHeroBackground />}
      
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5"
        >
          Get Started
        </motion.h2>

        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-[38px] font-semibold tracking-tighter leading-[1.1] mb-6 max-w-2xl drop-shadow-2xl"
        >
          Ready to Redefine Your <br className="hidden md:block"/> Equity Structure?
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[15px] md:text-base text-white/70 mb-10 max-w-xl font-light"
        >
          Join the vanguard of modern organizations building a sustainable culture of ownership and trust.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AnimatedButton variant="brand" className="px-8 py-3.5 rounded-full min-w-[160px]">
            Get in Touch
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}
