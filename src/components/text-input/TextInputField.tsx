import React, { useState } from "react";
import { TextInput } from "react-native";
import { TextInputProps } from "./TextInput.props";
import { TextInputStyle } from "./TextInput.styles";

export const TextInputField = (props: TextInputProps) => {
    const [inputText, setInputText] = useState("")
    return <TextInput
        style={TextInputStyle.container}
        autoCapitalize={props.autoCapitalize ? props.autoCapitalize : 'none'}
        autoCorrect={props.autoCorrect ? props.autoCorrect : false}
        onChangeText={(text) => {
            setInputText(text)
            props.onTextSubmit(inputText)
        }}
        value={inputText}
        placeholder={props.placeholder}
        placeholderTextColor={TextInputStyle.placeholderStyle.color}
        secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        returnKeyType={props.returnKeyType ? props.returnKeyType : 'done'}
    />
}