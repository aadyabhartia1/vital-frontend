// ============================================
// Vitalis AI — TypeScript Type Definitions
// ============================================

export interface User {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  createdAt: string;
}

export interface HealthLog {
  id: string;
  userId: string;
  calories: number;
  waterIntake: number;
  sleepHours: number;
  sleepQuality: number;
  heartRate: number;
  mood: MoodLevel;
  stressLevel: number;
  activityScore: number;
  createdAt: string;
}

export type MoodLevel = "excellent" | "good" | "neutral" | "bad" | "terrible";

export interface Habit {
  id: string;
  userId: string;
  title: string;
  icon: string;
  streak: number;
  completed: boolean;
  xpReward: number;
  category: HabitCategory;
}

export type HabitCategory =
  | "fitness"
  | "mindfulness"
  | "nutrition"
  | "learning"
  | "wellness";

export interface AIInsight {
  id: string;
  userId: string;
  insight: string;
  category: "health" | "mood" | "sleep" | "burnout" | "general";
  riskLevel?: "low" | "moderate" | "high";
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: "reminder" | "achievement" | "insight" | "alert";
  isRead: boolean;
  createdAt: string;
}

export interface EmergencyCard {
  id: string;
  userId: string;
  bloodGroup: string;
  emergencyContacts: EmergencyContact[];
  allergies: string[];
  medicalConditions: string[];
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface DashboardData {
  todayLog: HealthLog | null;
  weeklyLogs: HealthLog[];
  wellnessScore: number;
  streakDays: number;
  xpTotal: number;
  level: number;
  insights: AIInsight[];
  habits: Habit[];
}

export interface WeeklyReport {
  id: string;
  userId: string;
  summary: string;
  healthScore: number;
  moodSummary: string;
  burnoutScore: number;
  suggestions: string[];
  weekStart: string;
  weekEnd: string;
  createdAt: string;
}

// Gamification
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  xp: number;
  level: number;
  rank: number;
}

// Chat
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
