import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Octicons from "@expo/vector-icons/Octicons"
import Animated, { LinearTransition } from "react-native-reanimated"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SafeAreaView } from "react-native-safe-area-context"
import { data } from "@/data/todos"
import { useState, useContext, useEffect } from "react"
import { Vibration } from "react-native"
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter"
import { ThemeContext } from "@/context/ThemeContext"
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router"

export default function Index() {
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
  const styles = createStyles(theme, colorScheme)
  const [todos, setTodos] = useState([])
  const [text, setText] = useState("")
  const [loaded, error] = useFonts({ Inter_500Medium })
  const router = useRouter()

  // this fetchs data from localStorage or constant list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp")
        const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null
        if (storageTodos && storageTodos.length) {
          setTodos(storageTodos.sort((a, b) => b.id - a.id))
        } else {
          setTodos(data.sort((a, b) => b.id - a.id))
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [data])

  // this stores data in localStorage
  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(todos)
        await AsyncStorage.setItem("TodoApp", jsonValue) // make sure the variable name is same as in like 29
      } catch (error) {
        console.error(error)
      }
    }

    storeData()
  }, [todos])

  // keep this at end
  if (!loaded && !error) {
    return null
  }

  const createTask = () => {
    if (text.trim()) {
      // if we have task then add 1 to last as we want it to be on top of list else set it to 1st task
      const newId = todos.length > 0 ? todos[0].id + 1 : 1
      // new task will be an obj..it needs id, title which is text and status will always be false then we spread the rest of the list
      setTodos([{ id: newId, title: text, completed: false }, ...todos])
      setText("")
    }
  }

  const toggleTask = (id) => {
    setTodos(
      todos.map(
        (todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        // map over list..if id matches set the status of task to inverse of current else let it remain same
        // ! {} this caused error as it prevented anything to return from the func
      )
    )
  }

  const removeTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id)) // whichever task doesnt match with current id set the list to those (remove the matching one)
  }

  const handlePress = (id) => {
    router.push(`/todos/${id}`)
  }

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => handlePress(item.id)}
        onLongPress={() => {
          Vibration.vibrate(120)
          toggleTask(item.id)
        }}
        style={{ flex: 1 }}
      >
        <Text style={[styles.textRow, item.completed && styles.completedText]}>
          {item.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Vibration.vibrate(300)
          removeTask(item.id)
        }}
      >
        <MaterialCommunityIcons
          name="delete-circle"
          size={36}
          color="red"
          selectable={undefined}
        />
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            fontSize: 15,
            fontFamily: "Inter_500Medium",
            borderWidth: 1,
            color: "white",
            borderColor: "gray",
          }}
          placeholder="Add a new task"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(100)
            createTask()
          }}
          style={styles.addBtn}
        >
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
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
      <Animated.FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={<View style={styles.separator} />}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag" // hides keyboard when user drags list
        ListEmptyComponent={
          <Text
            style={{
              color: "white",
              fontSize: 25,
              textAlign: "center",
              marginTop: 50,
              width: "100%",
            }}
          >
            No Task To Track
          </Text>
        }
        renderItem={renderItem}
      />
      {/* imp to show the status bar..not visible without it */}
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
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
      flexWrap: "wrap",
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
