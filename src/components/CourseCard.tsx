"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_CONTENT } from "@/constants/content";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  delay?: number;
}

export default function CourseCard({ id, title, description, coverImage, delay = 0 }: CourseCardProps) {
  const imgUrl = coverImage.includes("{{")
    ? SITE_CONTENT.placeholders.courseCoverDefault
    : coverImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      <Link href={`/course/${id}`} className="group block relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-[var(--color-luxury-gold)] transition-colors duration-500 cursor-pointer">
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-luxury-midnight)] to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          <motion.div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${imgUrl}')` }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>

        <div className="p-6 relative z-20">
          <h3 className="text-xl font-serif font-semibold text-[var(--color-luxury-cream)] mb-2 group-hover:text-[var(--color-luxury-gold)] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-3">
            {description}
          </p>

          <div className="mt-6 flex items-center text-[var(--color-luxury-gold)] text-sm font-medium tracking-wide">
            <span className="mr-2">探索課程</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
