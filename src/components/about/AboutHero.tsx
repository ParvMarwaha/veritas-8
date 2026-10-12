'use client';

import React, { useMemo, useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { InteractiveHeroBackground } from '../InteractiveHeroBackground';

export function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // "About Us" text moves upwards slightly with the scroll
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);

  // Image stretches on the top side a little initially (scaleY with bottom origin)
  const imageScaleY = useTransform(scrollYProgress, [0, 0.4], [1, 1.15]);

  // Image destretches from the bottom towards the upwards side when next fold approaches
  const imageClipBottom = useTransform(scrollYProgress, [0.4, 0.9], ["0%", "100%"]);
  const clipPath = useTransform(imageClipBottom, (val) => `inset(0% 0% ${val} 0%)`);

  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  }), []);

  const itemVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
    }
  }), []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[calc(90vh*var(--zf,1))] flex flex-col justify-center bg-white text-[#18181B] pb-16 md:pb-24 pt-32 md:pt-48 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 z-10 opacity-[23%] pointer-events-auto">
        <InteractiveHeroBackground layoutMode="hero" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-30 w-full max-w-[1400px] mx-auto flex flex-col justify-center h-full"
      >
        <motion.h1
          variants={itemVariants}
          style={{ y: textY }}
          className="text-5xl sm:text-[4.5rem] md:text-[6rem] lg:text-[8.5rem] font-sans font-medium tracking-[-0.03em] leading-[0.9] text-[#18181B] mb-12 md:mb-20 transform-gpu will-change-transform"
        >
          About Us
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start w-full">
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col space-y-6 pt-1">
            <p className="type-lead font-sans font-light tracking-tight leading-[1.5] text-[#18181B]/80">
              Built around four essential pillars, our services combine financial precision, legal clarity, governance expertise, and employee engagement to create ownership structures that scale with your business.
            </p>
            <p className="type-lead font-sans font-light tracking-tight leading-[1.5] text-[#18181B]/80">
              We empower companies with the strategic insights required to design equity programs that drive long-term value, aligning incentives and attracting top tier talent to push your vision forward.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-6 lg:col-start-7 w-full aspect-[4/3] relative overflow-hidden">
            <motion.div
              style={{ scaleY: imageScaleY, clipPath, transformOrigin: "bottom" }}
              className="absolute inset-0 w-full h-full bg-[#d9d9d9]"
            >
              <img
                src="/about_hero.png"
                alt="Veritas architectural aesthetic"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
