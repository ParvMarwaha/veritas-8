'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StaticHeroBackground } from './StaticHeroBackground';
import { InteractiveHeroBackground } from './InteractiveHeroBackground';
import { AnimatedButton } from './AnimatedButton';

export function StaticHero({ 
  onReady, 
  isReady = true,
  isMenuOpen = false,
  isInteractiveBg = false
}: { 
  onReady?: () => void, 
  isReady?: boolean,
  isMenuOpen?: boolean,
  isInteractiveBg?: boolean
}) {

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {isInteractiveBg ? <InteractiveHeroBackground /> : <StaticHeroBackground onRevealComplete={onReady} />}
      
      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isMenuOpen ? { opacity: 0, scale: 0.95 } : (isReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30 })}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        className={`relative z-30 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl transition-opacity duration-500 mt-8 md:mt-12`}
      >
        <h1 className="text-[2.5rem] sm:text-5xl md:text-[3.5rem] font-sans font-bold text-white tracking-tighter leading-[1.1] mb-2">
          Ownership structures
        </h1>
        <h2 className="text-[1.75rem] sm:text-4xl md:text-[2.75rem] font-sans font-medium text-white/80 tracking-tighter leading-[1.1] mb-6 md:whitespace-nowrap">
          designed for growth, not just compliance
        </h2>
        <p className="text-white/70 max-w-lg mx-auto text-[14px] md:text-[15px] font-sans font-light tracking-tight leading-relaxed mb-8">
          We help leaders design ownership programs that attract talent, align incentives, and create value.
        </p>
        <div className="flex flex-row items-center justify-center space-x-3 sm:space-x-4 mt-6">
          <AnimatedButton variant="brand" className="px-5 sm:px-8 py-3 sm:py-3.5 min-w-[130px] sm:min-w-[160px] text-[13px] sm:text-[15px] rounded-full flex justify-center">
            Get in Touch
          </AnimatedButton>
          <AnimatedButton variant="dark" className="px-5 sm:px-8 py-3 sm:py-3.5 min-w-[130px] sm:min-w-[160px] text-[13px] sm:text-[15px] rounded-full flex justify-center">
            Explore Services
          </AnimatedButton>
        </div>

        {/* Social Proof Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Overlapping Avatars */}
            <div className="flex -space-x-3">
              {['bg-neutral-200', 'bg-neutral-300', 'bg-neutral-400', 'bg-neutral-500'].map((colorClass, i) => (
                <div 
                  key={i}
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full ${colorClass}`}
                />
              ))}
            </div>
            
            <span className="text-white/80 text-[13px] md:text-[15px] font-sans tracking-tight text-left">
              Trusted by more than<br className="sm:hidden" /> <strong className="font-semibold text-white">1,000 Companies</strong>
            </span>
          </div>

          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#D02717]" />

          <span className="text-white/80 text-[13px] md:text-[15px] font-sans tracking-tight text-center max-w-[250px] sm:max-w-none">
            Strategic Ownership and Sustainable Business Growth.
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
