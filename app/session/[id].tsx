import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useKeepAwake } from "expo-keep-awake";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BrandMark, PrimaryButton } from "@/components/fitness-ui";
import { ScreenContainer } from "@/components/screen-container";
import { COLORS, formatDuration, WORKOUTS, useFitness } from "@/lib/fitness";

export default function WorkoutSessionScreen() {
  useKeepAwake();
  const { id } = useLocalSearchParams<{ id: string }>();
  const plan = WORKOUTS.find((item) => item.id === id);
  const { addWorkout } = useFitness();
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finishing, setFinishing] = useState(false);

  useEffect(() => {
    if (paused || finishing || !plan) return;
    const timer = setInterval(() => setSeconds((current) => current + 1), 1000);
    return () => clearInterval(timer);
  }, [paused, finishing, plan]);

  if (!plan) {
    return <ScreenContainer><View style={styles.center}><Text style={styles.title}>Workout not found</Text><PrimaryButton icon="arrow-back" onPress={() => router.back()}>Go back</PrimaryButton></View></ScreenContainer>;
  }

  const finishWorkout = () => {
    if (finishing) return;
    setFinishing(true);
    addWorkout({
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      workoutId: plan.id,
      title: plan.title,
      completedAt: new Date().toISOString(),
      durationSeconds: seconds,
    });
    router.replace("/(tabs)/progress");
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <View style={styles.top}><Pressable accessibilityRole="button" accessibilityLabel="Exit workout" onPress={() => router.back()} style={styles.back}><MaterialIcons name="close" size={21} color={COLORS.text} /></Pressable><BrandMark compact /><View style={styles.spacer} /></View>
        <View style={styles.sessionInfo}><Text style={styles.eyebrow}>WORKOUT IN PROGRESS</Text><Text style={styles.title}>{plan.title}</Text><Text style={styles.subtitle}>Stay present. Go at your pace.</Text></View>
        <View style={styles.timerCard}>
          <View style={styles.timerRing}><MaterialIcons name={paused ? "pause" : "bolt"} size={24} color={COLORS.primary} /><Text style={styles.timer}>{formatDuration(seconds)}</Text><Text style={styles.timerLabel}>{paused ? "PAUSED" : "ELAPSED TIME"}</Text></View>
          <View style={styles.timerFoot}><View style={styles.liveDot} /><Text style={styles.timerFootText}>{paused ? "Timer paused" : "Timer running"}</Text></View>
        </View>
        <View style={styles.nextCard}>
          <View style={styles.nextHeading}><Text style={styles.nextLabel}>SESSION GUIDE</Text><Text style={styles.stepCount}>{plan.exercises.length} movements</Text></View>
          {plan.exercises.slice(0, 4).map((exercise, index) => <View key={`${plan.id}-${exercise}`} style={styles.exerciseLine}><View style={[styles.exerciseDot, index === 0 && styles.exerciseDotActive]}><Text style={[styles.exerciseIndex, index === 0 && styles.exerciseIndexActive]}>{index + 1}</Text></View><Text style={styles.exerciseName}>{exercise}</Text></View>)}
          {plan.exercises.length > 4 ? <Text style={styles.moreText}>+ {plan.exercises.length - 4} more in your plan</Text> : null}
        </View>
        <View style={styles.actions}>
          <Pressable accessibilityRole="button" onPress={() => setPaused((value) => !value)} style={({ pressed }) => [styles.pauseButton, pressed && { opacity: 0.75 }]}><MaterialIcons name={paused ? "play-arrow" : "pause"} size={21} color={COLORS.text} /><Text style={styles.pauseText}>{paused ? "Resume" : "Pause"}</Text></Pressable>
          <PrimaryButton icon="check" disabled={finishing} onPress={finishWorkout} style={styles.finishButton}>{finishing ? "Saving..." : "Finish workout"}</PrimaryButton>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 11, paddingBottom: 21 },
  center: { flex: 1, justifyContent: "center", padding: 22, gap: 20 },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  back: { width: 41, height: 41, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1 },
  spacer: { width: 41 },
  sessionInfo: { alignItems: "center", marginTop: 28 },
  eyebrow: { color: COLORS.primary, fontSize: 9, fontWeight: "900", letterSpacing: 1.35 },
  title: { color: COLORS.text, fontSize: 25, fontWeight: "900", textAlign: "center", letterSpacing: -0.6, marginTop: 8 },
  subtitle: { color: COLORS.muted, fontSize: 11, marginTop: 5 },
  timerCard: { alignItems: "center", justifyContent: "center", backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1, borderRadius: 26, marginTop: 23, paddingVertical: 22 },
  timerRing: { width: 195, height: 195, borderRadius: 98, borderWidth: 2, borderColor: COLORS.primarySoft, backgroundColor: COLORS.background, alignItems: "center", justifyContent: "center" },
  timer: { color: COLORS.text, fontSize: 43, fontWeight: "900", fontVariant: ["tabular-nums"], letterSpacing: -1.5, marginTop: 8 },
  timerLabel: { color: COLORS.muted, fontSize: 9, fontWeight: "900", letterSpacing: 1.4, marginTop: 3 },
  timerFoot: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 14 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.primary },
  timerFootText: { color: COLORS.muted, fontSize: 10 },
  nextCard: { backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1, borderRadius: 20, marginTop: 15, padding: 15 },
  nextHeading: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  nextLabel: { color: COLORS.primary, fontSize: 9, fontWeight: "900", letterSpacing: 1.1 },
  stepCount: { color: COLORS.muted, fontSize: 9, fontWeight: "700" },
  exerciseLine: { flexDirection: "row", alignItems: "center", gap: 9, minHeight: 29 },
  exerciseDot: { width: 21, height: 21, borderRadius: 8, backgroundColor: COLORS.surfaceRaised, alignItems: "center", justifyContent: "center" },
  exerciseDotActive: { backgroundColor: COLORS.primary },
  exerciseIndex: { color: COLORS.muted, fontSize: 9, fontWeight: "900" },
  exerciseIndexActive: { color: COLORS.background },
  exerciseName: { color: COLORS.text, fontSize: 10, fontWeight: "700" },
  moreText: { color: COLORS.muted, fontSize: 9, marginLeft: 30, marginTop: 3 },
  actions: { flexDirection: "row", gap: 10, marginTop: "auto", paddingTop: 15 },
  pauseButton: { minHeight: 52, minWidth: 98, borderRadius: 16, paddingHorizontal: 14, backgroundColor: COLORS.surfaceRaised, borderWidth: 1, borderColor: COLORS.border, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
  pauseText: { color: COLORS.text, fontSize: 12, fontWeight: "800" },
  finishButton: { flex: 1 },
});
