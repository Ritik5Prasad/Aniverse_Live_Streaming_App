import { Animated, Image } from 'react-native'
import React from 'react'
import { authStyles } from '@/styles/authStyles'
import { translateYAnim, scaleAnim, rippleAnim, rippleScale } from './animations'

const AnimatedButton = () => (
    <>
        <Animated.View style={{
            transform: [{ translateY: translateYAnim }, { scale: scaleAnim }],
            shadowColor: '#fff',
            shadowOpacity: 0.9,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 20,
        }}>
            <Image source={require('@/assets/icons/google.png')} style={authStyles.gicon} />
        </Animated.View>

        <Animated.View style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: 50,
            borderColor: '#fff',
            borderWidth: 2,
            transform: [{ scale: rippleScale }, { translateY: translateYAnim }],
            opacity: rippleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 0]
            })
        }} />
    </>
)

export default AnimatedButton
