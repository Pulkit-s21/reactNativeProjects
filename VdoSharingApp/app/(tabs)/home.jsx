import { useGlobalContext } from "@/context/GlobalProvider"
import { StatusBar } from "expo-status-bar"
import { View, Text, FlatList, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "@/constants"
import { SearchInput } from "@/components/SearchInput"

const Home = () => {
  const { user } = useGlobalContext()

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={[{ id: 1 }, { id: 2 }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text className="text-3xl">{item.id}</Text>}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6 px-2">
              <View className="gap-2">
                <Text className="text-sm text-gray-100 font-pmedium">
                  Welcome Back
                </Text>
                <Text className="text-3xl text-white font-psemibold">
                  {user.username}
                </Text>
              </View>

              <View>
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput placeHolder={"Search for a video topic"} />

            <View className="w-full flex-1 pt-5">
              <Text className="text-lg text-gray-100 font-pregular mt-5">
                Trending Videos
              </Text>
            </View>
          </View>
        )}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

export default Home
