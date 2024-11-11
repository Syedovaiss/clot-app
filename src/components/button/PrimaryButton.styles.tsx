import { StyleSheet } from "react-native";
import colors from "../../config/colors/Colors";

export const PrimaryButtonStyle = StyleSheet.create({
    buttonContainer: {
        backgroundColor: colors.light.buttonColor,
        padding: 12,
        margin: 16,
        borderRadius: 32,
        alignItems:'center'
    },
    text: {
        color: colors.light.buttonTextColor,
        fontFamily: 'circular-medium',
        fontSize: 16
    }
})