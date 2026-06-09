"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // 模擬網路延遲
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        // 設定登入 Cookie，有效期限 1 天
        document.cookie = "auth_token=true; path=/; max-age=86400";
        // 跳轉到原本要去的頁面，或是個人儀表板
        window.location.href = redirectUrl;
      } else {
        setError(true);
        setLoading(false);
      }
    }, 800);
  };

  return (
    <motion.form
      onSubmit={handleLogin}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 w-full max-w-md shadow-2xl relative z-10"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-serif font-bold text-[var(--color-luxury-cream)] mb-2">學員登入</h1>
        <p className="text-gray-400 font-light text-sm">繼續你的大師學習之旅</p>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center text-red-200 text-sm"
        >
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          帳號或密碼錯誤，請重新輸入。(提示: admin/admin)
        </motion.div>
      )}

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-light text-gray-300 mb-2">帳號</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-[var(--color-luxury-gold)] rounded-lg py-3 pl-12 pr-4 text-[var(--color-luxury-cream)] outline-none transition-colors"
              placeholder="請輸入 admin"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-light text-gray-300 mb-2">密碼</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-[var(--color-luxury-gold)] rounded-lg py-3 pl-12 pr-4 text-[var(--color-luxury-cream)] outline-none transition-colors"
              placeholder="請輸入 admin"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-midnight)] font-bold text-lg rounded-sm hover:bg-opacity-90 transition-all shadow-[0_0_15px_rgba(197,168,128,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "登入中..." : "登入系統"}
      </button>
    </motion.form>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[var(--color-luxury-midnight)] flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* 奢華背景裝飾 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-luxury-gold)]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
