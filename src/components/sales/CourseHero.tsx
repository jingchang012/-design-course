"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star, PlayCircle, CheckCircle } from "lucide-react";

interface CourseHeroProps {
  title: string;
  description: string;
  coverImage: string;
}

export default function CourseHero({ title, description, coverImage }: CourseHeroProps) {
  return (
    <div className="relative w-full min-h-[60vh] bg-[var(--color-luxury-midnight)] pt-24 pb-16 px-4 flex items-center border-b border-white/10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
        
        {/* 左側：課程資訊 */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center text-[var(--color-luxury-gold)] mb-4 space-x-2">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <span className="text-gray-300 text-sm ml-2 font-light">(4.9/5 超高評價)</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-luxury-cream)] leading-tight mb-6">
              {title}
            </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-8 max-w-2xl">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center text-gray-300 font-light">
                <PlayCircle className="w-5 h-5 mr-2 text-[var(--color-luxury-gold)]" />
                包含 12 核心章節
              </div>
              <div className="flex items-center text-gray-300 font-light">
                <CheckCircle className="w-5 h-5 mr-2 text-[var(--color-luxury-gold)]" />
                無限期重複觀看
              </div>
            </div>
          </motion.div>
        </div>

        {/* 右側：Sticky 價格卡片 */}
        <div className="lg:col-span-1">
          <motion.div 
            className="sticky top-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 relative group cursor-pointer">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-[var(--color-luxury-cream)] opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-300" />
              </div>
              <img src={coverImage} alt={title} className="w-full h-full object-cover" />
            </div>

            <div className="mb-6">
              <div className="text-3xl font-bold text-[var(--color-luxury-cream)] mb-2">NT$ 8,800</div>
              <div className="text-gray-400 text-sm line-through">原價 NT$ 12,000</div>
            </div>

            <button className="w-full py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-midnight)] font-bold text-lg rounded-sm hover:bg-opacity-90 transition-all shadow-[0_0_15px_rgba(197,168,128,0.3)] mb-4 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              立即加入購物車
            </button>
            <p className="text-center text-gray-500 text-xs font-light">
              支援信用卡 3/6 期零利率 | 30 天滿意保證
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
