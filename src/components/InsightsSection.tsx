'use client';

import React from 'react';
import { motion } from 'framer-motion';

const insights = [
  {
    id: "01",
    title: "The Human API We Forgot to Integrate",
    category: "Article",
    date: "January the 10th",
    author: "Elena Rodriguez",
    description: "If you're trying to break into a certain vertical, you probably wouldn't choose the one with massive amounts of regulations and a competitive field filled with big players that have a ton of money at their disposal. Nonetheless, the supplements and pharmaceutical industry is one that...",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "02",
    title: "Over Architecture Practice",
    category: "Article",
    date: "December the 25th",
    author: "Marcus Chen",
    description: "Throughout the years I started to be interested in the business side of things as much as the software side of things, this gave me some interesting insights into the minds of both sides of the development process. The decisions that management makes that don't make any sense to...",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "03",
    title: "Don't Sleep On The Helix Personalization Strategy",
    category: "Article",
    date: "January the 15th",
    author: "Sarah Jenkins",
    description: "There are some big-ticket items that most people have and need, but absolutely hate shopping for. Mattresses fall into that category. In fact, studies have shown that people would rather go to the dentist than buy a new mattress. Helix Sleep is trying to take the pain out of that...",
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
  // Take exactly 3 to perfectly match the 4-column layout in the reference
  const displayInsights = insights.slice(0, 3); 

  return (
    <section className="w-full bg-[#090909] text-white py-32 md:py-48 px-6 md:px-12 lg:px-16 font-sans">
      <div className="max-w-[1600px] w-full mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          
          {/* Column 1: Header */}
          <div className="flex flex-col mb-16 lg:mb-0 h-full">
            <span className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] uppercase mb-16 lg:mb-24">
              Courtesy of our community
            </span>
            <h2 className="text-6xl md:text-7xl lg:text-[110px] font-bold tracking-tighter leading-[0.85] mb-20 lg:mb-32">
              PRESS
            </h2>
            <p className="text-white/50 text-[13px] leading-[1.7] mb-12">
              Explore our latest thinking on cap table management, compliance, and how to build a lasting culture of ownership.
            </p>
            <button className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest hover:text-white text-white/70 transition-colors w-fit mt-auto">
              Check out our latest
              <span className="w-3 h-3 bg-white/30 group-hover:bg-[#D02717] transition-colors" />
            </button>
          </div>

          {/* Columns 2, 3, 4: Articles */}
          {displayInsights.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col group cursor-pointer h-full"
            >
              {/* Top border & Meta */}
              <div className="border-t-[1.5px] border-white/20 pt-4 mb-8 flex justify-between items-center group-hover:border-white/50 transition-colors duration-300">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/90 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                  {item.category}
                </span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  {item.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight leading-[1.2] mb-8 group-hover:text-[#D02717] transition-colors duration-300 min-h-[100px] lg:min-h-[120px]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] text-white/50 leading-[1.8] mb-12 flex-grow">
                {item.description}
              </p>

              {/* Author & Action */}
              <div className="flex items-center justify-between mb-8 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                    <span className="text-[10px] font-bold text-white/50">{item.author.charAt(0)}</span>
                  </div>
                  <span className="text-[12px] font-bold text-white/80 tracking-wide">{item.author}</span>
                </div>
                <span className="text-[11px] font-bold tracking-widest text-white/40 group-hover:text-white transition-colors duration-300 uppercase flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#D02717]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  Read
                </span>
              </div>

              {/* Image */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-white/5 relative">
                <div className="absolute inset-0 bg-[#090909]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                />
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
