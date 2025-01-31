import { useState } from "react"
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Vibration,
} from "react-native"
import { icons } from "../constants"

export const SearchInput = ({
  placeHolder,
  label,
  value,
  handleChange,
  type,
}) => {
  return (
    <View className="border-2 border-black-200 flex-row rounded-2xl w-full bg-black-100 items-center p-2 focus:border-secondary space-x-4">
      <TextInput
        placeholder={placeHolder}
        placeholderTextColor="gray"
        className="flex-1 text-base mt-0.5 font-pregular text-white"
        autoComplete="off"
        onChangeText={handleChange}
        value={value}
        keyboardType={type}
        secureTextEntry={label === "Password" && !showPswrd}
      />

      <TouchableOpacity
        onPress={() => {
          Vibration.vibrate(100)
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  )
}
