import { StyleSheet } from "react-native";
import colors from "../../config/colors/Colors";

export const TextInputStyle = StyleSheet.create({
    container: {
        backgroundColor: colors.light.fieldBackground,
        textAlign: 'left',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        marginStart: 16,
        marginEnd: 16,
        marginTop: 16
    },
    textStyle: {
        fontFamily: 'Circular-Book',
        fontSize: 22
    },
    placeholderStyle: {
        color: colors.light.placeholderColor
    }
});