'use client';

import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Mouse position tracking for the floating image (Viewport relative)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for the cursor following
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height (175px/225px) to center the image perfectly on the cursor
      mouseX.set(e.clientX - 175); 
      mouseY.set(e.clientY - 225);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="w-full bg-[#090909] text-white py-32 md:py-48 px-6 md:px-16 font-sans relative overflow-x-hidden">
      
      {/* Floating Cursor Image (Desktop Only) */}
      <motion.div 
        className="fixed top-0 left-0 w-[350px] h-[450px] pointer-events-none z-50 overflow-hidden hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
        }}
      >
        {insights.map((item, idx) => (
          <img 
            key={item.id}
            src={item.img}
            alt={item.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredIndex === idx ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </motion.div>

      <div className="max-w-[1400px] w-full mx-auto flex flex-col relative z-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 pb-12 border-b border-white/10">
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
            className="mt-8 md:mt-0"
          >
            <button className="group flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest hover:text-white text-white/70 transition-colors">
              View Archive
              <span className="w-8 h-[1px] bg-white/30 group-hover:bg-[#D02717] transition-colors" />
            </button>
          </motion.div>
        </div>

        {/* The Hover-Reveal List */}
        <div className="flex flex-col border-t border-white/10">
          {insights.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col lg:flex-row lg:items-center justify-between border-b border-white/10 py-12 md:py-20 cursor-pointer"
            >
              {/* Desktop Overlay Background to dim other items on hover */}
              <div className="absolute inset-0 bg-[#090909]/0 group-hover:bg-[#111111]/50 transition-colors duration-500 -z-10" />
              
              <div className="flex items-center gap-8 md:gap-16 z-10 w-full transition-transform duration-500 ease-out lg:group-hover:translate-x-12">
                <span className="text-[14px] md:text-[16px] font-mono text-white/30 tracking-widest lg:group-hover:text-[#D02717] transition-colors duration-300">
                  {item.id}
                </span>
                <h4 className="text-3xl md:text-5xl lg:text-7xl font-medium tracking-tighter leading-[1.1] lg:group-hover:text-white text-white/70 transition-colors duration-300">
                  {item.title}
                </h4>
              </div>
              
              <div className="flex flex-col lg:items-end mt-6 lg:mt-0 z-10 w-full lg:w-auto transition-transform duration-500 ease-out lg:group-hover:-translate-x-8 opacity-100 lg:opacity-50 lg:group-hover:opacity-100">
                <span className="text-[12px] font-mono text-white/50 tracking-widest uppercase mb-2">
                  {item.category}
                </span>
                <span className="text-[12px] text-white/40">
                  {item.date}
                </span>
              </div>
              
              {/* Mobile Image (Hidden on Desktop) */}
              <div className="w-full h-[250px] mt-8 overflow-hidden block lg:hidden">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover grayscale opacity-70 transition-all duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
