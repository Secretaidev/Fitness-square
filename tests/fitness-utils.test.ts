import { describe, expect, it } from "vitest";
import { formatDuration, formatMinutes, getThisWeeksWorkouts, getWeekDays, startOfWeek, type WorkoutEntry } from "../lib/fitness-utils";

function record(id: string, completedAt: Date, durationSeconds = 0): WorkoutEntry {
  return { id, workoutId: "plan", title: "Test session", completedAt: completedAt.toISOString(), durationSeconds };
}

describe("fitness progress helpers", () => {
  it("starts the week on Monday at local midnight", () => {
    const result = startOfWeek(new Date(2026, 8, 23, 16, 45));
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(8);
    expect(result.getDate()).toBe(21);
    expect(result.getDay()).toBe(1);
    expect(result.getHours()).toBe(0);
  });

  it("includes Monday through Sunday sessions but excludes the adjacent weeks", () => {
    const now = new Date(2026, 8, 23, 12);
    const sessions = [
      record("before", new Date(2026, 8, 20, 23, 59)),
      record("monday", new Date(2026, 8, 21, 9)),
      record("wednesday", new Date(2026, 8, 23, 12)),
      record("sunday", new Date(2026, 8, 27, 23, 59)),
      record("after", new Date(2026, 8, 28, 0, 0)),
    ];
    expect(getThisWeeksWorkouts(sessions, now).map((session) => session.id)).toEqual(["monday", "wednesday", "sunday"]);
  });

  it("calculates seven daily totals for the selected Monday-to-Sunday week", () => {
    const now = new Date(2026, 8, 23, 12);
    const sessions = [
      record("one", new Date(2026, 8, 21, 8), 600),
      record("two", new Date(2026, 8, 21, 18), 300),
      record("three", new Date(2026, 8, 23, 9), 900),
    ];
    const days = getWeekDays(sessions, now);
    expect(days).toHaveLength(7);
    expect(days.map((day) => day.label)).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    expect(days[0]).toMatchObject({ minutes: 15, workouts: 2 });
    expect(days[2]).toMatchObject({ minutes: 15, workouts: 1 });
    expect(days[6]).toMatchObject({ minutes: 0, workouts: 0 });
  });

  it("formats elapsed timer values and rounded minute summaries", () => {
    expect(formatDuration(59)).toBe("00:59");
    expect(formatDuration(3600)).toBe("1h 00m");
    expect(formatMinutes(89)).toBe("1 min");
    expect(formatMinutes(3660)).toBe("1h 1m");
  });
});
