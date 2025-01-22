import { Text, TouchableOpacity, Vibration } from "react-native"

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyle,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      className={`rounded-xl min-h-16 justify-center items-center bg-secondary ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
      onPress={() => {
        Vibration.vibrate(100)
        handlePress()
      }}
      activeOpacity={0.7}
    >
      <Text className={`text-primary text-xl font-psemibold ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
