import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native"
import { Link } from "expo-router"
import React from "react"
import leaf from "@/assets/images/leaf.jpg"

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={leaf} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Leaf</Text>
        <Link style={{ marginHorizontal: "auto" }} href="/contact" asChild>
          {/* asChild is req to convert this link to btn and work */}
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Conact Us</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    </View>
  )
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 42,
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  button: {
    width: 150,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.95)",
    padding: 6,
    justifyContent: "center",
  },
  buttonText: {
    color: "lightblue",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingBlock: 4,
  },
})

export default app
