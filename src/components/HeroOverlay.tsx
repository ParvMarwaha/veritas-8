'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { AnimatedButton } from './AnimatedButton';

export function HeroOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 30,
    restDelta: 0.0001
  });

  const opacity = useTransform(smoothProgress, [0.65, 0.8], [0, 1]);
  const y = useTransform(smoothProgress, [0.65, 0.8], [40, 0]);
  
  const navOpacity = useTransform(smoothProgress, [0.6, 0.75], [0, 1]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-30">
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-center pointer-events-auto overflow-hidden">
        
        {/* Navbar */}
        <motion.nav 
          style={{ opacity: navOpacity }}
          className="absolute top-0 left-0 w-full px-8 md:px-12 py-8 flex items-center justify-between z-50"
        >
          {/* Left Logo */}
          <div className="text-[#D02717] font-sans font-bold text-[2.2rem] italic tracking-tighter leading-none z-10">
            Veritas
          </div>
          
          {/* Center Links perfectly centered via absolute positioning to prevent wrapping/crushing */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center space-x-10 text-[14px] font-sans font-medium tracking-tight text-white/80 whitespace-nowrap">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">About Us</a>
            <a href="#" className="hover:text-white transition-colors">Our Framework</a>
            <a href="#" className="hover:text-white transition-colors">Insights</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>

          {/* Right Button */}
          <AnimatedButton variant="brand" className="px-5 py-2.5 rounded-full z-10">
            Get in Touch
          </AnimatedButton>
        </motion.nav>

        {/* Hero Content exactly vertically centered */}
        <motion.div 
          style={{ opacity, y }}
          className="flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl"
        >
          {/* Using Plus Jakarta Sans Bold */}
          <h1 className="text-3xl md:text-[2.75rem] font-sans font-bold text-white tracking-tighter leading-[1.1]">
            Ownership structures
          </h1>
          {/* Using Plus Jakarta Sans Medium */}
          <h2 className="text-2xl md:text-[2.75rem] font-sans font-medium text-white/80 tracking-tighter leading-[1.1] mb-6 md:whitespace-nowrap">
            designed for growth, not just compliance
          </h2>
          {/* Using Plus Jakarta Sans Light */}
          <p className="text-white/70 max-w-lg mx-auto text-[14px] md:text-[15px] font-sans font-light tracking-tight leading-relaxed mb-8">
            We help leaders design ownership programs that attract talent, align incentives, and create value.
          </p>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <AnimatedButton variant="brand" className="px-8 py-3.5 min-w-[160px] rounded-full">
              Get in Touch
            </AnimatedButton>
            <AnimatedButton variant="dark" className="px-8 py-3.5 min-w-[160px] rounded-full">
              Explore Services
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
