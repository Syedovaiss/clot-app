import { View, Text, StyleSheet } from "react-native"
import React, { useState } from "react"
import { BackIcon } from "../../../../../assets/images/BackIcon"
import { RegisterStyle } from "./Register.style"
import { TitleText } from "../../../../components/text/TitleText"
import { TextInputField } from "../../../../components/text-input/TextInputField"
import RNPickerSelect from 'react-native-picker-select';
import { PrimaryButton } from "../../../../components/button/PrimaryButton"
import { RegisterScreenProps } from "./Register.props"
import ClothDropDown from "../../../../components/dropdown/ClothDropDown"
import { ScrollView } from "react-native-gesture-handler"

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const handleSignup = () => {

    }
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
