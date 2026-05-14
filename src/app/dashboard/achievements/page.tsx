"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Zap, Lock, CheckCircle } from "lucide-react";

const achievements = [
  { id: "1", title: "First Steps", desc: "Log your first health entry", icon: "🚀", xp: 50, unlocked: true },
  { id: "2", title: "Hydration Hero", desc: "Hit water goal 7 days in a row", icon: "💧", xp: 200, unlocked: true },
  { id: "3", title: "Early Bird", desc: "Wake up before 7 AM for 5 days", icon: "🌅", xp: 150, unlocked: true },
  { id: "4", title: "Zen Master", desc: "Meditate for 30 days straight", icon: "🧘", xp: 500, unlocked: false },
  { id: "5", title: "Iron Will", desc: "Complete all habits for 14 days", icon: "💪", xp: 400, unlocked: false },
  { id: "6", title: "Night Owl", desc: "Maintain 8+ hours sleep for a week", icon: "🦉", xp: 250, unlocked: true },
  { id: "7", title: "Century Club", desc: "Reach 1000 XP total", icon: "🏆", xp: 100, unlocked: true },
  { id: "8", title: "AI Whisperer", desc: "Chat with AI assistant 50 times", icon: "🤖", xp: 300, unlocked: false },
  { id: "9", title: "Perfect Week", desc: "Score 90+ wellness for 7 days", icon: "⭐", xp: 600, unlocked: false },
  { id: "10", title: "Health Legend", desc: "Reach Level 10", icon: "👑", xp: 1000, unlocked: false },
];

const leaderboard = [
  { rank: 1, name: "Atharva U.", xp: 2450, level: 7 },
  { rank: 2, name: "Sarah K.", xp: 2210, level: 6 },
  { rank: 3, name: "Mike T.", xp: 1980, level: 6 },
  { rank: 4, name: "Emily R.", xp: 1750, level: 5 },
  { rank: 5, name: "James L.", xp: 1620, level: 5 },
];

const missions = [
  { title: "Drink 3L water", progress: 80, xp: 50 },
  { title: "Complete morning meditation", progress: 100, xp: 30 },
  { title: "Log all meals", progress: 33, xp: 40 },
  { title: "Walk 8,000 steps", progress: 62, xp: 60 },
];

export default function AchievementsPage() {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-[24px] font-bold mb-1">Achievements & Gamification</h2>
        <p className="text-[14px] text-[#666]">Level up your wellness journey</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Leaderboard */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-4 p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={16} className="text-[#d4a017]" />
            <h3 className="text-[14px] font-semibold">Leaderboard</h3>
          </div>
          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <div key={entry.rank} className={`flex items-center gap-3 p-3 rounded-xl ${entry.rank === 1 ? "bg-[rgba(212,160,23,0.06)]" : ""}`}
                style={entry.rank === 1 ? { border: "1px solid rgba(212,160,23,0.15)" } : {}}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold ${
                  entry.rank === 1 ? "bg-[#d4a017] text-black" : entry.rank === 2 ? "bg-[#9CA3AF] text-black" : entry.rank === 3 ? "bg-[#CD7F32] text-black" : "bg-[rgba(255,255,255,0.05)] text-[#888]"
                }`}>{entry.rank}</span>
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-white">{entry.name}</div>
                  <div className="text-[10px] text-[#666]">Lv.{entry.level}</div>
                </div>
                <div className="text-[13px] font-semibold text-[#d4a017]">{entry.xp.toLocaleString()} XP</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Daily Missions */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-8 p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={16} className="text-[#f97316]" />
            <h3 className="text-[14px] font-semibold">Daily Missions</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {missions.map((m) => (
              <div key={m.title} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-medium text-white">{m.title}</span>
                  <span className="text-[11px] text-[#d4a017] font-medium">+{m.xp} XP</span>
                </div>
                <div className="h-2 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${m.progress}%` }} transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full" style={{ background: m.progress === 100 ? "#22c55e" : "#f97316" }} />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-[#666]">{m.progress}%</span>
                  {m.progress === 100 && <CheckCircle size={12} className="text-[#22c55e]" />}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Achievements Grid */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-[#d4a017]" />
            <h3 className="text-[14px] font-semibold">Badges ({unlockedCount}/{achievements.length})</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {achievements.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + i * 0.04 }}
              className={`p-4 rounded-2xl text-center transition-all ${a.unlocked ? "hover:-translate-y-1 cursor-pointer" : "opacity-40"}`}
              style={{
                background: a.unlocked ? "rgba(212,160,23,0.04)" : "rgba(255,255,255,0.01)",
                border: `1px solid ${a.unlocked ? "rgba(212,160,23,0.15)" : "rgba(255,255,255,0.04)"}`,
              }}>
              <div className="text-[28px] mb-2">{a.unlocked ? a.icon : "🔒"}</div>
              <div className="text-[12px] font-semibold text-white mb-0.5">{a.title}</div>
              <div className="text-[10px] text-[#666] mb-2">{a.desc}</div>
              <div className="text-[10px] text-[#d4a017] font-medium">+{a.xp} XP</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
