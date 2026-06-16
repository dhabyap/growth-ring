"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold tracking-tight">GrowthRing</h1>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-700 transition-colors"
        >
          Join Waitlist
        </motion.button>
      </header>

      <main className="max-w-4xl mx-auto mt-24 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tighter"
        >
          Discover active users.<br />
          Grow together on X.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed"
        >
          Join the largest discovery network for active X users who want to grow together.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 flex gap-4 justify-center"
        >
          <button className="bg-zinc-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-700 transition-all active:scale-95">
            Create Profile
          </button>
          <button className="border border-zinc-200 px-8 py-4 rounded-full font-semibold hover:bg-zinc-50 transition-all active:scale-95">
            Browse Feed
          </button>
        </motion.div>
      </main>
    </div>
  );
}
