'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from '@/components/Footer';

import { ContactHero } from '@/components/contact/ContactHero';
import { RequirementSelector } from '@/components/contact/RequirementSelector';
import { SmartContactForm } from '@/components/contact/SmartContactForm';
import { WhyReachOut } from '@/components/contact/WhyReachOut';
import { WhatHappensNext } from '@/components/contact/WhatHappensNext';
import { LocationsAndDetails } from '@/components/contact/LocationsAndDetails';

export default function ContactPage() {
  const [isAppReady, setIsAppReady] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('light'); // Hero is light
  
  const [selectedReq, setSelectedReq] = useState<string | null>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const reqRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const whatRef = useRef<HTMLDivElement>(null);
  const locRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    
    const updateTheme = () => {
      const offset = 80;
      let theme: 'dark' | 'light' = 'light'; 

      const hero = heroRef.current?.getBoundingClientRect();
      const req = reqRef.current?.getBoundingClientRect();
      const form = formRef.current?.getBoundingClientRect();
      const why = whyRef.current?.getBoundingClientRect();
      const what = whatRef.current?.getBoundingClientRect();
      const loc = locRef.current?.getBoundingClientRect();
      const footer = footerRef.current?.getBoundingClientRect();

      // 1. Hero is Light
      if (hero && hero.top <= offset && hero.bottom > offset) {
        theme = 'light';
      }
      
      // 2. Requirement is Dark
      if (req && req.top <= offset && req.bottom > offset) {
        theme = 'dark';
      }
      
      // 3. Form is Light
      if (form && form.top <= offset && form.bottom > offset) {
        theme = 'light';
      }

      // 4. Why Reach Out is Dark
      if (why && why.top <= offset && why.bottom > offset) {
        theme = 'dark';
      }
      
      // 5. What Happens Next is Light
      if (what && what.top <= offset && what.bottom > offset) {
        theme = 'light';
      }

      // 6. Locations is Dark
      if (loc && loc.top <= offset) {
        theme = 'dark';
      }

      // 7. Footer is Dark
      if (footer && footer.top <= offset) {
        theme = 'dark';
      }

      setNavTheme(theme);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateTheme();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateTheme();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="w-full bg-[#090909] text-white/90 font-sans selection:bg-[#D02717]/30">
      <Navbar 
        isReady={isAppReady} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        theme={navTheme} 
      />
      
      <div className="relative w-full z-10 overflow-hidden" ref={heroRef}>
        <ContactHero />
      </div>
      
      <div className="relative z-10 w-full bg-[#090909]">
        
        <div className="relative w-full z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-[#090909]" ref={reqRef}>
          <RequirementSelector onSelect={setSelectedReq} />
        </div>
        
        <div className="relative w-full z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] bg-white" ref={formRef}>
          <SmartContactForm selectedRequirement={selectedReq} />
        </div>
        
        <div className="relative w-full z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-[#090909]" ref={whyRef}>
          <WhyReachOut />
        </div>
        
        <div className="relative w-full z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] bg-white" ref={whatRef}>
          <WhatHappensNext />
        </div>
        
        <div className="relative w-full z-[60] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-[#090909]" ref={locRef}>
          <LocationsAndDetails />
        </div>

        <div className="relative z-[70] bg-[#090909]" ref={footerRef}>
          <Footer />
        </div>
      </div>
    </main>
  );
}
