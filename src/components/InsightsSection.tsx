'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const insights = [
  {
    id: "01",
    title: "The Future of Employee Ownership",
    category: "Future of Work",
    date: "12 Nov 2026",
    author: "Elena Rodriguez",
    description: "As the global workforce evolves, traditional equity models are struggling to keep pace. Discover how innovative companies are restructuring ownership to drive sustainable growth.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "02",
    title: "Navigating Valuations in 2026",
    category: "Analysis",
    date: "24 Oct 2026",
    author: "Marcus Chen",
    description: "A comprehensive look at how market dynamics are forcing a recalibration of startup valuations and cap table strategies across the tech sector.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "03",
    title: "Building a Culture of Trust",
    category: "Opinion",
    date: "15 Sep 2026",
    author: "Sarah Jenkins",
    description: "Transparency in equity isn't just about sharing numbers; it's about building a foundational culture of trust across all levels of the organization.",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "04",
    title: "Global Equity Compliance",
    category: "Guide",
    date: "02 Aug 2026",
    author: "David Alaba",
    description: "Expanding internationally? Here is the definitive playbook for managing cross-border equity compliance without slowing down your operations.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
  }
];

export function InsightsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress purely within this massive section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate the opacity for each background image based on scroll progress.
  // The first image starts at 1, fades out at 25%. The next fades in, and so on.
  const opacities = [
    useTransform(scrollYProgress, [0, 0.2, 0.25, 1], [1, 1, 0, 0]),
    useTransform(scrollYProgress, [0.15, 0.25, 0.45, 0.5], [0, 1, 1, 0]),
    useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.75], [0, 1, 1, 0]),
    useTransform(scrollYProgress, [0.65, 0.75, 1, 1], [0, 1, 1, 1])
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-[#090909] text-white font-sans">
      
      {/* Pinned Cinematic Background */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
        {insights.map((item, idx) => (
          <motion.div 
            key={`bg-${item.id}`}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: opacities[idx] }}
          >
            {/* Dark overlays to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/70 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-[#090909]/30 z-10" />
            <img 
              src={item.img} 
              alt={item.title}
              className="w-full h-full object-cover grayscale opacity-80 scale-105"
            />
          </motion.div>
        ))}
      </div>

      {/* Scrolling Content - Each block is exactly 1 viewport height (100vh) to align with the background fades */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 pb-[10vh]">
        
        {/* Intro Header - Takes up the first screen */}
        <div className="h-[80vh] flex flex-col justify-center items-start pt-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-6"
          >
            Our Thinking
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[140px] font-bold tracking-tighter leading-[0.9]"
          >
            Insights.
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 text-lg md:text-2xl text-white/60 max-w-xl font-light leading-[1.6]"
          >
            Explore our latest thinking on cap table management, compliance, and how to build a lasting culture of ownership.
          </motion.p>
        </div>

        {/* Article Blocks - Each one takes a full screen height to scroll through */}
        <div className="flex flex-col">
          {insights.map((item, idx) => (
            <div key={`content-${item.id}`} className="h-screen flex flex-col justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px", once: false }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col max-w-4xl"
              >
                <div className="flex items-center gap-6 mb-8">
                  <span className="text-2xl md:text-3xl font-mono text-[#D02717]">{item.id}</span>
                  <span className="w-12 h-[1px] bg-white/20" />
                  <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-white/50">{item.category}</span>
                </div>
                
                <h4 className="text-4xl md:text-6xl lg:text-[80px] font-semibold tracking-tighter leading-[1.05] mb-10 drop-shadow-2xl">
                  {item.title}
                </h4>
                
                <p className="text-lg md:text-2xl text-white/70 leading-[1.5] mb-14 font-light drop-shadow-xl max-w-2xl">
                  {item.description}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-8 md:gap-12">
                  <button className="w-fit px-8 py-4 bg-white text-black text-[11px] md:text-[13px] font-bold uppercase tracking-widest hover:bg-[#D02717] hover:text-white transition-colors duration-300 rounded-full">
                    Read Story
                  </button>
                  <div className="flex items-center gap-4 text-[11px] md:text-[12px] font-mono text-white/40 uppercase tracking-widest">
                    <span>{item.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>By {item.author}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
