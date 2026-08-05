'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AboutHero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center bg-[#090909] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111] to-[#090909] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col items-center justify-center text-center pt-12 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-6">
            About Veritas
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] max-w-[900px]">
            Building purposeful ownership structures for modern organizations.
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
