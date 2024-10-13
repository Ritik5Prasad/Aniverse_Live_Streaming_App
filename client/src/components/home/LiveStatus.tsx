import { View, Animated, Easing } from 'react-native'
import React, { useEffect } from 'react'
import { commonStyles } from '@/styles/commonStyles'
import { homeStyles } from '@/styles/homeStyles'

const LiveStatus = () => {
    const rippleAnim = new Animated.Value(0)

    const rippleScale = rippleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 3]
    })

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(rippleAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start()
    }, [])

    return (
        <View style={commonStyles.liveCenter}>
            <Animated.View style={homeStyles.redDot} />

            <Animated.View style={{
                ...homeStyles.spreadCircle,
                transform: [{ scale: rippleScale }],
                opacity: rippleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 0]
                })
            }} />
        </View>
    )
}

export default React.memo(LiveStatus)
