import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/lib/fitness";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 0 : Math.max(insets.bottom, 8);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: [styles.tabBar, { height: 58 + bottomPadding, paddingBottom: bottomPadding }],
        tabBarLabelStyle: styles.label,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => <MaterialIcons name="home-filled" color={color} size={size} /> }} />
      <Tabs.Screen name="workouts" options={{ title: "Workouts", tabBarIcon: ({ color, size }) => <MaterialIcons name="fitness-center" color={color} size={size} /> }} />
      <Tabs.Screen name="progress" options={{ title: "Progress", tabBarIcon: ({ color, size }) => <MaterialIcons name="show-chart" color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size }) => <MaterialIcons name="person-outline" color={color} size={size} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: { backgroundColor: COLORS.background, borderTopWidth: 0, paddingTop: 6, elevation: 0 },
  label: { fontSize: 10, fontWeight: "700", marginTop: 2 },
});
