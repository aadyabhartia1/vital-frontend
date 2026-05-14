"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { Flame, Trophy, Zap, Target } from "lucide-react";

export default function HabitsPage() {
  const { dashboardData, toggleHabit } = useAppStore();
  const { habits } = dashboardData;

  const completed = habits.filter((h) => h.completed).length;
  const totalXP = habits.filter((h) => h.completed).reduce((a, b) => a + b.xpReward, 0);
  const longestStreak = Math.max(...habits.map((h) => h.streak));

  const categoryColors: Record<string, string> = {
    fitness: "#ef4444", mindfulness: "#8b5cf6", nutrition: "#22c55e", learning: "#3b82f6", wellness: "#06b6d4",
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-[24px] font-bold mb-1">Smart Habit Tracker</h2>
        <p className="text-[14px] text-[#666]">Build streaks, earn XP, unlock achievements</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Completed", value: `${completed}/${habits.length}`, icon: Target, color: "#f97316" },
          { label: "XP Earned", value: `+${totalXP}`, icon: Zap, color: "#d4a017" },
          { label: "Best Streak", value: `${longestStreak}d`, icon: Flame, color: "#ef4444" },
          { label: "Completion", value: `${Math.round((completed / habits.length) * 100)}%`, icon: Trophy, color: "#22c55e" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <s.icon size={16} style={{ color: s.color }} className="mb-2" />
            <div className="text-[22px] font-bold text-white">{s.value}</div>
            <div className="text-[11px] text-[#555]">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Habit List */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 className="text-[14px] font-semibold mb-4">Today&apos;s Habits</h3>
        <div className="space-y-2">
          {habits.map((habit, i) => {
            const catColor = categoryColors[habit.category] || "#666";
            return (
              <motion.button key={habit.id}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.05 }}
                onClick={() => toggleHabit(habit.id)}
                className="w-full flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-[rgba(255,255,255,0.03)] group"
                style={{
                  background: habit.completed ? "rgba(249,115,22,0.03)" : "transparent",
                  border: `1px solid ${habit.completed ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.04)"}`,
                }}>
                <span className="text-[24px]">{habit.icon}</span>
                <div className="flex-1 text-left">
                  <div className={`text-[14px] font-medium ${habit.completed ? "text-[#f97316]" : "text-white"}`}>{habit.title}</div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${catColor}15`, color: catColor }}>{habit.category}</span>
                    <span className="text-[11px] text-[#555]">🔥 {habit.streak} days</span>
                    <span className="text-[11px] text-[#d4a017]">+{habit.xpReward} XP</span>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[12px] transition-all ${habit.completed ? "bg-[#f97316] text-white shadow-lg shadow-orange-500/20" : "border border-[rgba(255,255,255,0.15)] group-hover:border-[#f97316]/50"}`}>
                  {habit.completed && "✓"}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Daily Challenge */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.05), rgba(212,160,23,0.03))", border: "1px solid rgba(249,115,22,0.12)" }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f97316] to-[#d4a017] flex items-center justify-center animate-pulse-glow">
            <Zap size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[12px] text-[#d4a017] font-semibold uppercase tracking-wider mb-0.5">Daily Challenge</div>
            <div className="text-[15px] font-semibold text-white">Complete all 6 habits today for a 2x XP bonus!</div>
            <div className="text-[12px] text-[#777] mt-0.5">Progress: {completed}/6 · Reward: +300 XP</div>
          </div>
          <div className="text-[24px] font-bold text-[#d4a017]">{Math.round((completed / 6) * 100)}%</div>
        </div>
      </motion.div>
    </div>
  );
}
