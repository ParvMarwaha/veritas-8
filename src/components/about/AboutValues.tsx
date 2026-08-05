'use client';

import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

function ValueCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="group relative bg-[#111111] border border-white/5 px-8 py-10 flex flex-col items-start overflow-hidden transition-transform duration-700 hover:scale-[1.02] hover:z-20 cursor-pointer h-full min-h-[220px]"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(208, 39, 23, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 w-full">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#D02717] transition-colors duration-500">
          {title}
        </h3>
        <p className="text-[14px] md:text-[15px] leading-[1.6] text-white/60 font-light group-hover:text-white/90 transition-colors duration-500">
          {desc}
        </p>
      </div>
    </div>
  );
}

export function AboutValues() {
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
    <section className="w-full bg-[#090909] text-white py-24 md:py-32 px-6 md:px-16 font-sans relative z-20">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col items-center">
        
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
