import { create } from "zustand";
import type { HealthLog, Habit, AIInsight, DashboardData, ChatMessage, Notification } from "@/types";

// Mock data for demonstration
const mockTodayLog: HealthLog = {
  id: "1", userId: "user1", calories: 1847, waterIntake: 2.4, sleepHours: 7.5,
  sleepQuality: 82, heartRate: 72, mood: "good", stressLevel: 35, activityScore: 78,
  createdAt: new Date().toISOString(),
};

const mockWeeklyLogs: HealthLog[] = [
  { id: "0", userId: "user1", calories: 2100, waterIntake: 2.8, sleepHours: 7.0, sleepQuality: 85, heartRate: 65, mood: "excellent", stressLevel: 30, activityScore: 85, createdAt: new Date(Date.now() - 6 * 86400000).toISOString() },
  { id: "1", userId: "user1", calories: 1950, waterIntake: 2.5, sleepHours: 6.5, sleepQuality: 70, heartRate: 68, mood: "good", stressLevel: 40, activityScore: 70, createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
  { id: "2", userId: "user1", calories: 2300, waterIntake: 3.2, sleepHours: 8.0, sleepQuality: 92, heartRate: 60, mood: "neutral", stressLevel: 25, activityScore: 90, createdAt: new Date(Date.now() - 4 * 86400000).toISOString() },
  { id: "3", userId: "user1", calories: 1800, waterIntake: 2.0, sleepHours: 5.5, sleepQuality: 55, heartRate: 72, mood: "good", stressLevel: 60, activityScore: 50, createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
  { id: "4", userId: "user1", calories: 2050, waterIntake: 2.6, sleepHours: 7.5, sleepQuality: 80, heartRate: 64, mood: "excellent", stressLevel: 35, activityScore: 80, createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: "5", userId: "user1", calories: 2200, waterIntake: 2.9, sleepHours: 6.8, sleepQuality: 75, heartRate: 66, mood: "good", stressLevel: 45, activityScore: 75, createdAt: new Date(Date.now() - 1 * 86400000).toISOString() },
  { id: "6", userId: "user1", calories: 1900, waterIntake: 2.2, sleepHours: 7.2, sleepQuality: 78, heartRate: 63, mood: "neutral", stressLevel: 38, activityScore: 65, createdAt: new Date().toISOString() },
];

const mockHabits: Habit[] = [
  { id: "1", userId: "user1", title: "Morning Meditation", icon: "🧘", streak: 12, completed: true, xpReward: 50, category: "mindfulness" },
  { id: "2", userId: "user1", title: "Gym Workout", icon: "💪", streak: 8, completed: false, xpReward: 75, category: "fitness" },
  { id: "3", userId: "user1", title: "Read 30 min", icon: "📚", streak: 21, completed: true, xpReward: 40, category: "learning" },
  { id: "4", userId: "user1", title: "Drink 2L Water", icon: "💧", streak: 5, completed: false, xpReward: 30, category: "wellness" },
  { id: "5", userId: "user1", title: "Take Vitamins", icon: "💊", streak: 15, completed: true, xpReward: 25, category: "nutrition" },
  { id: "6", userId: "user1", title: "Evening Yoga", icon: "🧘‍♀️", streak: 3, completed: false, xpReward: 45, category: "mindfulness" },
];

const mockInsights: AIInsight[] = [
  { id: "1", userId: "user1", insight: "Your sleep quality improved 15% this week. Keep maintaining your 11 PM bedtime.", category: "sleep", createdAt: new Date().toISOString() },
  { id: "2", userId: "user1", insight: "Stress levels are trending down. Your meditation habit is paying off!", category: "mood", createdAt: new Date().toISOString() },
  { id: "3", userId: "user1", insight: "Consider adding more protein to your diet. Your activity levels suggest higher nutritional needs.", category: "health", createdAt: new Date().toISOString() },
];

const mockNotifications: Notification[] = [
  { id: "1", userId: "user1", title: "Hydration Reminder", description: "You're 0.6L behind your water goal today.", type: "reminder", isRead: false, createdAt: new Date().toISOString() },
  { id: "2", userId: "user1", title: "Streak Achievement!", description: "You've maintained your reading streak for 21 days!", type: "achievement", isRead: false, createdAt: new Date().toISOString() },
  { id: "3", userId: "user1", title: "New AI Insight", description: "Your weekly wellness report is ready.", type: "insight", isRead: true, createdAt: new Date().toISOString() },
];

interface AppState {
  // Dashboard
  dashboardData: DashboardData;
  notifications: Notification[];
  // Chat
  chatMessages: ChatMessage[];
  chatLoading: boolean;
  // UI
  sidebarCollapsed: boolean;
  // Actions
  toggleHabit: (id: string) => void;
  addChatMessage: (msg: ChatMessage) => void;
  setChatLoading: (val: boolean) => void;
  toggleSidebar: () => void;
  markNotificationRead: (id: string) => void;
  addWater: (amount: number) => void;
  fetchDashboardData: (token: string) => Promise<void>;
  logHealthMetrics: (metrics: { sleepHours?: number; heartRate?: number; activityScore?: number; waterIntake?: number; mood?: string }, token: string) => Promise<void>;
  logMood: (mood: string, token: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  dashboardData: {
    todayLog: mockTodayLog,
    weeklyLogs: mockWeeklyLogs,
    wellnessScore: 82,
    streakDays: 12,
    xpTotal: 2450,
    level: 7,
    insights: mockInsights,
    habits: mockHabits,
  },
  notifications: mockNotifications,
  chatMessages: [],
  chatLoading: false,
  sidebarCollapsed: false,

  toggleHabit: (id) =>
    set((s) => ({
      dashboardData: {
        ...s.dashboardData,
        habits: s.dashboardData.habits.map((h) =>
          h.id === id ? { ...h, completed: !h.completed } : h
        ),
      },
    })),

  addChatMessage: (msg) =>
    set((s) => ({ chatMessages: [...s.chatMessages, msg] })),

  setChatLoading: (val) => set({ chatLoading: val }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),

  addWater: async (amount) => {
    // Optimistic UI update
    set((s) => ({
      dashboardData: {
        ...s.dashboardData,
        todayLog: s.dashboardData.todayLog
          ? { ...s.dashboardData.todayLog, waterIntake: s.dashboardData.todayLog.waterIntake + amount }
          : null,
      },
    }));
    // We would ideally call the backend here too
  },

  fetchDashboardData: async (token: string) => {
    try {
      const axios = (await import("axios")).default;
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await axios.get(`${API_URL}/health/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const { todayLog, weeklyLogs, habits, insights, wellnessScore, streakDays, xpTotal, level } = res.data.data;
      
      set((s) => ({
        dashboardData: {
          ...s.dashboardData,
          todayLog,
          weeklyLogs: weeklyLogs.length > 0 ? weeklyLogs : s.dashboardData.weeklyLogs,
          habits: habits.length > 0 ? habits : s.dashboardData.habits,
          insights: insights.length > 0 ? insights : s.dashboardData.insights,
        }
      }));
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  },

  logHealthMetrics: async (metrics, token) => {
    // Optimistic update
    set((s) => ({
      dashboardData: {
        ...s.dashboardData,
        todayLog: s.dashboardData.todayLog
          ? { ...s.dashboardData.todayLog, ...metrics }
          : null,
      },
    }));

    try {
      const axios = (await import("axios")).default;
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      await axios.post(`${API_URL}/health/metrics`, metrics, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Failed to log metrics:", error);
      // Ideally revert optimistic update here
    }
  },

  logMood: async (mood, token) => {
    // Optimistic update
    set((s) => ({
      dashboardData: {
        ...s.dashboardData,
        todayLog: s.dashboardData.todayLog
          ? { ...s.dashboardData.todayLog, mood }
          : null,
      },
    }));

    try {
      const axios = (await import("axios")).default;
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      await axios.post(`${API_URL}/health/mood`, { mood }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Failed to log mood:", error);
    }
  },
}));
