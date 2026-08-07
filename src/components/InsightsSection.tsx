'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
  const containerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({ 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        });
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', () => setIsHovering(true));
      container.addEventListener('mouseleave', () => setIsHovering(false));
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', () => setIsHovering(true));
        container.removeEventListener('mouseleave', () => setIsHovering(false));
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#090909] text-white py-16 md:py-32 lg:py-48 px-6 md:px-16 font-sans overflow-hidden"
    >
      {/* Interactive Background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-100 mix-blend-screen" style={{ background: 'radial-gradient(circle 800px at 0px 0px, rgba(208, 39, 23, 0.15), transparent 80%)' }}></div>
      <div className="pointer-events-none absolute inset-0 z-0 opacity-80 mix-blend-screen" style={{ background: 'radial-gradient(circle 1000px at 100% 100%, rgba(167, 154, 200, 0.12), transparent 80%)' }}></div>
      
      {/* Flashlight Dot Grid */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ease-out"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 100%)`,
          opacity: isHovering ? 1 : 0
        }}
      />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 xl:gap-24">
          
          {/* Column 1: Header */}
          <div className="flex flex-col h-full">
            {/* Top Block */}
            <div className="flex flex-col lg:h-[220px] mb-8 lg:mb-0 justify-start">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-3 block drop-shadow-sm"
              >
                From our Knowledge Hub
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="text-3xl md:text-[42px] font-semibold tracking-tighter leading-[1.1]"
              >
                Insights
              </motion.h2>
            </div>
            
            {/* Button pushed to the bottom */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 lg:mt-auto pb-4"
            >
              <Link 
                href="/insights"
                className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-300 w-fit hover:translate-x-1"
              >
                View All Articles
                <span className="w-8 h-[1px] bg-white/30 group-hover:bg-[#D02717] group-hover:w-12 transition-all duration-500" />
              </Link>
            </motion.div>
          </div>

          {/* Columns 2, 3, 4: Articles */}
          {displayInsights.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 + (idx * 0.15), duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="h-full"
            >
              <Link href={`/insights/${item.id}`} className="flex flex-col group cursor-pointer h-full">
                {/* Top Block: Fixed height on desktop aligns the titles */}
                <div className="flex flex-col lg:h-[220px] mb-8 lg:mb-0">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (idx * 0.15), duration: 1, ease: "easeOut" }}
                    className="w-full h-[1.5px] bg-white/20 mb-8 relative overflow-hidden origin-left" 
                  >
                    <div className="absolute inset-0 bg-[#D02717] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  </motion.div>
                  <h3 className="text-xl lg:text-[24px] font-medium tracking-tight leading-[1.3] text-white transition-colors duration-700 pr-4">
                    {item.title}
                  </h3>
                </div>

                {/* Description Text with increased bottom margin for spacing */}
                <p className="text-[14px] text-white leading-[1.8] transition-colors duration-700 mb-10 lg:mb-16">
                  {item.description}
                </p>

                {/* Image pushed to the bottom */}
                <div className="w-full aspect-square bg-[#111111] overflow-hidden relative mt-12 lg:mt-auto">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-700 z-10 pointer-events-none" />
                  
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>
              </Link>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
