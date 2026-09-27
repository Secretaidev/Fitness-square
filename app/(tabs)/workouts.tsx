import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { BrandMark, SectionHeading, Tag } from "@/components/fitness-ui";
import { ScreenContainer } from "@/components/screen-container";
import { COLORS, WORKOUTS, type WorkoutPlan } from "@/lib/fitness";

const icons: Record<string, React.ComponentProps<typeof MaterialIcons>["name"]> = {
  "full-body-reset": "bolt",
  "upper-body-basics": "fitness-center",
  "legs-and-glutes": "directions-run",
  "core-and-mobility": "self-improvement",
};

export default function WorkoutsScreen() {
  return (
    <ScreenContainer>
      <FlatList
        data={WORKOUTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={<View><View style={styles.brand}><BrandMark /></View><Text style={styles.eyebrow}>TRAIN YOUR WAY</Text><Text style={styles.title}>Find your{`\n`}next session.</Text><Text style={styles.subtitle}>Simple plans to help you build a steady routine.</Text><SectionHeading title="Workout plans" action={`${WORKOUTS.length} plans`} /></View>}
        renderItem={({ item }) => <WorkoutCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

function WorkoutCard({ item }: { item: WorkoutPlan }) {
  return (
    <Pressable accessibilityRole="button" onPress={() => router.push({ pathname: "/workout/[id]", params: { id: item.id } })} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.cardTop}>
        <View style={styles.planIcon}><MaterialIcons name={icons[item.id] ?? "fitness-center"} size={22} color={COLORS.primary} /></View>
        <View style={styles.duration}><MaterialIcons name="schedule" size={14} color={COLORS.muted} /><Text style={styles.durationText}>{item.durationMinutes} min</Text></View>
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.focus}>{item.focus}</Text>
      <View style={styles.tagRow}><Tag>{item.level}</Tag><Text style={styles.equipment}>{item.equipment}</Text></View>
      <View style={styles.cardBottom}><Text style={styles.exerciseCount}>{item.exercises.length} guided movements</Text><View style={styles.arrow}><MaterialIcons name="arrow-forward" size={17} color={COLORS.background} /></View></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 17, paddingBottom: 30 },
  brand: { marginBottom: 27 },
  eyebrow: { color: COLORS.primary, fontSize: 10, fontWeight: "900", letterSpacing: 1.35 },
  title: { color: COLORS.text, fontSize: 31, fontWeight: "900", letterSpacing: -1, lineHeight: 35, marginTop: 8 },
  subtitle: { color: COLORS.muted, fontSize: 13, lineHeight: 19, marginTop: 8, maxWidth: 280 },
  card: { backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1, borderRadius: 22, padding: 17, marginBottom: 12 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  planIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: COLORS.primarySoft, alignItems: "center", justifyContent: "center" },
  duration: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 9, paddingVertical: 6, backgroundColor: COLORS.surfaceRaised, borderRadius: 99 },
  durationText: { color: COLORS.muted, fontSize: 10, fontWeight: "700" },
  cardTitle: { color: COLORS.text, fontSize: 17, fontWeight: "900", marginTop: 14, letterSpacing: -0.3 },
  focus: { color: COLORS.muted, fontSize: 11, marginTop: 4 },
  tagRow: { flexDirection: "row", alignItems: "center", gap: 9, marginTop: 13 },
  equipment: { color: COLORS.muted, fontSize: 10 },
  cardBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderTopColor: COLORS.border, borderTopWidth: 1, marginTop: 15, paddingTop: 13 },
  exerciseCount: { color: COLORS.muted, fontSize: 10, fontWeight: "700" },
  arrow: { width: 30, height: 30, borderRadius: 10, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center" },
});
