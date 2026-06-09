"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BookOpen, User } from "lucide-react";
import { SITE_CONTENT } from "@/constants/content";
import HeroSection from "@/components/HeroSection";
import CourseCard from "@/components/CourseCard";
import TutorSection from "@/components/TutorSection";
import Link from "next/link";

export default function HomeContent() {
  const [query, setQuery] = useState("");

  // 根據搜尋詞過濾課程與講師
  const filteredCourses = useMemo(() => {
    if (!query.trim()) return SITE_CONTENT.courses;
    const q = query.toLowerCase();
    return SITE_CONTENT.courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredTutors = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SITE_CONTENT.tutors.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [query]);

  const hasQuery = query.trim().length > 0;
  const hasResults = filteredCourses.length > 0 || filteredTutors.length > 0;

  return (
    <main className="min-h-screen bg-[var(--color-luxury-midnight)] text-[var(--color-luxury-cream)] selection:bg-[var(--color-luxury-gold)] selection:text-[var(--color-luxury-midnight)]">
      {/* 1. 首圖與主視覺 */}
      <HeroSection />

      {/* 2. 搜尋欄 */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 搜尋框 */}
            <div className="relative flex items-center">
              <Search className="absolute left-5 w-5 h-5 text-[var(--color-luxury-gold)] z-10 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜尋課程名稱、老師姓名或課程內容..."
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 focus:border-[var(--color-luxury-gold)] rounded-full py-4 pl-14 pr-14 text-[var(--color-luxury-cream)] placeholder:text-gray-500 outline-none transition-all duration-300 text-base shadow-[0_0_30px_rgba(197,168,128,0.05)] focus:shadow-[0_0_30px_rgba(197,168,128,0.15)]"
              />
              {/* 清除按鈕 */}
              <AnimatePresence>
                {hasQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setQuery("")}
                    className="absolute right-5 text-gray-500 hover:text-[var(--color-luxury-gold)] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* 搜尋結果下拉面板（有搜尋詞時顯示） */}
            <AnimatePresence>
              {hasQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#0e1726]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl"
                >
                  {!hasResults ? (
                    <div className="py-10 text-center text-gray-500">
                      <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
                      <p>找不到「{query}」的相關結果</p>
                    </div>
                  ) : (
                    <div className="py-2 max-h-96 overflow-y-auto">
                      {/* 講師結果 */}
                      {filteredTutors.length > 0 && (
                        <div>
                          <div className="px-5 py-2 flex items-center gap-2 text-xs text-[var(--color-luxury-gold)]/70 tracking-widest uppercase">
                            <User className="w-3 h-3" />
                            大師陣容
                          </div>
                          {filteredTutors.map((tutor) => (
                            <div
                              key={tutor.id}
                              className="flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-colors cursor-default"
                            >
                              <div
                                className="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0 border border-[var(--color-luxury-gold)]/20"
                                style={{ backgroundImage: `url('${tutor.avatar}')` }}
                              />
                              <div>
                                <p className="text-[var(--color-luxury-cream)] font-medium">{tutor.name}</p>
                                <p className="text-[var(--color-luxury-gold)]/60 text-xs tracking-wider">{tutor.title}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 分隔線 */}
                      {filteredTutors.length > 0 && filteredCourses.length > 0 && (
                        <div className="mx-5 my-1 border-t border-white/5" />
                      )}

                      {/* 課程結果 */}
                      {filteredCourses.length > 0 && (
                        <div>
                          <div className="px-5 py-2 flex items-center gap-2 text-xs text-[var(--color-luxury-gold)]/70 tracking-widest uppercase">
                            <BookOpen className="w-3 h-3" />
                            精選課程
                          </div>
                          {filteredCourses.map((course) => (
                            <Link
                              key={course.id}
                              href={`/course/${course.id}`}
                              onClick={() => setQuery("")}
                              className="flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-colors group"
                            >
                              <div
                                className="w-10 h-10 rounded-lg bg-cover bg-center flex-shrink-0 border border-white/10"
                                style={{ backgroundImage: `url('${course.coverImage}')` }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-[var(--color-luxury-cream)] font-medium group-hover:text-[var(--color-luxury-gold)] transition-colors truncate">
                                  {course.title}
                                </p>
                                <p className="text-gray-500 text-xs truncate">{course.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 搜尋提示標籤 */}
          <motion.div
            className="flex flex-wrap gap-2 mt-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {["攝影", "室內設計", "品牌", "陳幼容", "Bruno"].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1 text-xs text-gray-400 border border-white/10 rounded-full hover:border-[var(--color-luxury-gold)]/50 hover:text-[var(--color-luxury-gold)] transition-all duration-200"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. 課程列表 */}
      <section id="courses" className="py-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[var(--color-luxury-cream)] mb-4">
              {hasQuery ? `「${query}」的搜尋結果` : "精選課程"}
            </h2>
            <div className="w-24 h-1 bg-[var(--color-luxury-gold)] mx-auto opacity-70" />
            {!hasQuery && (
              <p className="text-gray-400 mt-6 max-w-2xl mx-auto font-light">
                每一堂課，都是大師畢生心血的結晶。解鎖高質感的學習旅程。
              </p>
            )}
          </div>

          <AnimatePresence mode="wait">
            {filteredCourses.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredCourses.map((course, index) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    coverImage={course.coverImage}
                    delay={index * 0.1}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-500 text-lg">沒有符合「{query}」的課程</p>
                <button
                  onClick={() => setQuery("")}
                  className="mt-4 text-[var(--color-luxury-gold)] hover:underline text-sm"
                >
                  清除搜尋，顯示全部課程
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. 講師介紹（搜尋狀態下隱藏整塊，已在下拉顯示） */}
      {!hasQuery && <TutorSection />}

      {/* 頁尾 */}
      <footer className="py-8 text-center border-t border-white/5">
        <p className="text-gray-500 text-sm font-light">
          © {new Date().getFullYear()} 刻度設計/Scale Studio. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
