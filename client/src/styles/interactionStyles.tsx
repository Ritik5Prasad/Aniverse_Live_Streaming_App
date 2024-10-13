import { Colors, screenHeight } from "@/utils/Constants";
import { Platform, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const interactionStyles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#000',
        flex: 1
    },
    commentContainer: {
        marginTop: 10
    },
    item: {
        marginVertical: 5,
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingBottom:20,
        borderColor: '#222'
    },
    avatar: {
        width: 30,
        height: 30,
        resizeMode: "cover",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.text
    },
    username: {
        opacity: 0.5
    },
    bottomPadding: {
        paddingTop: 120
    },
    emptyContainer: {
        height: screenHeight * 0.3,
        justifyContent: "center",
        alignItems: 'center'
    },
    center: {
        textAlign: 'center'
    },
    inputContainer: {
        borderTopWidth: 1,
        borderTopColor: Colors.secondary,
        position: 'absolute',
        bottom: 0,
        zIndex: 99,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'baseline',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: Platform.OS === 'ios' ? 20 : 5,
        backgroundColor: Colors.tertiary
    },
    input: {
        borderRadius: 10,
        backgroundColor: Colors.secondary,
        width: "80%",
        minHeight: 40,
        color: Colors.text,
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(12),
        padding: 10,
        maxHeight: 120
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#222'
    },
    videoContainer: {
        width: "100%",
        height: screenHeight * 0.24,
        overflow: 'hidden',
        marginTop: 10
    },
    video: {
        width: "100%",
        height: screenHeight * 0.24
    },
    imageOverlay: {
        width: "100%",
        height: screenHeight * 0.24,
        position: 'absolute',
        zIndex: 1
    },
    playIcon: {
        position: "absolute",
        bottom: '32%',
        zIndex: 2,
        alignSelf: 'center',
        elevation: 5,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: Colors.text,
        shadowRadius: 20,
        shadowOpacity: 1.2
    }
})