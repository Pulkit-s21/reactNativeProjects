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
import { getCurrentUser, signIn } from "@/lib/appwrite"
import { CustomButton } from "@/components/CustomButton"
import CustomTextInput from "@/components/CustomTextInput"
import CustomContainer from "@/components/CustomContainer"
import { useGlobalContext } from "@/context/GlobalProvider"

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext()
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!signInData.email || !signInData.password) {
      Alert.alert("Error", "Please fill in all the details")
    }
    setIsSubmitting(true)
    try {
      await signIn(signInData.email, signInData.password)
      // setting it to global state

      const result = await getCurrentUser()
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
      <Image source={images.logo} className="w-40 h-32" resizeMode="contain" />

      <Text className="text-4xl text-white font-psemibold">Log in</Text>

      {/* Form view */}
      <View className="gap-6 mt-7">
        <CustomTextInput
          placeHolder={"Your email address"}
          label={"Email"}
          value={signInData.email}
          type={"email-address"}
          handleChange={(e) => setSignInData({ ...signInData, email: e })}
        />
        <CustomTextInput
          placeHolder={"Password"}
          label={"Password"}
          value={signInData.password}
          type={"password"}
          handleChange={(e) => setSignInData({ ...signInData, password: e })}
        />
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(100)
          }}
        >
          <Text className="text-gray-100 text-lg text-right">
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <CustomButton
          title={"Log In"}
          handlePress={submit}
          containerStyle={"w-full mt-7"}
          isLoading={isSubmitting} // bcz this action will take some time
        />
        <View className="flex-row justify-center">
          <Text className="text-gray-100">Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              Vibration.vibrate(100)
              router.push("/signUp")
            }}
          >
            <Text className="text-secondary-200 font-pmedium">Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomContainer>
  )
}

export default SignIn
