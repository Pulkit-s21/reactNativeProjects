import { View, Text } from "react-native"

export const InfoBox = ({ title, subTitle, containerStyles, titleStyles }) => {
  return (
    <View className={containerStyles}>
      <Text className={`${titleStyles} text-white font-psemibold text-center`}>
        {title}
      </Text>
      <Text className={`text-gray-100 font-pregular text-sm`}>{subTitle}</Text>
    </View>
  )
}
