'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AboutToday() {
  return (
    <section className="w-full bg-[#090909] text-white py-24 md:py-32 px-6 md:px-16 font-sans relative z-20">
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 h-[400px] lg:h-[500px] rounded-3xl overflow-hidden relative"
        >
          {/* Subtle animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D02717]/20 via-[#111111] to-[#090909]"></div>
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col"
        >
          <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
            Veritas Today
          </h2>
          <h3 className="text-3xl md:text-[42px] font-semibold tracking-tighter leading-[1.1] mb-6 max-w-[500px]">
            Shaping the future of equitable business structures.
          </h3>
          <p className="text-[14px] md:text-[15px] text-white/70 leading-[1.6] max-w-[480px] tracking-tight mb-8">
            Today, Veritas stands at the intersection of regulatory compliance and strategic growth. We partner with forward-thinking organizations to deploy ownership frameworks that do more than just satisfy the law—they actively drive performance and foster deeply engaged teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-[13px] text-white/50 uppercase tracking-wider">Programs Launched</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#D02717] mb-2">100%</div>
              <div className="text-[13px] text-white/50 uppercase tracking-wider">Regulatory Compliance</div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
