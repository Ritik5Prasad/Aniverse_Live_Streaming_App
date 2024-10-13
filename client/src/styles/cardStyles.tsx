import { Colors, screenHeight, screenWidth } from "@/utils/Constants";
import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 5
    },
    card: {
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
        height: screenHeight * 0.25,
        width: screenWidth * 0.35
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: 5,
        flexDirection: "row",
        alignItems: 'center',
        gap: 2,
        right: 5,
        backgroundColor: Colors.theme,
        borderRadius: 5,
        padding: 5,
    },
    textContainer: {
        left: 5,
        bottom: 10,
        zIndex: 2,
        position: 'absolute'
    },
    footer: {
        marginTop: 50,
        alignSelf: 'center',
        justifyContent: "center",
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
        opacity: 0.4
    },
    hyperLink: {
        textDecorationLine: 'underline',
        marginTop: 10
    }

})