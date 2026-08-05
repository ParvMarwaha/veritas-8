'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';

export function InitialPreloader() {
  const { isPreloaderComplete, completePreloader } = usePreloader();
  const [shouldRender, setShouldRender] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPreloaderComplete) {
      setShouldRender(true);
      
      // Animate numerical counter (0 to 100)
      const duration = 1000; // 1s
      let startTime: number | null = null;
      let animationFrameId: number;
      
      const animateCounter = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Custom easeOutQuart for smooth number deceleration
        const easeProgress = 1 - Math.pow(1 - progress, 4); 
        const currentCount = Math.floor(easeProgress * 100);
        
        // Update DOM directly to bypass React state and eliminate lag
        if (counterRef.current) {
          counterRef.current.textContent = currentCount.toString().padStart(2, '0');
        }
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animateCounter);
        }
      };
      
      // Delay counter start by 600ms to match timeline
      const counterTimeout = setTimeout(() => {
        animationFrameId = requestAnimationFrame(animateCounter);
      }, 600);

      // Trigger exit sequence after full animation (0.6s + 1s + 0.3s pause = 1.9s)
      const completeTimeout = setTimeout(() => {
        completePreloader();
      }, 1900);
      
      return () => {
        clearTimeout(counterTimeout);
        clearTimeout(completeTimeout);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      };
    }
  }, [isPreloaderComplete, completePreloader]);

  // Don't render anything if it's not the initial load
  if (!shouldRender && isPreloaderComplete) return null;

  return (
    <AnimatePresence>
      {!isPreloaderComplete && (
        <motion.div
          className="fixed inset-0 z-[100000] bg-[#0B0B0B] flex flex-col items-center justify-center pointer-events-auto overflow-hidden will-change-transform transform-gpu"
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 0.96,
              transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.3, ease: "easeOut" },
              scale: { duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }
            }}
            className="relative flex flex-col items-center will-change-transform transform-gpu"
          >
            {/* Subtle glow behind logo */}
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150 transform-gpu" />
            
            <img 
              src="/logo.png" 
              alt="Veritas Logo" 
              className="h-12 md:h-16 w-auto object-contain relative z-10 invert transform-gpu"
            />
            
            {/* Loading Indicator Wrapper */}
            <div className="mt-8 flex flex-col items-end w-[200px]">
              
              {/* Thin Progress Line */}
              <div className="w-full h-[1px] bg-white/10 relative overflow-hidden transform-gpu">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-white/70 origin-left will-change-transform transform-gpu"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
                />
              </div>
              
              {/* Numerical Counter */}
              <div 
                ref={counterRef}
                className="mt-3 text-[10px] md:text-[11px] font-sans font-light tracking-[0.2em] text-white/50"
              >
                00
              </div>
              
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
