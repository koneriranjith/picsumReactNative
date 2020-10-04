import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";

const ImageItem = ({ item }) => {
  const { id, author } = item || {};
  return (
    <TouchableOpacity>
      <View>
        <Text>{author}</Text>
        <Image
          source={{ uri: `https://picsum.photos/200/300?image=${id}` }}
          style={{ width: 200, height: 300 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ImageItem;
