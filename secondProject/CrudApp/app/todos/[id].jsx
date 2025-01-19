import { useLocalSearchParams, useRouter } from "expo-router"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext, useState, useEffect } from "react"
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter"
import { Vibration } from "react-native"
import { StatusBar } from "expo-status-bar"
import Octicons from "@expo/vector-icons/Octicons"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default EditScreen = () => {
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
  const styles = createStyles(theme, colorScheme)
  const { id } = useLocalSearchParams()
  const [todo, setTodo] = useState({})
  const router = useRouter()
  const [loaded, error] = useFonts({ Inter_500Medium })

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp")
        const storageTodos = jsonValue !== null ? JSON.parse(jsonValue) : null

        if (storageTodos && storageTodos.length) {
          const myTodo = storageTodos.find((todo) => todo.id.toString() === id) // bcz any param we get will be a string
          setTodo(myTodo)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData(id)
  }, [id])

  const handleSave = async () => {
    try {
      const savedTodo = { ...todo, title: todo.title }
      const jsonValue = await AsyncStorage.getItem("TodoApp")
      const storageTodos = jsonValue !== null ? JSON.parse(jsonValue) : null

      if (storageTodos && storageTodos.length) {
        const otherTodos = storageTodos.filter(
          (todo) => todo.id !== savedTodo.id
        )
        const allTodos = [...otherTodos, savedTodo]

        await AsyncStorage.setItem("TodoApp", JSON.stringify(allTodos))
      } else {
        await AsyncStorage.setItem("TodoApp", JSON.stringify([savedTodo])) // if all todos are deleted and this is the only todo left, we create new array and put it
      }

      router.push("/") // after saving we go back to homepage
    } catch (error) {
      console.error(error)
    }
  }

  // keep this at end
  if (!loaded & !error) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Edit Todo"
          placeholderTextColor="gray"
          value={todo?.title || ""}
          onChangeText={(text) => setTodo((prev) => ({ ...prev, title: text }))}
        />
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(100)
            setColorScheme(colorScheme === "dark" ? "light" : "dark")
          }}
          style={{ marginLeft: 10 }}
        >
          {colorScheme === "dark" ? (
            <Octicons
              name="moon"
              size={36}
              selectable={undefined}
              color={theme.icon}
              style={{ width: 36 }}
            />
          ) : (
            <Octicons
              name="sun"
              size={36}
              selectable={undefined}
              color={theme.icon}
              style={{ width: 36 }}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={[styles.inputContainer, { flexDirection: "column" }]}>
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(100)
            handleSave()
          }}
          style={styles.saveBtn}
        >
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(100)
            router.push("/")
          }}
          style={[styles.saveBtn, { backgroundColor: "red" }]}
        >
          <Text style={[styles.saveBtnText, { color: "white" }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  )
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      gap: 6,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    input: {
      flex: 1,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      marginRight: 10,
      fontSize: 18,
      fontFamily: "Inter_500Medium",
      minWidth: 0,
      color: theme.text,
    },
    saveBtn: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
      width: "100%",
    },
    saveBtnText: {
      fontSize: 22,
      color: colorScheme === "dark" ? "black" : "white",
      textAlign: "center",
      fontWeight: 400,
    },
  })
}
