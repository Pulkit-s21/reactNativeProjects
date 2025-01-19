import { Stack } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "../context/ThemeContext"

export default function RootLayout() {
  return (
    // wrapping whole app with theme provider to have access to theme everywhere
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          {/* this shows the path to creating new todo, todos is the directory and [id] is dynamic route passed for each todo  */}
          <Stack.Screen name="todos/[id]" />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
