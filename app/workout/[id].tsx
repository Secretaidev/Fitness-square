import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PrimaryButton, Tag } from "@/components/fitness-ui";
import { ScreenContainer } from "@/components/screen-container";
import { COLORS, WORKOUTS } from "@/lib/fitness";

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const plan = WORKOUTS.find((item) => item.id === id);

  if (!plan) {
    return <ScreenContainer><View style={styles.missing}><Text style={styles.title}>Workout not found</Text><PrimaryButton icon="arrow-back" onPress={() => router.back()}>Back to plans</PrimaryButton></View></ScreenContainer>;
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} style={styles.back}><MaterialIcons name="arrow-back" size={21} color={COLORS.text} /></Pressable>
        <View style={styles.heroIcon}><MaterialIcons name="fitness-center" size={30} color={COLORS.primary} /></View>
        <Text style={styles.eyebrow}>WORKOUT PLAN</Text>
        <Text style={styles.title}>{plan.title}</Text>
        <Text style={styles.subtitle}>{plan.focus}</Text>
        <View style={styles.tags}><Tag>{plan.level}</Tag><Tag>{`${plan.durationMinutes} min`}</Tag></View>

        <View style={styles.infoCard}><MaterialIcons name="info-outline" size={18} color={COLORS.primary} /><Text style={styles.infoText}>Move at a pace that feels comfortable. Stop if you feel pain or unwell.</Text></View>
        <Text style={styles.sectionTitle}>Your session</Text>
        <Text style={styles.sectionSub}>{plan.exercises.length} movements · {plan.equipment}</Text>
        <View style={styles.exerciseList}>
          {plan.exercises.map((exercise, index) => <View key={`${plan.id}-${exercise}`} style={styles.exerciseRow}><View style={styles.exerciseNumber}><Text style={styles.numberText}>{String(index + 1).padStart(2, "0")}</Text></View><Text style={styles.exerciseText}>{exercise}</Text><MaterialIcons name="check-circle-outline" size={18} color={COLORS.muted} /></View>)}
        </View>
        <PrimaryButton icon="play-arrow" onPress={() => router.push({ pathname: "/session/[id]", params: { id: plan.id } })} style={styles.startButton}>Start workout</PrimaryButton>
        <Text style={styles.footer}>The timer starts when you begin. You can pause or finish anytime.</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 35 },
  missing: { flex: 1, padding: 22, justifyContent: "center", gap: 20 },
  back: { width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, marginBottom: 25 },
  heroIcon: { width: 70, height: 70, borderRadius: 23, backgroundColor: COLORS.primarySoft, alignItems: "center", justifyContent: "center", marginBottom: 21 },
  eyebrow: { color: COLORS.primary, fontSize: 10, fontWeight: "900", letterSpacing: 1.3 },
  title: { color: COLORS.text, fontSize: 29, fontWeight: "900", letterSpacing: -0.8, marginTop: 8 },
  subtitle: { color: COLORS.muted, fontSize: 13, marginTop: 6 },
  tags: { flexDirection: "row", gap: 8, marginTop: 14 },
  infoCard: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1, padding: 13, borderRadius: 16, marginTop: 22 },
  infoText: { flex: 1, color: COLORS.muted, fontSize: 10, lineHeight: 15 },
  sectionTitle: { color: COLORS.text, fontSize: 17, fontWeight: "900", marginTop: 25 },
  sectionSub: { color: COLORS.muted, fontSize: 10, marginTop: 5, marginBottom: 12 },
  exerciseList: { borderRadius: 19, overflow: "hidden", borderColor: COLORS.border, borderWidth: 1 },
  exerciseRow: { minHeight: 57, flexDirection: "row", alignItems: "center", gap: 11, paddingHorizontal: 13, backgroundColor: COLORS.surface, borderBottomColor: COLORS.border, borderBottomWidth: StyleSheet.hairlineWidth },
  exerciseNumber: { width: 31, height: 31, borderRadius: 10, backgroundColor: COLORS.primarySoft, alignItems: "center", justifyContent: "center" },
  numberText: { color: COLORS.primary, fontSize: 9, fontWeight: "900" },
  exerciseText: { color: COLORS.text, fontSize: 12, fontWeight: "700", flex: 1 },
  startButton: { marginTop: 20 },
  footer: { color: COLORS.muted, fontSize: 10, lineHeight: 15, textAlign: "center", marginTop: 10 },
});
