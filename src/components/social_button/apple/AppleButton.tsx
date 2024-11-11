import { AppleButtonProps } from "./AppleButton.props"
import { TouchableOpacity, View, Text } from "react-native"
import { AppleButtonStyle } from "./AppleButton.styles"
import AppleIcon from "../../../../assets/images/Apple"

export const AppleButton = (props: AppleButtonProps) => {
    return <TouchableOpacity onPress={props.onClick}>
        <View style={AppleButtonStyle.container}>
            <AppleIcon width={AppleButtonStyle.icon.width} height={AppleButtonStyle.icon.height} />
            <Text style={AppleButtonStyle.text}>{props.title}</Text>
        </View>
    </TouchableOpacity>
}