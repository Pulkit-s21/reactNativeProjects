import { useLocalSearchParams } from "expo-router"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from "react"
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native"

export default EditScreen = () => {
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
  const styles = createStyles(theme, colorScheme)
  const { id } = useLocalSearchParams()

  return (
    <View style={{ marginTop: 50 }}>
      <Text style={{ color: "black" }}>{id}</Text>
    </View>
  )
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme.background,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
      paddingRight: 15,
      width: "100%",
      maxWidth: 600,
      height: 60,
      marginBottom: 10,
      overflow: "hidden",
      marginHorizontal: "auto",
    },
    separator: {
      height: 0.5,
      backgroundColor: colorScheme === "dark" ? "papayawhip" : "#000",
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      marginBottom: 10,
    },
    textRow: {
      display: "flex",
      gap: 5,
      width: "65%",
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 5,
      flexGrow: 1,
      fontFamily: "Inter_500Medium",
      color: colorScheme === "dark" ? "white" : "black",
    },
    addBtn: {
      backgroundColor: "white",
    },
    addBtnText: {
      color: "black",
      paddingVertical: 5,
      fontSize: 15,
      paddingHorizontal: 15,
      borderRadius: 3,
      pointerEvents: "auto",
    },
    completedText: {
      textDecorationLine: "line-through",
      color: "gray",
    },
  })
}
