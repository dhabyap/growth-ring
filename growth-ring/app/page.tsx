"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold">GrowthRing</h1>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-zinc-800 transition-colors"
        >
          Join Waitlist
        </motion.button>
      </header>

      <main className="max-w-4xl mx-auto mt-20 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900"
        >
          Discover active users.
          <br />
          Grow together on X.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6 text-lg text-zinc-600 max-w-2xl mx-auto"
        >
          Join the largest discovery network for active X users who want to grow together.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex gap-4 justify-center flex-wrap"
        >
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
            Create Profile
          </button>
          <button className="border border-zinc-300 px-8 py-3 rounded-full font-semibold hover:bg-zinc-50 transition-colors">
            Browse Feed
          </button>
        </motion.div>
      </main>
    </div>
  );
}
