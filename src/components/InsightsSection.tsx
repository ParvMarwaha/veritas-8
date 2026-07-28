'use client';

import React from 'react';
import { motion } from 'framer-motion';

const insights = [
  {
    id: "01",
    title: "The Future of Employee Ownership",
    description: "As the global workforce evolves, traditional equity models are struggling to keep pace. Discover how innovative companies are restructuring ownership to drive sustainable growth and build trust.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "02",
    title: "Navigating ESOP Valuations in 2026",
    description: "A comprehensive look at how market dynamics are forcing a recalibration of startup valuations and cap table strategies across the tech sector. Learn what founders need to know before their next round.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "03",
    title: "Global Equity Compliance & Strategy",
    description: "Expanding internationally? Here is the definitive playbook for managing cross-border equity compliance without slowing down your operations or creating tax liabilities for your distributed team.",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
  }
];

export function InsightsSection() {
  const displayInsights = insights.slice(0, 3); 

  return (
    <section className="w-full bg-[#090909] text-white py-32 md:py-48 px-6 md:px-12 lg:px-16 font-sans">
      <div className="max-w-[1600px] w-full mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 xl:gap-24">
          
          {/* Column 1: Header */}
          <div className="flex flex-col h-full min-h-[500px]">
            <div>
              <span className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] uppercase mb-4 block">
                From our Knowledge Hub
              </span>
              <h2 className="text-6xl md:text-7xl lg:text-[80px] xl:text-[90px] font-bold tracking-tighter leading-[0.9]">
                Insights
              </h2>
            </div>
            
            {/* mb-[calc(100%+2rem)] creates the exact vertical spacing to align this text with the descriptions in Col 2,3,4 */}
            <div className="mt-8 lg:mt-auto lg:mb-[calc(100%+2rem)] lg:pr-8">
              <p className="text-white/50 text-[14px] leading-[1.8]">
                Explore our latest thinking on cap table management, compliance, and how to build a lasting culture of ownership across your organization.
              </p>
              
              <button className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest hover:text-white text-white/70 transition-colors w-fit mt-12">
                View All Articles
                <span className="w-3 h-3 bg-white/30 group-hover:bg-[#D02717] transition-colors" />
              </button>
            </div>
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
              {/* Top border & Title */}
              <div className="mb-16 lg:mb-0">
                <div className="w-full h-[1px] bg-white/20 mb-6 group-hover:bg-white/50 transition-colors duration-300" />
                <h3 className="text-2xl lg:text-[28px] font-medium tracking-tight leading-[1.3] group-hover:text-[#D02717] transition-colors duration-300 pr-4">
                  {item.title}
                </h3>
              </div>

              {/* Description & Image pinned to the bottom */}
              <div className="mt-auto flex flex-col gap-8">
                <p className="text-[14px] text-white/50 leading-[1.8]">
                  {item.description}
                </p>
                <div className="w-full aspect-square bg-[#111111] overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#090909]/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                  />
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
