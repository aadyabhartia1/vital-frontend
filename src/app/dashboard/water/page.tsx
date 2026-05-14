"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { Droplets, Plus, Target, TrendingUp } from "lucide-react";

const DAILY_GOAL = 3.0;

export default function WaterPage() {
  const { dashboardData, addWater } = useAppStore();
  const intake = dashboardData.todayLog?.waterIntake || 0;
  const percentage = Math.min((intake / DAILY_GOAL) * 100, 100);

  const quickAmounts = [0.25, 0.5, 0.75, 1.0];

  const hourlyData = Array.from({ length: 12 }, (_, i) => ({
    hour: `${i + 7}:00`,
    amount: i < 6 ? 0.15 + Math.random() * 0.3 : i < 9 ? Math.random() * 0.2 : 0,
  }));

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-[24px] font-bold mb-1">Water Intake Tracker</h2>
        <p className="text-[14px] text-[#666]">Stay hydrated with smart tracking</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Water Bottle Visualization */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-5 p-6 rounded-2xl flex flex-col items-center"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Bottle */}
          <div className="relative w-32 h-64 mb-6">
            {/* Bottle body */}
            <div className="absolute bottom-0 left-0 right-0 h-56 rounded-b-3xl rounded-t-lg overflow-hidden" style={{ border: "2px solid rgba(6,182,212,0.2)", background: "rgba(6,182,212,0.03)" }}>
              {/* Water fill */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${percentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 rounded-b-3xl"
                style={{ background: "linear-gradient(180deg, rgba(6,182,212,0.4) 0%, rgba(6,182,212,0.6) 100%)" }}
              >
                {/* Waves */}
                <div className="absolute top-0 left-0 right-0 h-3 overflow-hidden">
                  <div className="w-[200%] h-full animate-shimmer" style={{
                    background: "repeating-linear-gradient(90deg, transparent, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%, transparent 100%)",
                    backgroundSize: "50% 100%",
                  }} />
                </div>
              </motion.div>
              {/* Goal markers */}
              {[25, 50, 75].map((mark) => (
                <div key={mark} className="absolute left-0 right-0 flex items-center" style={{ bottom: `${mark}%` }}>
                  <div className="flex-1 h-px bg-[rgba(255,255,255,0.05)]" />
                  <span className="text-[9px] text-[#555] px-1">{((DAILY_GOAL * mark) / 100).toFixed(1)}L</span>
                </div>
              ))}
            </div>
            {/* Cap */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-6 rounded-t-lg" style={{ background: "rgba(6,182,212,0.15)", border: "2px solid rgba(6,182,212,0.2)", borderBottom: "none" }} />
          </div>

          <div className="text-[36px] font-bold text-white mb-1">
            {intake.toFixed(1)}<span className="text-[16px] text-[#666] font-normal">/{DAILY_GOAL}L</span>
          </div>
          <div className="text-[13px] text-[#06b6d4] font-medium mb-6">{Math.round(percentage)}% of daily goal</div>

          {/* Quick add buttons */}
          <div className="flex gap-2">
            {quickAmounts.map((amt) => (
              <button key={amt} onClick={() => addWater(amt)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/10"
                style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", color: "#06b6d4" }}>
                <Plus size={14} /> {amt}L
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats & Timeline */}
        <div className="lg:col-span-7 space-y-4">
          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Today", value: `${intake.toFixed(1)}L`, icon: Droplets, color: "#06b6d4" },
              { label: "Daily Goal", value: `${DAILY_GOAL}L`, icon: Target, color: "#22c55e" },
              { label: "Avg/Week", value: "2.3L", icon: TrendingUp, color: "#8b5cf6" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }}
                className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <s.icon size={16} style={{ color: s.color }} className="mb-2" />
                <div className="text-[20px] font-bold text-white">{s.value}</div>
                <div className="text-[11px] text-[#555]">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Hourly intake */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-[14px] font-semibold mb-4">Today&apos;s Intake Timeline</h3>
            <div className="flex items-end gap-1.5 h-28">
              {hourlyData.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-lg transition-all hover:opacity-80"
                    style={{ height: `${Math.max(h.amount * 200, 4)}%`, background: h.amount > 0 ? "rgba(6,182,212,0.5)" : "rgba(255,255,255,0.03)", minHeight: 4 }} />
                  <span className="text-[8px] text-[#555] -rotate-45">{h.hour}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Reminders */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl" style={{ background: "rgba(6,182,212,0.03)", border: "1px solid rgba(6,182,212,0.1)" }}>
            <h3 className="text-[14px] font-semibold mb-2">💧 Hydration Tip</h3>
            <p className="text-[13px] text-[#777] leading-relaxed">
              You&apos;re {(DAILY_GOAL - intake).toFixed(1)}L away from your goal. Try drinking a glass of water every 45 minutes 
              for the rest of the day to hit your target.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
