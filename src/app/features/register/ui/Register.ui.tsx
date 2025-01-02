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

    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState<string>('');
    const [validate, validationError, validationResult] = useSignupValidation()
    const [signup, error, result] = useSignupResult()

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

    const handleSignup = () => {
        console.log("Handle Sign Up Called!")
        setLoading(true)
        validate(firstName, lastName, email, password, phoneNumber, gender)
    }
    useEffect(()=> {
        switch (validationResult) {
            case ValidationResult.Valid:
                signup(firstName, lastName, email, password, phoneNumber, gender)
                break;
            case ValidationResult.InValid:
                console.log(validationError)
                setLoading(false)
                Toast.show(
                    validationError,
                    Toast.LONG
                )
                break;
            default:
                break;
        }
      
    },[validationResult])

    useEffect(() => {
        if(isNotEmpty(error)) {
            console.log(error)
            setLoading(false)
            Toast.show(
                error ? error : '',
                Toast.LONG
            )
        } else if(isNotEmpty(result) && result != ValidationResult.None) {
            console.log(result)
            setLoading(false)
            Toast.show("Sign up successfully!", Toast.SHORT)
            navigation.navigate('LoginScreen')
        }
    },[result])


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={RegisterStyle.scrollingContainer}>
            <View style={RegisterStyle.container}>
                {isLoading ? <ActivityIndicator style={RegisterStyle.indicatorStyle} /> : <View />}
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
