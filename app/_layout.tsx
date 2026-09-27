import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FitnessProvider, COLORS } from "@/lib/fitness";
import { ThemeProvider } from "@/lib/theme-provider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <FitnessProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.background }, animation: "fade_from_bottom" }} />
        </FitnessProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
