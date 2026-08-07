'use client';

import React from 'react';
import { StaticHeroBackground } from './StaticHeroBackground';
import { InteractiveHeroBackground } from './InteractiveHeroBackground';
import { motion } from 'framer-motion';
import { AnimatedButton } from './AnimatedButton';

export function CTASection({ isInteractiveBg = false, showBackground = true }: { isInteractiveBg?: boolean, showBackground?: boolean }) {
  return (
    <section className={`relative w-full py-24 md:py-32 px-6 md:px-16 overflow-hidden flex flex-col items-center justify-center ${isInteractiveBg ? 'bg-white text-[#090909]' : 'bg-[#090909] text-white'}`}>
      {/* Background topography with smooth fade at top and bottom */}
      {showBackground && (
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
          {isInteractiveBg ? <InteractiveHeroBackground layoutMode="cta" /> : <StaticHeroBackground />}
        </div>
      )}
      
      <div className="relative z-10 max-w-[1400px] w-full mx-auto text-center flex flex-col items-center">
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
          className={`text-3xl md:text-[38px] font-semibold tracking-tighter leading-[1.1] mb-6 max-w-2xl drop-shadow-2xl ${isInteractiveBg ? 'text-[#18181B]' : 'text-white'}`}
        >
          Ready to Redefine Your <br className="hidden md:block"/> Equity Structure?
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-[15px] md:text-base mb-10 max-w-xl font-light ${isInteractiveBg ? 'text-[#18181B]/70' : 'text-white/70'}`}
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
