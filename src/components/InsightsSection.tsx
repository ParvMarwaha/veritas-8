'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';

export function InsightsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const insights = [
    {
      title: "The Future of Employee Ownership",
      category: "Report",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "Navigating Valuations in 2026",
      category: "Analysis",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "Building a Culture of Trust",
      category: "Opinion",
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "Global Equity Compliance",
      category: "Guide",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "Structuring Secondary Markets",
      category: "Case Study",
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "The IPO Transition Playbook",
      category: "Report",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000",
    }
  ];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Deep ambient glows that track the cursor globally across the section
  const bgGradient1 = useMotionTemplate`radial-gradient(circle 800px at ${rawX}px ${rawY}px, rgba(208, 39, 23, 0.25), transparent 80%)`;
  const bgGradient2 = useMotionTemplate`radial-gradient(circle 1000px at calc(100% - ${rawX}px) calc(100% - ${rawY}px), rgba(167, 154, 200, 0.15), transparent 80%)`;

  // Interactive Grid Mask that reveals the grid under the cursor
  const gridMask = useMotionTemplate`radial-gradient(circle 350px at ${rawX}px ${rawY}px, black 20%, transparent 100%)`;

  const imgX = useTransform(mouseX, [-300, 300], [20, -20]);
  const imgY = useTransform(mouseY, [-300, 300], [20, -20]);

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setHoveredIndex((prev) => (prev + 1) % insights.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, insights.length]);

  return (
    <section 
      className="relative w-full bg-[#090909] text-white py-24 md:py-32 px-6 md:px-16 font-sans overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onMouseMove={handleSectionMouseMove}
    >
      {/* Deep Ambient Glow Background */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 opacity-80 mix-blend-screen"
        style={{ background: bgGradient1 }}
      />
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 opacity-60 mix-blend-screen"
        style={{ background: bgGradient2 }}
      />

      {/* Interactive Revealing Dotted Grid */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          WebkitMaskImage: gridMask,
          maskImage: gridMask
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-[1400px] mx-auto flex flex-col"
      >
        <div className="text-center md:text-left mb-12">
          <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
            Insights & Resources
          </h2>
          <h3 className="text-3xl md:text-[42px] font-semibold tracking-tighter leading-[1.1] mb-6 mx-auto md:mx-0">
            Latest thinking on equity design.
          </h3>
          <p className="text-white/60 text-[15px] max-w-lg mx-auto md:mx-0">
            Explore our perspectives on sustainable growth, structural innovation, and the future of ownership.
          </p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-24 w-full">
          {/* Left: The Uncluttered List */}
        <div className="w-full lg:w-[55%] flex flex-col space-y-5 md:space-y-6">
          {insights.map((insight, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onMouseEnter={() => setHoveredIndex(i)}
              className="group cursor-pointer relative pb-5 flex flex-col md:flex-row md:items-center justify-between"
            >
              {/* Default Border */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />
              
              {/* Active Indicator Line (Jumps between items) */}
              {hoveredIndex === i && (
                <motion.div
                  layoutId="active-line"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Autoplay Progress Line (Fills up when playing) */}
              {hoveredIndex === i && isAutoPlaying && (
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-[#D02717] z-10"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.5, ease: "linear" }}
                />
              )}

              <div className="flex items-center gap-5 md:gap-8">
                <span className={`text-[11px] md:text-[12px] font-mono transition-colors duration-500 w-6 ${hoveredIndex === i ? 'text-[#D02717]' : 'text-white/20'}`}>
                  0{i + 1}
                </span>
                <h3 className={`text-[17px] md:text-[20px] font-normal tracking-tight transition-all duration-500 flex items-center gap-3 ${hoveredIndex === i ? 'text-white transform translate-x-2' : 'text-white/50 group-hover:text-white/70'}`}>
                  {insight.title}
                  {/* Arrow that slides in */}
                  <span className={`transition-all duration-500 transform ${hoveredIndex === i ? 'opacity-100 translate-x-0 text-[#D02717]' : 'opacity-0 -translate-x-4'}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </h3>
              </div>
              <span className={`text-[9px] md:text-[10px] uppercase tracking-[0.15em] transition-colors duration-500 mt-2 md:mt-0 ml-11 md:ml-0 ${hoveredIndex === i ? 'text-white' : 'text-white/20 group-hover:text-white/40'}`}>
                {insight.category}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Right: The Perfect Circle */}
        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
          <div 
            className="relative w-[min(100%,320px)] aspect-square md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] group cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsAutoPlaying(false)}
          >
            
            <div className="absolute inset-0 overflow-hidden shadow-[0_0_50px_rgba(208,39,23,0.15)] group-hover:shadow-[0_0_80px_rgba(208,39,23,0.3)] bg-white/5 rounded-full border border-white/10 group-hover:border-[#D02717]/50 transition-all duration-700">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={`img-${hoveredIndex}`}
                  src={insights[hoveredIndex].img}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ x: imgX, y: imgY }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 mix-blend-multiply z-0 transition-colors duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 z-0 opacity-100 group-hover:opacity-90 transition-opacity duration-700" />
              
              {/* Visual Indicator Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center z-10 pointer-events-none transition-transform duration-700 group-hover:-translate-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${hoveredIndex}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-white text-[12px] font-bold tracking-[0.3em] uppercase mb-4 drop-shadow-md">
                      {insights[hoveredIndex].category}
                    </span>
                    <h3 className="text-white text-xl md:text-[28px] font-bold tracking-tight drop-shadow-2xl leading-tight">
                      {insights[hoveredIndex].title}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Floating Action Button */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-6 -left-6 md:bottom-10 md:-left-10 z-20"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-[#D02717] rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_20px_40px_rgba(208,39,23,0.4)]">
                 <span className="text-[12px] md:text-[14px] font-bold tracking-widest uppercase text-center leading-tight">
                   Read<br/>Article
                 </span>
              </div>
            </motion.div>

          </div>
        </div>
        </div>
      </motion.div>
    </section>
  );
}
