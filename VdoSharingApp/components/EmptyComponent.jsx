import { images } from "@/constants"
import { View, Text, Image } from "react-native"
import { CustomButton } from "./CustomButton"
import { router } from "expo-router"

export const EmptyComponent = ({ title, subTitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-64 h-56" resizeMode="contain" />
      <Text className="text-xl text-white text-center font-psemibold">
        {subTitle}
      </Text>
      <Text className="text-base text-gray-100 mt-2 font-pmedium">{title}</Text>
      <CustomButton
        title={"Create"}
        handlePress={() => {
          router.push("/create")
        }}
        containerStyle={"w-full my-5"}
      />
    </View>
  )
}
