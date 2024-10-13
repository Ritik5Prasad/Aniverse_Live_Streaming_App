import { Text, TextStyle, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

interface Props {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8'
    style?: TextStyle | TextStyle[]
    children: React.ReactNode
    fontFamily?: 'SemiBold' | 'Regular' | 'Bold' | 'Medium' | 'Light'
    numberOfLines?: any
}

const CustomText: FC<Props> = ({ variant, style, children, numberOfLines, fontFamily = 'Regular' }) => {

    let computedFontSize = RFValue(12)

    switch (variant) {
        case 'h1':
            computedFontSize = RFValue(24)
            break;
        case 'h2':
            computedFontSize = RFValue(22)
            break;
        case 'h3':
            computedFontSize = RFValue(20)
            break;
        case 'h4':
            computedFontSize = RFValue(18)
            break;
        case 'h5':
            computedFontSize = RFValue(16)
            break;
        case 'h6':
            computedFontSize = RFValue(14)
            break;
        case 'h7':
            computedFontSize = RFValue(10)
            break;
        case 'h8':
            computedFontSize = RFValue(9)
            break;
        default:
            computedFontSize = RFValue(12)
    }

    const propFontFamily = `Poppins-${fontFamily}`

    return (
        <Text
            style={{
                fontSize: computedFontSize,
                fontFamily: propFontFamily,
                ...styles.text,
                ...style,
            }}
            numberOfLines={numberOfLines ? numberOfLines : undefined}
        >
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        textAlign: 'left'
    }
})

export default CustomText