'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AboutLeadership() {
  const leaders = [
    { name: "Vichitra Malhotra", role: "Partner" },
    { name: "Khushwant Singh", role: "Partner" },
    { name: "Varnika Malhotra", role: "Principal Consultant" }
  ];

  return (
    <section className="w-full bg-white text-black py-24 md:py-32 overflow-hidden relative font-sans z-20">
      
      <div className="w-full px-6 md:px-16 relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 xl:gap-32 items-start">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex flex-col items-start lg:pr-8"
          >
            <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
              Leadership Team
            </h2>
            <h3 className="text-3xl md:text-[42px] font-semibold tracking-tighter leading-[1.1] mb-6 max-w-[380px] text-[#090909]">
              The minds behind the design.
            </h3>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 flex flex-col w-full"
          >
            <div className="w-full h-[1px] bg-black/10 mb-12"></div>
            
            <div className="flex flex-col space-y-12">
              {leaders.map((leader, index) => (
                <div key={index} className="flex flex-col space-y-4 group">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex flex-col items-start gap-1">
                      <h4 className="text-[24px] md:text-[28px] font-semibold text-[#090909] tracking-tight group-hover:text-[#D02717] transition-colors duration-300">
                        {leader.name}
                      </h4>
                      <a href="#" target="_blank" rel="noopener noreferrer" className="text-black/40 text-[13px] md:text-[14px] font-medium uppercase tracking-wider hover:text-[#0077b5] transition-all duration-300 transform origin-left hover:scale-105 inline-block mt-1">
                        LinkedIn
                      </a>
                    </div>
                    <span className="text-[#D02717] font-medium text-[14px] md:text-[15px] uppercase tracking-wide pb-1 md:pb-3">
                      {leader.role}
                    </span>
                  </div>
                  <div className="w-full h-[1px] bg-black/10 mt-6 group-hover:bg-[#D02717]/30 transition-colors duration-500"></div>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
