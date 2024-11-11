import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { PrimaryButtonProps } from "./PrimaryButton.props";
import { PrimaryButtonStyle } from "./PrimaryButton.styles";

export const PrimaryButton = (props: PrimaryButtonProps) => {
    return <TouchableOpacity onPress={props.onClick}>
        <View style={PrimaryButtonStyle.buttonContainer}>
            <Text style={PrimaryButtonStyle.text}>{props.title}</Text>
        </View>
    </TouchableOpacity>
}