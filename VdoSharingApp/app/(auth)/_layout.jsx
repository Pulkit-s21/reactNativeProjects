import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signIn" />
        <Stack.Screen name="signUp" />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default AuthLayout
