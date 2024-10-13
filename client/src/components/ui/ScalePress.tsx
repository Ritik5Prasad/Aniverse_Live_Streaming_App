import { View, Text, ViewStyle, TouchableOpacity, Animated } from 'react-native'
import React, { FC } from 'react'

interface ScalePressProps {
    onPress?: () => void;
    children: React.ReactNode;
    style?: ViewStyle
}

const ScalePress: FC<ScalePressProps> = ({ onPress, children, style }) => {
    const scaleValue = new Animated.Value(1)

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.92,
            useNativeDriver: true
        }).start()
    }
    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true
        }).start()
    }
    return (
        <TouchableOpacity
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onPress}
            activeOpacity={1}
            style={{ ...style }}
        >
            <Animated.View style={[{ transform: [{ scale: scaleValue }], width: '100%' }]}>
                {children}
            </Animated.View>
        </TouchableOpacity>
    )
}

export default ScalePress