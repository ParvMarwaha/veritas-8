'use client';

import React from 'react';
import { motion } from 'framer-motion';

const topics = [
  "All Topics",
  "Compliance",
  "Strategy",
  "ESOP",
  "Global Markets",
  "Taxation",
  "Governance"
];

export function BrowseByTopic({ 
  activeTopic, 
  onTopicChange 
}: { 
  activeTopic: string, 
  onTopicChange: (topic: string) => void 
}) {
  return (
    <section className="w-full bg-white text-[#18181B] pt-24 pb-4 md:pt-32 md:pb-8 px-6 md:px-16 font-sans relative z-30">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col items-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2rem] md:text-[2.5rem] font-semibold tracking-tighter leading-tight mb-12 text-center"
        >
          Browse by Topic
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-nowrap overflow-x-auto justify-start md:justify-center gap-4 md:gap-6 w-full max-w-[1000px] pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            .flex::-webkit-scrollbar { display: none; }
          `}} />
          {topics.map((topic, idx) => (
            <button 
              key={topic}
              onClick={() => onTopicChange(topic)}
              className={`px-6 py-3 rounded-full text-[13px] font-medium tracking-wide transition-all duration-300 whitespace-nowrap snap-center shrink-0 ${
                activeTopic === topic 
                  ? "bg-[#18181B] text-white" 
                  : "bg-transparent text-[#18181B]/70 hover:text-[#18181B] hover:bg-black/5 border border-black/10 hover:border-black/30"
              }`}
            >
              {topic}
            </button>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
