'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "We review your query",
    desc: "Our operations team analyzes your requirement and company profile to ensure we assign the most appropriate subject matter expert."
  },
  {
    num: "02",
    title: "An expert reaches out",
    desc: "Within 24-48 hours, a senior partner or specialist will contact you directly to acknowledge your specific use case."
  },
  {
    num: "03",
    title: "Introductory discussion",
    desc: "We schedule a consultative call to deep-dive into your cap table, goals, and constraints without any upfront commitment."
  },
  {
    num: "04",
    title: "Proposal shared",
    desc: "We present a comprehensive, customized architecture and execution plan outlining timelines, deliverables, and costs."
  }
];

export function WhatHappensNext() {
  return (
    <section className="w-full bg-white text-[#18181B] py-24 md:py-32 px-6 md:px-16 font-sans relative z-20">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-semibold tracking-tighter leading-[1.1]">
            What happens next?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          
          {/* Connecting Line (Desktop only) */}
          <div className="hidden lg:block absolute top-[24px] left-[10%] right-[10%] h-[1px] bg-black/10 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Number Circle */}
              <div className="w-12 h-12 rounded-full bg-white border border-black/20 flex items-center justify-center mb-6 group-hover:border-[#D02717] group-hover:bg-[#D02717] group-hover:text-white transition-colors duration-500">
                <span className="font-medium text-[14px] tracking-wider">{step.num}</span>
              </div>
              
              <h4 className="text-[18px] md:text-[20px] font-semibold tracking-tight mb-3">
                {step.title}
              </h4>
              <p className="text-[14px] text-[#18181B]/70 leading-relaxed max-w-[280px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
