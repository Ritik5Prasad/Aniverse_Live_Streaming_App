import { View, FlatList } from 'react-native'
import React from 'react'
import Heading from '../ui/Heading'
import { cardStyles } from '@/styles/cardStyles'
import AnimeCardItem from '../cards/AnimeCardItem'
import { useAnimeStore } from '@/service/animeStore'



const TopLiked = () => {
    const { topLiked } = useAnimeStore()

    return (
        <View style={cardStyles.container}>
            <Heading title='Top Liked Anime' seeAll />
            <FlatList
                horizontal
                data={topLiked}
                windowSize={4}
                initialNumToRender={4}
                renderItem={({ item }) => <AnimeCardItem item={item} />}
                keyExtractor={item => item._id}
                contentContainerStyle={{ marginTop: 20 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default TopLiked
