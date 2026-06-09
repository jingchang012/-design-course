"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, PlayCircle, CheckCircle, MessageCircle, Send, BookOpen, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import { SITE_CONTENT } from "@/constants/content";
import Link from "next/link";

// 模擬章節資料
const PLAYLIST = [
  { id: "l1", title: "1-1 為什麼我們需要這堂課？", duration: "12:30", completed: true, isFree: true },
  { id: "l2", title: "1-2 核心觀念重塑", duration: "18:15", completed: true, isFree: false },
  { id: "l3", title: "1-3 實戰前的準備作業", duration: "14:15", completed: false, isFree: false },
  { id: "l4", title: "2-1 拆解現有框架", duration: "25:00", completed: false, isFree: false },
  { id: "l5", title: "2-2 找到你的獨特定位", duration: "30:20", completed: false, isFree: false },
  { id: "l6", title: "2-3 案例分析：大師的思維模式", duration: "24:40", completed: false, isFree: false },
];

const COMMENTS = [
  { id: 1, user: "Emma Chen", avatar: "E", time: "2 小時前", content: "這一段講得太清楚了！我一直沒辦法理解的概念突然全通了，謝謝老師！", likes: 12 },
  { id: 2, user: "Max Lin", avatar: "M", time: "5 小時前", content: "請問老師在 18:30 提到的那本書叫什麼？找不到筆記了。", likes: 5 },
  { id: 3, user: "Chloe Wu", avatar: "C", time: "昨天", content: "已經是第三遍看這堂課了，每次都有新的收穫。太值得了！", likes: 28 },
];

interface PlayerPageProps {
  params: Promise<{ id: string }>;
}

export default function PlayerPageWrapper({ params }: PlayerPageProps) {
  // Unwrap params synchronously with use() or just access via hook
  return <PlayerPageInner params={params} />;
}

import { use } from "react";

