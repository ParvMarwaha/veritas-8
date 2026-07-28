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
  const featured = insights[0];
  const listItems = insights.slice(1);

  return (
    <section className="w-full bg-[#090909] text-white pt-32 pb-32 md:pt-40 md:pb-48 px-6 md:px-16 font-sans overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col">
        
        {/* Editorial Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 pb-12 border-b border-white/10">
          <div className="flex flex-col">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-4"
            >
              Our Thinking
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter leading-none"
            >
              Insights.
            </motion.h3>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 md:mt-0 flex flex-col md:items-end max-w-sm"
          >
            <p className="text-[14px] md:text-[15px] text-white/60 leading-[1.6] tracking-tight mb-6 md:text-right">
              Explore our latest thinking on cap table management, compliance, and how to build a lasting culture of ownership.
            </p>
            <button className="group flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest hover:text-white text-white/70 transition-colors">
              View Archive
              <span className="w-8 h-[1px] bg-white/30 group-hover:bg-[#D02717] transition-colors" />
            </button>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Featured Article - 7 Columns */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 group cursor-pointer"
          >
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-[#111111] mb-6 md:mb-8">
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/20 to-transparent opacity-80 z-10 transition-opacity duration-500 group-hover:opacity-60" />
              <img 
                src={featured.img} 
                alt={featured.title}
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
              />
              <div className="absolute top-6 left-6 z-20">
                <span className="bg-white text-black px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase">
                  {featured.category}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col pr-8">
              <div className="flex items-center gap-6 mb-4 text-[12px] font-mono text-white/50 tracking-widest uppercase">
                <span>{featured.date}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>By {featured.author}</span>
              </div>
              <h4 className="text-3xl md:text-5xl font-semibold tracking-tighter leading-[1.1] mb-5 group-hover:text-[#D02717] transition-colors duration-300">
                {featured.title}
              </h4>
              <p className="text-white/60 text-[15px] leading-[1.6] max-w-xl">
                {featured.description}
              </p>
            </div>
          </motion.div>

          {/* List Articles - 5 Columns */}
          <div className="lg:col-span-5 flex flex-col border-t lg:border-t-0 border-white/10 pt-12 lg:pt-0">
            {listItems.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group flex flex-col border-b border-white/10 pb-8 mb-8 last:border-b-0 last:pb-0 last:mb-0 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono text-white/40 tracking-widest uppercase">
                    {item.id} — {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#D02717] tracking-widest uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Read Story →
                  </span>
                </div>
                
                <h4 className="text-2xl md:text-[28px] font-medium tracking-tight leading-[1.2] mb-3 group-hover:text-white text-white/80 transition-colors duration-300">
                  {item.title}
                </h4>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[13px] text-white/50">{item.date}</span>
                  <span className="text-[13px] text-white/40">By {item.author}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
