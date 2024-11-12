import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoginStyle } from "./Login.styles";
import { TitleText } from "../../../../components/text/TitleText";
import { TextInputField } from "../../../../components/text-input/TextInputField";
import { PrimaryButton } from "../../../../components/button/PrimaryButton";
import { AppleButton } from "../../../../components/social_button/apple/AppleButton";
import { GoogleButton } from "../../../../components/social_button/google/GoogleButton";
import useLoginValidation from "../hooks/useLoginValidation";
import { ValidationResult } from "../../../../utils/ValidationResults.type";
import Toast from 'react-native-simple-toast';
import useLoginResult from "../hooks/useLoginResult";
import { isNotEmpty } from "../../../../utils/Helpers";
import { useAuth } from "../../../../config/auth/AuthProvider";

const LoginScreen = () => {
    const auth = useAuth()
    const [validate, errorMessage, result] = useLoginValidation();
    const [login, loginResult, loginErrorMessage] = useLoginResult();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (result === ValidationResult.Valid) {
            login(email, password)
            if (isNotEmpty(loginResult)) {
                handleResult(loginResult)
                auth.saveUserData(loginResult)
                Toast.show("Logged in successfully!", Toast.LONG)
            }
            if (isNotEmpty(loginErrorMessage)) {
                Toast.show(loginErrorMessage ? loginErrorMessage : '', Toast.LONG)
            }
        }
        if (result === ValidationResult.InValid) {
            Toast.show(
                errorMessage,
                Toast.LONG
            )
        }
    }, [result, errorMessage,loginResult,loginErrorMessage])
    const handleLogin = async () => {
        validate(email, password)
    }
    const handleResult = (accessToken: string | null) => {

    }
    return (
        <View style={LoginStyle.container}>
            <View style={additionalStyles.container} >
                <TitleText text="Sign In" />
            </View>
            <TextInputField
                placeholder="Email Address"
                onTextSubmit={(text) => {
                    setEmail(text)
                }}
                returnKeyType='next'
            />
            <TextInputField
                placeholder="Password"
                onTextSubmit={(text) => {
                    setPassword(text)
                }}
                secureTextEntry={true}
                returnKeyType="done"
            />
            <View style={LoginStyle.horizontalView}>
                <Text style={LoginStyle.body}>Dont have an Account ? </Text>
                <Text style={LoginStyle.bodyBold}>Create One</Text>
            </View>
            <PrimaryButton title="Login" onClick={handleLogin} />
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