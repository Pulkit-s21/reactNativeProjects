import { useState } from "react"
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Vibration,
  Alert,
} from "react-native"
import { icons } from "../constants"
import { router, usePathname } from "expo-router"

export const SearchInput = ({ placeHolder, initialQuery }) => {
  const pathName = usePathname()
  const [query, setQuery] = useState(initialQuery || "")
  return (
    <View className="border-2 border-black-200 flex-row rounded-2xl w-full bg-black-100 items-center p-2 focus:border-secondary space-x-4">
      <TextInput
        placeholder={placeHolder}
        placeholderTextColor="#CDCDE0"
        className="flex-1 text-base mt-0.5 font-pregular text-white"
        autoComplete="off"
        onChangeText={(e) => setQuery(e)}
        value={query}
      />

      <TouchableOpacity
        onPress={() => {
          Vibration.vibrate(100)
          if (!query) {
            return Alert.alert(
              "Missing Query",
              "Please input something to search across database"
            )
          }

          if (pathName.startsWith("/search")) router.setParams({ query })
          else router.push(`search/${query}`)
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  )
}
