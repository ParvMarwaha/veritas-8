'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function LocationsAndDetails() {
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <section className="w-full bg-[#090909] text-white py-32 md:py-40 px-6 md:px-16 font-sans relative z-20">
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40">
        
        {/* Direct Details */}
        <div className="flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl md:text-[42px] font-semibold tracking-tighter leading-[1.1] mb-16">
              Direct Contact
            </h3>
            
            <div className="space-y-12">
              <div>
                <p className="text-[#D02717] font-bold text-[11px] uppercase tracking-[0.2em] mb-4">General Inquiries</p>
                <a href="mailto:contact@veritasequity.com" className="text-[20px] md:text-[24px] font-light hover:text-[#D02717] transition-colors">
                  contact@veritasequity.com
                </a>
              </div>
              
              <div>
                <p className="text-[#D02717] font-bold text-[11px] uppercase tracking-[0.2em] mb-4">Partnership & Media</p>
                <a href="mailto:partners@veritasequity.com" className="text-[20px] md:text-[24px] font-light hover:text-[#D02717] transition-colors">
                  partners@veritasequity.com
                </a>
              </div>
              
              <div>
                <p className="text-[#D02717] font-bold text-[11px] uppercase tracking-[0.2em] mb-4">Phone</p>
                <a href="tel:+18005550199" className="text-[20px] md:text-[24px] font-light hover:text-[#D02717] transition-colors">
                  +1 (800) 555-0199
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Office Locations */}
        <div className="flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <h3 className="text-3xl md:text-[42px] font-semibold tracking-tighter leading-[1.1] mb-16">
              Office Location
            </h3>
            
            <div className="flex flex-col flex-grow">
              <h4 className="text-[18px] font-medium tracking-tight mb-4 text-[#D02717]">India Headquarters</h4>
              <p className="text-[14px] text-white/60 leading-relaxed mb-10">
                Emaar The Palm Square, Unit No: 002, 15th Floor,<br/>
                Golf Course Ext Rd, Sector 66, Gurugram, Haryana 122102
              </p>
              
              <div 
                className="w-full flex-grow min-h-[350px] md:min-h-[400px] rounded-xl overflow-hidden border border-white/10 bg-[#18181B] relative group"
                onMouseEnter={() => setHasInteracted(true)}
              >
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  src="https://maps.google.com/maps?q=Emaar%20The%20Palm%20Square,%20Gurugram&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full transition-[filter] duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] [filter:grayscale(1)_invert(0.92)_hue-rotate(180deg)_contrast(1.1)] group-hover:[filter:grayscale(0)_invert(0.9)_hue-rotate(180deg)_contrast(1.1)] will-change-[filter]"
                ></iframe>
                
                {/* Custom Red Marker Overlay (Fades out permanently on first interaction) */}
                <div 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] flex items-center justify-center ${hasInteracted ? 'opacity-0' : 'opacity-100'}`}
                >
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-[26px] h-[26px] bg-[#18181B] rounded-full" />
                    <div className="absolute w-[20px] h-[20px] bg-[#D02717] rounded-full" />
                    <div className="relative w-[8px] h-[8px] bg-[#18181B] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
