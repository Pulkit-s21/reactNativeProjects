import { useGlobalContext } from "@/context/GlobalProvider"
import { StatusBar } from "expo-status-bar"
import { View, Text, FlatList, Image, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "@/constants"
import { SearchInput } from "@/components/SearchInput"
import { Trending } from "@/components/Trending"
import { EmptyComponent } from "@/components/EmptyComponent"
import { useState } from "react"
import { getAllPosts, getLatestPosts } from "@/lib/appwrite"
import { useAppwrite } from "@/lib/useAppwrite"
import { VideoCard } from "@/components/VideoCard"

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts)
  const { data: latestPosts } = useAppwrite(getLatestPosts)

  const { user } = useGlobalContext()

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  const headerComponent = () => {
    return (
      <View className="my-6 px-4 space-y-6">
        {/* msg and icon div */}
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
        <Trending posts={latestPosts ?? []} />
      </View>
    )
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts} // data for renderItem
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={headerComponent}
        ListEmptyComponent={
          <EmptyComponent
            title={"No videos found"}
            subTitle={"Be the first one to upload a video"}
          />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

export default Home
