"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { Brain, TrendingUp, Calendar } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

const moodOptions = [
  { value: "excellent", emoji: "😄", label: "Excellent", color: "#22c55e" },
  { value: "good", emoji: "🙂", label: "Good", color: "#f97316" },
  { value: "neutral", emoji: "😐", label: "Neutral", color: "#eab308" },
  { value: "bad", emoji: "😔", label: "Bad", color: "#ef4444" },
  { value: "terrible", emoji: "😢", label: "Terrible", color: "#dc2626" },
];

const moodColorMap: Record<string, string> = {
  excellent: "#22c55e", good: "#f97316", neutral: "#eab308", bad: "#ef4444", terrible: "#dc2626",
};

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekLabels = ["This Week", "Last Week", "2 Weeks Ago", "3 Weeks Ago"];

const staticHeatmapData = [
  ["good", "neutral", "good", "excellent", "good", "neutral", "good"],
  ["neutral", "good", "bad", "neutral", "good", "excellent", "good"],
  ["good", "excellent", "good", "good", "neutral", "bad", "neutral"],
  ["excellent", "good", "good", "neutral", "good", "good", "excellent"]
];

const heatmapData = weekLabels.map((_, wi) =>
  dayLabels.map((_, di) => staticHeatmapData[wi][di] || "neutral")
);

export default function MoodTrackerPage() {
  const { dashboardData, logMood } = useAppStore();
  const { getToken } = useAuth();
  const { weeklyLogs, todayLog } = dashboardData;

  const handleMoodSelect = async (moodValue: string) => {
    const token = await getToken();
    if (token) {
      await logMood(moodValue, token);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-[24px] font-bold mb-1">Smart Mood Tracker</h2>
        <p className="text-[14px] text-[#666]">AI-analyzed emotional trends and patterns</p>
      </motion.div>

      {/* Current Mood */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 className="text-[14px] font-semibold mb-4">How are you feeling today?</h3>
        <div className="flex flex-wrap gap-3">
          {moodOptions.map((mood) => (
            <button key={mood.value}
              onClick={() => handleMoodSelect(mood.value)}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:-translate-y-1 cursor-pointer"
              style={{
                background: todayLog?.mood === mood.value ? `${mood.color}15` : "rgba(255,255,255,0.02)",
                border: `1px solid ${todayLog?.mood === mood.value ? `${mood.color}40` : "rgba(255,255,255,0.06)"}`,
                minWidth: 90,
              }}>
              <span className="text-[32px]">{mood.emoji}</span>
              <span className="text-[12px] font-medium" style={{ color: mood.color }}>{mood.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Mood Heatmap */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={16} className="text-[#8b5cf6]" />
            <h3 className="text-[14px] font-semibold">Mood Heatmap</h3>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2 pl-24">
              {dayLabels.map((d) => <div key={d} className="flex-1 text-center text-[10px] text-[#555]">{d}</div>)}
            </div>
            {heatmapData.map((week, wi) => (
              <div key={wi} className="flex items-center gap-2">
                <span className="text-[11px] text-[#555] w-20 text-right shrink-0">{weekLabels[wi]}</span>
                <div className="flex gap-2 flex-1">
                  {week.map((mood, di) => (
                    <div key={di} className="flex-1 h-8 rounded-lg transition-all hover:scale-105 cursor-pointer"
                      style={{ background: `${moodColorMap[mood]}25`, border: `1px solid ${moodColorMap[mood]}30` }}
                      title={`${dayLabels[di]}: ${mood}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            {moodOptions.slice(0, 3).map((m) => (
              <span key={m.value} className="flex items-center gap-1.5 text-[10px] text-[#666]">
                <span className="w-3 h-3 rounded" style={{ background: `${m.color}40` }} /> {m.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stress & Anxiety Levels */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Brain size={16} className="text-[#8b5cf6]" />
            <h3 className="text-[14px] font-semibold">Stress & Productivity</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Stress Level", value: todayLog?.stressLevel || 0, max: 100, color: "#ef4444" },
              { label: "Productivity", value: 72, max: 100, color: "#22c55e" },
              { label: "Anxiety", value: 28, max: 100, color: "#eab308" },
              { label: "Focus Score", value: 85, max: 100, color: "#3b82f6" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] text-[#888]">{item.label}</span>
                  <span className="text-[12px] font-semibold" style={{ color: item.color }}>{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full" style={{ background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Weekly Mood Summary */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-[#f97316]" />
          <h3 className="text-[14px] font-semibold">Weekly Mood Timeline</h3>
        </div>
        <div className="flex items-end gap-3 h-32">
          {weeklyLogs.map((log, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[20px]">{moodOptions.find((m) => m.value === log.mood)?.emoji || "😐"}</span>
              <div className="w-full rounded-xl transition-all hover:opacity-80 cursor-pointer"
                style={{ height: `${log.activityScore}%`, background: moodColorMap[log.mood] + "30", border: `1px solid ${moodColorMap[log.mood]}40` }} />
              <span className="text-[10px] text-[#555]">
                {log.createdAt ? new Date(log.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : dayLabels[i]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