function PlayerPageInner({ params }: PlayerPageProps) {
  const { id } = use(params);
  const course = SITE_CONTENT.courses.find((c) => c.id === id);
  if (!course) notFound();

  const coverImage = course.coverImage.includes("{{")
    ? SITE_CONTENT.placeholders.courseCoverDefault
    : course.coverImage;

  const [activeLesson, setActiveLesson] = useState(PLAYLIST[0].id);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(COMMENTS);

  const completedCount = PLAYLIST.filter((l) => l.completed).length;
  const progress = Math.round((completedCount / PLAYLIST.length) * 100);

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    setComments([
      {
        id: Date.now(),
        user: "我",
        avatar: "我",
        time: "剛剛",
        content: newComment.trim(),
        likes: 0,
      },
      ...comments,
    ]);
    setNewComment("");
  };

  return (
    <main className="min-h-screen bg-[#080d14] text-[var(--color-luxury-cream)]">
      <Navbar />

      <div className="pt-16 flex flex-col lg:flex-row h-screen">
        {/* 左側：播放器 + 討論 */}
        <div className="flex-1 flex flex-col overflow-y-auto">

          {/* 影片播放區 */}
          <div className="relative w-full bg-black" style={{ aspectRatio: "16/9", maxHeight: "60vh" }}>
            <img src={coverImage} alt={course.title} className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                className="w-20 h-20 rounded-full bg-[var(--color-luxury-gold)]/20 border-2 border-[var(--color-luxury-gold)] flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(197,168,128,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayCircle className="w-10 h-10 text-[var(--color-luxury-gold)]" />
              </motion.button>
            </div>
            {/* 影片控制列 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-6 pb-4 pt-12">
              <div className="h-1 bg-white/20 rounded-full mb-3">
                <div className="h-full w-1/3 bg-[var(--color-luxury-gold)] rounded-full" />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>04:12 / 12:30</span>
                <div className="flex items-center gap-4">
                  <span>1x</span>
                  <span>字幕</span>
                  <span>全螢幕</span>
                </div>
              </div>
            </div>
          </div>

          {/* 課程標題 & 進度 */}
          <div className="px-6 py-5 border-b border-white/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[var(--color-luxury-gold)] uppercase tracking-widest mb-1">
                  {PLAYLIST.find((l) => l.id === activeLesson)?.title}
                </p>
                <h1 className="text-xl md:text-2xl font-serif font-bold text-[var(--color-luxury-cream)]">
                  {course.title}
                </h1>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-xs text-gray-500 mb-1">{completedCount}/{PLAYLIST.length} 堂</div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-luxury-gold)] rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-xs text-[var(--color-luxury-gold)] font-bold">{progress}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 討論區 */}
          <div className="flex-1 px-6 py-6">
            <h2 className="text-lg font-serif font-semibold text-[var(--color-luxury-cream)] mb-5 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[var(--color-luxury-gold)]" />
              互動討論區
              <span className="text-gray-500 text-sm font-light ml-1">({comments.length} 則留言)</span>
            </h2>

            {/* 留言輸入 */}
            <div className="flex gap-3 mb-8">
              <div className="w-9 h-9 rounded-full bg-[var(--color-luxury-gold)]/20 border border-[var(--color-luxury-gold)]/30 flex items-center justify-center text-[var(--color-luxury-gold)] text-sm font-bold flex-shrink-0">
                我
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
                  placeholder="分享你的學習心得或提問..."
                  className="flex-1 bg-white/5 border border-white/10 focus:border-[var(--color-luxury-gold)]/50 rounded-lg px-4 py-2.5 text-sm text-[var(--color-luxury-cream)] placeholder-gray-600 outline-none transition-colors"
                />
                <button
                  onClick={handlePostComment}
                  className="px-4 py-2.5 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-midnight)] rounded-lg hover:bg-opacity-90 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 留言列表 */}
            <div className="space-y-6">
              {comments.map((c, i) => (
                <motion.div
                  key={c.id}
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold flex-shrink-0 text-[var(--color-luxury-cream)]">
                    {c.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-[var(--color-luxury-cream)]">{c.user}</span>
                      <span className="text-xs text-gray-600">{c.time}</span>
                    </div>
                    <p className="text-gray-300 text-sm font-light leading-relaxed">{c.content}</p>
                    <button className="mt-2 text-xs text-gray-600 hover:text-[var(--color-luxury-gold)] transition-colors flex items-center gap-1">
                      ♥ {c.likes}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 右側：播放清單 */}
        <div className="w-full lg:w-80 xl:w-96 border-l border-white/10 bg-[var(--color-luxury-midnight)] flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10">
            <h2 className="font-serif text-base font-semibold text-[var(--color-luxury-cream)] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--color-luxury-gold)]" />
              課程章節
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {PLAYLIST.map((lesson, i) => (
              <button
                key={lesson.id}
                onClick={() => setActiveLesson(lesson.id)}
                className={`w-full text-left px-5 py-4 border-b border-white/5 flex items-start gap-3 transition-colors ${
                  activeLesson === lesson.id
                    ? "bg-[var(--color-luxury-gold)]/10 border-l-2 border-l-[var(--color-luxury-gold)]"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {lesson.completed ? (
                    <CheckCircle className="w-4 h-4 text-[var(--color-luxury-gold)]" />
                  ) : (
                    <div className={`w-4 h-4 rounded-full border ${activeLesson === lesson.id ? "border-[var(--color-luxury-gold)] bg-[var(--color-luxury-gold)]" : "border-white/30"}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-snug ${activeLesson === lesson.id ? "text-[var(--color-luxury-gold)]" : "text-gray-300"}`}>
                    {lesson.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{lesson.duration}</p>
                </div>
              </button>
            ))}

            {/* 完課證書 */}
            <div className="px-5 py-6 border-t border-white/10 mt-2">
              <div className="flex items-center gap-3 text-gray-500">
                <Award className="w-5 h-5 text-[var(--color-luxury-gold)]/40" />
                <div>
                  <p className="text-xs font-medium text-gray-400">完成全部章節後</p>
                  <p className="text-xs text-gray-600">可領取大師認證證書</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
