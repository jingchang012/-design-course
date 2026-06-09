"use client";

import { motion } from "framer-motion";
import { SITE_CONTENT } from "@/constants/content";

export default function TutorSection() {
  return (
    <section className="py-24 px-4 bg-[var(--color-luxury-midnight)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[var(--color-luxury-cream)] mb-4">
            大師陣容
          </h2>
          <div className="w-24 h-1 bg-[var(--color-luxury-gold)] mx-auto opacity-70" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16 justify-center">
          {SITE_CONTENT.tutors.map((tutor, index) => {
            const avatarUrl = tutor.avatar.includes("{{")
              ? SITE_CONTENT.placeholders.avatarDefault
              : tutor.avatar;

            return (
              <motion.div
                key={tutor.id}
                className="flex flex-col md:flex-row items-center gap-8 group"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-[var(--color-luxury-gold)]/30 group-hover:border-[var(--color-luxury-gold)] transition-colors duration-500 flex-shrink-0">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <motion.div
                    className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
                    style={{ backgroundImage: `url('${avatarUrl}')` }}
                    whileHover={{ scale: 1.05 }}
                  />
                </div>

                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-serif text-[var(--color-luxury-cream)] mb-2 group-hover:text-[var(--color-luxury-gold)] transition-colors">
                    {tutor.name}
                  </h3>
                  <p className="text-[var(--color-luxury-gold)]/80 tracking-widest text-sm uppercase mb-4">
                    {tutor.title}
                  </p>
                  <p className="text-gray-400 font-light leading-relaxed max-w-sm whitespace-pre-line">
                    {tutor.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
