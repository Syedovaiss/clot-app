
import { useColors } from "../../../config/colors/Colors";
import { StyleSheet } from "react-native";
 const SplashStyle = () => {
    const colors = useColors()
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.splashBackground,
            alignItems:'center',
            justifyContent:'center',
            marginBottom: 16
        }
    })
}
export default SplashStyle;