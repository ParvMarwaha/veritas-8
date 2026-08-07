'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function AboutToday() {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({ 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        });
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', () => setIsHovering(true));
      container.addEventListener('mouseleave', () => setIsHovering(false));
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', () => setIsHovering(true));
        container.removeEventListener('mouseleave', () => setIsHovering(false));
      }
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white text-[#090909] py-24 md:py-32 px-6 md:px-16 font-sans relative z-20 overflow-hidden">
      {/* Interactive Background Removed for cleaner look */}
      
      {/* Flashlight Dot Grid */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ease-out"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 100%)`,
          opacity: isHovering ? 1 : 0
        }}
      />

      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 h-[400px] lg:h-[500px] rounded-sm overflow-hidden relative"
        >
          <img 
            src="/about_today.png" 
            alt="Veritas Corporate Office" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center"
        >
          <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-6 lg:mb-8">
            Veritas Today
          </h2>
          
          <h3 className="text-[32px] md:text-[46px] font-semibold tracking-tighter leading-[1.15] mb-8 lg:mb-10 max-w-[520px] text-[#090909]">
            Shaping the future of equitable business structures.
          </h3>
          
          <p className="text-[15px] md:text-[16px] text-[#090909]/70 leading-[1.8] max-w-[520px] tracking-tight mb-12 lg:mb-16 font-light">
            Today, Veritas stands at the intersection of regulatory compliance and strategic growth. We partner with forward-thinking organizations to deploy ownership frameworks that do more than just satisfy the law—they actively drive performance and foster deeply engaged teams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-16">
            <div className="flex flex-col">
              <div className="text-[40px] lg:text-[46px] font-bold text-[#090909] mb-2 lg:mb-3 tracking-tighter leading-none">50+</div>
              <div className="text-[12px] lg:text-[13px] text-[#090909]/50 uppercase tracking-[0.1em] font-medium">Programs Launched</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[40px] lg:text-[46px] font-bold text-[#D02717] mb-2 lg:mb-3 tracking-tighter leading-none">100%</div>
              <div className="text-[12px] lg:text-[13px] text-[#090909]/50 uppercase tracking-[0.1em] font-medium">Regulatory Compliance</div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
