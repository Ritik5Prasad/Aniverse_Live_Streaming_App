import { Animated, Easing } from 'react-native'
import { screenHeight } from '@/utils/Constants'
import { login } from '@/service/api/authService'
import { resetAndNavigate, triggerHaptics } from '@/utils/Helpers'
import { signInWithGoogle } from '@/service/api/authService'

// Animation states
export const rotateAnim = new Animated.Value(0)
export const scaleAnimImage = new Animated.Value(1)
export const scaleAnim = new Animated.Value(1)
export const translateYAnim = new Animated.Value(screenHeight)
export const rippleAnim = new Animated.Value(0)
export const overlayOpacity = new Animated.Value(0)
export const shakeAnim = new Animated.Value(0)

// Image animation
export const useImageAnimation = () => {
    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return {
        rotation,
        scaleAnimImage,
        shakeAnim
    }
}

// Main animation
export const startMainAnimation = (setButtonVisible: any) => {
    setTimeout(() => {
        setButtonVisible(true)
        Animated.parallel([
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 2000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(overlayOpacity, {
                toValue: 1,
                duration: 2000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.2,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    })
                ])
            )
        ]).start()
    }, 1000)
}

// Shake animation
export const shakeAnimation = () => {
    return Animated.sequence([
        Animated.timing(shakeAnim, {
            toValue: 10,
            duration: 100,
            useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
            toValue: -10,
            duration: 100,
            useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
            toValue: 10,
            duration: 100,
            useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
            toValue: -10,
            duration: 100,
            useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        })
    ])
}

// Button touch handler and animations
export const handleTouch = async (updateAccessToken: () => void) => {
    triggerHaptics('SOFT')
    Animated.sequence([
        Animated.timing(rippleAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }),

    ]).start(async () => {
        rippleAnim.setValue(0)
        const token = await signInWithGoogle()
        if (token) {
            const apiRes = await login(token, updateAccessToken)
            if (apiRes) {
                startImageAnimation()
            } else {
                resetAnimations()
            }
        }
    })
}


export const resetAnimations = () => {
    shakeAnimation().start(() => {
        Animated.sequence([
            Animated.timing(rotateAnim, {
                toValue: 0,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnimImage, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 1000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(overlayOpacity, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start()
    })
}

export const simulateApiCall = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const success = Math.random() > 0.5
            resolve(success)
        }, 2000)
    })
}

export const rippleScale = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 3]
})

// Image rotation and scale animation
export const startImageAnimation = () => {
    Animated.sequence([
        Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
            toValue: screenHeight,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }),
        Animated.parallel([
            Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 10000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ),
            Animated.timing(scaleAnimImage, {
                toValue: 10,
                duration: 20000,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            })
        ])
    ]).start()

    setTimeout(() => {
        resetAndNavigate('/home')
    }, 5000)

}
