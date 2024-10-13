import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Colors } from '@/utils/Constants'
import { Stack } from 'expo-router'
import { WSProvider } from '@/service/sockets/WSProvider'

const Root = () => {
    return (
        <>
            <WSProvider>
                <StatusBar
                    style='light'
                    backgroundColor={Colors.tertiary}
                    translucent={false}
                />
                <Stack initialRouteName='index' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='index' />
                    <Stack.Screen
                        name='auth'
                        options={{
                            animation: 'fade',
                            animationDuration: 2000,
                            animationTypeForReplace: 'push'
                        }}
                    />
                    <Stack.Screen
                        name='home'
                        options={{
                            animation: 'fade',
                            animationDuration: 2000,
                            animationTypeForReplace: 'push'
                        }}
                    />
                    <Stack.Screen
                        name='playlist'
                    />
                </Stack>
            </WSProvider>
        </>
    )
}

export default Root