import { Animated } from 'react-native'
import React from 'react'
import { authStyles } from '@/styles/authStyles'
import { useImageAnimation } from './animations'

const AnimatedImage = () => {
    const { rotation, scaleAnimImage, shakeAnim } = useImageAnimation()

    return (
        <Animated.Image
            style={[
                authStyles.image,
                {
                    transform: [
                        { rotate: rotation },
                        { scale: scaleAnimImage },
                        { translateX: shakeAnim },
                    ],
                },
            ]}
            source={require('@/assets/images/aniverse.png')}
        />
    )
}

export default AnimatedImage
