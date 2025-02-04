import { EmptyComponent } from "@/components/EmptyComponent"
import { useAppwrite } from "@/lib/useAppwrite"
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { getUserPosts } from "@/lib/appwrite"
import { useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { SearchInput } from "@/components/SearchInput"
import { VideoCard } from "@/components/VideoCard"
import { useGlobalContext } from "@/context/GlobalProvider"
import { icons } from "@/constants"
import { InfoBox } from "@/components/InfoBox"

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id))
  // * if we send useAppwrite(searchPosts(query)) then in useAppwrite fn is replaced by searchPosts(query) making it searchPosts(query)() which is like calling an object func which is wrong..so for these cases we have to send it thru callBack func

  const headerComponent = () => {
    return (
      <View className="w-full justify-center items-center mb-12 mt-6 px-4">
        <TouchableOpacity className="w-full items-end mb-10" onPress={() => {}}>
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>
        <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
          <Image
            source={{ uri: user?.avatar }}
            className="w-[90%] h-[90%] rounded-lg"
            resizeMode="cover"
          />
        </View>
        <InfoBox
          title={user?.username}
          containerStyles="mt-5"
          titleStyles="text-lg"
        />
        <View className="mt-5 flex-row">
          <InfoBox
            title={posts.length || 0}
            subTitle="Posts"
            containerStyles="mr-10"
            titleStyles="text-xl"
          />
          <InfoBox
            title="1.2K"
            subTitle="Followers"
            titleStyles="text-xl"
          />
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
            subTitle={`No videos were uploaded by ${user.$id} user`}
          />
        }
      />
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

export default Profile
