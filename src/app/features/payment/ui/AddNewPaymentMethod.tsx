
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInputField } from '../../../../components/text-input/TextInputField';
import colors from '../../../../config/colors/Colors';
import { PrimaryButton } from '../../../../components/button/PrimaryButton';
import Toast from 'react-native-simple-toast';
import { ApiResult } from '../../../../utils/APIResult';
import { isNotEmpty } from '../../../../utils/Helpers';
import { BackIcon } from '../../../../../assets/images/BackIcon';
import addPaymentMethod from '../hook/addPaymentMethod';
import { useAuth } from '../../../../config/auth/AuthProvider';

export const AddNewPaymentMethodsScreen = ({ navigation }: { navigation: any }) => {
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const auth = useAuth();
    const [addNewPaymentMethod, result, error] = addPaymentMethod();

    const handleSubmit = () => {
        if (!cardHolderName || !cardNumber || !expiryDate || !cvv) {
            Toast.show("Please fill out all the relevant field!", Toast.SHORT)
            return;
        }
        addNewPaymentMethod(cardHolderName, cardNumber, expiryDate, cvv, auth.user);
    };

    useEffect(() => {
        if (result === ApiResult.Success) {
            navigation.navigate('PaymentMethodsScreen')
        }
    }, [result])


    useEffect(() => {
        if (isNotEmpty(error)) {
            Toast.show(`${error}`, Toast.LONG)
        }
    }, [error])

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackIcon width={50} height={50} />
            </TouchableOpacity>

            {/* Cardholder Name */}
            <TextInputField
                placeholder="Cardholder Name"
                onTextSubmit={(name) => {
                    setCardHolderName(name)
                }}
            />

            {/* Card Number */}
            <TextInputField
                placeholder="Card Number"
                onTextSubmit={(cardNumber) => {
                    setCardNumber(cardNumber)
                }}
                keyboardType="numeric"
                maxLength={16}
            />

            <View style={styles.horizontalView}>

                {/* Expiry Date */}
                <TextInputField
                    placeholder="MM/YY"
                    onTextSubmit={(expiry) => {
                        setExpiryDate(expiry)
                    }}
                    keyboardType="numeric"
                    maxLength={5}
                />
                {/* CVV */}
                <TextInputField
                    placeholder="CVV"
                    onTextSubmit={(cvv) => {
                        setCvv(cvv)
                    }}
                    keyboardType="numeric"
                    maxLength={3}
                />
            </View>


            {/* Submit Button */}
            <PrimaryButton title='Save' onClick={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.backgroundColor,
    },
    horizontalView: {
        flexDirection: 'row'
    }
});
