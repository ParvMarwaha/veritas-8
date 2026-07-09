'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { StaticHero } from '@/components/StaticHero';
import { ScrollRevealSection } from '@/components/ScrollRevealSection';
import { ServicesSection } from '@/components/ServicesSection';
import { InsightsSection } from '@/components/InsightsSection';
import { ClientsSection } from '@/components/ClientsSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

export default function Home() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('dark');
  const [isInteractiveBg, setIsInteractiveBg] = useState(false);
  
  const { scrollY } = useScroll();
  // Move hero up at 50% scroll speed to make the overlap slower
  const heroY = useTransform(scrollY, (y) => -y * 0.5);
  // Smoothly fade out the hero as the background overlaps it
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0.2]);
  
  const servicesRef = useRef<HTMLDivElement>(null);
  const insightsRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      let theme: 'dark' | 'light' = 'dark'; // Default for Hero & ScrollReveal
      const offset = 80; // Navbar trigger offset

      const services = servicesRef.current?.getBoundingClientRect();
      const insights = insightsRef.current?.getBoundingClientRect();
      const clients = clientsRef.current?.getBoundingClientRect();
      const cta = ctaRef.current?.getBoundingClientRect();

      // Check in chronological scroll order. Later sections override earlier ones if overlapping.
      
      // 1. Services is Light
      if (services && services.top <= offset && services.bottom > offset) {
        theme = 'light';
      }
      
      // 2. Insights is Dark (Overlaps sticky services)
      if (insights && insights.top <= offset && insights.bottom > offset) {
        theme = 'dark';
      }
      
      // 3. Clients is Light
      if (clients && clients.top <= offset && clients.bottom > offset) {
        theme = 'light';
      }

      // 4. CTA and Footer are Dark
      if (cta && cta.top <= offset) {
        theme = 'dark';
      }

      setNavTheme(theme);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReady = useCallback(() => {
    setIsAppReady(true);
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
      
      <div className="sticky top-0 w-full h-screen z-0 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full h-full">
          <StaticHero 
            onReady={handleReady} 
            isReady={isAppReady} 
            isMenuOpen={isMenuOpen} 
            isInteractiveBg={isInteractiveBg} 
          />
        </motion.div>
      </div>
      
      <div className="relative z-10 bg-[#090909]">
        <ScrollRevealSection />
        
        {/* Sticky Overlap Container */}
        <div className="relative w-full z-20 -mt-[100vh]">
          
          {/* Services Section slides over the Scroll Reveal section and sticks at the top */}
          <div className="sticky top-0 w-full bg-[#F7F5F2] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div ref={servicesRef}>
              <ServicesSection />
            </div>
          </div>
          
          {/* Insights Section slides over the stuck Services Section */}
          <div ref={insightsRef} className="relative z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-[#090909]">
            <InsightsSection />
          </div>

        </div>

        <div ref={clientsRef} className="relative z-40 bg-[#F2F2F2]">
          <ClientsSection />
        </div>
        
        <div ref={ctaRef}>
          <CTASection isInteractiveBg={isInteractiveBg} />
          <Footer />
        </div>
      </div>
    </main>
  );
}
