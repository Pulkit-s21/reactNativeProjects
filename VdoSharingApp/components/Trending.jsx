import { View, Text, FlatList } from "react-native"

export const Trending = ({ posts }) => {
  const renderItem = ({ item }) => {
    return <Text className="text-3xl text-white">{item.id}</Text>
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      horizontal
    />
  )
}
