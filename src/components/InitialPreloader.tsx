'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';

export function InitialPreloader() {
  const { isPreloaderComplete, completePreloader } = usePreloader();
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    if (!isPreloaderComplete) {
      setShouldRender(true);
      
      // Trigger exit sequence after logo animation (2s + 0.5s pause)
      const completeTimeout = setTimeout(() => {
        completePreloader();
      }, 2500);
      
      return () => {
        clearTimeout(completeTimeout);
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
              opacity: { duration: 1.2, delay: 0, ease: "easeOut" },
              scale: { duration: 2, delay: 0, ease: [0.19, 1, 0.22, 1] }
            }}
            className="relative flex flex-col items-center will-change-transform transform-gpu"
          >
            {/* Subtle glow behind logo */}
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150 transform-gpu" />
            
            <motion.img 
              src="/logo.png" 
              alt="Veritas Logo" 
              className="h-14 md:h-20 w-auto object-contain relative z-10 transform-gpu"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
