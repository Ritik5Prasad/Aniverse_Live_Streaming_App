import { View, Image } from 'react-native'
import React, { FC } from 'react'
import { cardStyles } from '@/styles/cardStyles'
import CustomText from '../ui/CustomText'
import { Colors, gradientColors } from '@/utils/Constants'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient'
import { featuredStyles } from '@/styles/homeStyles'
import ScalePress from '../ui/ScalePress'
import { router } from 'expo-router'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Anime } from '@/service/animeStore'

const AnimeCardItem: FC<{ item: Anime }> = ({ item }) => {
    return (
        <Animated.View entering={FadeInDown.delay(150).duration(1000)}>
            <ScalePress
                onPress={() => router.push({
                    pathname: '/playlist',
                    params: item as any
                })}
            >
                <View style={cardStyles.card}>
                    <Image
                        source={{ uri: item?.thumbnail_url }}
                        style={cardStyles.image}
                    />
                    <View style={cardStyles.overlay}>
                        <MaterialIcons name="star" size={12} color={Colors.text} />
                        <CustomText fontFamily='Medium' variant='h8'>{item?.rating}</CustomText>
                    </View>

                    <View style={cardStyles.textContainer}>
                        <CustomText fontFamily='Medium' variant='h7' numberOfLines={1}>{item?.title}</CustomText>
                        <CustomText fontFamily='Light' variant='h8' numberOfLines={1}>{item?.genre}</CustomText>
                    </View>

                    <LinearGradient
                        colors={[...gradientColors].reverse()}
                        style={featuredStyles.bottomGradient}
                    />
                </View>
            </ScalePress>
        </Animated.View>
    )
}

export default AnimeCardItem;
