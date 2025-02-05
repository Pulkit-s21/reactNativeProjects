import { EmptyComponent } from "@/components/EmptyComponent"
import { useAppwrite } from "@/lib/useAppwrite"
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { getUserPosts, signOut } from "@/lib/appwrite"
import { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { SearchInput } from "@/components/SearchInput"
import { VideoCard } from "@/components/VideoCard"
import { useGlobalContext } from "@/context/GlobalProvider"
import { icons } from "@/constants"
import { InfoBox } from "@/components/InfoBox"
import { router } from "expo-router"

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id))
  // * if we send useAppwrite(searchPosts(query)) then in useAppwrite fn is replaced by searchPosts(query) making it searchPosts(query)() which is like calling an object func which is wrong..so for these cases we have to send it thru callBack func

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  const headerComponent = () => {
    return (
      <View className="w-full justify-center items-center mb-12 mt-6 px-4">
        <TouchableOpacity
          className="w-full items-end mb-10"
          onPress={async () => {
            await signOut()
            setUser(null)
            setIsLoggedIn(false)

            router.replace("/signIn")
          }}
        >
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="w-7 h-7"
          />
        </TouchableOpacity>
        <View className="flex-row gap-4">
          <Image
            source={{ uri: user?.avatar }}
            className="w-16 rounded-lg border border-secondary"
            resizeMode="cover"
          />
          <View className="flex-col flex-1 gap-2 justify-center items-start">
            <Text className="text-white text-2xl font-psemibold">
              {user?.username}
            </Text>
            <Text className="text-gray-100 text-sm">{user?.email}</Text>
          </View>
          <View className="mt-5 flex-row items-start">
            <InfoBox
              title={3}
              subTitle="Posts"
              containerStyles="mr-10"
              titleStyles="text-2xl"
            />
            <InfoBox title="1.2K" subTitle="Followers" titleStyles="text-2xl" />
          </View>
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
            subTitle={`No videos were uploaded by ${user?.$id} user`}
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

export default Profile
