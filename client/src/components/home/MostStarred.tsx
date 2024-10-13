import { View, FlatList } from 'react-native'
import React from 'react'
import Heading from '../ui/Heading'
import { cardStyles } from '@/styles/cardStyles'
import AnimeCardItem from '../cards/AnimeCardItem'
import { animeData } from '@/utils/dummyData'
import { useAnimeStore } from '@/service/animeStore'



const MostStarred = () => {
    const { topStarred } = useAnimeStore()
    return (
        <View style={cardStyles.container}>
            <Heading title='Most Starred' seeAll />
            <FlatList
                horizontal
                windowSize={2}
                initialNumToRender={2}
                data={topStarred || []}
                renderItem={({ item }) => <AnimeCardItem item={item} />}
                keyExtractor={item => item._id}
                contentContainerStyle={{ marginTop: 20 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default MostStarred
