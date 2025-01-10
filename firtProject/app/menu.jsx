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
import { Dimensions } from "react-native"
import MenuImages from "@/constants/MenuImages"

const menu = () => {
  const colorScheme = Appearance.getColorScheme()
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light
  const styles = createStyles(theme, colorScheme)
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView // setting the type of scroll based on OS
  const SeparatorComponent = <View style={styles.separator} />

  let ScreenHeight = Dimensions.get("window").height
  return (
    <Container>
      <FlatList
        data={MenuItems} // array over which it loops
        contentContainerStyle={styles.containerStyle}
        ItemSeparatorComponent={SeparatorComponent} // separator comp which creates a line btw all
        ListEmptyComponent={
          <Text
            style={{
              color: "white",
              fontSize: 25,
              textAlign: "center",
              marginTop: 50,
              width: "100%",
              height: ScreenHeight,
            }}
          >
            No Items available
          </Text>
        }
        ListFooterComponent={
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              marginTop: 10,
              width: "100%",
            }}
          >
            End Of Menu
          </Text>
        }
        keyExtractor={(item) => item.id} // key
        renderItem={({ item }) => (
          // one box
          <View style={styles.row}>
            <View style={styles.menuTextRow}>
              <Text style={[styles.menuItemTitle]}>{item.title}</Text>
              <Text style={styles.menuItemText}>{item.description}</Text>
            </View>
            <Image style={styles.menuImage} source={MenuImages[item.id]} />
          </View>
        )}
      />
    </Container>
  )
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    containerStyle: {
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 20,
      backgroundColor: theme.background,
    },
    row: {
      flexDirection: "row",
      width: "100%",
      maxWidth: 600,
      height: 130,
      marginBottom: 10,
      borderStyle: "solid",
      borderColor: colorScheme === "dark" ? "papayawhip" : "#000",
      borderWidth: 1,
      borderRadius: 20,
      overflow: "hidden",
      marginHorizontal: "auto",
    },
    separator: {
      height: 1,
      backgroundColor: colorScheme === "dark" ? "papayawhip" : "#000",
      width: "50%",
      maxWidth: 300,
      marginHorizontal: "auto",
      marginBottom: 10,
    },
    menuTextRow: {
      display: "flex",
      gap: 5,
      width: "65%",
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 5,
      flexGrow: 1,
    },
    menuItemTitle: {
      fontSize: 22,
      textDecorationLine: "underline",
      color: theme.text,
    },
    menuItemText: {
      fontSize: 13,
      maxWidth: 250,
      color: theme.text,
    },
    menuImage: {
      width: 130,
      height: 130,
    },
  })
}

export default menu
