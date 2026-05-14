"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  Heart,
  Moon,
  Droplets,
  Flame,
  Shield,
  Trophy,
  Sparkles,
  ArrowRight,
  Zap,
  BarChart3,
  ChevronRight,
  Star,
} from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Activity, title: "AI Health Dashboard", desc: "Real-time health metrics with AI-powered wellness scoring and smart analytics.", color: "#f97316" },
  { icon: Brain, title: "Smart Mood Tracker", desc: "AI-analyzed emotional trends with beautiful heatmap visualization.", color: "#8b5cf6" },
  { icon: Moon, title: "Sleep Analytics", desc: "Deep sleep quality insights with personalized burnout risk assessment.", color: "#3b82f6" },
  { icon: Droplets, title: "Water Tracker", desc: "Animated hydration tracking with intelligent reminder system.", color: "#06b6d4" },
  { icon: Flame, title: "Habit Streaks", desc: "Gamified habits with XP points, achievement badges, and challenges.", color: "#ef4444" },
  { icon: Shield, title: "Burnout Prediction", desc: "AI predicts burnout risk from your patterns before it happens.", color: "#d4a017" },
];

const stats = [
  { value: "99.2%", label: "Prediction Accuracy" },
  { value: "50K+", label: "Health Insights Generated" },
  { value: "24/7", label: "AI Health Monitoring" },
  { value: "10+", label: "Tracked Health Metrics" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(5,5,5,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-[17px] font-bold tracking-tight">Vitalis AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Analytics", "Pricing"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[13px] text-[#888] hover:text-white transition-colors duration-200">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="text-[13px] text-[#888] hover:text-white transition-colors px-4 py-2">Sign In</Link>
            <Link href="/sign-up" className="text-[13px] font-medium bg-white text-black px-5 py-2 rounded-full hover:bg-[#e5e5e5] transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#f97316] rounded-full opacity-[0.03] blur-[150px]" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#d4a017] rounded-full opacity-[0.02] blur-[120px]" />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }} />
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center pt-24 pb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
          >
            <Sparkles size={13} className="text-[#f97316]" />
            <span className="text-[12px] font-medium text-[#fb923c] tracking-wide">AI-POWERED WELLNESS ECOSYSTEM</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[52px] md:text-[72px] lg:text-[84px] font-bold leading-[1] tracking-[-0.03em] mb-6"
          >
            <span className="bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#d4a017] bg-clip-text text-transparent">Your Health,</span>
            <br />
            <span className="text-white">Reimagined by AI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[17px] md:text-[19px] text-[#777] max-w-[560px] mx-auto mb-10 leading-[1.6]"
          >
            Track. Analyze. Predict. Vitalis AI combines physical health tracking, 
            mental wellness analysis, and predictive AI to keep you at your peak.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20"
          >
            <Link href="/sign-up" className="group flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-semibold text-[15px] px-7 py-3.5 rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5">
              Start Free Today
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <button className="flex items-center gap-2 text-[#999] font-medium text-[15px] px-7 py-3.5 rounded-full border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:text-white transition-all duration-300">
              <BarChart3 size={16} />
              View Demo
            </button>
          </motion.div>

          {/* AI Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mx-auto w-[280px] h-[280px] md:w-[340px] md:h-[340px]"
          >
            {/* Glow layers */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f97316] to-[#d4a017] opacity-[0.15] blur-[80px] animate-orb" />
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#f97316] to-[#d4a017] opacity-[0.08] blur-[40px] animate-orb" style={{ animationDelay: "1s" }} />
            
            {/* Rings */}
            <div className="absolute inset-4 rounded-full border border-[rgba(249,115,22,0.15)] animate-spin-slow" />
            <div className="absolute inset-10 rounded-full border border-[rgba(212,160,23,0.1)] animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "25s" }} />
            <div className="absolute inset-16 rounded-full border border-dashed border-[rgba(249,115,22,0.08)] animate-spin-slow" style={{ animationDuration: "30s" }} />
            
            {/* Center orb */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center shadow-2xl shadow-orange-500/30 animate-pulse-glow">
                <Heart size={32} className="text-white" />
              </div>
            </div>

            {/* Floating metric cards */}
            {[
              { icon: Moon, label: "Sleep", value: "8.2h", top: "0%", left: "-10%", delay: 0 },
              { icon: Droplets, label: "Water", value: "2.4L", top: "0%", right: "-10%", delay: 0.5 },
              { icon: Activity, label: "Active", value: "92%", bottom: "5%", left: "-5%", delay: 1 },
              { icon: Brain, label: "Mood", value: "Great", bottom: "5%", right: "-5%", delay: 1.5 },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.12, type: "spring", stiffness: 200 }}
                className="absolute flex items-center gap-2 px-3 py-2 rounded-xl animate-float"
                style={{
                  top: item.top, left: item.left, right: item.right, bottom: item.bottom,
                  background: "rgba(10,10,10,0.9)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  animationDelay: `${item.delay}s`,
                }}
              >
                <item.icon size={14} className="text-[#f97316]" />
                <div>
                  <div className="text-[9px] text-[#666] uppercase tracking-wider">{item.label}</div>
                  <div className="text-[12px] font-semibold text-white">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="analytics" className="relative py-32" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="text-[32px] md:text-[40px] font-bold bg-gradient-to-r from-[#f97316] to-[#d4a017] bg-clip-text text-transparent mb-1">{stat.value}</div>
                <div className="text-[13px] text-[#666]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#f97316] rounded-full opacity-[0.02] blur-[150px]" />
        <div className="relative max-w-[1100px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <span className="text-[12px] font-semibold tracking-[0.2em] text-[#f97316] uppercase mb-4 block">Features</span>
            <h2 className="text-[36px] md:text-[48px] font-bold tracking-[-0.02em] mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-[#f97316] to-[#d4a017] bg-clip-text text-transparent">Thrive</span>
            </h2>
            <p className="text-[16px] text-[#666] max-w-[480px] mx-auto leading-relaxed">
              Powered by advanced AI, Vitalis tracks every dimension of your wellness journey.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={0}
                className="group relative p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${feature.color}30`;
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${feature.color}12`, border: `1px solid ${feature.color}25` }}
                >
                  <feature.icon size={22} style={{ color: feature.color }} />
                </div>
                <h3 className="text-[18px] font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-[14px] text-[#777] leading-[1.6]">{feature.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-[13px] font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: feature.color }}>
                  Learn more <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-[#d4a017] fill-[#d4a017]" />
              ))}
            </div>
            <p className="text-[22px] md:text-[28px] text-[#ccc] leading-[1.5] font-light italic mb-8">
              &ldquo;Vitalis AI completely transformed how I understand my health. The burnout prediction saved me from a crash I didn&apos;t see coming.&rdquo;
            </p>
            <div className="text-[15px] font-medium text-white">Alex Chen</div>
            <div className="text-[13px] text-[#666] mt-1">Software Engineer at Google</div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="relative py-32" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#f97316] rounded-full opacity-[0.04] blur-[120px]" />
        <div className="relative max-w-[600px] mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20 animate-pulse-glow">
              <Trophy size={24} className="text-white" />
            </div>
            <h2 className="text-[36px] md:text-[48px] font-bold tracking-[-0.02em] mb-4">
              Ready to Transform
              <br />
              <span className="bg-gradient-to-r from-[#f97316] to-[#d4a017] bg-clip-text text-transparent">Your Wellness?</span>
            </h2>
            <p className="text-[16px] text-[#666] mb-8 max-w-[420px] mx-auto leading-relaxed">
              Join thousands using Vitalis AI to reach their healthiest potential. Free to start, powerful to scale.
            </p>
            <Link href="/sign-up" className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-semibold text-[16px] px-8 py-4 rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5">
              Get Started — It&apos;s Free
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center">
              <Zap size={12} className="text-white" />
            </div>
            <span className="text-[13px] font-semibold">Vitalis AI</span>
          </div>
          <p className="text-[12px] text-[#444]">© 2026 Vitalis AI. Designed for the future of wellness.</p>
        </div>
      </footer>
    </div>
  );
}
