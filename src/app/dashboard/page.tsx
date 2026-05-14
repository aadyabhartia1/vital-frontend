"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import {
  Activity, Heart, Moon, Droplets, Flame, Brain, Zap, TrendingUp,
  ArrowUpRight, ArrowDownRight, Sparkles, X, Check
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar,
} from "recharts";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const moodColors: Record<string, string> = {
  excellent: "#22c55e", good: "#f97316", neutral: "#eab308", bad: "#ef4444", terrible: "#dc2626",
};

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DashboardPage() {
  const { dashboardData, logHealthMetrics } = useAppStore();
  const { getToken } = useAuth();
  const { todayLog, weeklyLogs, wellnessScore, streakDays, xpTotal, level, insights, habits } = dashboardData;

  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);
  const [quickLogTab, setQuickLogTab] = useState<"sleep" | "water" | "score">("sleep");

  const openQuickLog = (tab: "sleep" | "water" | "score") => {
    setQuickLogTab(tab);
    setIsQuickLogOpen(true);
  };

  const chartData = weeklyLogs.map((log, i) => ({
    day: dayNames[i] || `D${i + 1}`,
    sleep: +log.sleepHours.toFixed(1),
    activity: log.activityScore,
    calories: log.calories,
    stress: log.stressLevel,
  }));

  const completedHabits = habits.filter((h) => h.completed).length;
  const wellnessRadial = [{ name: "Score", value: wellnessScore, fill: "#f97316" }];

  const statCards = [
    { label: "Heart Rate", value: `${todayLog?.heartRate || 0}`, unit: "bpm", icon: Heart, color: "#ef4444", trend: -3, trendLabel: "vs yesterday" },
    { label: "Calories", value: `${todayLog?.calories || 0}`, unit: "kcal", icon: Flame, color: "#f97316", trend: 12, trendLabel: "vs yesterday" },
    { label: "Sleep", value: `${todayLog?.sleepHours || 0}`, unit: "hours", icon: Moon, color: "#3b82f6", trend: 8, trendLabel: "quality ↑" },
    { label: "Water", value: `${todayLog?.waterIntake.toFixed(1) || 0}`, unit: "liters", icon: Droplets, color: "#06b6d4", trend: -15, trendLabel: "behind goal" },
    { label: "Activity", value: `${todayLog?.activityScore || 0}`, unit: "score", icon: Activity, color: "#22c55e", trend: 5, trendLabel: "vs avg" },
    { label: "Stress", value: `${todayLog?.stressLevel || 0}`, unit: "level", icon: Brain, color: "#8b5cf6", trend: -20, trendLabel: "lower ✓" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Welcome section */}
      <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={0}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-1">
          <h2 className="text-[24px] font-bold">Good afternoon, Atharva 👋</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => openQuickLog("sleep")} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] hover:bg-[#3b82f6]/20 transition text-[12px] font-medium border border-[#3b82f6]/20">
              <Moon size={14} /> Log Sleep
            </button>
            <button onClick={() => openQuickLog("water")} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#06b6d4]/10 text-[#06b6d4] hover:bg-[#06b6d4]/20 transition text-[12px] font-medium border border-[#06b6d4]/20">
              <Droplets size={14} /> Log Water
            </button>
            <button onClick={() => openQuickLog("score")} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/20 transition text-[12px] font-medium border border-[#22c55e]/20">
              <Activity size={14} /> Update Score
            </button>
          </div>
        </div>
        <p className="text-[14px] text-[#666]">Here&apos;s your health overview for today</p>
      </motion.div>

      {/* Top row: Wellness Score + Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Wellness Score */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={1}
          className="lg:col-span-4 p-6 rounded-2xl relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#f97316] rounded-full opacity-[0.03] blur-[60px]" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-[#f97316]" />
              <span className="text-[12px] font-semibold text-[#f97316] uppercase tracking-wider">AI Wellness Score</span>
            </div>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width={180} height={180}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={wellnessRadial} startAngle={90} endAngle={-270}>
                  <RadialBar background={{ fill: "rgba(255,255,255,0.04)" }} dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <div className="text-[40px] font-bold bg-gradient-to-r from-[#f97316] to-[#d4a017] bg-clip-text text-transparent">{wellnessScore}</div>
                <div className="text-[11px] text-[#666]">out of 100</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 mt-2">
              <div className="text-center">
                <div className="text-[16px] font-bold text-white">{streakDays}</div>
                <div className="text-[10px] text-[#666]">Day Streak</div>
              </div>
              <div className="w-px h-8 bg-[rgba(255,255,255,0.06)]" />
              <div className="text-center">
                <div className="text-[16px] font-bold text-white">Lv.{level}</div>
                <div className="text-[10px] text-[#666]">{xpTotal} XP</div>
              </div>
              <div className="w-px h-8 bg-[rgba(255,255,255,0.06)]" />
              <div className="text-center">
                <div className="text-[16px] font-bold text-white">{completedHabits}/{habits.length}</div>
                <div className="text-[10px] text-[#666]">Habits</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stat Cards Grid */}
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-3">
          {statCards.map((card, i) => (
            <motion.div key={card.label} initial="hidden" animate="visible" variants={fadeIn} custom={i + 2}
              className="p-4 rounded-2xl group hover:-translate-y-0.5 transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${card.color}12`, border: `1px solid ${card.color}20` }}>
                  <card.icon size={16} style={{ color: card.color }} />
                </div>
                <div className={`flex items-center gap-0.5 text-[11px] font-medium ${card.trend >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                  {card.trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {Math.abs(card.trend)}%
                </div>
              </div>
              <div className="text-[24px] font-bold text-white leading-none mb-0.5">
                {card.value}<span className="text-[12px] text-[#666] font-normal ml-1">{card.unit}</span>
              </div>
              <div className="text-[11px] text-[#555]">{card.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Activity Chart */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={8}
          className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[14px] font-semibold">Activity & Sleep</h3>
              <p className="text-[11px] text-[#666]">Last 7 days</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[11px] text-[#666]"><span className="w-2 h-2 rounded-full bg-[#f97316]" /> Activity</span>
              <span className="flex items-center gap-1.5 text-[11px] text-[#666]"><span className="w-2 h-2 rounded-full bg-[#3b82f6]" /> Sleep</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 12, color: "#fff" }} />
              <Area type="monotone" dataKey="activity" stroke="#f97316" strokeWidth={2} fill="url(#actGrad)" />
              <Area type="monotone" dataKey="sleep" stroke="#3b82f6" strokeWidth={2} fill="url(#sleepGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Mood + Stress Chart */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={9}
          className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[14px] font-semibold">Stress & Calories</h3>
              <p className="text-[11px] text-[#666]">Weekly trend</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 12, color: "#fff" }} />
              <Area type="monotone" dataKey="stress" stroke="#8b5cf6" strokeWidth={2} fill="url(#stressGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom: Habits + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Habits */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={10}
          className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold">Today&apos;s Habits</h3>
            <span className="text-[12px] text-[#f97316] font-medium">{completedHabits}/{habits.length} done</span>
          </div>
          <div className="space-y-2">
            {habits.map((habit) => (
              <HabitRow key={habit.id} habit={habit} />
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={11}
          className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-[#d4a017]" />
            <h3 className="text-[14px] font-semibold">AI Insights</h3>
          </div>
          <div className="space-y-3">
            {insights.map((insight) => (
              <div key={insight.id} className="p-3 rounded-xl text-[13px] text-[#999] leading-relaxed"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
              >
                <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{
                    background: insight.category === "sleep" ? "rgba(59,130,246,0.1)" : insight.category === "mood" ? "rgba(139,92,246,0.1)" : "rgba(249,115,22,0.1)",
                    color: insight.category === "sleep" ? "#3b82f6" : insight.category === "mood" ? "#8b5cf6" : "#f97316",
                  }}
                >{insight.category}</span>
                <p>{insight.insight}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Weekly Mood Bar */}
      <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={12}
        className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <h3 className="text-[14px] font-semibold mb-4">Weekly Mood</h3>
        <div className="flex items-end gap-2 h-20">
          {weeklyLogs.map((log, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full rounded-lg transition-all hover:opacity-80" style={{
                height: `${log.activityScore * 0.8}%`,
                minHeight: 12,
                background: moodColors[log.mood] || "#666",
              }} />
              <span className="text-[10px] text-[#555]">{dayNames[i]}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Log Modal */}
      {isQuickLogOpen && (
        <QuickLogModal
          initialTab={quickLogTab}
          onClose={() => setIsQuickLogOpen(false)}
          currentValues={todayLog}
        />
      )}
    </div>
  );
}

function QuickLogModal({ initialTab, onClose, currentValues }: any) {
  const [tab, setTab] = useState(initialTab);
  const [sleep, setSleep] = useState(currentValues?.sleepHours || 7);
  const [water, setWater] = useState(currentValues?.waterIntake || 1);
  const [score, setScore] = useState(currentValues?.activityScore || 50);
  const { logHealthMetrics } = useAppStore();
  const { getToken } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const token = await getToken();
    if (token) {
      await logHealthMetrics({ sleepHours: sleep, waterIntake: water, activityScore: score }, token);
    }
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[400px] p-6 rounded-3xl bg-[#111] border border-[rgba(255,255,255,0.1)] relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#666] hover:text-white transition">
          <X size={20} />
        </button>
        <h2 className="text-[20px] font-bold mb-6">Quick Log</h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-[rgba(255,255,255,0.05)] rounded-xl">
          {[
            { id: "sleep", label: "Sleep", color: "text-[#3b82f6]" },
            { id: "water", label: "Water", color: "text-[#06b6d4]" },
            { id: "score", label: "Activity", color: "text-[#22c55e]" }
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 py-2 text-[13px] font-medium rounded-lg transition-all ${tab === t.id ? "bg-[#222] shadow text-white" : "text-[#777] hover:text-[#bbb]"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6 mb-8">
          {tab === "sleep" && (
            <div className="text-center">
              <Moon size={32} className="mx-auto text-[#3b82f6] mb-4 opacity-80" />
              <p className="text-[13px] text-[#888] mb-4">How many hours did you sleep?</p>
              <div className="flex items-center justify-center gap-6">
                <button onClick={() => setSleep(Math.max(0, sleep - 0.5))} className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#333] transition">-</button>
                <div className="text-[32px] font-bold w-20">{sleep}h</div>
                <button onClick={() => setSleep(sleep + 0.5)} className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#333] transition">+</button>
              </div>
            </div>
          )}

          {tab === "water" && (
            <div className="text-center">
              <Droplets size={32} className="mx-auto text-[#06b6d4] mb-4 opacity-80" />
              <p className="text-[13px] text-[#888] mb-4">Total water intake today (Liters)</p>
              <div className="flex items-center justify-center gap-6">
                <button onClick={() => setWater(Math.max(0, water - 0.5))} className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#333] transition">-</button>
                <div className="text-[32px] font-bold w-20">{water.toFixed(1)}L</div>
                <button onClick={() => setWater(water + 0.5)} className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#333] transition">+</button>
              </div>
            </div>
          )}

          {tab === "score" && (
            <div className="text-center">
              <Activity size={32} className="mx-auto text-[#22c55e] mb-4 opacity-80" />
              <p className="text-[13px] text-[#888] mb-4">Rate your activity level (0-100)</p>
              <div className="flex items-center justify-center gap-6">
                <button onClick={() => setScore(Math.max(0, score - 5))} className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#333] transition">-</button>
                <div className="text-[32px] font-bold w-20">{score}</div>
                <button onClick={() => setScore(Math.min(100, score + 5))} className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#333] transition">+</button>
              </div>
            </div>
          )}
        </div>

        <button onClick={handleSave} disabled={saving} className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-bold hover:bg-[#eee] transition">
          {saving ? "Saving..." : <><Check size={18} /> Save & Update</>}
        </button>
      </motion.div>
    </div>
  );
}

function HabitRow({ habit }: { habit: { id: string; title: string; icon: string; streak: number; completed: boolean; xpReward: number } }) {
  const toggleHabit = useAppStore((s) => s.toggleHabit);
  return (
    <button onClick={() => toggleHabit(habit.id)}
      className="w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-[rgba(255,255,255,0.03)]"
      style={{ background: habit.completed ? "rgba(249,115,22,0.04)" : "transparent", border: `1px solid ${habit.completed ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.04)"}` }}
    >
      <span className="text-[18px]">{habit.icon}</span>
      <div className="flex-1 text-left">
        <div className={`text-[13px] font-medium ${habit.completed ? "text-[#f97316]" : "text-white"}`}>{habit.title}</div>
        <div className="text-[10px] text-[#555]">🔥 {habit.streak} day streak · +{habit.xpReward} XP</div>
      </div>
      <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] ${habit.completed ? "bg-[#f97316] text-white" : "border border-[rgba(255,255,255,0.15)]"}`}>
        {habit.completed && "✓"}
      </div>
    </button>
  );
}
