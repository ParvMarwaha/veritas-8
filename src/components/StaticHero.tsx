'use client';

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { StaticHeroBackground } from './StaticHeroBackground';
import { InteractiveHeroBackground } from './InteractiveHeroBackground';
import { AnimatedButton } from './AnimatedButton';
import { usePreloader } from '@/context/PreloaderContext';

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
  const { isPreloaderComplete } = usePreloader();

  React.useEffect(() => {
    if (isInteractiveBg && onReady) {
      onReady();
    }
  }, [isInteractiveBg, onReady]);

  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    }
  }), []);

  const itemVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } 
    }
  }), []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {isInteractiveBg ? <InteractiveHeroBackground /> : <StaticHeroBackground onRevealComplete={onReady} />}
      
      {/* Hero Content */}
      <motion.div 
        initial="hidden"
        animate={isMenuOpen ? "exit" : ((isReady || isInteractiveBg) && isPreloaderComplete ? "visible" : "hidden")}
        variants={containerVariants}
        className={`relative z-30 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl transition-opacity duration-500 mt-8 md:mt-12`}
      >
        <motion.h1 variants={itemVariants} className={`text-[2.5rem] sm:text-5xl md:text-[3.5rem] font-sans font-bold tracking-tighter leading-[1.1] mb-2 ${isInteractiveBg ? 'text-[#18181B]' : 'text-white'}`}>
          Ownership structures
        </motion.h1>
        <motion.h2 variants={itemVariants} className={`text-[1.75rem] sm:text-4xl md:text-[2.75rem] font-sans font-medium tracking-tighter leading-[1.1] mb-6 md:whitespace-nowrap ${isInteractiveBg ? 'text-[#18181B]/80' : 'text-white/80'}`}>
          designed for growth, not just compliance
        </motion.h2>
        <motion.p variants={itemVariants} className={`max-w-lg mx-auto text-[14px] md:text-[15px] font-sans font-light tracking-tight leading-relaxed mb-8 ${isInteractiveBg ? 'text-[#18181B]/70' : 'text-white/70'}`}>
          We help leaders design ownership programs that attract talent, align incentives, and create value.
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-row items-center justify-center space-x-3 sm:space-x-4 mt-6">
          <AnimatedButton variant="brand" className="px-5 sm:px-8 py-3 sm:py-3.5 min-w-[130px] sm:min-w-[160px] text-[13px] sm:text-[15px] rounded-full flex justify-center">
            Get in Touch
          </AnimatedButton>
          <AnimatedButton variant={isInteractiveBg ? 'outline' : 'dark'} className={`px-5 sm:px-8 py-3 sm:py-3.5 min-w-[130px] sm:min-w-[160px] text-[13px] sm:text-[15px] rounded-full flex justify-center ${isInteractiveBg ? 'text-[#18181B] border border-[#18181B]/20' : ''}`}>
            Explore Services
          </AnimatedButton>
        </motion.div>

        {/* Social Proof Badge */}
        <motion.div 
          variants={itemVariants}
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
            
            <span className={`text-[13px] md:text-[15px] font-sans tracking-tight text-left ${isInteractiveBg ? 'text-[#18181B]/80' : 'text-white/80'}`}>
              Trusted by more than<br className="sm:hidden" /> <strong className={`font-semibold ${isInteractiveBg ? 'text-[#18181B]' : 'text-white'}`}>1,000 Companies</strong>
            </span>
          </div>

          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#D02717]" />

          <span className={`text-[13px] md:text-[15px] font-sans tracking-tight text-center max-w-[250px] sm:max-w-none ${isInteractiveBg ? 'text-[#18181B]/80' : 'text-white/80'}`}>
            Strategic Ownership and Sustainable Business Growth.
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
