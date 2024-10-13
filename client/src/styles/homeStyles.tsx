import { Colors, screenHeight } from "@/utils/Constants";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 150,
        width: '100%'
    },
    animatedHeader: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 10,
    },
    glassmorphismContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },
    glassmorphismBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width:"100%",
        height:'100%',
        resizeMode:'cover',
        right: 0,
        backgroundColor: '#111',
    },
    spreadCircle: {
        position: 'absolute',
        alignSelf: 'center',
        width: 20,
        height: 20,
        borderRadius: 30,
        borderColor: 'red',
        borderWidth: 2,
    },
    redDot: {
        shadowColor: 'red',
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 0 },
        borderRadius: 10,
        width: 10,
        height: 10,
        backgroundColor: 'red'
    }
})

export const featuredStyles = StyleSheet.create({
    playContainer: {
        backgroundColor: Colors.theme,
        paddingVertical: 5,
        borderRadius: 100,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingHorizontal: 15,
        gap: 10,
        marginTop: 10,
        alignItems: 'center'
    },
    featuredContainer: {
        height: screenHeight * 0.45,
        overflow: 'hidden',
    },
    featuredImageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
    },
    featuredImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        right: 0,
        bottom: 0,
    },
    bottomGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        right: 0,
        bottom: 0,
    },
    textContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        zIndex: 2
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
});