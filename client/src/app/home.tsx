import { View, Text, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { commonStyles } from '@/styles/commonStyles'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { homeStyles } from '@/styles/homeStyles'
import HomeHeader from '@/components/home/HomeHeader'
import Featured from '@/components/home/Featured'
import { useAnimeStore } from '@/service/animeStore'
import TopLiked from '@/components/home/TopLiked'
import MostStarred from '@/components/home/MostStarred'
import TopRated from '@/components/home/TopRated'

const Page = () => {
  const { fetchAnimeData } = useAnimeStore()

  const scrollY = useSharedValue(0)
  const scrollRef = useRef<any>(null)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })


  const animatedHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [0, 1], 'clamp')
    return {
      opacity,
    }
  })

  useEffect(() => {
    fetchAnimeData()
  }, [])



  return (
    <View style={commonStyles.containerBlack}>
      <Animated.View style={homeStyles.animatedHeader}>
        <Animated.View style={[homeStyles.glassmorphismContainer, animatedHeaderStyle]}>
          <Image source={require('@/assets/icons/thumb2.png')} style={homeStyles.glassmorphismBackground} />
        </Animated.View>
        <HomeHeader />
      </Animated.View>

      <Animated.ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={homeStyles.scrollContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Featured />
        <TopLiked />
        <MostStarred />
        <TopRated scrollRef={scrollRef} />

      </Animated.ScrollView>


    </View>
  )
}

export default Page