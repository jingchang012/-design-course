"use client";

import { motion } from "framer-motion";
import { SITE_CONTENT } from "@/constants/content";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url('${SITE_CONTENT.hero.bgImage.includes("{{") ? SITE_CONTENT.placeholders.heroImageDefault : SITE_CONTENT.hero.bgImage}')` }}
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--color-luxury-midnight)] to-transparent" />

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-7xl font-serif font-bold text-[var(--color-luxury-cream)] mb-6 tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {SITE_CONTENT.hero.title}
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-2xl text-gray-300 mb-10 font-light tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {SITE_CONTENT.hero.subtitle}
        </motion.p>
        
        <motion.button 
          onClick={() => {
            const el = document.getElementById('courses');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-8 py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-midnight)] font-bold text-lg tracking-wider rounded-sm hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(197,168,128,0.3)] hover:shadow-[0_0_40px_rgba(197,168,128,0.5)] transform hover:-translate-y-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {SITE_CONTENT.hero.cta}
        </motion.button>
      </div>
    </section>
  );
}
