import { Colors } from "@/utils/Constants";
import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary
    },
    containerBlack: {
        flex: 1,
        backgroundColor: Colors.tertiary
    },
    flexRowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    flexRowGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    liveCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 3
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})