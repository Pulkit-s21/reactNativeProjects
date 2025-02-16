import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"

export default function Index() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")

  const btns = [
    "AC",
    "%",
    "<=",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "00",
    "0",
    ".",
    "=",
  ]

  const onBtnPress = (value) => {
    if (value === "=") {
      try {
        setResult(eval(input)) // eval does all the calculation
      } catch (err) {
        setResult("Error")
      }
    } else if (value === "AC") {
      setResult("")
      setInput("")
    } else if (value === "<=") {
      setInput(input.slice(0, -1))
    } else {
      setInput(input + value)
    }
  }

  return (
    <SafeAreaView className="h-full justify-center">
      <View>
        <View className="mb-2">
          <Text className="text-5xl font-semibold">{result}</Text>
        </View>
        <TextInput
          value={input}
          onChangeText={setInput}
          keyboardType="numeric"
          className="border border-gray-500 text-4xl"
        />
      </View>
      <View className="flex-row flex-wrap">
        {btns.map((item, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => {
                onBtnPress(item)
              }}
              className={`w-[25%] h-[23%] justify-center items-center border-[0.2px] ${
                item === "=" && "bg-red-500"
              }`}
            >
              <Text className={`text-2xl ${item === "=" && "text-white"}`}>
                {item}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  )
}
