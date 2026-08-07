'use client';

import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import Link from 'next/link';

function ServiceCard({ card, index }: { card: { id: string; title: string; desc: string }, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Determine arrow and high-impact sweep properties based on grid position
  // Determine layout configuration to prevent ANY overlaps with the center circle or arrows
  // Determine layout configuration to prevent ANY overlaps while maintaining vertical symmetry
  // Arrows are positioned at the inner corners and animate outwards, emanating from the center circle
  const cardConfigs = {
    0: { // Top-Left Card
      textPos: "justify-start",
      arrowPos: "bottom-6 right-6 md:bottom-10 md:right-10",
      arrowPath: "M17 17L7 7M7 7H17M7 7V17", // Points Top-Left
      arrowSlide: "group-hover:-translate-x-3 group-hover:-translate-y-3", // Perfect pop-out distance
      sweepPos: "bottom-0 right-0 translate-x-1/2 translate-y-1/2"
    },
    1: { // Top-Right Card
      textPos: "justify-start",
      arrowPos: "bottom-6 left-6 md:bottom-10 md:left-10",
      arrowPath: "M7 17L17 7M17 7H7M17 7V17", // Points Top-Right
      arrowSlide: "group-hover:translate-x-3 group-hover:-translate-y-3", // Perfect pop-out distance
      sweepPos: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
    },
    2: { // Bottom-Left Card
      textPos: "justify-center",
      arrowPos: "top-6 right-6 md:top-10 md:right-10",
      arrowPath: "M17 7L7 17M7 17H17M7 17V7", // Points Bottom-Left
      arrowSlide: "group-hover:-translate-x-3 group-hover:translate-y-3", // Perfect pop-out distance
      sweepPos: "top-0 right-0 translate-x-1/2 -translate-y-1/2"
    },
    3: { // Bottom-Right Card
      textPos: "justify-center",
      arrowPos: "top-6 left-6 md:top-10 md:left-10",
      arrowPath: "M7 7L17 17M17 17H7M17 17V7", // Points Bottom-Right
      arrowSlide: "group-hover:translate-x-3 group-hover:translate-y-3", // Perfect pop-out distance
      sweepPos: "top-0 left-0 -translate-x-1/2 -translate-y-1/2"
    }
  };

  const config = cardConfigs[index as keyof typeof cardConfigs];

  return (
    <Link 
      href={`/framework#${card.id}`}
      onMouseMove={handleMouseMove}
      className={`group relative bg-[#EAEAEA] px-8 lg:px-12 py-8 lg:py-10 h-[240px] lg:h-[280px] flex flex-col ${config.textPos} overflow-hidden cursor-pointer transition-transform duration-700 hover:z-20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] block`}
    >
      {/* 1. High Impact Geometric Sweep Fill from Center Circle */}
      <div 
        className={`absolute ${config.sweepPos} w-[300%] aspect-square bg-[#2A2A2A] rounded-full transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] scale-0 group-hover:scale-100 z-0 will-change-transform transform-gpu`}
      />

      {/* 2. Spotlight Hover Effect (Stronger) */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 z-0 mix-blend-overlay will-change-opacity"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* 3. Content wrapper (Pushed to safe corners) */}
      <div className={`relative z-10 transform transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${index >= 2 ? 'group-hover:translate-y-1' : 'group-hover:-translate-y-1'} group-hover:scale-[1.01] flex flex-col items-start text-left will-change-transform transform-gpu`}>
        <h3 className="text-xl md:text-2xl lg:text-[30px] font-bold mb-3 tracking-tight text-[#090909] group-hover:text-white transition-colors duration-700">
          {card.title}
        </h3>
        <p className="text-[14px] lg:text-[15px] leading-[1.6] text-[#090909]/70 max-w-[340px] font-light transition-colors duration-700 group-hover:text-white/80">
          {card.desc}
        </p>
      </div>

      {/* 4. Elegant absolute positioned arrow radiating from the center circle */}
      <div className={`absolute ${config.arrowPos} z-10 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-100 scale-75 group-hover:scale-100 text-white will-change-transform transform-gpu`}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform duration-700 ${config.arrowSlide}`}>
          <path d={config.arrowPath}/>
        </svg>
      </div>
    </Link>
  );
}

export function ServicesSection() {
  const cards = [
    {
      id: "mathematics",
      title: "Mathematics",
      desc: "Financial modelling that optimizes equity outcomes while balancing stakeholder interests strategically."
    },
    {
      id: "risk-mitigation",
      title: "Risk Mitigation",
      desc: "Governance frameworks that reduce uncertainty while protecting long-term organizational value effectively."
    },
    {
      id: "documentation",
      title: "Documentation",
      desc: "Comprehensive documentation that ensures absolute compliance while enabling confident, strategic decision-making across all levels of the organization."
    },
    {
      id: "communication",
      title: "Communication",
      desc: "Clear communication that builds understanding and strengthens employee ownership participation confidently."
    }
  ];

  return (
    <section className="w-full bg-white text-black pt-16 pb-24 md:pt-32 md:pb-48 px-6 md:px-16 font-sans relative z-20 overflow-x-hidden">
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-4 flex flex-col items-start pt-2 lg:pt-0 lg:sticky lg:top-40 h-fit z-20"
        >
          <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
            Our Services
          </h2>
          <h3 className="text-3xl md:text-[42px] font-semibold tracking-tighter leading-[1.1] mb-6 max-w-[380px] text-[#090909]">
            Four essential pillars of equity design.
          </h3>
          <p className="text-[14px] md:text-[15px] text-[#090909]/70 leading-[1.6] max-w-[340px] tracking-tight">
            Built around four essential pillars, our services combine financial precision, legal clarity, governance expertise, and employee engagement to create ownership structures that scale with your business.
          </p>
        </motion.div>

        {/* Right Column (2x2 Grid) - SCROLLS PAST */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-8 relative w-full grid grid-cols-1 md:grid-cols-2 gap-[4px] lg:gap-[6px]"
        >
          {cards.map((card, i) => (
            <ServiceCard key={i} card={card} index={i} />
          ))}

          {/* Center Circle - Clean & Elegant */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] lg:w-[140px] lg:h-[140px] bg-white rounded-full items-center justify-center z-30 pointer-events-none shadow-md">
            <span className="text-[14px] lg:text-[15px] font-semibold text-black tracking-tight text-center leading-[1.2]">
              How to get<br/>it right?
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
