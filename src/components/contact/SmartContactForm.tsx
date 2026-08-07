'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/AnimatedButton';

export function SmartContactForm({ selectedRequirement }: { selectedRequirement: string | null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <section id="contact-form" className="w-full bg-white text-[#18181B] py-16 md:py-32 px-6 md:px-16 font-sans relative z-20">
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Form Context & Intro */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#D02717] font-bold tracking-[0.2em] text-[11px] md:text-[12px] uppercase mb-5">
              Step 02
            </h2>
            <h3 className="text-3xl md:text-[42px] lg:text-[48px] font-semibold tracking-tighter leading-[1.1] mb-6">
              Let's get into the details.
            </h3>
            
            {selectedRequirement ? (
              <div className="mt-8 p-6 bg-[#FAFAFA] border-l-[3px] border-[#D02717]">
                <p className="text-[12px] uppercase tracking-widest text-[#18181B]/50 font-bold mb-2">Selected Requirement</p>
                <p className="text-[18px] font-medium text-[#18181B]">{selectedRequirement}</p>
              </div>
            ) : (
              <p className="text-[1rem] text-[#18181B]/70 leading-relaxed max-w-[400px]">
                Please provide your details so we can direct your inquiry to the right expert on our team.
              </p>
            )}
          </motion.div>
        </div>

        {/* The Form */}
        <div className="lg:col-span-7">
          <motion.form 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col space-y-8"
          >
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center p-12 bg-[#FAFAFA] border border-black/5 text-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-[#D02717] flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-[24px] font-semibold tracking-tight mb-2">Inquiry Received</h4>
                <p className="text-[#18181B]/70 max-w-[300px]">
                  Thank you for reaching out. One of our experts will be in touch shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input type="text" id="name" required className="w-full bg-transparent border-b border-black/20 py-3 text-[16px] outline-none transition-colors focus:border-[#D02717] peer placeholder-transparent" placeholder="Name" />
                    <label htmlFor="name" className="absolute left-0 -top-4 text-[12px] text-black/50 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[16px] peer-focus:-top-4 peer-focus:text-[12px] peer-focus:text-[#D02717]">Full Name</label>
                  </div>
                  
                  <div className="relative group">
                    <input type="text" id="company" required className="w-full bg-transparent border-b border-black/20 py-3 text-[16px] outline-none transition-colors focus:border-[#D02717] peer placeholder-transparent" placeholder="Company" />
                    <label htmlFor="company" className="absolute left-0 -top-4 text-[12px] text-black/50 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[16px] peer-focus:-top-4 peer-focus:text-[12px] peer-focus:text-[#D02717]">Company Name</label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input type="email" id="email" required className="w-full bg-transparent border-b border-black/20 py-3 text-[16px] outline-none transition-colors focus:border-[#D02717] peer placeholder-transparent" placeholder="Email" />
                    <label htmlFor="email" className="absolute left-0 -top-4 text-[12px] text-black/50 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[16px] peer-focus:-top-4 peer-focus:text-[12px] peer-focus:text-[#D02717]">Business Email</label>
                  </div>
                  
                  <div className="relative group">
                    <input type="tel" id="phone" className="w-full bg-transparent border-b border-black/20 py-3 text-[16px] outline-none transition-colors focus:border-[#D02717] peer placeholder-transparent" placeholder="Phone" />
                    <label htmlFor="phone" className="absolute left-0 -top-4 text-[12px] text-black/50 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[16px] peer-focus:-top-4 peer-focus:text-[12px] peer-focus:text-[#D02717]">Phone Number</label>
                  </div>
                </div>

                <div className="relative group">
                  <select id="stage" required defaultValue="" className="w-full bg-transparent border-b border-black/20 py-3 text-[16px] text-black/80 outline-none transition-colors focus:border-[#D02717] appearance-none cursor-pointer">
                    <option value="" disabled>Select Company Stage</option>
                    <option value="early">Early Stage / Seed</option>
                    <option value="growth">Growth Stage / Series A-C</option>
                    <option value="late">Late Stage / Pre-IPO</option>
                    <option value="public">Public Company</option>
                  </select>
                  <div className="absolute right-0 top-4 pointer-events-none">
                    <svg className="w-4 h-4 text-black/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="relative group pt-4">
                  <textarea id="message" required rows={4} className="w-full bg-transparent border-b border-black/20 py-3 text-[16px] outline-none transition-colors focus:border-[#D02717] peer placeholder-transparent resize-none" placeholder="Message"></textarea>
                  <label htmlFor="message" className="absolute left-0 top-0 text-[12px] text-black/50 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[16px] peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-[#D02717]">Additional Details</label>
                </div>

                <div className="pt-6">
                  <AnimatedButton 
                    type="submit" 
                    disabled={isSubmitting}
                    variant="dark"
                    className="px-8 py-3.5 min-w-[200px] rounded-full flex justify-center w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center space-x-2">
                      <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                      {!isSubmitting && (
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </span>
                  </AnimatedButton>
                </div>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
