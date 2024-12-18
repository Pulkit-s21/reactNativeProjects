import {
  View,
  Image,
  Text,
  StyleSheet,
  Appearance,
  Platform,
  SafeAreaView,
  FlatList,
} from "react-native"
import React from "react"
import { Colors } from "@/constants/Colors"
import { ScrollView } from "react-native-gesture-handler"
import { MenuItems } from "@/constants/MenuItem"

const menu = () => {
  const colorScheme = Appearance.getColorScheme()
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light
  const style = createStyles(theme, colorScheme)
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView // setting the type of scroll based on OS
  return (
    <Container>
      <FlatList
        data={MenuItems} // array over which it loops
        keyExtractor={(item) => item.id} // key
        renderItem={({ item }) => (
          <View>
            <View>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
            {/* <Image source={()}></Image> */}
          </View>
        )}
      />
    </Container>
  )
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({})
}

export default menu
