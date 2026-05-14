"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { Moon, TrendingUp, Clock, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SleepPage() {
  const { dashboardData } = useAppStore();
  const { weeklyLogs, todayLog } = dashboardData;

  const sleepData = weeklyLogs.map((log, i) => ({
    day: dayNames[i],
    hours: +log.sleepHours.toFixed(1),
    quality: log.sleepQuality,
  }));

  const avgSleep = (weeklyLogs.reduce((a, b) => a + b.sleepHours, 0) / weeklyLogs.length).toFixed(1);
  const avgQuality = Math.round(weeklyLogs.reduce((a, b) => a + b.sleepQuality, 0) / weeklyLogs.length);
  const bestNight = Math.max(...weeklyLogs.map((l) => l.sleepHours)).toFixed(1);

  const sleepScore = Math.round(((todayLog?.sleepQuality || 0) * 0.6 + (Math.min(todayLog?.sleepHours || 0, 8) / 8) * 100 * 0.4));

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-[24px] font-bold mb-1">Sleep Analytics</h2>
        <p className="text-[14px] text-[#666]">Deep insights into your sleep patterns</p>
      </motion.div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Sleep Score", value: sleepScore, unit: "/100", icon: Moon, color: "#3b82f6" },
          { label: "Avg Duration", value: avgSleep, unit: "hrs", icon: Clock, color: "#8b5cf6" },
          { label: "Avg Quality", value: `${avgQuality}%`, unit: "", icon: TrendingUp, color: "#22c55e" },
          { label: "Best Night", value: bestNight, unit: "hrs", icon: Zap, color: "#d4a017" },
        ].map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${card.color}12` }}>
              <card.icon size={16} style={{ color: card.color }} />
            </div>
            <div className="text-[22px] font-bold text-white">{card.value}<span className="text-[11px] text-[#666] font-normal">{card.unit}</span></div>
            <div className="text-[11px] text-[#555]">{card.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sleep Duration Chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="text-[14px] font-semibold mb-4">Sleep Duration</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sleepData}>
              <XAxis dataKey="day" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} width={25} domain={[0, 10]} />
              <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 12, color: "#fff" }} />
              <Bar dataKey="hours" fill="#3b82f6" radius={[6, 6, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Sleep Quality Chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="text-[14px] font-semibold mb-4">Sleep Quality</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={sleepData}>
              <defs>
                <linearGradient id="qualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} width={25} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 12, color: "#fff" }} />
              <Area type="monotone" dataKey="quality" stroke="#8b5cf6" strokeWidth={2} fill="url(#qualGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* AI Sleep Insights */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 className="text-[14px] font-semibold mb-4">🧠 AI Sleep Recommendations</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { title: "Optimize Bedtime", desc: "Your data suggests 10:30 PM is your ideal bedtime for peak quality sleep." },
            { title: "Reduce Screen Time", desc: "Consider stopping screen use 1 hour before bed. Your quality improves 23% on those nights." },
            { title: "Consistency Matters", desc: "Your wake time varies by 2+ hours. Keeping it within 30 min improves energy by 18%." },
          ].map((tip) => (
            <div key={tip.title} className="p-4 rounded-xl" style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.1)" }}>
              <div className="text-[13px] font-semibold text-[#3b82f6] mb-1">{tip.title}</div>
              <p className="text-[12px] text-[#777] leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
