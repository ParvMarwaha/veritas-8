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
    <section className="w-full bg-white text-black py-24 md:py-32 px-6 md:px-16 font-sans relative z-20">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:w-1/3 flex flex-col"
        >
          <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
            Leadership Team
          </h2>
          <h3 className="text-3xl md:text-[42px] font-semibold tracking-tighter leading-[1.1] text-[#090909]">
            The minds behind the design.
          </h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-2/3 flex flex-col space-y-12 w-full"
        >
          <div className="w-full h-[1px] bg-black/10"></div>
          
          {leaders.map((leader, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <h4 className="text-[24px] md:text-[28px] font-semibold text-[#090909] tracking-tight">
                  {leader.name}
                </h4>
                <span className="text-[#D02717] font-medium text-[14px] md:text-[15px] uppercase tracking-wide">
                  {leader.role}
                </span>
              </div>
              <div className="w-full h-[1px] bg-black/10 mt-6"></div>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
