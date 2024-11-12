import { View, StyleSheet, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import { BackIcon } from "../../../../../assets/images/BackIcon"
import { RegisterStyle } from "./Register.style"
import { TitleText } from "../../../../components/text/TitleText"
import { TextInputField } from "../../../../components/text-input/TextInputField"
import { PrimaryButton } from "../../../../components/button/PrimaryButton"
import { RegisterScreenProps } from "./Register.props"
import ClothDropDown from "../../../../components/dropdown/ClothDropDown"
import { ScrollView } from "react-native-gesture-handler"
import useSignupValidation from "../hooks/useSignupValidation"
import { ValidationResult } from "../../../../utils/ValidationResults.type"
import Toast from 'react-native-simple-toast';
import useSignupResult from "../hooks/useSignupResult"
import { isNotEmpty } from "../../../../utils/Helpers"

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {

    const [validate, validationError, validationResult] = useSignupValidation()
    const [signup, error, result] = useSignupResult()
    const [isLoading, setLoading] = useState(false)

    const handleSignup = () => {
        if (!isLoading)
            validate(firstName, lastName, email, password, phoneNumber, gender)
        setLoading(true)
    }

    useEffect(() => {
        if (validationResult === ValidationResult.Valid) {
            signup(firstName, lastName, email, password, phoneNumber, gender)
            if (result == ValidationResult.Valid) {
                Toast.show("Sign up successfully!", Toast.LONG)
                setLoading(false)
                navigation.navigate('LoginScreen')
            }
            if (isNotEmpty(error)) {
                Toast.show(error, Toast.LONG)
                setLoading(false)
            }
        }
        if (validationResult === ValidationResult.InValid) {
            Toast.show(validationError, Toast.LONG)
            setLoading(false)
        }
    }, [validationError, validationResult, error, result])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState<string>('');

    const genderItems = [
        {
            label: 'Male',
            value: 'Male'
        },
        {
            label: 'Female',
            value: 'Female'
        }
    ];
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={RegisterStyle.scrollingContainer}>
            <View style={RegisterStyle.container}>
                {isLoading ? <ActivityIndicator /> : <View />}
                <BackIcon width={40} height={40} style={RegisterStyle.backIconStyle} onPress={() => {
                    navigation.goBack();
                }} />
                <View style={additionalStyles.container} >
                    <TitleText text="Create Account" />
                </View>
                <TextInputField
                    placeholder="First Name"
                    onTextSubmit={(text) => {
                        setFirstName(text)
                    }}
                    returnKeyType='next'
                />
                <TextInputField
                    placeholder="Last Name"
                    onTextSubmit={(text) => {
                        setLastName(text)
                    }}
                    returnKeyType='next'
                />
                <ClothDropDown
                    data={genderItems}
                    onSelection={(text: string) => setGender(text)}
                    placeholder="Select Gender"
                />
                <TextInputField
                    placeholder="Email"
                    onTextSubmit={(text) => {
                        setEmail(text)
                    }}
                    returnKeyType='next'
                />
                <TextInputField
                    placeholder="Phone Number"
                    onTextSubmit={(text) => {
                        setPhoneNumber(text)
                    }}
                    keyboardType='number-pad'
                    returnKeyType='next'
                    maxLength={11}
                />
                <TextInputField
                    placeholder="Password"
                    onTextSubmit={(text) => {
                        setPassword(text)
                    }}
                    secureTextEntry={true}
                    returnKeyType="done"
                />
                <PrimaryButton title="Sign Up" onClick={handleSignup} />
            </View>
        </ScrollView>
    )
}


const additionalStyles = StyleSheet.create({
    container: {
        marginStart: 16,
        marginTop: 16
    }
})
