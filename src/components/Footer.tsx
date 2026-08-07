'use client';

import React, { useRef, useState, useEffect } from 'react';

export function Footer() {
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
    <footer ref={containerRef} className="w-full bg-[#090909] text-white pt-16 md:pt-20 pb-10 px-6 md:px-16 border-t border-white/10 relative z-20 font-sans overflow-hidden">
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
      
      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between gap-10 lg:gap-16 mb-12 md:mb-16">
        
        {/* Logo */}
        <div className="lg:w-[30%]">
          <div className="mb-6">
            <img src="/logo.png" alt="Veritas Logo" className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_2px_10px_rgba(208,39,23,0.1)]" />
          </div>
        </div>
        
        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:w-[70%] gap-10 md:gap-8">
          <div>
            <h4 className="font-bold text-[15px] text-[#D02717] mb-6">Quick Links</h4>
            <ul className="space-y-4 text-[14px] text-white/80">
              <li><a href="#" className="hover:text-[#D02717] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#D02717] transition-colors">Why Veritas</a></li>
              <li><a href="#" className="hover:text-[#D02717] transition-colors">Solutions</a></li>
              <li><a href="#" className="hover:text-[#D02717] transition-colors">Knowledge Hub</a></li>
              <li><a href="#" className="hover:text-[#D02717] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#D02717] transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[15px] text-[#D02717] mb-6">Our Services</h4>
            <ul className="space-y-4 text-[14px] text-white/80">
              <li><a href="#" className="hover:text-[#D02717] transition-colors">ESOP's</a></li>
              <li><a href="#" className="hover:text-[#D02717] transition-colors">Actuarial Valuations</a></li>
              <li><a href="#" className="hover:text-[#D02717] transition-colors">ESOP's</a></li>
              <li><a href="#" className="hover:text-[#D02717] transition-colors">Actuarial Valuations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[15px] text-[#D02717] mb-6">Contact Info</h4>
            <p className="text-[14px] text-white/80 leading-relaxed max-w-[220px]">
              Emaar The Palm Square,<br/>
              Unit No: 002, 15th Floor,<br/>
              Golf Course Ext Rd, Sector 66,<br/>
              Gurugram, Haryana 122102
            </p>
          </div>
        </div>
        
      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto pt-8 border-t border-white/20 flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 text-[13px] text-white/70">
        
        {/* Left Side (Aligns with Logo) */}
        <div className="lg:w-[30%]">
          <p>© Copyright Veritas 2026. All Rights Reserved.</p>
        </div>
        
        {/* Right Side (Aligns with Columns using Grid) */}
        <div className="flex flex-col md:grid md:grid-cols-3 lg:w-[70%] gap-6 md:gap-8">
          <div>
            <a href="#" className="hover:text-[#D02717] transition-colors font-medium text-[14px]">LinkedIn</a>
          </div>
          
          <div className="hidden md:block">
            {/* Empty middle column to maintain grid alignment with 'Our Services' */}
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#D02717] transition-colors text-[14px]">Disclaimer</a>
            <a href="#" className="hover:text-[#D02717] transition-colors text-[14px]">Terms and Conditions</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
