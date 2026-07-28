'use client';

import React from 'react';
import { motion } from 'framer-motion';

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
  return (
    <section className="w-full bg-[#090909] text-white pt-24 pb-32 md:pt-32 md:pb-48 px-6 md:px-16 font-sans relative z-20 overflow-x-hidden">
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start relative">
        
        {/* Left Column - Sticky */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-4 flex flex-col items-start pt-2 lg:pt-0 lg:sticky lg:top-40 h-fit z-20"
        >
          <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
            Insights & Press
          </h2>
          <h3 className="text-4xl md:text-[42px] font-semibold tracking-tighter leading-[1.1] mb-6 text-white max-w-[380px]">
            Perspectives on the future of equity.
          </h3>
          <p className="text-[14px] md:text-[15px] text-white/60 leading-[1.6] max-w-[340px] tracking-tight mb-10">
            Explore our latest thinking on cap table management, compliance, and how to build a lasting culture of ownership.
          </p>
          <button className="group flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest hover:text-white text-white/70 transition-colors">
            View Archive
            <span className="w-8 h-[1px] bg-white/30 group-hover:bg-[#D02717] transition-colors" />
          </button>
        </motion.div>

        {/* Right Column - Scrolling List */}
        <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
          {insights.map((insight, idx) => (
            <motion.div 
              key={insight.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group relative flex flex-col md:flex-row bg-[#111111] border border-white/5 overflow-hidden hover:bg-[#161616] hover:border-white/10 transition-colors duration-500 cursor-pointer"
            >
              {/* Image Box */}
              <div className="w-full md:w-[40%] h-[250px] md:h-auto overflow-hidden relative">
                <div className="absolute inset-0 bg-[#090909]/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={insight.img} 
                  alt={insight.title}
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                />
                <div className="absolute top-4 left-4 z-20 bg-[#090909]/90 backdrop-blur-sm px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase text-white border border-white/10">
                  {insight.category}
                </div>
              </div>
              
              {/* Content Box */}
              <div className="w-full md:w-[60%] p-8 md:p-10 flex flex-col justify-between">
                <div className="flex flex-col">
                  <span className="text-white/40 text-[11px] font-mono mb-4 tracking-widest uppercase">{insight.date}</span>
                  <h4 className="text-2xl md:text-3xl font-bold tracking-tight leading-[1.15] mb-4 group-hover:text-[#D02717] transition-colors duration-300">
                    {insight.title}
                  </h4>
                  <p className="text-white/50 text-[14px] leading-[1.6] line-clamp-3">
                    {insight.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                  <span className="text-[12px] font-bold tracking-wider uppercase text-white/70">By {insight.author}</span>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#D02717] group-hover:border-[#D02717] group-hover:text-white text-white/50 transition-all duration-300 transform group-hover:translate-x-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

