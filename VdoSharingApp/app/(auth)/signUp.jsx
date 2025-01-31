import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Vibration,
  Alert,
} from "react-native"
import { images } from "../../constants"
import { router } from "expo-router"
import { useState } from "react"
import { createUser } from "../../lib/appwrite"
import { CustomButton } from "@/components/CustomButton"
import CustomTextInput from "@/components/CustomTextInput"
import CustomContainer from "@/components/CustomContainer"

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext()
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // parameters need to be exactly the same as in appwrite or else they give error
  const submit = async () => {
    if (!signUpData.username || !signUpData.email || !signUpData.password) {
      Alert.alert("Error", "Please fill in all the details")
    }
    setIsSubmitting(true)
    try {
      const result = await createUser(
        signUpData.email,
        signUpData.password,
        signUpData.username
      )
      //setting it to global state..
      setUser(result)
      setIsLoggedIn(true)

      router.replace("/home")
    } catch (err) {
      Alert.alert("Error", err.message)
      setIsSubmitting(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <CustomContainer>
      <Image source={images.logo} resizeMode="contain" className="w-40 h-32" />

      <Text className="text-4xl text-white font-psemibold">Sign up</Text>

      {/* Form div */}
      <View className="gap-6 mt-7">
        <CustomTextInput
          label={"Username"}
          placeHolder={"Your unique username"}
          value={signUpData.username}
          handleChange={(e) => setSignUpData({ ...signUpData, username: e })}
        />
        <CustomTextInput
          label={"Email"}
          placeHolder={"Your email address"}
          value={signUpData.email}
          type={"email-address"}
          handleChange={(e) => setSignUpData({ ...signUpData, email: e })}
        />
        <CustomTextInput
          label={"Password"}
          placeHolder={"Password"}
          value={signUpData.password}
          type={"password"}
          handleChange={(e) => setSignUpData({ ...signUpData, password: e })}
        />
        <CustomButton
          title={"Sign Up"}
          handlePress={submit}
          containerStyle={"w-full mt-7"}
          isLoading={isSubmitting} // bcz this action will take some time
        />
        <View className="flex-row justify-center">
          <Text className="text-gray-100">Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              Vibration.vibrate(100)
              router.push("/signIn")
            }}
          >
            <Text className="text-secondary-200 font-pmedium">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomContainer>
  )
}

export default SignUp
