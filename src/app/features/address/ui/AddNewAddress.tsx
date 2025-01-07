import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BackIcon } from '../../../../../assets/images/BackIcon';
import { PrimaryButton } from '../../../../components/button/PrimaryButton';
import colors from '../../../../config/colors/Colors';
import { TextInputField } from '../../../../components/text-input/TextInputField';
import { isEmpty, isNotEmpty } from '../../../../utils/Helpers';
import Toast from 'react-native-simple-toast';
import addAddress from '../hooks/addAddress';
import { ApiResult } from '../../../../utils/APIResult';
import { useAuth } from '../../../../config/auth/AuthProvider';

type Chip = 'Home' | 'Work' | 'Others';

export const AddNewAddress = ({ navigation }: { navigation: any }) => {
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [selectedChip, setSelectedChip] = useState<Chip | null>(null);
    const [addNewAddress, result, error] = addAddress();
    const auth = useAuth();

    useEffect(() => {
        if (result === ApiResult.Success) {
            navigation.navigate('AddressesScreen')
        }
    }, [result])


    useEffect(() => {
        if (isNotEmpty(error)) {
            Toast.show(`${error}`, Toast.LONG)
        }
    }, [error])

    const handleChipSelect = (chip: Chip) => {
        if (selectedChip === chip) {
            setSelectedChip(null);
        } else {
            setSelectedChip(chip);
        }
    };

    const handleSave = () => {
        if (isEmpty(addressLine1) && isEmpty(addressLine2)) {
            Toast.show("Please Provide Address!", Toast.SHORT)
        } else if (isEmpty(city)) {
            Toast.show("Please Provide City!", Toast.SHORT)
        } else if (selectedChip === null) {
            Toast.show("Please Provide Address Type!", Toast.SHORT)
        } else {
            const address = `${addressLine1} ${addressLine2}, ${city}`
            addNewAddress(address, selectedChip,auth.user)
        }
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackIcon width={50} height={50} />
            </TouchableOpacity>

            {/* Address Line 1 */}
            <TextInputField
                placeholder="Address Line 1"
                onTextSubmit={(text) => {
                    setAddressLine1(text)
                }}
            />

            {/* Address Line 2 */}
            <TextInputField
                placeholder="Address Line 2"
                onTextSubmit={(text) => {
                    setAddressLine2(text)
                }}
            />

            {/* City */}
            <TextInputField
                placeholder="City"
                onTextSubmit={(text) => {
                    setCity(text)
                }}
            />

            {/* Chips */}
            <View style={styles.chipContainer}>
                {['Home', 'Work', 'Others'].map((chip) => {
                    const isActive = selectedChip === chip;
                    return (
                        <TouchableOpacity
                            key={chip}
                            style={[styles.chip, isActive ? styles.activeChip : styles.inactiveChip]}
                            onPress={() => handleChipSelect(chip as Chip)}>
                            <Text style={[styles.chipText, isActive && styles.activeChipText]}>
                                {chip}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            {/* Save Button */}
            <PrimaryButton title='Save' onClick={handleSave} />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.light.backgroundColor
    },
    chipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 10
    },
    chip: {
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeChip: {
        backgroundColor: colors.light.buttonColor,
    },
    inactiveChip: {
        backgroundColor: colors.light.fieldBackground,
    },
    chipText: {
        fontSize: 16,
        color: colors.light.textColor,
    },
    activeChipText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});
