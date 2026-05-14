"use client";

import { motion } from "framer-motion";
import { Shield, AlertTriangle, TrendingDown, Brain, Moon, Activity, Heart } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export default function BurnoutPage() {
  const { dashboardData } = useAppStore();
  const { todayLog, weeklyLogs } = dashboardData;

  // Calculate burnout risk from data
  const avgStress = weeklyLogs.reduce((a, b) => a + b.stressLevel, 0) / weeklyLogs.length;
  const avgSleep = weeklyLogs.reduce((a, b) => a + b.sleepHours, 0) / weeklyLogs.length;
  const avgActivity = weeklyLogs.reduce((a, b) => a + b.activityScore, 0) / weeklyLogs.length;
  const moodScore = weeklyLogs.filter((l) => l.mood === "good" || l.mood === "excellent").length / weeklyLogs.length * 100;

  const burnoutScore = Math.round(Math.max(0, Math.min(100, avgStress * 0.4 + (100 - moodScore) * 0.3 + (8 - avgSleep) * 10 * 0.2 + (100 - avgActivity) * 0.1)));
  const riskLevel = burnoutScore < 30 ? "Low" : burnoutScore < 60 ? "Moderate" : "High";
  const riskColor = burnoutScore < 30 ? "#22c55e" : burnoutScore < 60 ? "#eab308" : "#ef4444";

  const factors = [
    { label: "Stress Level", value: Math.round(avgStress), max: 100, icon: Brain, color: "#8b5cf6", desc: avgStress > 50 ? "Elevated — consider stress management" : "Under control" },
    { label: "Sleep Quality", value: Math.round(avgSleep * 12.5), max: 100, icon: Moon, color: "#3b82f6", desc: avgSleep < 7 ? "Below recommended 7-9 hours" : "Healthy range" },
    { label: "Activity Level", value: Math.round(avgActivity), max: 100, icon: Activity, color: "#22c55e", desc: avgActivity > 60 ? "Good activity levels" : "Consider more movement" },
    { label: "Mood Stability", value: Math.round(moodScore), max: 100, icon: Heart, color: "#f97316", desc: moodScore > 60 ? "Mostly positive" : "Monitor emotional patterns" },
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-[24px] font-bold mb-1">AI Burnout Prediction</h2>
        <p className="text-[14px] text-[#666]">Predictive AI analysis based on your health patterns</p>
      </motion.div>

      {/* Risk Score Card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="p-8 rounded-2xl relative overflow-hidden"
        style={{ background: `${riskColor}06`, border: `1px solid ${riskColor}20` }}>
        <div className="absolute top-0 right-0 w-60 h-60 rounded-full blur-[100px] opacity-10" style={{ background: riskColor }} />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="12" />
              <motion.circle cx="80" cy="80" r="70" fill="none" stroke={riskColor} strokeWidth="12" strokeLinecap="round"
                strokeDasharray={440} initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 440 - (burnoutScore / 100) * 440 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                transform="rotate(-90 80 80)" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-[36px] font-bold" style={{ color: riskColor }}>{burnoutScore}</div>
              <div className="text-[11px] text-[#666]">Risk Score</div>
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              {burnoutScore >= 60 ? <AlertTriangle size={20} style={{ color: riskColor }} /> : <Shield size={20} style={{ color: riskColor }} />}
              <span className="text-[20px] font-bold" style={{ color: riskColor }}>{riskLevel} Risk</span>
            </div>
            <p className="text-[14px] text-[#888] max-w-md leading-relaxed">
              {burnoutScore < 30
                ? "You're doing great! Your health metrics indicate a healthy balance between work and rest."
                : burnoutScore < 60
                ? "Some warning signs detected. Consider adjusting your sleep schedule and stress management practices."
                : "Your burnout risk is elevated. Take immediate steps to reduce stress, improve sleep, and practice self-care."}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contributing Factors */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 className="text-[14px] font-semibold mb-4">Contributing Factors</h3>
        <div className="space-y-4">
          {factors.map((f, i) => (
            <motion.div key={f.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${f.color}12` }}>
                <f.icon size={18} style={{ color: f.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] font-medium text-white">{f.label}</span>
                  <span className="text-[12px] font-semibold" style={{ color: f.color }}>{f.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden mb-1">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${f.value}%` }} transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className="h-full rounded-full" style={{ background: f.color }} />
                </div>
                <span className="text-[11px] text-[#666]">{f.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 className="text-[14px] font-semibold mb-4">🧠 AI Prevention Plan</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { title: "Improve Sleep Routine", desc: "Aim for 7.5-8.5 hours. Set a consistent bedtime alarm at 10:30 PM.", color: "#3b82f6" },
            { title: "Stress Management", desc: "Add 10 min of deep breathing after lunch. Your stress peaks at 2 PM.", color: "#8b5cf6" },
            { title: "Activity Balance", desc: "Include rest days between intense workouts. Recovery is part of fitness.", color: "#22c55e" },
            { title: "Social Connection", desc: "Schedule time with friends this week. Social support reduces burnout risk by 40%.", color: "#f97316" },
          ].map((rec) => (
            <div key={rec.title} className="p-4 rounded-xl" style={{ background: `${rec.color}06`, border: `1px solid ${rec.color}15` }}>
              <div className="text-[13px] font-semibold mb-1" style={{ color: rec.color }}>{rec.title}</div>
              <p className="text-[12px] text-[#777] leading-relaxed">{rec.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
