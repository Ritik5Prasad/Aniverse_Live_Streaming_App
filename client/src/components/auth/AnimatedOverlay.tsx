import { Animated } from 'react-native'
import React from 'react'
import { authStyles } from '@/styles/authStyles'
import { overlayOpacity } from './animations'

const AnimatedOverlay = () => (
    <Animated.View
        style={[
            authStyles.overlay,
            { opacity: overlayOpacity }
        ]}
    />
)

export default AnimatedOverlay
