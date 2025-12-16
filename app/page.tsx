"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, Sparkles, Lock, Globe, Zap, Palette } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 overflow-hidden relative">
      {/* Анимированный фон */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

        {/* Плавающие элементы */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10"
        >
          <Sparkles className="w-8 h-8 text-primary/30" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          className="absolute bottom-20 right-20"
        >
          <Palette className="w-10 h-10 text-purple-500/30" />
        </motion.div>
      </div>

      {/* Навигационная панель */}
      <header className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 blur" />
              <div className="relative bg-gradient-to-br from-primary to-purple-700 p-2 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="
  inline-block
  leading-tight
  text-2xl 
  font-bold 
  bg-gradient-to-l from-indigo-400 to-primary
  bg-clip-text 
  text-transparent
">
                MindNotes
              </h1>
              <p className="text-xs text-muted-foreground">Your digital thoughts</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <span className="hover:text-primary transition-colors">Features</span>
            <span className="hover:text-primary transition-colors">Pricing</span>
            <span className="hover:text-primary transition-colors">About</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Левая колонка - Приветствие */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Zap className="w-4 h-4 uppercase" />

                DESIGN BY ABDU
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className=" inline-block
  leading-tight
  font-bold 
  bg-gradient-to-l from-indigo-400 to-primary
  bg-clip-text 
  text-transparent">
                  Capture Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Digital Thoughts
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Secure, beautiful, and intuitive note-taking app. Your ideas deserve
                a better home than scattered pieces of paper.
              </p>
            </div>

            {/* Особенности */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
                <Lock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">Secure</p>
                  <p className="text-xs text-muted-foreground">Private & encrypted</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-500/5 to-transparent border border-purple-500/10">
                <Globe className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="font-semibold">Accessible</p>
                  <p className="text-xs text-muted-foreground">Anywhere, anytime</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/10">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-semibold">AI-Powered</p>
                  <p className="text-xs text-muted-foreground">Smart organization</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-500/5 to-transparent border border-green-500/10">
                <Palette className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-semibold">Beautiful</p>
                  <p className="text-xs text-muted-foreground">Modern design</p>
                </div>
              </div>
            </div>

            {/* Кнопка входа */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-4"
            >
              <Button
                asChild
                className="relative overflow-hidden group px-8 py-6 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white shadow-2xl shadow-primary/30 hover:shadow-3xl transition-all duration-300"
              >
                <Link href="/auth" className="flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  <span>Continue with Google</span>
                </Link>
              </Button>
            </motion.div>

            <p className="text-sm text-muted-foreground pt-2">
              No password needed • Your data stays private
            </p>
          </motion.div>

          {/* Правая колонка - Предпросмотр */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Макет приложения */}
            <div className="relative bg-gradient-to-br from-background to-primary/5 rounded-2xl border border-primary/10 p-6 shadow-2xl overflow-hidden">
              {/* Декоративные элементы */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-xl" />

              {/* Заголовок предпросмотра */}
              <div className="relative z-10 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <h3 className="text-lg font-semibold">Preview Editor</h3>
              </div>

              {/* Имитация редактора */}
              <div className="relative z-10 space-y-4">
                <div className="h-4 w-24 bg-primary/20 rounded-full" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-primary/10 rounded-full" />
                  <div className="h-3 w-3/4 bg-primary/10 rounded-full" />
                  <div className="h-3 w-5/6 bg-primary/10 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-2 pt-4">
                  <div className="h-20 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10" />
                  <div className="h-20 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/10" />
                  <div className="h-20 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/10" />
                </div>
              </div>

              {/* Плавающая кнопка */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-4 right-4 bg-gradient-to-r from-primary to-purple-600 text-white p-3 rounded-xl shadow-lg"
              >
                <Brain className="w-5 h-5" />
              </motion.div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 rounded-xl bg-linear-to-b from-background to-primary/5 border border-primary/10">
                <div className="text-2xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-linear-to-b from-background to-purple-500/5 border border-purple-500/10">
                <div className="text-2xl font-bold bg-linear-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">50K+</div>
                <div className="text-sm text-muted-foreground">Notes Created</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-linear-to-b from-background to-blue-500/5 border border-blue-500/10">
                <div className="text-2xl font-bold bg-linear-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}