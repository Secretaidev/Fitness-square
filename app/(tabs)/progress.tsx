import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { BrandMark, MetricCard, SectionHeading } from "@/components/fitness-ui";
import { ScreenContainer } from "@/components/screen-container";
import { COLORS, formatMinutes, getThisWeeksWorkouts, getWeekDays, useFitness } from "@/lib/fitness";

export default function ProgressScreen() {
  const { entries, profile, ready } = useFitness();
  const weeklyEntries = getThisWeeksWorkouts(entries);
  const weeklySeconds = weeklyEntries.reduce((sum, item) => sum + item.durationSeconds, 0);
  const days = getWeekDays(entries);
  const maxMinutes = Math.max(20, ...days.map((day) => day.minutes));

  return (
    <ScreenContainer>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.brand}><BrandMark /></View>
            <Text style={styles.eyebrow}>YOUR CONSISTENCY</Text>
            <Text style={styles.title}>Progress, not{`\n`}perfection.</Text>
            <Text style={styles.subtitle}>Every finished session counts.</Text>
            <SectionHeading title="This week" />
            <View style={styles.metricsRow}>
              <MetricCard label="Sessions" value={ready ? String(weeklyEntries.length) : "—"} icon="check-circle" detail={`Goal: ${profile.weeklyGoal}`} />
              <MetricCard label="Time trained" value={ready ? formatMinutes(weeklySeconds) : "—"} icon="timer" detail="Completed workout time" />
            </View>
            <View style={styles.chartCard}>
              <View style={styles.chartHead}><View><Text style={styles.chartTitle}>Weekly activity</Text><Text style={styles.chartSubtitle}>Minutes logged each day</Text></View><View style={styles.chartIcon}><MaterialIcons name="show-chart" size={18} color={COLORS.primary} /></View></View>
              <View style={styles.bars}>
                {days.map((day) => <View key={day.key} style={styles.barColumn}><Text style={styles.barValue}>{day.minutes || ""}</Text><View style={styles.barTrack}><View style={[styles.barFill, { height: `${Math.max(day.minutes > 0 ? 10 : 0, (day.minutes / maxMinutes) * 100)}%` }]} /></View><Text style={styles.dayLabel}>{day.label}</Text></View>)}
              </View>
            </View>
            <SectionHeading title="Workout log" action={`${entries.length} total`} />
          </View>
        }
        ListEmptyComponent={<View style={styles.empty}><MaterialIcons name="insights" size={24} color={COLORS.primary} /><Text style={styles.emptyTitle}>Your progress starts here</Text><Text style={styles.emptyCopy}>Complete a workout to see it in your log.</Text></View>}
        renderItem={({ item }) => <View style={styles.logRow}><View style={styles.logIcon}><MaterialIcons name="check" size={17} color={COLORS.primary} /></View><View style={styles.logCopy}><Text style={styles.logTitle}>{item.title}</Text><Text style={styles.logDate}>{new Date(item.completedAt).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</Text></View><Text style={styles.logTime}>{formatMinutes(item.durationSeconds)}</Text></View>}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 17, paddingBottom: 30 },
  brand: { marginBottom: 27 },
  eyebrow: { color: COLORS.primary, fontSize: 10, fontWeight: "900", letterSpacing: 1.35 },
  title: { color: COLORS.text, fontSize: 31, fontWeight: "900", letterSpacing: -1, lineHeight: 35, marginTop: 8 },
  subtitle: { color: COLORS.muted, fontSize: 13, marginTop: 8 },
  metricsRow: { flexDirection: "row", gap: 11 },
  chartCard: { backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1, borderRadius: 21, padding: 16, marginTop: 13 },
  chartHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  chartTitle: { color: COLORS.text, fontSize: 14, fontWeight: "900" },
  chartSubtitle: { color: COLORS.muted, fontSize: 10, marginTop: 4 },
  chartIcon: { width: 34, height: 34, borderRadius: 11, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.primarySoft },
  bars: { height: 133, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: 8, marginTop: 15 },
  barColumn: { flex: 1, height: "100%", alignItems: "center", justifyContent: "flex-end" },
  barValue: { color: COLORS.muted, fontSize: 9, height: 15 },
  barTrack: { width: "100%", height: 88, backgroundColor: COLORS.surfaceRaised, borderRadius: 9, justifyContent: "flex-end", overflow: "hidden" },
  barFill: { backgroundColor: COLORS.primary, width: "100%", borderRadius: 9, minHeight: 0 },
  dayLabel: { color: COLORS.muted, fontSize: 9, fontWeight: "700", marginTop: 7 },
  logRow: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1, borderRadius: 17, padding: 13, marginBottom: 9 },
  logIcon: { width: 37, height: 37, borderRadius: 13, backgroundColor: COLORS.primarySoft, alignItems: "center", justifyContent: "center" },
  logCopy: { flex: 1, marginLeft: 11 },
  logTitle: { color: COLORS.text, fontSize: 12, fontWeight: "800" },
  logDate: { color: COLORS.muted, fontSize: 10, marginTop: 4 },
  logTime: { color: COLORS.primary, fontSize: 11, fontWeight: "800" },
  empty: { alignItems: "center", padding: 22, borderRadius: 18, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  emptyTitle: { color: COLORS.text, fontSize: 13, fontWeight: "800", marginTop: 10 },
  emptyCopy: { color: COLORS.muted, fontSize: 11, textAlign: "center", marginTop: 5 },
});
