import {
  Text,
  Appearance,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors } from "@/constants/Colors"
import { data } from "@/data/todos"
import { useState } from "react"
import { Vibration } from "react-native"

export default function Index() {
  const colorScheme = Appearance.getColorScheme()
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light
  const styles = createStyles(theme, colorScheme)

  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id))
  const [text, setText] = useState("")

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

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => {
          toggleTask(item.id)
          Vibration.vibrate(120)
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
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={<View style={styles.separator} />}
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
        ListFooterComponent={
          <Text
            style={{
              color: "white",
              fontSize: 25,
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            End of the list
          </Text>
        }
        renderItem={renderItem}
      />
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
