import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover'
    },
    image: {
        position: "absolute",
    },
    gicon: {
        height: 40,
        width: 40
    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: '100%',
        height: '100%'
    }
})