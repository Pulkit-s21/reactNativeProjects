import { Link } from "expo-router"
import { View, Text, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SignIn = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-[85vh] justify-center items-center">
          <Link className="text-white" href="/">
            Go to index page
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
