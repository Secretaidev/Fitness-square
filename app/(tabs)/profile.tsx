import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { BrandMark, PrimaryButton } from "@/components/fitness-ui";
import { ScreenContainer } from "@/components/screen-container";
import { COLORS, useFitness } from "@/lib/fitness";

const GOALS = [2, 3, 4, 5];

export default function ProfileScreen() {
  const { profile, saveProfile } = useFitness();
  const [name, setName] = useState(profile.name);
  const [saved, setSaved] = useState(false);
  useEffect(() => setName(profile.name), [profile.name]);

  const saveName = () => {
    saveProfile({ name: name.trim() });
    setSaved(true);
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.brand}><BrandMark /></View>
        <Text style={styles.eyebrow}>YOUR SPACE</Text>
        <Text style={styles.title}>Make it{`\n`}personal.</Text>
        <Text style={styles.subtitle}>Set a name and a weekly goal that feels right for you.</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}><MaterialIcons name="person-outline" size={28} color={COLORS.primary} /></View>
          <Text style={styles.cardTitle}>{profile.name.trim() || "Fitness Square member"}</Text>
          <Text style={styles.cardSub}>Your details stay on this device.</Text>
        </View>

        <Text style={styles.label}>DISPLAY NAME</Text>
        <TextInput
          value={name}
          onChangeText={(value) => { setName(value); setSaved(false); }}
          placeholder="What should we call you?"
          placeholderTextColor={COLORS.muted}
          returnKeyType="done"
          maxLength={32}
          style={styles.input}
        />
        <PrimaryButton icon={saved ? "check" : "save"} onPress={saveName}>{saved ? "Name saved" : "Save name"}</PrimaryButton>

        <Text style={[styles.label, styles.goalLabel]}>WEEKLY WORKOUT GOAL</Text>
        <Text style={styles.goalIntro}>Choose how many sessions you want to aim for.</Text>
        <View style={styles.goalChoices}>
          {GOALS.map((goal) => {
            const selected = profile.weeklyGoal === goal;
            return <Pressable key={goal} accessibilityRole="button" accessibilityState={{ selected }} onPress={() => saveProfile({ weeklyGoal: goal })} style={({ pressed }) => [styles.goalChoice, selected && styles.goalChoiceActive, pressed && { opacity: 0.75 }]}><Text style={[styles.goalNumber, selected && styles.goalNumberActive]}>{goal}</Text><Text style={[styles.goalSessions, selected && styles.goalNumberActive]}>{goal === 1 ? "session" : "sessions"}</Text></Pressable>;
          })}
        </View>
        <View style={styles.note}><MaterialIcons name="lock-outline" size={16} color={COLORS.primary} /><Text style={styles.noteText}>Workout history and profile are stored locally on your phone.</Text></View>
        <Text style={styles.version}>FITNESS SQUARE · YOUR ROUTINE, YOUR PACE</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 17, paddingBottom: 38 },
  brand: { marginBottom: 27 },
  eyebrow: { color: COLORS.primary, fontSize: 10, fontWeight: "900", letterSpacing: 1.35 },
  title: { color: COLORS.text, fontSize: 31, fontWeight: "900", letterSpacing: -1, lineHeight: 35, marginTop: 8 },
  subtitle: { color: COLORS.muted, fontSize: 13, lineHeight: 19, marginTop: 8, maxWidth: 300 },
  profileCard: { alignItems: "center", backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1, borderRadius: 21, padding: 20, marginTop: 22, marginBottom: 22 },
  avatar: { width: 58, height: 58, borderRadius: 19, backgroundColor: COLORS.primarySoft, alignItems: "center", justifyContent: "center", marginBottom: 11 },
  cardTitle: { color: COLORS.text, fontSize: 14, fontWeight: "900" },
  cardSub: { color: COLORS.muted, fontSize: 10, marginTop: 5 },
  label: { color: COLORS.primary, fontSize: 10, fontWeight: "900", letterSpacing: 1.1, marginBottom: 9 },
  input: { minHeight: 51, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 15, color: COLORS.text, paddingHorizontal: 14, fontSize: 13, marginBottom: 11 },
  goalLabel: { marginTop: 28 },
  goalIntro: { color: COLORS.muted, fontSize: 11, marginBottom: 12 },
  goalChoices: { flexDirection: "row", gap: 9 },
  goalChoice: { flex: 1, minHeight: 75, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1, borderRadius: 16 },
  goalChoiceActive: { backgroundColor: COLORS.primarySoft, borderColor: COLORS.primary },
  goalNumber: { color: COLORS.text, fontSize: 19, fontWeight: "900" },
  goalNumberActive: { color: COLORS.primary },
  goalSessions: { color: COLORS.muted, fontSize: 9, marginTop: 2 },
  note: { flexDirection: "row", alignItems: "center", gap: 9, backgroundColor: COLORS.surface, padding: 13, borderRadius: 14, marginTop: 23 },
  noteText: { flex: 1, color: COLORS.muted, fontSize: 10, lineHeight: 15 },
  version: { color: COLORS.muted, fontSize: 8, fontWeight: "800", letterSpacing: 1, textAlign: "center", marginTop: 26 },
});
