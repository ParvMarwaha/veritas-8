'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export function FeaturedInsight() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={containerRef} className="w-full bg-[#f8f9fa] text-[#18181B] py-24 md:py-32 px-6 md:px-16 font-sans relative z-20 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto">
        
        <div className="flex flex-col mb-10 md:mb-16">
           <h2 className="text-[#18181B] font-semibold text-3xl md:text-4xl tracking-tight mb-2">Editor's Pick</h2>
           <p className="text-[#18181B]/60 text-lg font-light">The most important read for you today.</p>
        </div>

        <Link href="/insights/1" className="block">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center group cursor-pointer">
            
            <div className="lg:col-span-7 h-[450px] md:h-[600px] w-full relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-[#e0e0e0]">
              <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                <span className="text-[#D02717] font-bold tracking-widest text-[10px] uppercase">Featured</span>
              </div>
              <motion.div style={{ y: imageY }} className="absolute inset-0 h-[116%] -top-[8%]">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600" 
                  alt="Featured Insight" 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                />
              </motion.div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center py-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex gap-4 items-center mb-6 text-[11px] font-bold tracking-widest uppercase text-[#18181B]/50">
                  <span className="text-[#D02717]">Global Markets</span>
                  <span className="w-1 h-1 rounded-full bg-black/20"></span>
                  <span>5 Min Read</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-tighter leading-[1.05] mb-6 text-[#D02717]">
                  The Future of Employee Ownership
                </h3>
                
                <p className="text-[1.05rem] md:text-[1.15rem] text-[#18181B]/70 leading-[1.6] mb-10 font-light">
                  As the global workforce evolves, traditional equity models are struggling to keep pace. Discover how innovative companies are restructuring ownership to drive sustainable growth and build trust in a rapidly shifting economic landscape.
                </p>
                
                <div className="inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest text-[#18181B]">
                  Read Article
                  <span className="relative flex items-center justify-center w-10 h-10 rounded-full border border-black/10 group-hover:border-[#D02717] group-hover:bg-[#D02717] transition-all duration-300">
                    <svg className="w-4 h-4 text-[#18181B] group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
