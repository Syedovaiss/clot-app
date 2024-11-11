import React from "react";
import { Text } from "react-native";
import { TitleTextStyle } from "./Title.text.styles";
import { TitleTextProps } from "./Title.text.props";

export const TitleText = (props: TitleTextProps) => {
    return (
        <Text style={TitleTextStyle.textStyle}>{props.text}</Text>
    )
}