'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 
        Safe Cinematic Page Reveal
        Instead of wrapping the page content (which breaks CSS 'fixed' positioning for the Navbar),
        we place a solid overlay on top of everything that slowly fades away.
      */}
      <motion.div
        className="fixed inset-0 z-[99999] bg-[#090909] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      {children}
    </>
  );
}
