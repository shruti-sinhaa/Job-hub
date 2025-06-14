"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useNavigate } from "react-router-dom";

export function AuroraBackgroundDemo() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <AuroraBackground className="dark">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4">
        <div className="text-4xl md:text-8xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Unlock opportunities,
          <br />
          <span className="text-3xl md:text-7xl bg-gradient-to-r from-blue-400 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
            ignite your career!
          </span>
        </div>
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-light text-lg md:text-3xl text-blue-200 dark:text-blue-900 leading-relaxed tracking-wide text-center">
            Discover your next big career move with our job listing platform.
          </p>
          <p className="font-light text-base md:text-2xl text-purple-200 dark:text-purple-900 leading-relaxed tracking-wide text-center">
            Whether you&apos;re starting fresh or looking to elevate your career, we connect you to top employers and opportunities tailored to your skills.
          </p>
          <p className="font-light text-base md:text-2xl text-pink-200 dark:text-pink-900 leading-relaxed tracking-wide text-center">
            Browse, apply, and land your dream job—all in one place!
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
