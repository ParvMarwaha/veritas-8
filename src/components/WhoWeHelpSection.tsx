'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export function WhoWeHelpSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "For Founders",
      desc: "An ownership structure that attracts talent and supports long-term growth.",
      images: [
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      title: "For CFO's",
      desc: "Navigate valuation, compliance, and reporting with confidence.",
      images: [
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      title: "For CHRO's",
      desc: "Ownership programs that employees understand, value, and believe in.",
      images: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      title: "For Investors/VC",
      desc: "Align portfolio companies with scalable ownership frameworks.",
      images: [
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
      ]
    }
  ];

  // 3D Tilt Interaction Logic
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for buttery smooth interpolation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation degrees (tilt effect)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  // Map mouse position to glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const background = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="w-full bg-[#090909] text-white py-20 md:py-24 px-6 md:px-16 font-sans perspective-[1200px]">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Content & Tabs */}
        <div className="w-full lg:w-[55%] flex flex-col pr-0 lg:pr-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5"
          >
            Who We Help
          </motion.h2>
          
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="text-3xl md:text-[42px] font-semibold tracking-tighter leading-[1.1] mb-12 max-w-lg"
          >
            Built for the architects of growth.
          </motion.h3>

          <div className="flex flex-col space-y-1">
            {tabs.map((tab, i) => (
              <div 
                key={i}
                onMouseEnter={() => setActiveTab(i)}
                className={`group cursor-pointer border-l-[2px] pl-6 py-4 transition-all duration-500 ${
                  activeTab === i ? 'border-[#D02717]' : 'border-white/10 hover:border-white/30'
                }`}
              >
                <h4 className={`text-[18px] md:text-[20px] font-medium tracking-tight transition-colors duration-500 ${
                  activeTab === i ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                }`}>
                  {tab.title}
                </h4>
                
                {/* Expandable Description */}
                <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  activeTab === i ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
                }`}>
                  <p className="overflow-hidden text-white/50 text-[14px] md:text-[15px] leading-[1.7] max-w-md">
                    {tab.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: 3D Tilting Single Image */}
        <motion.div 
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="w-full lg:w-[45%] h-[350px] md:h-[400px] lg:h-[420px] relative mt-10 lg:mt-0 rounded-[4px] cursor-pointer"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full rounded-[4px] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
            >
              {/* Scale image slightly away from Z-plane to enhance 3D effect */}
              <motion.img 
                src={tabs[activeTab].images[0]} 
                className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-110"
                style={{ transform: "translateZ(30px)" }}
              />
              
              {/* Dynamic Glare Overlay */}
              <motion.div 
                className="absolute inset-0 pointer-events-none mix-blend-overlay z-10"
                style={{ background }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
