import CustomContainer from "@/components/CustomContainer"
import CustomTextInput from "@/components/CustomTextInput"
import { icons } from "@/constants"
import { useState } from "react"
import { View, Text, TouchableOpacity, Image, Alert } from "react-native"
import { Video, ResizeMode } from "expo-av"
import { CustomButton } from "@/components/CustomButton"
import { createPost } from "@/lib/appwrite"
import * as ImagePicker from "expo-image-picker"
import { useGlobalContext } from "@/context/GlobalProvider"

const Create = () => {
  const { user } = useGlobalContext()
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    video: "",
    thumbnail: "",
    prompt: "",
  })

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ? "images" : "videos",
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] })
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] })
      }
    }
  }

  const onSubmit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert("Message", "Please fill in all the details")
    }
    setUploading(true)
    try {
      await createPost({
        ...form,
        userId: user.$id,
      })
      Alert.alert("Success", "Post uploaded successfullt")
      router.push("/home")
    } catch (err) {
      Alert.alert("Error", err.message)
    } finally {
      setForm({
        title: "",
        video: "",
        thumbnail: "",
        prompt: "",
      })
    }
  }

  return (
    <CustomContainer>
      <Text className="text-4xl text-white font-psemibold">Upload Video</Text>

      <CustomTextInput
        label="Video Title"
        value={form.title}
        placeHolder={"Give your video a catchy title"}
        handleChange={(e) => {
          setForm({ ...form, title: e })
        }}
        className={"mt-10"}
      />

      <View className="mt-10 space-y-2">
        <Text className="text-xl text-gray-100 font-pmedium">
          Upload a video
        </Text>
        <TouchableOpacity onPress={() => openPicker("video")}>
          {form.video ? (
            <Video
              source={{ uri: form.video.uri }}
              className="w-full h-64 rounded-2xl"
              resizeMode={ResizeMode.COVER}
            />
          ) : (
            <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
              <View className="w-14 h-14 border border-dashed border-secondary-100 items-center justify-center">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-1/2 h-1/2"
                />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View className="mt-10 space-y-2">
        <Text className="text-xl text-gray-100 font-pmedium">
          Thumbnail Image
        </Text>

        <TouchableOpacity onPress={() => openPicker("image")}>
          {form.thumbnail ? (
            <Image
              source={{ uri: form.thumbnail.uri }}
              className="w-full h-64 rounded-2xl"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row gap-2">
              <Image
                source={icons.upload}
                resizeMode="contain"
                className="w-5 h-5"
              />
              <Text className="text-sm text-gray-100 font-pmedium">
                Choose a file
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <CustomTextInput
        label="AI Prompt"
        value={form.prompt}
        placeHolder={"The prompt you used to generate this video"}
        handleChange={(e) => {
          setForm({ ...form, prompt: e })
        }}
        className={"mt-10"}
      />

      <CustomButton
        title={"Submit & Publish"}
        handlePress={onSubmit}
        containerStyle={"mt-10"}
        isLoading={uploading}
      />
    </CustomContainer>
  )
}

export default Create
