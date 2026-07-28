'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

const logos = [
  { name: "AngelList", url: "/partners/resized%20logos/angellist.png" },
  { name: "Bajaj", url: "/partners/resized%20logos/bajaj.png" },
  { name: "Bajaj 2", url: "/partners/resized%20logos/bajaj2.png" },
  { name: "Games24x7", url: "/partners/resized%20logos/games24x7.png" },
  { name: "ImageKit", url: "/partners/resized%20logos/imagekit.png" },
  { name: "Isthara", url: "/partners/resized%20logos/isthara.png" },
  { name: "Client 1", url: "/partners/resized%20logos/logo1.png" },
  { name: "Client 2", url: "/partners/resized%20logos/logo2.png" },
  { name: "Client 3", url: "/partners/resized%20logos/logo3.png" },
  { name: "Client 4", url: "/partners/resized%20logos/logo4.png" },
  { name: "Client 5", url: "/partners/resized%20logos/logo5.png" },
  { name: "Client 6", url: "/partners/resized%20logos/logo6.png" },
  { name: "LTTS", url: "/partners/resized%20logos/ltts.png" },
  { name: "Netcore", url: "/partners/resized%20logos/netcore.png" },
  { name: "Prepladder", url: "/partners/resized%20logos/prepladder.png" },
  { name: "TopHire", url: "/partners/resized%20logos/tophire.png" },
  { name: "Zetwerk", url: "/partners/resized%20logos/zetwerk.png" }
];

// Reusable Counter Component for dynamic metrics
function AnimatedCounter({ to, suffix = "", duration = 2 }: { to: number, suffix?: string, duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration, ease: [0.22, 1, 0.36, 1] }); // smooth easeOut
    }
  }, [isInView, count, to, duration]);

  return (
    <span ref={ref} className="inline-flex items-center">
      <motion.span>{rounded}</motion.span>
      <span className="ml-1">{suffix}</span>
    </span>
  );
}

export function ClientsSection() {
  return (
    <section className="w-full bg-white pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden relative font-sans">
      
      {/* 12-Column Layout container matching ServicesSection's padding structure */}
      <div className="w-full px-6 md:px-16 relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 xl:gap-32 items-start">
          
          {/* Left Column - Headings & Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex flex-col items-start lg:pr-8"
          >
            <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
              Our Impact
            </h2>
            <h3 className="text-3xl md:text-[42px] font-semibold tracking-tighter leading-[1.1] mb-6 max-w-[380px] text-[#090909]">
              Designing for true business outcomes.
            </h3>
            
            <p className="text-[14px] md:text-[15px] text-[#090909]/70 leading-[1.6] max-w-[340px] tracking-tight">
              Most ownership programs are designed around compliance requirements. The best ones are designed around business outcomes.
            </p>
          </motion.div>

          {/* Metrics & Divider Column (Restored to Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 flex flex-col w-full"
          >
            {/* Red Text */}
            <div className="text-[#D02717] font-medium text-[16px] lg:text-[18px] leading-[1.5] max-w-[600px] mb-8 lg:mb-10">
              At Veritas, we believe ownership should do more than just satisfy regulations. It should help businesses grow.
            </div>

            {/* Innovative: Red Divider smoothly animates in */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-[1px] bg-[#D02717] mb-12 lg:mb-16 origin-left"
            ></motion.div>

            {/* 2x2 Metrics Grid */}
            <div className="grid grid-cols-2 gap-y-12 lg:gap-y-16 gap-x-16 lg:gap-x-32 w-full">
               
               {/* Metric 1 */}
               <div className="flex flex-col cursor-default">
                  <div className="h-[64px] lg:h-[72px] flex items-end mb-3 lg:mb-4">
                    <div className="text-[#D02717] text-[40px] lg:text-[48px] font-semibold tracking-tighter leading-none flex items-center">
                      <AnimatedCounter to={100} suffix="+" duration={2} />
                    </div>
                  </div>
                  <div className="text-[#090909]/80 text-[14px] lg:text-[15px] tracking-tight">
                    Esop Schemes Designed
                  </div>
               </div>

               {/* Metric 2 (Static text instead of counter) */}
               <div className="flex flex-col cursor-default">
                  <div className="h-[64px] lg:h-[72px] flex items-end mb-3 lg:mb-4">
                    <div className="text-[#D02717] text-[20px] lg:text-[24px] font-semibold tracking-tight leading-[1.15]">
                      Ind AS, IAS 19,<br/>US GAAP
                    </div>
                  </div>
                  <div className="text-[#090909]/80 text-[14px] lg:text-[15px] tracking-tight">
                    Compliant
                  </div>
               </div>

               {/* Metric 3 */}
               <div className="flex flex-col cursor-default">
                  <div className="h-[64px] lg:h-[72px] flex items-end mb-3 lg:mb-4">
                    <div className="text-[#D02717] text-[40px] lg:text-[48px] font-semibold tracking-tighter leading-none flex items-center">
                      <AnimatedCounter to={15} suffix="+" duration={1.5} />
                    </div>
                  </div>
                  <div className="text-[#090909]/80 text-[14px] lg:text-[15px] tracking-tight">
                    Sectors Served
                  </div>
               </div>

               {/* Metric 4 */}
               <div className="flex flex-col cursor-default">
                  <div className="h-[64px] lg:h-[72px] flex items-end mb-3 lg:mb-4">
                    <div className="text-[#D02717] text-[40px] lg:text-[48px] font-semibold tracking-tighter leading-none flex items-center">
                      <AnimatedCounter to={6} suffix="+" duration={1.2} />
                    </div>
                  </div>
                  <div className="text-[#090909]/80 text-[14px] lg:text-[15px] tracking-tight">
                    Years of Actuarial Partnerships
                  </div>
               </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Infinite Logo Marquee */}
      <div className="w-full relative mt-10 md:mt-12 py-12 md:py-24 flex overflow-hidden">
        
        {/* Fade gradients for smooth entry/exit */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex whitespace-nowrap items-center w-max animate-marquee-scroll">
          {/* Duplicate logos to ensure seamless looping without any absolute positioning overlaps */}
          {[...logos, ...logos, ...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <span 
              key={index} 
              className="mx-12 lg:mx-16 cursor-pointer flex items-center justify-center w-[180px] md:w-[260px] h-[100px] md:h-[130px] group mix-blend-multiply"
            >
              <img 
                src={logo.url} 
                alt={logo.name}
                className="w-full h-full object-contain grayscale opacity-60 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
