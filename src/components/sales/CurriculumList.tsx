"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, PlayCircle, Lock } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const CURRICULUM_DATA = [
  {
    id: "chap-1",
    title: "第一章：大師之路的起點",
    duration: "45 分鐘",
    lessons: [
      { title: "1-1 為什麼我們需要這堂課？", duration: "12:30", isFree: true },
      { title: "1-2 核心觀念重塑", duration: "18:15", isFree: false },
      { title: "1-3 實戰前的準備作業", duration: "14:15", isFree: false },
    ]
  },
  {
    id: "chap-2",
    title: "第二章：解構與重建",
    duration: "1 小時 20 分鐘",
    lessons: [
      { title: "2-1 拆解現有框架", duration: "25:00", isFree: true },
      { title: "2-2 找到你的獨特定位", duration: "30:20", isFree: false },
      { title: "2-3 案例分析：大師的思維模式", duration: "24:40", isFree: false },
    ]
  },
  {
    id: "chap-3",
    title: "第三章：完美落地",
    duration: "55 分鐘",
    lessons: [
      { title: "3-1 將美學融入細節", duration: "20:00", isFree: true },
      { title: "3-2 跨越瓶頸的關鍵", duration: "35:00", isFree: false },
    ]
  }
];

export default function CurriculumList() {
  const params = useParams();
  const courseId = params?.id || "course-1";
  const [openChapter, setOpenChapter] = useState<string | null>("chap-1");

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-[var(--color-luxury-cream)] mb-4">
          課程大綱
        </h2>
        <div className="w-16 h-1 bg-[var(--color-luxury-gold)] mx-auto opacity-70" />
      </div>

      <div className="space-y-4">
        {CURRICULUM_DATA.map((chapter) => (
          <div 
            key={chapter.id} 
            className="border border-white/10 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm"
          >
            <button
              onClick={() => setOpenChapter(openChapter === chapter.id ? null : chapter.id)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none"
            >
              <div>
                <h3 className="text-lg font-medium text-[var(--color-luxury-cream)]">
                  {chapter.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{chapter.lessons.length} 堂課 • 共 {chapter.duration}</p>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-[var(--color-luxury-gold)] transition-transform duration-300 ${openChapter === chapter.id ? "rotate-180" : ""}`} 
              />
            </button>

            <AnimatePresence>
              {openChapter === chapter.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden border-t border-white/10"
                >
                  <div className="px-6 py-4 space-y-3 bg-black/20">
                    {chapter.lessons.map((lesson, idx) => (
                      <div key={idx} className="flex items-center justify-between group">
                        {lesson.isFree ? (
                          <Link href={`/player/${courseId}`} className="flex items-center space-x-3 text-gray-300 hover:text-[var(--color-luxury-gold)] transition-colors cursor-pointer w-full">
                            <PlayCircle className="w-4 h-4 text-[var(--color-luxury-gold)]" />
                            <span className="text-sm md:text-base">{lesson.title}</span>
                            <span className="text-xs px-2 py-0.5 bg-[var(--color-luxury-gold)]/20 text-[var(--color-luxury-gold)] rounded-sm border border-[var(--color-luxury-gold)]/30">
                              免費試看
                            </span>
                          </Link>
                        ) : (
                          <div className="flex items-center space-x-3 text-gray-300 transition-colors cursor-not-allowed">
                            <Lock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm md:text-base">{lesson.title}</span>
                          </div>
                        )}
                        <span className="text-sm text-gray-500">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
