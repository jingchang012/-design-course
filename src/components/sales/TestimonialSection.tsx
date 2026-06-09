"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SITE_CONTENT } from "@/constants/content";

export default function TestimonialSection() {
  const TESTIMONIALS = SITE_CONTENT.testimonials;
  const TRUST_BADGES = SITE_CONTENT.trustBadges;

  return (
    <section className="bg-black/20 py-20 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* 信任數字 */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {TRUST_BADGES.map((badge, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl md:text-4xl font-bold font-serif text-[var(--color-luxury-gold)] mb-2">
                {badge.value}
              </div>
              <div className="text-sm text-gray-400 font-light tracking-wider uppercase">
                {badge.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* 標題 */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-serif font-bold text-[var(--color-luxury-cream)] mb-4">
            他們的蛻變，就是你的起點
          </h2>
          <div className="w-16 h-1 bg-[var(--color-luxury-gold)] mx-auto opacity-70" />
        </div>

        {/* 評價卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              className="relative bg-white/5 backdrop-blur-md border border-white/10 hover:border-[var(--color-luxury-gold)]/50 rounded-2xl p-8 transition-colors duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Quote className="w-8 h-8 text-[var(--color-luxury-gold)]/30 mb-4" />
              <p className="text-gray-300 font-light leading-relaxed mb-8 text-sm">
                "{t.content}"
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border border-[var(--color-luxury-gold)]/30"
                />
                <div>
                  <div className="text-[var(--color-luxury-cream)] font-medium">{t.name}</div>
                  <div className="text-[var(--color-luxury-gold)] text-xs font-light tracking-widest uppercase">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
