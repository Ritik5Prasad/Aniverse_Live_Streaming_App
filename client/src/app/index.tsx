import { View, Text, Image, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { commonStyles } from '@/styles/commonStyles'
import { splashStyles } from '@/styles/splashStyles'
import { useFonts } from 'expo-font'
import { tokenStorage } from '@/service/storage'
import { resetAndNavigate } from '@/utils/Helpers'
import { jwtDecode } from 'jwt-decode';
import { refresh_tokens } from '@/service/api/apiInterceptors'

interface DecodedToken {
    exp: number;
}

const Page = () => {

    const [loaded] = useFonts({
        Bold: require('../assets/fonts/Poppins-Bold.ttf'),
        Regular: require('../assets/fonts/Poppins-Regular.ttf'),
        Medium: require('../assets/fonts/Poppins-Medium.ttf'),
        Light: require('../assets/fonts/Poppins-Light.ttf'),
        SemiBold: require('../assets/fonts/Poppins-SemiBold.ttf')
    })

    const tokenCheck = async () => {
        const accessToken = tokenStorage.getString('accessToken') as string
        const refreshToken = tokenStorage.getString('refreshToken') as string

        if (accessToken) {
            const decodedAccessToken = jwtDecode<DecodedToken>(accessToken)
            const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken)

            const currentTime = Date.now() / 1000

            if (decodedRefreshToken?.exp < currentTime) {
                resetAndNavigate('/auth')
                Alert.alert('Session Expired, please login again')
                return false;
            }

            if (decodedAccessToken?.exp < currentTime) {
                try {
                    refresh_tokens()
                } catch (error) {
                    console.log(error)
                    Alert.alert("There was an error")
                    return false
                }
            }

            resetAndNavigate('/home')
            return true


        }
        resetAndNavigate('/auth')
        return false
    }

    useEffect(() => {
        if (loaded) {
            tokenCheck()
            const timeoutId = setTimeout(tokenCheck, 1000);
            return () => clearTimeout(timeoutId)
        }
    }, [loaded])

    return (
        <View style={commonStyles.container}>
            <Image
                style={splashStyles.img}
                source={require('@/assets/images/logo_t.png')}
            />
        </View>
    )
}

export default Page