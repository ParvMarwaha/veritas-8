'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const testimonials = [
    {
      quote: "They completely redefined our equity structure to attract top-tier talent while protecting founder interests.",
      author: "Aditi Sharma",
      role: "Founder & CEO",
      company: "TechFlow India"
    },
    {
      quote: "The clarity and compliance framework they built for our Series B gave both us and our investors total peace of mind.",
      author: "Rahul Verma",
      role: "Managing Director",
      company: "Zenith Core"
    },
    {
      quote: "Their team doesn't just do the math, they fundamentally understand how to design ownership that scales.",
      author: "Priya Desai",
      role: "Chief People Officer",
      company: "Nexus Dynamics"
    },
    {
      quote: "From initial valuation to final documentation, their precision and strategic guidance were unparalleled.",
      author: "Vikram Malhotra",
      role: "General Partner",
      company: "Elevate Ventures"
    },
    {
      quote: "They turned a highly complex cap table cleanup into a streamlined, understandable process for everyone.",
      author: "Neha Kapoor",
      role: "Chief Financial Officer",
      company: "Pinnacle Systems"
    }
  ];

  // Frame-rate independent smooth auto-scroll
  const exactScroll = useRef(0);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    
    const scroll = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (containerRef.current && !isHovered && !isDragging) {
        // Natural, relaxed speed: ~40px per second
        exactScroll.current += delta * 0.04; 
        
        if (exactScroll.current >= 1) {
          containerRef.current.scrollLeft += Math.floor(exactScroll.current);
          exactScroll.current = exactScroll.current % 1;
        }
        
        const { scrollLeft, scrollWidth } = containerRef.current;
        if (scrollLeft >= scrollWidth / 2) {
          containerRef.current.scrollLeft = 0;
        }
      } else {
        exactScroll.current = 0;
      }
      
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Smooth, natural 1.5x drag feel
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <section className="w-full bg-white text-[#090909] pt-24 md:pt-32 pb-20 md:pb-24 overflow-hidden border-t border-[#090909]/10">
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[1300px] mx-auto px-6 md:px-16 mb-16 text-center"
      >
        <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
          Testimonials
        </h2>
        <h3 className="text-3xl md:text-[42px] font-semibold tracking-tighter leading-[1.1] mb-6 text-[#090909]">
          What our partners say.
        </h3>
        <p className="text-[#090909]/60 text-[15px] max-w-md mx-auto">
          We measure our success by the growth and stability of the organizations we help build.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full relative py-12"
      >
        
        {/* Gradients for fading effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#F7F5F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#F7F5F2] to-transparent z-10 pointer-events-none" />

        <div 
          ref={containerRef}
          className={`flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* 2 duplicates for seamless infinite scrolling */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-6 md:gap-10 pr-6 md:pr-10 shrink-0">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group w-[320px] max-w-[85vw] md:w-[450px] shrink-0 bg-white p-8 md:p-12 rounded-[4px] border border-[#090909]/5 shadow-[0_5px_15px_rgba(0,0,0,0.02)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between hover:-translate-y-4 hover:scale-[1.02] hover:shadow-[0_40px_80px_-20px_rgba(208,39,23,0.12)] hover:border-[#D02717]/20 cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#D02717] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left ease-[cubic-bezier(0.25,1,0.5,1)]" />
                  
                  <svg className="w-8 h-8 text-[#D02717] mb-8 opacity-20 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-[15px] md:text-[17px] font-normal leading-[1.7] tracking-tight mb-10 text-[#090909]/60 transition-colors duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-[#090909]">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <h4 className="font-semibold text-[14px] md:text-[15px] text-[#090909] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1">{testimonial.author}</h4>
                    <p className="text-[11px] font-bold text-[#D02717] uppercase tracking-[0.15em] mt-1.5 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
