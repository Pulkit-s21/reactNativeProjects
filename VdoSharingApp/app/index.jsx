import { Text, View, Image } from "react-native"
import { StatusBar } from "expo-status-bar"
import { images } from "../constants"
import { Redirect, router } from "expo-router"
import "react-native-reanimated"
import CustomButton from "@/components/CustomButton"
import CustomContainer from "@/components/CustomContainer"

const App = () => {
  return (
    <CustomContainer containerStyle={"items-center"}>
      <Image source={images.logo} resizeMode="contain" className="w-32 h-20" />

      <Image
        source={images.cards}
        resizeMode="contain"
        className="w-full h-96"
      />

      {/* heading view (div)..relative for placing line below Aora */}
      <View className="relative mt-5">
        <Text className="text-4xl text-white font-bold text-center capitalize">
          Discover endless possibilites with{" "}
          <Text className="text-secondary-200">Aora</Text>{" "}
        </Text>

        <Image
          source={images.path}
          className="absolute -right-3 -bottom-2 w-32 h-[15px]"
          resizeMode="contain"
        />
      </View>

      <Text className="text-sm mt-7 text-gray-100 font-pregular text-center tracking-wide">
        where creativity meets innovation: embark on a journey of limitless
        exploration with Aora
      </Text>

      <CustomButton
        title={"Continue with Email"}
        handlePress={() => {
          router.push("/signIn")
        }}
        containerStyle={"w-full mt-7"}
      />
      <StatusBar style="light" />
    </CustomContainer>
  )
}

export default App
