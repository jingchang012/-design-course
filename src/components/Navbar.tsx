"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, LogOut, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // 檢查是否有 auth_token cookie
    const checkLogin = () => {
      const hasToken = document.cookie.includes("auth_token=true");
      setIsLoggedIn(hasToken);
    };
    
    checkLogin();
  }, []);

  const handleLogout = () => {
    // 刪除 cookie (將過期時間設為過去)
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-luxury-midnight)]/90 backdrop-blur-xl border-b border-white/5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
        <Link href="/" className="flex items-center space-x-2 group">
          <BookOpen className="w-6 h-6 text-[var(--color-luxury-gold)] group-hover:scale-110 transition-transform" />
          <span className="text-[var(--color-luxury-cream)] font-serif font-semibold text-lg tracking-widest uppercase">
            刻度設計/ Scale Studio
          </span>
        </Link>

        {/* 電腦版選單 */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-light">
          <Link href="/" className="text-gray-400 hover:text-[var(--color-luxury-gold)] transition-colors tracking-wider">
            首頁
          </Link>
          <Link href="/dashboard" className="text-gray-400 hover:text-[var(--color-luxury-gold)] transition-colors tracking-wider">
            我的課程
          </Link>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-300">
                <div className="w-7 h-7 rounded-full bg-[var(--color-luxury-gold)]/20 border border-[var(--color-luxury-gold)]/50 flex items-center justify-center mr-2">
                  <User className="w-4 h-4 text-[var(--color-luxury-gold)]" />
                </div>
                <span>Admin</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-400 hover:text-red-400 transition-colors"
                title="登出"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 border border-[var(--color-luxury-gold)]/50 text-[var(--color-luxury-gold)] hover:bg-[var(--color-luxury-gold)] hover:text-[var(--color-luxury-midnight)] transition-all duration-300 rounded-sm tracking-wider"
            >
              登入
            </Link>
          )}
        </div>

        {/* 手機版選單切換按鈕 */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[var(--color-luxury-cream)] p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 手機版下拉選單 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--color-luxury-midnight)] border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 space-y-6">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="text-gray-300 hover:text-[var(--color-luxury-gold)] transition-colors tracking-wider text-lg"
              >
                首頁
              </Link>
              <Link
                href="/dashboard"
                onClick={closeMobileMenu}
                className="text-gray-300 hover:text-[var(--color-luxury-gold)] transition-colors tracking-wider text-lg"
              >
                我的課程
              </Link>

              {isLoggedIn ? (
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center text-[var(--color-luxury-gold)]">
                    <User className="w-5 h-5 mr-2" />
                    <span className="tracking-wider">Admin (已登入)</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-red-400 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    登出
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="w-full text-center py-3 border border-[var(--color-luxury-gold)]/50 text-[var(--color-luxury-gold)] hover:bg-[var(--color-luxury-gold)] hover:text-[var(--color-luxury-midnight)] transition-all duration-300 rounded-sm tracking-wider"
                >
                  登入
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
