'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function WhyReachOut() {
  return (
    <section className="w-full bg-[#090909] text-white py-24 md:py-32 px-6 md:px-16 font-sans relative z-20 overflow-hidden">
      
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[80%] md:w-[50%] h-[150%] bg-[#D02717]/10 -z-10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/4" />
      
      <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
        
        <div className="md:w-1/2">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[32px] md:text-[42px] lg:text-[54px] font-semibold tracking-tighter leading-[1.1] mb-6">
              A consultative approach to complex challenges.
            </h2>
            <div className="w-12 h-[3px] bg-[#D02717] mb-8" />
            <p className="text-[1.05rem] text-white/70 leading-relaxed">
              We don't do generic administrative processing. We believe in deeply understanding your corporate structure, strategic goals, and talent requirements before recommending an equity or governance solution. Reaching out to Veritas means starting a conversation with industry experts who will actively architect your path forward.
            </p>
          </motion.div>
        </div>

        <div className="md:w-1/2 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Bespoke Strategy', text: 'Tailored specifically to your cap table and growth trajectory.' },
              { title: 'Global Compliance', text: 'Navigating multi-jurisdictional legal and tax complexities.' },
              { title: 'End-to-End Execution', text: 'From blueprinting scheme documents to employee rollout.' },
              { title: 'Ongoing Support', text: 'Continuous valuation and management as you scale.' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-6 md:p-8"
              >
                <div className="w-2 h-2 rounded-full bg-[#D02717] mb-4" />
                <h4 className="text-[16px] font-medium tracking-tight mb-2">{feature.title}</h4>
                <p className="text-[13px] text-white/60 leading-relaxed">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
