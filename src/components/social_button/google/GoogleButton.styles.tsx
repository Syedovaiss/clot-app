import { StyleSheet } from "react-native";
import colors from "../../../config/colors/Colors";

export const GoogleButtonStyle = StyleSheet.create({
    container: {
        backgroundColor: colors.light.fieldBackground,
        flexDirection: 'row',
        padding:12,
        justifyContent:'center',
        alignItems:'center',
        marginStart: 16,
        marginEnd: 16,
        borderRadius: 32,
        marginTop:16
    },
    icon: {
        width: 20,
        height: 25
    },
    text: {
        fontFamily: 'circular-medium',
        fontSize: 16,
        marginStart: 8
    }
})