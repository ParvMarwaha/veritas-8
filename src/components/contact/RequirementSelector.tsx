'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';

const requirements = [
  "I want to launch an ESOP",
  "I need valuation support",
  "I need accounting and compliance support",
  "I want to explore SARs / RSUs",
  "I am not sure yet",
  "Regular insights"
];

export function RequirementSelector({ onSelect }: { onSelect: (req: string) => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const lenis = useLenis();

  const handleSelect = (req: string, index: number) => {
    setSelectedIndex(index);
    onSelect(req);
    
    // Smooth scroll to the form section using Lenis to prevent native scroll conflicts
    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo('#contact-form', { offset: -50, duration: 1.2 });
      } else {
        const formElement = document.getElementById('contact-form');
        if (formElement) {
          const y = formElement.getBoundingClientRect().top + window.scrollY - 50;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }, 150);
  };

  return (
    <section className="w-full bg-[#090909] text-white py-24 md:py-32 px-6 md:px-16 font-sans relative z-20">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20 flex flex-col items-start"
        >
          <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
            Step 01
          </h2>
          <h3 className="text-3xl md:text-[42px] lg:text-[54px] font-semibold tracking-tighter leading-[1.1] text-white">
            Choose Your Requirement
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {requirements.map((req, index) => {
            const isSelected = selectedIndex === index;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleSelect(req, index)}
                className={`relative flex items-center p-8 md:p-10 border transition-all duration-500 overflow-hidden text-left ${
                  isSelected 
                    ? 'border-[#D02717] bg-[#FAFAFA]' 
                    : 'border-white/10 hover:border-white/30 bg-transparent'
                }`}
              >
                {/* Hover Background Sweep */}
                <div 
                  className={`absolute inset-0 bg-white/5 transform origin-left transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-0 ${
                    isHovered && !isSelected ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
                
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className={`text-[16px] md:text-[18px] font-medium tracking-tight transition-colors duration-500 leading-snug pr-4 ${
                    isSelected ? 'text-[#090909]' : 'text-white/80 group-hover:text-white'
                  }`}>
                    {req}
                  </span>
                  
                  {/* Arrow Indicator */}
                  <div className={`w-8 h-8 flex items-center justify-center shrink-0 rounded-full transition-all duration-500 ${
                    isSelected ? 'bg-[#D02717]' : 'bg-white/10'
                  }`}>
                    <svg 
                      className={`w-3.5 h-3.5 transition-transform duration-500 ${
                        isSelected ? 'text-white rotate-90' : 'text-white/60 -rotate-45'
                      }`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
