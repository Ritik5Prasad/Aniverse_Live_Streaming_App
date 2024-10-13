import React, { FC } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, gradientColors } from '@/utils/Constants';
import { featuredStyles } from '@/styles/homeStyles';
import CustomText from '../ui/CustomText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { commonStyles } from '@/styles/commonStyles';
import LiveStatus from './LiveStatus';
import { useAnimeStore } from '@/service/animeStore';
import { router } from 'expo-router';

const Featured: FC = () => {
    const { live } = useAnimeStore();

    const item = live![0] ?? {}

    return (
        <View style={featuredStyles.featuredContainer}>
            <LinearGradient
                colors={gradientColors}
                style={featuredStyles.gradient}
            />
            <View style={featuredStyles.featuredImageContainer}>
                {item?.thumbnail_url &&
                    <Image
                        source={{ uri: item?.thumbnail_url }}
                        style={featuredStyles.featuredImage}
                    />}
            </View>
            <View style={featuredStyles.textContainer}>
                <CustomText fontFamily='Medium' variant='h3'>{item.title}</CustomText>
                <CustomText fontFamily='Light'>{item?.genre}</CustomText>

                <View style={commonStyles.flexRowGap}>
                    <TouchableOpacity style={featuredStyles.playContainer}
                        onPress={() => router.push({
                            pathname: '/playlist',
                            params: item as any
                        })}>
                        <Ionicons name="play-circle" size={24} color={Colors.text} />
                        <CustomText fontFamily='Medium' variant='h6'>Play</CustomText>
                    </TouchableOpacity>
                    <LiveStatus />
                </View>
            </View>
            <LinearGradient
                colors={[...gradientColors].reverse()}
                style={featuredStyles.bottomGradient}
            />
        </View>
    );
};



export default Featured;
