import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { WorkoutEntry } from "./fitness-utils";
export { formatDuration, formatMinutes, getThisWeeksWorkouts, getWeekDays, startOfWeek } from "./fitness-utils";
export type { WorkoutEntry } from "./fitness-utils";

export const COLORS = {
  background: "#0B110E",
  surface: "#131C16",
  surfaceRaised: "#19251D",
  primary: "#B9F36B",
  primarySoft: "#24351C",
  text: "#F5F7F2",
  muted: "#9AA69A",
  border: "#29362C",
  white: "#FFFFFF",
  danger: "#F1897C",
};

export type WorkoutPlan = {
  id: string;
  title: string;
  focus: string;
  durationMinutes: number;
  level: "Beginner" | "Intermediate";
  equipment: string;
  exercises: string[];
};

export const WORKOUTS: WorkoutPlan[] = [
  {
    id: "full-body-reset",
    title: "Full Body Reset",
    focus: "Strength · Full body",
    durationMinutes: 25,
    level: "Beginner",
    equipment: "No equipment",
    exercises: ["Bodyweight squats", "Incline push-ups", "Glute bridges", "Dead bugs", "Easy cool-down stretch"],
  },
  {
    id: "upper-body-basics",
    title: "Upper Body Basics",
    focus: "Strength · Upper body",
    durationMinutes: 30,
    level: "Beginner",
    equipment: "No equipment",
    exercises: ["Wall push-ups", "Shoulder taps", "Knee push-ups", "Arm circles", "Chest and shoulder stretch"],
  },
  {
    id: "legs-and-glutes",
    title: "Legs & Glutes",
    focus: "Strength · Lower body",
    durationMinutes: 35,
    level: "Intermediate",
    equipment: "No equipment",
    exercises: ["Bodyweight squats", "Reverse lunges", "Glute bridges", "Calf raises", "Hip-flexor stretch"],
  },
  {
    id: "core-and-mobility",
    title: "Core & Mobility",
    focus: "Mobility · Core",
    durationMinutes: 20,
    level: "Beginner",
    equipment: "Exercise mat optional",
    exercises: ["Bird dogs", "Dead bugs", "Knee side plank", "Cat-cow stretch", "Child's pose"],
  },
];

export type FitnessProfile = {
  name: string;
  weeklyGoal: number;
};

type FitnessContextValue = {
  ready: boolean;
  entries: WorkoutEntry[];
  profile: FitnessProfile;
  addWorkout: (entry: WorkoutEntry) => void;
  saveProfile: (updates: Partial<FitnessProfile>) => void;
};

const SESSIONS_KEY = "fitness-square:sessions:v1";
const PROFILE_KEY = "fitness-square:profile:v1";
const DEFAULT_PROFILE: FitnessProfile = { name: "", weeklyGoal: 3 };

const FitnessContext = createContext<FitnessContextValue | null>(null);

export function FitnessProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<WorkoutEntry[]>([]);
  const [profile, setProfile] = useState<FitnessProfile>(DEFAULT_PROFILE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([AsyncStorage.getItem(SESSIONS_KEY), AsyncStorage.getItem(PROFILE_KEY)])
      .then(([savedSessions, savedProfile]) => {
        if (!active) return;
        if (savedSessions) {
          const parsed = JSON.parse(savedSessions) as WorkoutEntry[];
          if (Array.isArray(parsed)) setEntries(parsed);
        }
        if (savedProfile) {
          const parsed = JSON.parse(savedProfile) as Partial<FitnessProfile>;
          setProfile({
            name: typeof parsed.name === "string" ? parsed.name : DEFAULT_PROFILE.name,
            weeklyGoal: typeof parsed.weeklyGoal === "number" ? parsed.weeklyGoal : DEFAULT_PROFILE.weeklyGoal,
          });
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(entries)).catch(() => undefined);
  }, [entries, ready]);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile)).catch(() => undefined);
  }, [profile, ready]);

  const addWorkout = useCallback((entry: WorkoutEntry) => {
    setEntries((current) => [entry, ...current]);
  }, []);

  const saveProfile = useCallback((updates: Partial<FitnessProfile>) => {
    setProfile((current) => ({ ...current, ...updates }));
  }, []);

  const value = useMemo(() => ({ ready, entries, profile, addWorkout, saveProfile }), [ready, entries, profile, addWorkout, saveProfile]);
  return <FitnessContext.Provider value={value}>{children}</FitnessContext.Provider>;
}

export function useFitness() {
  const context = useContext(FitnessContext);
  if (!context) throw new Error("useFitness must be used inside FitnessProvider");
  return context;
}
