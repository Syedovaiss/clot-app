import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoginStyle } from "./Login.styles";
import { TitleText } from "../../../components/text/TitleText";
import { TextInputField } from "../../../components/text-input/TextInputField";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { AppleButton } from "../../../components/social_button/apple/AppleButton";
import { GoogleButton } from "../../../components/social_button/google/GoogleButton";

const LoginScreen = () => {
    return (
        <View style={LoginStyle.container}>
            <View style={additionalStyles.container} >
                <TitleText text="Sign In" />
            </View>
            <TextInputField
                placeholder="Email Address"
                onTextSubmit={(text) => {
                    console.log(text)
                }}
                returnKeyType='next'
            />
            <TextInputField
                placeholder="Password"
                onTextSubmit={(text) => {
                    console.log(text)
                }}
                secureTextEntry={true}
                returnKeyType="done"
            />
            <View style={LoginStyle.horizontalView}>
                <Text style={LoginStyle.body}>Dont have an Account ? </Text>
                <Text style={LoginStyle.bodyBold}>Create One</Text>
            </View>
            <PrimaryButton title="Login" onClick={() => {
                console.log("Logging In!")
            }} />
            <AppleButton title="Continue with Apple" onClick={() => {
                console.log("Apple login")
            }} />
            <GoogleButton title="Continue with Google" onClick={() => {
                console.log("Google login")
            }} />
        </View>
    )
}

const additionalStyles = StyleSheet.create({
    container: {
        marginStart: 16,
        marginTop: 80
    }
})
export default LoginScreen;