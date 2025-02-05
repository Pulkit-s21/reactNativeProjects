import { EmptyComponent } from "@/components/EmptyComponent"
import { useAppwrite } from "@/lib/useAppwrite"
import { FlatList, Text, View, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { searchPosts } from "@/lib/appwrite"
import { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { SearchInput } from "@/components/SearchInput"
import { VideoCard } from "@/components/VideoCard"

const Bookmark = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query))
  // * if we send useAppwrite(searchPosts(query)) then in useAppwrite fn is replaced by searchPosts(query) making it searchPosts(query)() which is like calling an object func which is wrong..so for these cases we have to send it thru callBack func

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  const headerComponent = () => {
    return (
      <View className="my-6 px-4 gap-2">
        {/* msg and icon div */}
        <Text className="text-base text-gray-100 font-pmedium">
          Saved Videos
        </Text>

        <View className="mt-4 mb-8">
          <SearchInput placeHolder={"Search your saved video"} />
        </View>
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
            subTitle={`You have saved no videos`}
          />
        }
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      />
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

export default Bookmark
