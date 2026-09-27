import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, StyleSheet, Text, View, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { COLORS } from "@/lib/fitness";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <View style={styles.brandRow}>
      <View style={styles.brandIcon}><MaterialIcons name="fitness-center" size={17} color={COLORS.background} /></View>
      {!compact && <Text style={styles.brandText}>FITNESS <Text style={styles.brandAccent}>SQUARE</Text></Text>}
    </View>
  );
}

export function SectionHeading({ title, action }: { title: string; action?: string }) {
  return (
    <View style={styles.sectionRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Text style={styles.sectionAction}>{action}</Text> : null}
    </View>
  );
}

type PrimaryButtonProps = {
  children: string;
  onPress: PressableProps["onPress"];
  icon?: React.ComponentProps<typeof MaterialIcons>["name"];
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({ children, onPress, icon, disabled = false, style }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.primaryButton, style, (pressed || disabled) && styles.pressed, disabled && styles.disabled]}
    >
      {icon ? <MaterialIcons name={icon} size={20} color={COLORS.background} /> : null}
      <Text style={styles.primaryButtonText}>{children}</Text>
    </Pressable>
  );
}

export function MetricCard({ label, value, icon, detail }: { label: string; value: string; icon: React.ComponentProps<typeof MaterialIcons>["name"]; detail?: string }) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricIcon}><MaterialIcons name={icon} size={18} color={COLORS.primary} /></View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
      {detail ? <Text style={styles.metricDetail}>{detail}</Text> : null}
    </View>
  );
}

export function Tag({ children }: { children: string }) {
  return <View style={styles.tag}><Text style={styles.tagText}>{children}</Text></View>;
}

const styles = StyleSheet.create({
  brandRow: { flexDirection: "row", alignItems: "center", gap: 9 },
  brandIcon: { width: 31, height: 31, borderRadius: 10, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center" },
  brandText: { color: COLORS.text, fontSize: 12, fontWeight: "900", letterSpacing: 1.25 },
  brandAccent: { color: COLORS.primary },
  sectionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 13, marginTop: 25 },
  sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: "800", letterSpacing: -0.35 },
  sectionAction: { color: COLORS.primary, fontSize: 12, fontWeight: "700" },
  primaryButton: { minHeight: 52, borderRadius: 16, paddingHorizontal: 18, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  primaryButtonText: { color: COLORS.background, fontSize: 14, fontWeight: "900", letterSpacing: 0.15 },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.55 },
  metricCard: { flex: 1, minHeight: 124, backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1, borderRadius: 20, padding: 15, justifyContent: "center" },
  metricIcon: { width: 31, height: 31, borderRadius: 10, backgroundColor: COLORS.primarySoft, alignItems: "center", justifyContent: "center", marginBottom: 11 },
  metricValue: { color: COLORS.text, fontSize: 23, fontWeight: "900", letterSpacing: -0.8 },
  metricLabel: { color: COLORS.muted, fontSize: 11, fontWeight: "700", marginTop: 3 },
  metricDetail: { color: COLORS.muted, fontSize: 10, marginTop: 3 },
  tag: { alignSelf: "flex-start", backgroundColor: COLORS.primarySoft, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 99 },
  tagText: { color: COLORS.primary, fontSize: 10, fontWeight: "800", letterSpacing: 0.3 },
});
