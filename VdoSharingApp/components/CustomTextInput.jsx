import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Vibration,
} from "react-native"
import { icons } from "../constants"

const CustomTextInput = ({ placeHolder, label, value, handleChange, type }) => {
  const [showPswrd, setShowPswrd] = useState(false)

  return (
    <View className="gap-2">
      <Text className="text-gray-200 text-xl font-pmedium">{label}</Text>
      <View className="border-2 border-black-200 flex-row rounded-2xl w-full bg-black-100 items-center p-2 focus:border-secondary">
        <TextInput
          placeholder={placeHolder}
          placeholderTextColor="gray"
          className="flex-1 text-secondary-200 font-psemibold text-lg"
          autoComplete="off"
          onChangeText={handleChange}
          value={value}
          keyboardType={type}
          secureTextEntry={label === "Password" && !showPswrd}
        />

        {label === "Password" && (
          <TouchableOpacity
            onPress={() => {
              Vibration.vibrate(100)
              setShowPswrd(!showPswrd)
            }}
          >
            <Image
              className="w-8 h-8"
              resizeMode="contain"
              source={!showPswrd ? icons.eye : icons.eyeHide}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default CustomTextInput
