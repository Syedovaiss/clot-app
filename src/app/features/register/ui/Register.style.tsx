import { StyleSheet } from "react-native";
import colors from "../../../../config/colors/Colors";

export const RegisterStyle = StyleSheet.create( {
    scrollingContainer: {
        backgroundColor: colors.light.backgroundColor
    },
    container: {
        backgroundColor: colors.light.backgroundColor,
        flex: 1
    },
    backIconStyle: {
        marginStart: 16,
        marginTop: 32
    }
})