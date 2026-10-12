'use client';

import React from 'react';
import { motion } from 'framer-motion';

function LeaderRow({ leader }: { leader: { name: string, role: string, image: string } }) {
  return (
    <div className="group relative">
      <div className="flex items-center gap-5 sm:gap-8 md:gap-10 py-8 md:py-10">
        {/* Portrait: always visible */}
        <div className="shrink-0 w-[96px] sm:w-[120px] md:w-[150px] lg:w-[170px] aspect-[4/5] bg-[#D9D9D9] overflow-hidden">
          <img
            src={leader.image}
            alt={leader.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6">
          <div className="flex flex-col items-start gap-1">
            <h4 className="text-xl md:text-[28px] font-semibold text-[#090909] tracking-tight group-hover:text-[#D02717] transition-colors duration-300">
              {leader.name}
            </h4>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-black/40 type-meta font-medium hover:text-[#D02717] transition-all duration-300 transform origin-left hover:scale-105 inline-block mt-1">
              LinkedIn
            </a>
          </div>
          <span className="text-[#D02717] font-medium type-label uppercase tracking-wide">
            {leader.role}
          </span>
        </div>
      </div>
      <div className="w-full h-[1px] bg-black/10 group-hover:bg-[#D02717]/30 transition-colors duration-500"></div>
    </div>
  );
}

export function AboutLeadership() {
  const leaders = [
    { name: "Vichitra Malhotra", role: "Partner", image: "/vichitra.png" },
    { name: "Khushwant Singh", role: "Partner", image: "/khushwant.png" },
    { name: "Varnika Malhotra", role: "Principal Consultant", image: "/varnika.png" }
  ];

  return (
    <section className="w-full bg-white text-black py-16 md:py-32 overflow-hidden relative font-sans z-20">
      
      <div className="w-full px-6 md:px-16 relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 xl:gap-32 items-start">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex flex-col items-start lg:pr-8"
          >
            <h2 className="text-[#D02717] font-bold tracking-[0.2em] type-label uppercase mb-5">
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
            <div className="w-full h-[1px] bg-black/10"></div>
            
            <div className="flex flex-col">
              {leaders.map((leader, index) => (
                <LeaderRow key={index} leader={leader} />
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
