import React, { useEffect, useState } from 'react'
import { View, RefreshControl, ScrollView } from 'react-native'
import Carousel from '../components/Carousel/index.js'

import { getImages } from '../services/list'
import { useStore } from "../store";
import { setImages } from "../actions";

const Home = () => {
    const [pagination, setPagination] = useState({ page: 1, limit: 10 });
    const [refresh, setRefresh] = useState(false);
    const [{ images }, dispatch] = useStore();

    useEffect(() => {
        getImages({ limit: pagination.limit, page: pagination.page }).then((data) => {
            dispatch(setImages(data))
        })
    }, [])

    const onEndReached = () => {
        let page = (pagination.page + 1)
        getImages({
            limit: pagination.limit,
            page: page
        }).then((data) => {
            if (images.length) {
                dispatch(setImages(images.concat(data)))
            } else {
                dispatch(setImages(data))
            }
        })
        setPagination({ ...pagination, page })
    }

    const refreshList = async () => {
        setRefresh(true)
        getImages({ limit: 10, page: 1 }).then((data) => {
            dispatch(setImages(data))
            setRefresh(false)
        }).catch(() => {
            setRefresh(false)
        })
    }

    return (
        <ScrollView
            style={{ marginTop: 35 }}
            refreshControl={
                <RefreshControl
                    onRefresh={() => refreshList()}
                    refreshing={refresh}
                />
            }
        >
            <Carousel
                key={refresh}
                horizontal={true}
                pagingEnabled={true}
                scrollEnabled={true}
                snapToAlignment={'center'}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={16}
                decelerationRate={'fast'}
                showsHorizontalScrollIndicator={true}
                showsHorizontalScrollIndicatorLimit={10}
                data={images}
                onEndReached={() => { onEndReached() }} />
        </ScrollView>
    )
}

export default Home;
