'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pillars = [
  {
    id: "mathematics",
    title: "Mathematics",
    items: [
      "Employee wealth creation",
      "Dilution management",
      "Income statement impact",
      "Pool sizing",
      "Grant strategy"
    ]
  },
  {
    id: "risk-mitigation",
    title: "Risk Mitigation",
    items: [
      "Employee exit scenarios",
      "Corporate transactions",
      "Governance",
      "Board flexibility"
    ]
  },
  {
    id: "documentation",
    title: "Documentation",
    items: [
      "Scheme documentation",
      "Grant letters",
      "Operating manuals",
      "Legal clarity"
    ]
  },
  {
    id: "communication",
    title: "Communication",
    items: [
      "Employee understanding",
      "Adoption",
      "Retention",
      "Wealth creation awareness"
    ]
  }
];

export function FrameworkPillars() {
  const [activePillar, setActivePillar] = useState(pillars[0].id);

  return (
    <section className="w-full bg-white text-black py-24 md:py-32 px-6 md:px-16 font-sans relative z-20">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col items-start"
        >
          <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
            Core Foundation
          </h2>
          <h3 className="text-3xl md:text-[42px] lg:text-[54px] font-semibold tracking-tighter leading-[1.1] text-[#090909]">
            The Four Pillars
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Navigation / Tabs */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            {pillars.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`group relative text-left px-6 py-6 md:px-8 md:py-8 border-l-[3px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${
                  activePillar === pillar.id 
                    ? 'border-[#D02717] bg-[#FAFAFA]' 
                    : 'border-black/5 hover:border-black/20 hover:bg-black/[0.02]'
                }`}
              >
                {/* Active Indicator Sweep (matches brand aesthetic) */}
                <div 
                  className={`absolute inset-0 bg-[#FAFAFA] transform origin-left transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-0 ${
                    activePillar === pillar.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
                
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className={`text-[20px] md:text-[24px] font-bold tracking-tight transition-colors duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    activePillar === pillar.id ? 'text-[#090909]' : 'text-[#090909]/40 group-hover:text-[#090909]/70'
                  }`}>
                    {pillar.title}
                  </span>
                  
                  {/* Plus/Minus icon */}
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <div className={`absolute w-full h-[2px] transition-colors duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${activePillar === pillar.id ? 'bg-[#D02717]' : 'bg-[#090909]/30 group-hover:bg-[#090909]/60'}`} />
                    <div className={`absolute h-full w-[2px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${activePillar === pillar.id ? 'bg-[#D02717] rotate-90 scale-0' : 'bg-[#090909]/30 group-hover:bg-[#090909]/60 rotate-0 scale-100'}`} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-7 bg-[#090909] text-white p-8 md:p-10 lg:p-12 flex flex-col justify-start h-full">
            <AnimatePresence mode="wait">
              {pillars.map((pillar) => 
                activePillar === pillar.id && (
                  <motion.div
                    key={pillar.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }}
                    exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
                    className="flex flex-col h-full"
                  >
                    <div className="mb-8">
                      <h4 className="text-[#D02717] text-[12px] md:text-[13px] uppercase tracking-widest font-bold mb-3">
                        Pillar Focus
                      </h4>
                      <h5 className="text-[28px] md:text-[36px] font-semibold tracking-tighter">
                        {pillar.title}
                      </h5>
                    </div>
                    
                    <ul className="space-y-6">
                      {pillar.items.map((item, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: index * 0.1 }}
                          className="flex items-start space-x-4"
                        >
                          <div className="mt-[6px] w-[6px] h-[6px] rounded-full bg-[#D02717] shrink-0" />
                          <span className="text-[18px] md:text-[20px] font-light text-white/80 leading-snug tracking-tight">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
}
