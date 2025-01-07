import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import VisaIcon from '../../../../../assets/images/VisaIcon';
import MastercardIcon from '../../../../../assets/images/MastercardIcon';
import usePayments from '../hook/usePayments';
import { useAuth } from '../../../../config/auth/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import { BackIcon } from '../../../../../assets/images/BackIcon';
import { PrimaryButton } from '../../../../components/button/PrimaryButton';
import colors from '../../../../config/colors/Colors';

export const PaymentMethodsScreen = ({ navigation }: { navigation: any }) => {
    const auth = useAuth()
    const [getPaymentMethods, payments, error] = usePayments()

    useFocusEffect(
        useCallback(() => {
            getPaymentMethods(auth.user);
        }, [])
    )

    const handleBack = () => {
        navigation.goBack()
    };

    const handleAddPaymentMethod = () => {
        navigation.navigate('AddNewPaymentMethodsScreen')
    };

    return (
        <View style={styles.container}>
            {/* Back Arrow Button */}
            <TouchableOpacity onPress={handleBack}>
                <BackIcon width={50} height={50} />
            </TouchableOpacity>

            {/* Payment List */}
            <ScrollView style={styles.paymentList}>
                {payments.map((payment) => (
                    <View key={payment._id} style={styles.paymentTile}>
                        <View style={styles.cardDetails}>
                            <Text style={styles.cardHolderName}>{payment.cardHolderName}</Text>
                            <Text style={styles.cardNumber}>{payment.cardNumber}</Text>
                        </View>
                        {payment.cardType === 'Visa' ? <VisaIcon width={24} height={24} /> : <MastercardIcon width={24} height={24} />}
                    </View>
                ))}
            </ScrollView>


            {/* Add Payment Method Button */}
            <PrimaryButton title='Add New' onClick={handleAddPaymentMethod} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
        backgroundColor:colors.light.backgroundColor
    },
    backButton: {
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    paymentList: {
        marginBottom: 20,
    },
    paymentTile: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.light.fieldBackground,
        borderRadius: 8,
        marginBottom: 10,
        justifyContent: 'space-between',
        marginTop: 10
    },
    cardDetails: {
        flex: 1,
    },
    cardHolderName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardNumber: {
        fontSize: 14,
        color: '#777',
    },
    cardIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    addButton: {
        padding: 16,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
