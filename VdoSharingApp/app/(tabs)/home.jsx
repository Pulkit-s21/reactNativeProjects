import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Home = () => {
  return (
    <SafeAreaView>
      <View className="">
        <Text className="text-red-500 text-3xl">Home</Text>
      </View>
    </SafeAreaView>
  )
}

export default Home
