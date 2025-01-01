import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
import { LoginScreenProps } from "./Login.props";

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [validate, errorMessage, validationResult] = useLoginValidation();
    const [login, loginResult, loginErrorMessage] = useLoginResult();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = useAuth()

    useEffect(()=> {
        switch (validationResult) {
            case ValidationResult.Valid:
                login(email, password)
                break;
            case ValidationResult.InValid:
                console.log(errorMessage)
                Toast.show(
                    errorMessage,
                    Toast.LONG
                )
                break;
            default:
                break;
        }
      
    },[validationResult])

    useEffect(() => {
        if(isNotEmpty(loginErrorMessage)) {
            console.log(loginErrorMessage)
            Toast.show(
                loginErrorMessage ? loginErrorMessage : '',
                Toast.LONG
            )
        } else if(isNotEmpty(loginResult)) {
            handleResult(loginResult)
            Toast.show("Logged in successfully!", Toast.LONG)
            navigation.navigate('Home')
        }
    },[loginResult])
    
    const handleLogin = () => {
        validate(email, password)
    }
    const handleResult = (accessToken: string | null) => {
        auth.saveUserData(accessToken)
    }
    const onCreateNewAccount = () => {
        navigation.navigate('RegisterScreen')
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
                <TouchableOpacity onPress={onCreateNewAccount}>
                    <Text style={LoginStyle.bodyBold}>Create One</Text>
                </TouchableOpacity>
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