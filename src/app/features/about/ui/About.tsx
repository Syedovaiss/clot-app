import { StyleSheet, Text, View } from "react-native"
import { aboutStyle } from "./About.style"
import { TitleText } from "../../../../components/text/TitleText"
import React, { useEffect, useState } from "react"
import { AboutScreenProps } from "./About.props"
import Chip from "../../../../components/chips/ChipComponent"
import { Picker } from "@react-native-picker/picker"
import { PrimaryButton } from "../../../../components/button/PrimaryButton"
import { isEmpty, isNotEmpty } from "../../../../utils/Helpers"
import Toast from 'react-native-simple-toast';
import updateUserInfo from "../hooks/updateUserInfo"
import { useAuth } from "../../../../config/auth/AuthProvider"

export const AboutScreen: React.ComponentType<AboutScreenProps> = ({ navigation, route }) => {
    const interestedIn: string[] = ['Men', 'Women'];
    const [selectedChip, setSelectedChip] = useState<string | null>(null);
    const token = route.params?.paramData
    const [execute, error, result] = updateUserInfo()
    const handleChipSelect = (chipLabel: string) => {
        setSelectedChip(chipLabel);
    };
    const auth = useAuth()
    const [selectedAgeRange, setSelectedAgeRange] = useState<string>('18-24');
    useEffect(() => {
        if (isNotEmpty(error)) {
            Toast.show(
                error,
                Toast.LONG
            )
        }
        if (result) {
            auth.saveUserData(token!)
            navigation.navigate('Home')
        }
    }, [result])

    const onSubmitInfo = () => {
        if (isEmpty(selectedChip)) {
            Toast.show(
                'Please select who do you shop for',
                Toast.LONG
            )
        }
        else if (isEmpty(token)) {
            Toast.show(
                'Failed to retreive token!',
                Toast.LONG
            )
        } else {
            execute(selectedChip!, selectedAgeRange, token!)
        }
    }

    const ageRanges = [
        '18-24',
        '25-34',
        '35-44',
        '45-54',
        '55-64',
        '65+',
    ];

    return (
        <View style={aboutStyle.container}>
            <View style={additionalStyles.container} >
                <TitleText text="Tell us about yourself" />
            </View>
            <Text style={aboutStyle.bodyTextStyle}>What do you shop for?</Text>
            <View style={aboutStyle.chipContainer}>
                {interestedIn.map((chip) => (
                    <Chip
                        key={chip}
                        label={chip}
                        isSelected={chip === selectedChip}
                        onPress={() => handleChipSelect(chip)}
                    />
                ))}
            </View>
            <Text style={aboutStyle.bodyTextStyle}>How old are you?</Text>
            <View style={aboutStyle.pickerContainer}>
                <Picker
                    selectedValue={selectedAgeRange}
                    onValueChange={(itemValue) => setSelectedAgeRange(itemValue)}
                    style={aboutStyle.picker}
                >
                    {ageRanges.map((range) => (
                        <Picker.Item key={range} label={range} value={range} />
                    ))}
                </Picker>
            </View>

            <PrimaryButton title="Finish" onClick={onSubmitInfo} />
        </View>
    )
}


const additionalStyles = StyleSheet.create({
    container: {
        marginStart: 16,
        marginTop: 100
    }
})