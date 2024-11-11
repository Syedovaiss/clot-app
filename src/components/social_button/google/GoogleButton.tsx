
import { TouchableOpacity, View, Text } from "react-native"
import { GoogleButtonProps } from "./GoogleButton.props"
import { GoogleButtonStyle } from "./GoogleButton.styles"
import GoogleIcon from "../../../../assets/images/GoogleIcon"

export const GoogleButton = (props: GoogleButtonProps) => {
    return <TouchableOpacity onPress={props.onClick}>
        <View style={GoogleButtonStyle.container}>
            <GoogleIcon width={GoogleButtonStyle.icon.width} height={GoogleButtonStyle.icon.height} />
            <Text style={GoogleButtonStyle.text}>{props.title}</Text>
        </View>
    </TouchableOpacity>
}