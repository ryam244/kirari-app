"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mobile-container flex flex-col items-center justify-center min-h-screen px-5 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-8xl"
        >
          🌸
        </motion.div>

        <div>
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-2">
            404
          </h1>
          <p className="text-xl font-bold text-gray-700 mb-2">
            ページが見つかりません
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">
            お探しのページは存在しないか、
            <br />
            移動した可能性があります😊
          </p>
        </div>

        <Link href="/">
          <button className="btn-primary text-base px-8 py-3">
            🏠 ホームに戻る
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
