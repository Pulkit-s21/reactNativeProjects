import { icons } from "@/constants"
import { useState } from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native"
import { useVideoPlayer, VideoView } from "expo-video"
import * as Animatable from "react-native-animatable"

export const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0])
  const [play, setPlay] = useState(false)

  const zoomIn = {
    0: { scale: 0.9 },
    1: { scale: 1.1 },
  }

  const zoomOut = {
    0: { scale: 1 },
    1: { scale: 0.9 },
  }

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  const RenderItem = ({ activeItem, item }) => {
    return (
      <Animatable.View
        className="mr-5"
        animation={activeItem === item.$id ? zoomIn : zoomOut}
        duration={500}
      >
        {play ? (
          <VideoView
            player={useVideoPlayer(item.video, (player) => {
              return (player.loop = true), player.play()
            })}
            allowsFullscreen
            allowsPictureInPicture
          />
        ) : (
          <TouchableOpacity
            className="relative justify-center items-center"
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
          >
            <ImageBackground
              source={{ uri: item.thumbnail }}
              className="w-52 h-80 rounded-3xl overflow-hidden shadow-lg shadow-black/40 my-5"
              resizeMode="cover"
            />
            <Image
              source={icons.play}
              className="absolute w-12 h-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </Animatable.View>
    )
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <RenderItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  )
}
