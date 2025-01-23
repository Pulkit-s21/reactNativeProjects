import { View, Text, Image, TouchableOpacity, Vibration } from "react-native"
import { images } from "../../constants"
import { router } from "expo-router"
import { useState } from "react"
import CustomTextInput from "@/components/CustomTextInput"
import CustomButton from "@/components/CustomButton"
import CustomContainer from "@/components/CustomContainer"

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  })

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
        <CustomButton title={"Sing Up"} handlePress={() => {}} />
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
