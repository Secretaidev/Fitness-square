import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { BrandMark, MetricCard, PrimaryButton, SectionHeading } from "@/components/fitness-ui";
import { ScreenContainer } from "@/components/screen-container";
import { COLORS, formatMinutes, getThisWeeksWorkouts, useFitness, type WorkoutEntry } from "@/lib/fitness";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function HomeScreen() {
  const { entries, profile, ready } = useFitness();
  const weeklyEntries = getThisWeeksWorkouts(entries);
  const weeklySeconds = weeklyEntries.reduce((sum, item) => sum + item.durationSeconds, 0);
  const recent = entries.slice(0, 3);
  const goalProgress = Math.min(weeklyEntries.length / Math.max(profile.weeklyGoal, 1), 1);

  const header = (
    <View>
      <View style={styles.topBar}>
        <BrandMark />
        <Pressable accessibilityRole="button" accessibilityLabel="Open profile" onPress={() => router.push("/(tabs)/profile")} style={styles.avatar}>
          <Text style={styles.avatarText}>{profile.name.trim() ? profile.name.trim().slice(0, 1).toUpperCase() : "F"}</Text>
        </Pressable>
      </View>

      <Text style={styles.dateText}>{new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" }).toUpperCase()}</Text>
      <Text style={styles.title}>{greeting()}{profile.name.trim() ? `, ${profile.name.trim().split(" ")[0]}` : ""}.</Text>
      <Text style={styles.subtitle}>Small steps. Stronger every day.</Text>

      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>YOUR NEXT SESSION</Text>
            <Text style={styles.heroTitle}>Make today{`\n`}count.</Text>
            <Text style={styles.heroSub}>Choose a plan that fits your day.</Text>
          </View>
          <View style={styles.heroArt}><MaterialIcons name="bolt" size={39} color={COLORS.primary} /></View>
        </View>
        <PrimaryButton icon="play-arrow" onPress={() => router.push("/(tabs)/workouts")}>Explore workouts</PrimaryButton>
      </View>

      <SectionHeading title="This week" action={`${weeklyEntries.length} / ${profile.weeklyGoal} sessions`} />
      <View style={styles.metricsRow}>
        <MetricCard label="Workouts" value={ready ? String(weeklyEntries.length) : "—"} icon="fitness-center" detail={`Goal: ${profile.weeklyGoal} / week`} />
        <MetricCard label="Time moving" value={ready ? formatMinutes(weeklySeconds) : "—"} icon="timer" detail="From completed sessions" />
      </View>
      <View style={styles.goalCard}>
        <View style={styles.goalTextRow}><Text style={styles.goalLabel}>Weekly goal</Text><Text style={styles.goalValue}>{weeklyEntries.length} of {profile.weeklyGoal}</Text></View>
        <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${goalProgress * 100}%` }]} /></View>
      </View>

      <SectionHeading title="Recent activity" action={entries.length ? `${entries.length} total` : "Your log"} />
    </View>
  );

  return (
    <ScreenContainer>
      <FlatList
        data={recent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={header}
        ListEmptyComponent={<View style={styles.empty}><View style={styles.emptyIcon}><MaterialIcons name="event-note" size={21} color={COLORS.primary} /></View><Text style={styles.emptyTitle}>Your first workout is waiting</Text><Text style={styles.emptyCopy}>Finish a session and it will show up here.</Text></View>}
        renderItem={({ item }: { item: WorkoutEntry }) => <ActivityRow item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

function ActivityRow({ item }: { item: WorkoutEntry }) {
  return (
    <View style={styles.activityRow}>
      <View style={styles.activityIcon}><MaterialIcons name="check" size={18} color={COLORS.primary} /></View>
      <View style={styles.activityCopy}><Text style={styles.activityTitle}>{item.title}</Text><Text style={styles.activityDate}>{new Date(item.completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</Text></View>
      <Text style={styles.activityDuration}>{formatMinutes(item.durationSeconds)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 13, paddingBottom: 30 },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 25 },
  avatar: { width: 38, height: 38, borderRadius: 14, backgroundColor: COLORS.surfaceRaised, borderWidth: 1, borderColor: COLORS.border, alignItems: "center", justifyContent: "center" },
  avatarText: { color: COLORS.primary, fontWeight: "900", fontSize: 15 },
  dateText: { color: COLORS.primary, fontSize: 10, fontWeight: "900", letterSpacing: 1.35 },
  title: { color: COLORS.text, fontSize: 29, fontWeight: "900", letterSpacing: -0.9, marginTop: 7 },
  subtitle: { color: COLORS.muted, fontSize: 13, marginTop: 5 },
  hero: { backgroundColor: COLORS.surfaceRaised, borderColor: COLORS.border, borderWidth: 1, borderRadius: 25, padding: 18, marginTop: 22, overflow: "hidden" },
  heroTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 18 },
  heroCopy: { flex: 1 },
  heroEyebrow: { color: COLORS.primary, fontSize: 9, fontWeight: "900", letterSpacing: 1.3 },
  heroTitle: { color: COLORS.text, fontSize: 25, fontWeight: "900", letterSpacing: -0.7, lineHeight: 29, marginTop: 9 },
  heroSub: { color: COLORS.muted, fontSize: 12, marginTop: 6 },
  heroArt: { width: 63, height: 63, borderRadius: 21, backgroundColor: COLORS.primarySoft, alignItems: "center", justifyContent: "center", marginTop: 5 },
  metricsRow: { flexDirection: "row", gap: 11 },
  goalCard: { backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1, borderRadius: 17, padding: 15, marginTop: 11 },
  goalTextRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 11 },
  goalLabel: { color: COLORS.muted, fontSize: 11, fontWeight: "700" },
  goalValue: { color: COLORS.text, fontSize: 11, fontWeight: "800" },
  progressTrack: { height: 7, borderRadius: 9, backgroundColor: COLORS.border, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 9, backgroundColor: COLORS.primary },
  empty: { alignItems: "center", paddingVertical: 22, paddingHorizontal: 18, borderRadius: 19, borderColor: COLORS.border, borderWidth: 1, backgroundColor: COLORS.surface },
  emptyIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: COLORS.primarySoft, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  emptyTitle: { color: COLORS.text, fontSize: 14, fontWeight: "800" },
  emptyCopy: { color: COLORS.muted, fontSize: 11, marginTop: 5, textAlign: "center" },
  activityRow: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1, borderRadius: 17, padding: 13, marginBottom: 9 },
  activityIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: COLORS.primarySoft, alignItems: "center", justifyContent: "center" },
  activityCopy: { flex: 1, marginLeft: 11 },
  activityTitle: { color: COLORS.text, fontSize: 12, fontWeight: "800" },
  activityDate: { color: COLORS.muted, fontSize: 10, marginTop: 4 },
  activityDuration: { color: COLORS.primary, fontSize: 11, fontWeight: "800" },
});
