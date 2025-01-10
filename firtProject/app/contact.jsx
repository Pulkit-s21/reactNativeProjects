import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  Linking,
} from "react-native"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import espresso from "@/assets/images/menu/Espresso.jpg"

const Container = Platform.OS === "web" ? ScrollView : SafeAreaView

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<Image source={espresso} />}
    >
      <ThemedText type="title">Get in Touch</ThemedText>
      <ThemedText>We are a coffee shop</ThemedText>

      <Container style={{ display: "flex", gap: 15 }}>
        <View style={{ display: "flex", gap: "5" }}>
          <Text style={[styles.heading]}>Call Us at</Text>
          <Text
            onPress={() => Linking.openURL("tel:1234567890")}
            style={styles.Info}
          >
            1234567890
          </Text>
        </View>

        <View style={{ display: "flex", gap: "5" }}>
          <Text style={[styles.heading]}>Message Us at</Text>
          <Text
            onPress={() => Linking.openURL("sms:9876543210")}
            style={styles.Info}
          >
            9876543210
          </Text>
        </View>

        <View style={{ display: "flex", gap: "5" }}>
          <Text style={[styles.heading]}>Visit us from</Text>
          <Text style={styles.Info}>7am to 4pm daily</Text>
        </View>
      </Container>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  heading: {
    fontSize: 25,
    fontWeight: 500,
    color: "white",
  },
  Info: {
    textDecorationLine: "underline",
    fontSize: 18,
    color: "white",
  },
})
