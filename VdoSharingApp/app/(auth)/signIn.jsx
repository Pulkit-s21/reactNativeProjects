import { View, Text, Image, TouchableOpacity, Vibration } from "react-native"
import { images } from "../../constants"
import { router } from "expo-router"
import { useState } from "react"
import CustomButton from "@/components/CustomButton"
import CustomTextInput from "@/components/CustomTextInput"
import CustomContainer from "@/components/CustomContainer"

const SignIn = () => {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })

  const [isSubmitting, setisSubmitting] = useState(false)

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
        {/* TODO: Add functionality */}
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
          handlePress={() => {}}
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
