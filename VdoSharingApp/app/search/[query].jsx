import { EmptyComponent } from "@/components/EmptyComponent"
import { useAppwrite } from "@/lib/useAppwrite"
import { useLocalSearchParams } from "expo-router"
import { FlatList, Text, View, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { searchPosts } from "@/lib/appwrite"
import { useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { SearchInput } from "@/components/SearchInput"
import { VideoCard } from "@/components/VideoCard"

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query))
  // * if we send useAppwrite(searchPosts(query)) then in useAppwrite fn is replaced by searchPosts(query) making it searchPosts(query)() which is like calling an object func which is wrong..so for these cases we have to send it thru callBack func

  useEffect(() => {
    refetch()
  }, [query])

  const headerComponent = () => {
    return (
      <View className="my-6 px-4 gap-2">
        {/* msg and icon div */}
        <Text className="text-base text-gray-100 font-pmedium">
          Search Results
        </Text>
        <Text className="text-3xl text-white font-psemibold">{query}</Text>

        <View className="mt-4 mb-8">
          <SearchInput initialQuery={query} />
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
            subTitle={`No videos found for ${query} query`}
          />
        }
      />
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

export default Search
