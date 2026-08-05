'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';

import { AboutHero } from '@/components/about/AboutHero';
import { AboutStory } from '@/components/about/AboutStory';
import { AboutValues } from '@/components/about/AboutValues';
import { AboutLeadership } from '@/components/about/AboutLeadership';
import { AboutToday } from '@/components/about/AboutToday';

export default function AboutPage() {
  const [isAppReady, setIsAppReady] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('light'); // Hero is light
  const [isInteractiveBg, setIsInteractiveBg] = useState(false); // Disabled for About page
  
  const { scrollY } = useScroll();
  
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const leadershipRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Parallax overlapping effect for Story and Values
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end start"]
  });
  const storyY = useTransform(storyProgress, [0, 1], ["0%", "40%"]); // Story moves down at 40% speed when scrolled past

  const { scrollYProgress: valuesProgress } = useScroll({
    target: valuesRef,
    offset: ["start start", "end start"]
  });
  const valuesY = useTransform(valuesProgress, [0, 1], ["0%", "40%"]); // Values moves down at 40% speed when scrolled past
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = 80;
      let theme: 'dark' | 'light' = 'light'; // Default hero theme is light

      const story = storyRef.current?.getBoundingClientRect();
      const values = valuesRef.current?.getBoundingClientRect();
      const leadership = leadershipRef.current?.getBoundingClientRect();
      const today = todayRef.current?.getBoundingClientRect();
      const cta = ctaRef.current?.getBoundingClientRect();
      const footer = footerRef.current?.getBoundingClientRect();

      // 1. Story is Light
      if (story && story.top <= offset && story.bottom > offset) {
        theme = 'light';
      }
      
      // 2. Values is Dark
      if (values && values.top <= offset && values.bottom > offset) {
        theme = 'dark';
      }
      
      // 3. Leadership is Light
      if (leadership && leadership.top <= offset && leadership.bottom > offset) {
        theme = 'light';
      }

      // 4. Today is Dark
      if (today && today.top <= offset && today.bottom > offset) {
        theme = 'dark';
      }

      // 5. CTA is Light (matching home page)
      if (cta && cta.top <= offset) {
        theme = 'light';
      }

      // 6. Footer is Dark
      if (footer && footer.top <= offset) {
        theme = 'dark';
      }

      setNavTheme(theme);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="w-full bg-[#090909] text-white/90 font-sans selection:bg-[#D02717]/30">
      <Navbar 
        isReady={isAppReady} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        theme={navTheme} 
        isInteractiveBg={isInteractiveBg}
        setIsInteractiveBg={setIsInteractiveBg}
      />
      
      <div className="relative w-full z-10 overflow-hidden">
        <AboutHero />
      </div>
      
      <div className="relative z-10 w-full bg-[#090909]">
        
        {/* 2. Story Section (Moves slower to get overlapped by Values) */}
        <div className="relative w-full z-20 bg-white" ref={storyRef}>
          <motion.div style={{ y: storyY }}>
            <AboutStory />
          </motion.div>
        </div>
        
        {/* 3. Values Section - Slides over Story, then moves slower to get overlapped by Leadership */}
        <div className="relative w-full z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-[#090909]" ref={valuesRef}>
          <motion.div style={{ y: valuesY }}>
            <AboutValues />
          </motion.div>
        </div>

        {/* 4. Leadership Section - Slides over Values */}
        <div className="relative w-full z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] bg-white">
          <div ref={leadershipRef}>
            <AboutLeadership />
          </div>
        </div>
        
        {/* 5. Today Section */}
        <div ref={todayRef} className="relative w-full z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-[#090909]">
          <AboutToday />
        </div>
        
        <div ref={ctaRef} className="relative z-[60]">
          <CTASection isInteractiveBg={true} />
        </div>
        <div ref={footerRef} className="relative z-[70]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
