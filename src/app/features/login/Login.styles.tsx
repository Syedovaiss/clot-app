import { StyleSheet } from "react-native";
import colors from "../../../config/colors/Colors";

export const LoginStyle = StyleSheet.create( {
    container: {
        backgroundColor: colors.light.backgroundColor,
        flex: 1
    },
    body: {
        fontFamily:'circular-medium',
        fontSize: 12
    },
    bodyBold: {
        fontFamily:'circular-semi-bold',
        fontSize: 12,
        fontWeight: 'bold'
    },
    horizontalView: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:16
    }
})