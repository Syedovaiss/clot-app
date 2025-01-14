import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useAuth } from "../../../../config/auth/AuthProvider";  // Assuming auth context is needed
import usePayments, { PaymentMethods } from "../../payment/hook/usePayments";
import VisaIcon from "../../../../../assets/images/VisaIcon";
import MastercardIcon from "../../../../../assets/images/MastercardIcon";

export const PaymentBottomSheet = ({
    bottomSheetRef,
    onClose,
    onSelectPayment,
}: {
    bottomSheetRef: any;
    onClose: () => void;
    onSelectPayment: (paymentMethod: PaymentMethods) => void;
}) => {
    const auth = useAuth();
     const [getPaymentMethods, paymentMethods, error] = usePayments(); 
    useEffect(() => {
       getPaymentMethods(auth.user);
    }, []);

    const handleSelectPayment = (paymentMethod: PaymentMethods) => {
        onSelectPayment(paymentMethod);  
        onClose();  
    };

    return (
        <BottomSheet
            snapPoints={['50%', '90%']}
            index={ -1}
            ref={bottomSheetRef}
            onClose={onClose}
        >
            <BottomSheetScrollView style={styles.container}>
                {paymentMethods.length > 0 ? (
                    <View style={styles.paymentList}>
                        {paymentMethods.map((method) => (
                            <TouchableOpacity
                                key={method._id}
                                style={styles.paymentItem}
                                onPress={() => handleSelectPayment(method)}
                            >
                               {method.cardType === 'Visa' ? <VisaIcon width={24} height={24} /> : <MastercardIcon width={24} height={24} />}
                                <Text style={styles.paymentText}>{method.cardNumber}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.noPaymentsText}>No payment methods available</Text>
                )}
            </BottomSheetScrollView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
    },
    paymentList: {
        marginBottom: 20,
    },
    paymentItem: {
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    paymentIcon: {
        marginRight: 15,
    },
    paymentText: {
        fontSize: 16,
        marginStart: 16
    },
    noPaymentsText: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
        marginVertical: 20,
    },
});
