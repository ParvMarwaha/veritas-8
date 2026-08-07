'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

function ValueCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  // Sweep originates from alternating corners
  const sweepPos = index % 2 === 0 
    ? "bottom-0 right-0 translate-x-1/2 translate-y-1/2" 
    : "bottom-0 left-0 -translate-x-1/2 translate-y-1/2";

  return (
    <div 
      className="group relative bg-[#111111] border border-white/5 px-8 py-10 flex flex-col items-start overflow-hidden transition-all duration-700 hover:border-white/30 hover:shadow-2xl hover:z-20 cursor-pointer h-full min-h-[220px]"
    >
      {/* Sweeping Geometric Fill */}
      <div 
        className={`absolute ${sweepPos} w-[250%] aspect-square bg-white rounded-full transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] scale-0 group-hover:scale-100 z-0 will-change-transform transform-gpu`}
      />

      <div className="relative z-10 w-full transform transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1 group-hover:scale-[1.02] will-change-transform transform-gpu">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#090909] transition-colors duration-700">
          {title}
        </h3>
        <p className="text-[14px] md:text-[15px] leading-[1.6] text-white/60 font-light group-hover:text-black/80 transition-colors duration-700">
          {desc}
        </p>
      </div>
    </div>
  );
}

export function AboutValues() {
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

  const values = [
    {
      title: "Integrity First",
      desc: "We operate with absolute transparency and honesty, ensuring that every structure we design can withstand the most rigorous scrutiny."
    },
    {
      title: "Human-Centric",
      desc: "Beyond the numbers and legal jargon, we remember that equity is ultimately about people and their lives."
    },
    {
      title: "Strategic Depth",
      desc: "We don't just solve the immediate problem; we anticipate future challenges and design resilient architectures."
    },
    {
      title: "Relentless Clarity",
      desc: "Complexity is the enemy of understanding. We distill intricate concepts into clear, actionable frameworks."
    }
  ];

  return (
    <section ref={containerRef} className="w-full bg-[#090909] text-white py-16 md:py-32 px-6 md:px-16 font-sans relative z-20 overflow-hidden">
      
      {/* Interactive Background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-100 mix-blend-screen" style={{ background: 'radial-gradient(circle 800px at 0px 0px, rgba(208, 39, 23, 0.15), transparent 80%)' }}></div>
      <div className="pointer-events-none absolute inset-0 z-0 opacity-80 mix-blend-screen" style={{ background: 'radial-gradient(circle 1000px at 100% 100%, rgba(167, 154, 200, 0.12), transparent 80%)' }}></div>
      
      {/* Flashlight Dot Grid */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ease-out"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 100%)`,
          opacity: isHovering ? 1 : 0
        }}
      />

      <div className="max-w-[1400px] w-full mx-auto flex flex-col items-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-16 lg:mb-24"
        >
          <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
            What We Stand For
          </h2>
          <h3 className="text-3xl md:text-[42px] font-semibold tracking-tighter leading-[1.1] max-w-[600px]">
            The core values that guide every decision we make.
          </h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full max-w-[1000px]"
        >
          {values.map((val, i) => (
            <ValueCard key={i} title={val.title} desc={val.desc} index={i} />
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
