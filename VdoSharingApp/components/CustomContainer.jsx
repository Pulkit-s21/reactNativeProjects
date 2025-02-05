import { StatusBar } from "expo-status-bar"
import { View, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const CustomContainer = ({ containerStyle, children }) => {
  return (
    <SafeAreaView className="bg-primary h-full px-6">
      <ScrollView>
        <View className={`h-[85vh] justify-center ${containerStyle}`}>
          {children}
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

export default CustomContainer
