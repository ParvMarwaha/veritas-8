'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const lifecycleStages = [
  {
    id: "stage-1",
    stage: "01",
    title: "Initial Design & Structuring",
    desc: "We begin by analyzing your current corporate structure and mapping out the mathematical and legal frameworks required for a successful equity program.",
    details: [
      "Current state analysis",
      "Goal alignment workshops",
      "Preliminary modeling",
      "Stakeholder buy-in"
    ]
  },
  {
    id: "stage-2",
    stage: "02",
    title: "Implementation & Documentation",
    desc: "Drafting the necessary scheme documents, grant letters, and operating manuals to ensure legal clarity and absolute compliance.",
    details: [
      "Legal scheme drafting",
      "Board resolution prep",
      "Tax implication review",
      "Finalizing grant letters"
    ]
  },
  {
    id: "stage-3",
    stage: "03",
    title: "Communication & Rollout",
    desc: "Ensuring every participating employee fully understands the value, mechanics, and potential of their new equity compensation.",
    details: [
      "Townhall presentations",
      "1-on-1 employee sessions",
      "Educational material distribution",
      "Helpdesk setup"
    ]
  },
  {
    id: "stage-4",
    stage: "04",
    title: "Accounting & Ongoing Services",
    desc: "Providing continuous support for cap table management, regular valuations, and compliance refreshes as your company grows.",
    details: [
      "Cap table updates",
      "Annual valuations",
      "Vesting schedule management",
      "Exit scenario execution"
    ]
  }
];

export function FrameworkLifecycle() {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  const toggleStage = (id: string) => {
    if (expandedStage === id) {
      setExpandedStage(null);
    } else {
      setExpandedStage(id);
    }
  };

  return (
    <section className="w-full bg-[#090909] text-white py-16 md:py-32 px-6 md:px-16 font-sans relative z-20">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
            End-to-End Execution
          </h2>
          <h3 className="text-3xl md:text-[42px] lg:text-[48px] font-semibold tracking-tighter leading-[1.1]">
            The Lifecycle Timeline
          </h3>
          <p className="mt-6 text-white/50 max-w-[600px] font-light text-[15px] md:text-[16px]">
            From initial conception to ongoing accounting, our framework supports your equity programs at every stage of corporate growth.
          </p>
        </motion.div>

        <div className="flex flex-col w-full relative">
          
          {/* Vertical Timeline Line */}
          <div className="absolute left-[24px] md:left-[36px] top-0 bottom-0 w-[1px] bg-white/10 z-0 hidden sm:block" />

          {lifecycleStages.map((stage, index) => {
            const isExpanded = expandedStage === stage.id;
            
            return (
              <motion.div 
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10 flex flex-col sm:flex-row items-start mb-8 sm:mb-12 last:mb-0 group"
              >
                {/* Timeline Node */}
                <div className="hidden sm:flex flex-col items-center mr-8 md:mr-12 shrink-0 pt-2">
                  <div className={`w-[48px] md:w-[72px] aspect-square rounded-full flex items-center justify-center border transition-colors duration-500 bg-[#090909] ${
                    isExpanded ? 'border-[#D02717] text-[#D02717]' : 'border-white/20 text-white/40 group-hover:border-white/60'
                  }`}>
                    <span className="font-bold text-[14px] md:text-[18px]">{stage.stage}</span>
                  </div>
                </div>

                {/* Content Box */}
                <div 
                  onClick={() => toggleStage(stage.id)}
                  className={`w-full bg-[#111111] border transition-all duration-500 cursor-pointer overflow-hidden ${
                    isExpanded ? 'border-[#D02717]/50 shadow-2xl' : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="p-6 md:p-8 flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="sm:hidden text-[#D02717] font-bold text-[12px] mb-2">{stage.stage}</div>
                      <h4 className={`text-[20px] md:text-[24px] font-bold tracking-tight transition-colors duration-300 ${isExpanded ? 'text-white' : 'text-white/80'}`}>
                        {stage.title}
                      </h4>
                    </div>
                    
                    {/* Expand Icon */}
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 ml-4 group-hover:bg-white/5 transition-colors">
                      <svg 
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                        className={`transition-transform duration-500 ${isExpanded ? 'rotate-180 text-[#D02717]' : 'text-white/50'}`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                      >
                        <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 border-t border-white/5 mt-2">
                          <p className="text-white/60 font-light text-[15px] leading-[1.6] mb-6 pt-6">
                            {stage.desc}
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {stage.details.map((detail, idx) => (
                              <div key={idx} className="flex items-center space-x-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D02717]/80 shrink-0" />
                                <span className="text-[14px] text-white/80 tracking-tight">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
