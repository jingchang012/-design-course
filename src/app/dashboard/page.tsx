"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, Award, TrendingUp, PlayCircle, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { SITE_CONTENT } from "@/constants/content";

// --- 權限角色定義 ---
const PERMISSION_TABLE = [
  { page: "首頁 / 課程總覽", visitor: true, student: true, instructor: true },
  { page: "課程銷售頁", visitor: true, student: true, instructor: true },
  { page: "沉浸式播放器", visitor: false, student: true, instructor: true },
  { page: "個人儀表板", visitor: false, student: true, instructor: true },
  { page: "互動討論區", visitor: false, student: true, instructor: true },
  { page: "講師後台管理", visitor: false, student: false, instructor: true },
];

// --- 停留時間關聯圖表資料 ---
const RETENTION_DATA = [
  { page: "首頁", retention: 85, impact: "品牌印象" },
  { page: "課程銷售頁", retention: 72, impact: "購買轉換" },
  { page: "播放器（前 3 堂）", retention: 94, impact: "課程完課率" },
  { page: "播放器（後半段）", retention: 61, impact: "長期留存" },
  { page: "討論區", retention: 78, impact: "社群黏著度" },
  { page: "儀表板", retention: 88, impact: "學習動機維持" },
];

// --- 學員已購課程（模擬資料）---
const MY_COURSES = SITE_CONTENT.courses.slice(0, 3).map((c, i) => ({
  ...c,
  progress: [78, 45, 12][i],
  coverImage: c.coverImage.includes("{{") ? SITE_CONTENT.placeholders.courseCoverDefault : c.coverImage,
}));

function PermissionBadge({ allowed }: { allowed: boolean }) {
  return allowed ? (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-luxury-gold)]/20 text-[var(--color-luxury-gold)] text-xs font-bold">✓</span>
  ) : (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-gray-600 text-xs font-bold">✕</span>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[var(--color-luxury-midnight)] text-[var(--color-luxury-cream)]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-28 pb-20">

        {/* 頁面標題 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-serif font-bold text-[var(--color-luxury-cream)] mb-2">
            我的學習儀表板
          </h1>
          <p className="text-gray-400 font-light">歡迎回來。繼續你的大師之旅。</p>
          <div className="w-16 h-1 bg-[var(--color-luxury-gold)] mt-4 opacity-70" />
        </motion.div>

        {/* 學習概覽卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: <BookOpen className="w-5 h-5" />, label: "已購課程", value: "3 堂" },
            { icon: <PlayCircle className="w-5 h-5" />, label: "已完成章節", value: "18 / 36" },
            { icon: <Clock className="w-5 h-5" />, label: "學習時數", value: "12.5 hr" },
            { icon: <Award className="w-5 h-5" />, label: "完課證書", value: "1 張" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-[var(--color-luxury-gold)] mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold font-serif text-[var(--color-luxury-cream)] mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* 已購課程進度 */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-[var(--color-luxury-cream)] mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-[var(--color-luxury-gold)]" />
            繼續學習
          </h2>
          <div className="space-y-4">
            {MY_COURSES.map((course, i) => (
              <motion.div
                key={course.id}
                className="flex items-center gap-6 bg-white/5 border border-white/10 hover:border-[var(--color-luxury-gold)]/40 rounded-xl p-5 transition-colors group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-6 h-6 text-[var(--color-luxury-gold)]" />
                  </div>
                  <img src={course.coverImage} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[var(--color-luxury-cream)] font-medium truncate mb-2 group-hover:text-[var(--color-luxury-gold)] transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[var(--color-luxury-gold)] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-10 flex-shrink-0">{course.progress}%</span>
                  </div>
                </div>
                <Link
                  href={`/player/${course.id}`}
                  className="flex-shrink-0 px-4 py-2 border border-[var(--color-luxury-gold)]/40 text-[var(--color-luxury-gold)] text-sm rounded-sm hover:bg-[var(--color-luxury-gold)] hover:text-[var(--color-luxury-midnight)] transition-all duration-300"
                >
                  繼續觀看
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 停留時間關聯圖表 */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-[var(--color-luxury-cream)] mb-2">
            各頁面停留率 × 轉換貢獻
          </h2>
          <p className="text-gray-500 text-sm mb-6 font-light">顯示使用者在各核心頁面的平均停留率，以及其對整體轉換目標的影響。</p>
          <div className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-6">
            {RETENTION_DATA.map((item, i) => (
              <motion.div
                key={item.page}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="w-36 text-sm text-gray-400 flex-shrink-0 text-right pr-4">{item.page}</div>
                <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(to right, #c5a880, #faf8f5)` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.retention}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  />
                </div>
                <div className="w-12 text-right text-[var(--color-luxury-gold)] font-bold text-sm flex-shrink-0">
                  {item.retention}%
                </div>
                <div className="w-28 text-xs text-gray-500 flex-shrink-0 hidden md:block">{item.impact}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 權限對比表格 */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-[var(--color-luxury-cream)] mb-2">
            頁面權限對比
          </h2>
          <p className="text-gray-500 text-sm mb-6 font-light">依角色區分各頁面的存取權限。</p>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="text-left px-6 py-4 text-gray-400 font-light tracking-wider uppercase text-xs">功能頁面</th>
                  <th className="px-6 py-4 text-gray-400 font-light tracking-wider uppercase text-xs text-center">訪客</th>
                  <th className="px-6 py-4 text-[var(--color-luxury-gold)] font-light tracking-wider uppercase text-xs text-center">學員</th>
                  <th className="px-6 py-4 text-[var(--color-luxury-cream)] font-light tracking-wider uppercase text-xs text-center">講師</th>
                </tr>
              </thead>
              <tbody>
                {PERMISSION_TABLE.map((row, i) => (
                  <motion.tr
                    key={row.page}
                    className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "bg-transparent" : "bg-white/2"}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <td className="px-6 py-4 text-gray-300">{row.page}</td>
                    <td className="px-6 py-4 text-center"><PermissionBadge allowed={row.visitor} /></td>
                    <td className="px-6 py-4 text-center"><PermissionBadge allowed={row.student} /></td>
                    <td className="px-6 py-4 text-center"><PermissionBadge allowed={row.instructor} /></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
}
