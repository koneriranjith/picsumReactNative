import React from 'react';

import { View, StyleSheet, Text, Image, Dimensions} from 'react-native'

const { width, height} = Dimensions.get('window')


const CarouselItem = ({item}) => {
    const { id, author } = item || {};
    return (
        <View style={styles.cardView}>
            <View>
               <Text style={styles.author}>{author}</Text>
            </View>
            <Image style={styles.image} source={{ uri: `https://picsum.photos/200/300?image=${id}`}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width - 20,
        height: height / 3,
        backgroundColor: 'white',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5
    },
    image: {
        width: width - 20,
        height: height /3
    },
    author: {
        fontSize: 22,
        // shadowColor
    }
})

export default CarouselItem;