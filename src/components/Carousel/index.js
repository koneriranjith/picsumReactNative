import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet, FlatList, Animated } from 'react-native'
import CarouselItem from './CarouselItem';


const Carousel = ({ 
    data = [],
    onEndReached,
    horizontal,
    pagingEnabled,
    scrollEnabled,
    snapToAlignment,
    onEndReachedThreshold,
    scrollEventThrottle,
    decelerationRate,
    showsHorizontalScrollIndicator,
    showsHorizontalScrollIndicatorLimit
 }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollX = new Animated.Value(0)

    const handleonEndReached = ({ distanceFromEnd }) => {
        if (distanceFromEnd < 0) return;
        onEndReached()
    }

    const onViewRef = useRef(({viewableItems}) => {
        if(Array.isArray(viewableItems) && viewableItems.length){
            setCurrentIndex(viewableItems[0].index)
        }
    })

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })

    if(!data.length) {
      return (<View><Text>loading...</Text></View>)
    }

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item, index)=> `key-${index}`}
                horizontal={horizontal}
                pagingEnabled={pagingEnabled}
                scrollEnabled={scrollEnabled}
                snapToAlignment={snapToAlignment}
                onEndReachedThreshold={onEndReachedThreshold}
                scrollEventThrottle={scrollEventThrottle}
                decelerationRate={decelerationRate}
                showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                onEndReached={(e)=> handleonEndReached(e)}
                renderItem={({item})=> {
                    return <CarouselItem item={item}/>
                }}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}]
                )}
            />
            {showsHorizontalScrollIndicator && <View style={styles.dotView}>
                {Array.from({ length: showsHorizontalScrollIndicatorLimit }, () => data.length).map((_, i)=> {
                    return (
                        <Animated.View
                            key={i}
                            style={{...styles.dotViewAnimation, opacity: ((currentIndex % showsHorizontalScrollIndicatorLimit) == i) ? 1 : 0.3}}
                        />
                    )
                })}
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dotViewAnimation: {
        height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5
    }
})

export default Carousel;

Carousel.propTypes = {
    horizontal: PropTypes.bool,
    onEndReached: PropTypes.func,
    data: PropTypes.array,
    pagingEnabled: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
    snapToAlignment: PropTypes.string,
    onEndReachedThreshold: PropTypes.number,
    scrollEventThrottle: PropTypes.number,
    decelerationRate: PropTypes.string,
    showsHorizontalScrollIndicator: PropTypes.bool,
    showsHorizontalScrollIndicatorLimit: PropTypes.number
};

Carousel.defaultProps = {
    horizontal: true,
    onEndReached: () => {console.log("some error in onEndReached function")},
    data: [],
    pagingEnabled: true,
    scrollEnabled: true,
    snapToAlignment: 'center',
    onEndReachedThreshold: 0.5,
    scrollEventThrottle: 16,
    decelerationRate: 'fast',
    showsHorizontalScrollIndicator: false,
    showsHorizontalScrollIndicatorLimit: 10
};

