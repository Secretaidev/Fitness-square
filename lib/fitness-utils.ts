export type WorkoutEntry = {
  id: string;
  workoutId: string;
  title: string;
  completedAt: string;
  durationSeconds: number;
};

export function startOfWeek(date: Date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  return start;
}

export function getThisWeeksWorkouts(entries: WorkoutEntry[], now = new Date()) {
  const start = startOfWeek(now).getTime();
  const end = start + 7 * 24 * 60 * 60 * 1000;
  return entries.filter((entry) => {
    const time = new Date(entry.completedAt).getTime();
    return time >= start && time < end;
  });
}

export function getWeekDays(entries: WorkoutEntry[], now = new Date()) {
  const start = startOfWeek(now);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const dayEntries = entries.filter((entry) => {
      const completed = new Date(entry.completedAt);
      return completed.getFullYear() === date.getFullYear() && completed.getMonth() === date.getMonth() && completed.getDate() === date.getDate();
    });
    return {
      key: date.toISOString(),
      label: date.toLocaleDateString("en", { weekday: "short" }),
      dateLabel: date.toLocaleDateString("en", { day: "numeric" }),
      minutes: Math.round(dayEntries.reduce((sum, entry) => sum + entry.durationSeconds, 0) / 60),
      workouts: dayEntries.length,
    };
  });
}

export function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes >= 60) return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, "0")}m`;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function formatMinutes(totalSeconds: number) {
  const minutes = Math.round(totalSeconds / 60);
  if (minutes >= 60) return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  return `${minutes} min`;
}
