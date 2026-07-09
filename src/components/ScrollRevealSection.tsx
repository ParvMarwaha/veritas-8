'use client';
import React, { useEffect, useRef, useState } from 'react';

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const ScrollRevealSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollableDistance = height - window.innerHeight;
      const scrolled = -top;
      
      if (scrolled <= 0) {
        setProgress(0);
      } else if (scrolled >= scrollableDistance) {
        setProgress(1);
      } else {
        setProgress(scrolled / scrollableDistance);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const text = "We help organizations navigate the complexities of employee ownership by designing strategic equity frameworks that align stakeholders, strengthen governance, and create sustainable long-term value for businesses and their people.";
  const words = text.split(' ');

  // Animation finishes at 60% (150vh) so Services section can slide over during the remaining 40% (100vh)
  const bracketProgress = Math.min(progress / 0.28, 1);
  const bEase = easeOut(bracketProgress);
  
  const textRevealProgress = Math.max(0, Math.min((progress - 0.12) / 0.12, 1));
  const tEase = easeOut(textRevealProgress);
  
  const highlightProgress = Math.max(0, Math.min((progress - 0.24) / 0.36, 1));

  return (
    <section ref={containerRef} className="relative z-10 w-full bg-[#090909] text-white" style={{ height: '350vh' }}>
      <div className="sticky top-0 w-full h-screen flex justify-center items-center px-6 md:px-16 overflow-hidden">
        <div 
          className="relative max-w-[65rem] w-full mx-auto py-24 md:py-32 px-4 sm:px-6 md:px-16 lg:px-24 flex items-center"
          style={{ 
            transform: `translateY(${5 - (highlightProgress * 10)}vh)` 
          }}
        >
          
          {/* Top Left Bracket */}
          <div 
            className="hidden md:block absolute top-0 left-0 w-8 h-12 md:w-12 md:h-16 border-t border-l border-white/60"
            style={{
              transform: `translate(${(1 - bEase) * 40}vw, ${(1 - bEase) * 30}vh)`,
              opacity: Math.min(bEase * 2, 1) // fade in quickly as it moves
            }}
          ></div>
          
          {/* Bottom Right Bracket */}
          <div 
            className="hidden md:block absolute bottom-0 right-0 w-8 h-12 md:w-12 md:h-16 border-b border-r border-white/60"
            style={{
              transform: `translate(${(1 - bEase) * -40}vw, ${(1 - bEase) * -30}vh)`,
              opacity: Math.min(bEase * 2, 1)
            }}
          ></div>

          {/* Text Container */}
          <p 
            className="text-xl md:text-2xl lg:text-[1.8rem] leading-[1.5] font-light font-sans tracking-tight max-w-[55rem] mx-auto text-center md:text-left"
            style={{
              opacity: tEase,
              transform: `translateY(${(1 - tEase) * 40}px)`
            }}
          >
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + (1 / words.length);
              
              // Calculate how much of this specific word should be highlighted
              // based on the overall highlight progress.
              const wordProgress = Math.max(0, Math.min((highlightProgress - start) / (end - start), 1));
              
              // Interpolate opacity between 0.2 and 1
              const opacity = 0.2 + (0.8 * wordProgress);
              
              return (
                <span 
                  key={i} 
                  style={{ color: `rgba(255, 255, 255, ${opacity})` }}
                >
                  {word}{' '}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
};
