import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useAuth } from "../../../../config/auth/AuthProvider";  
import useAddresses, { Address } from "../../address/hooks/useAddresses";

export const AddressBottomSheet = ({
    bottomSheetRef,
    onClose,
    onSelectAddress,
}: {
    bottomSheetRef: any;
    onClose: () => void;
    onSelectAddress: (address: Address) => void;  
}) => {
    const auth = useAuth();
    const [getAddresses, addresses, error] = useAddresses();  


    useEffect(() => {
        getAddresses(auth.user);
    }, []);

    const handleSelectAddress = (address: Address) => {
        onSelectAddress(address);  
        onClose();  
    };

    return (
        <BottomSheet
            snapPoints={['50%', '90%']}
            index={addresses.length ? 0 : -1}
            ref={bottomSheetRef}
            onClose={onClose}
        >
            <BottomSheetScrollView style={styles.container}>
                {/* Error Message */}
                {error && <Text style={styles.errorText}>{error}</Text>}

                {/* Address List */}
                {addresses.length > 0 ? (
                    <View style={styles.addressList}>
                        {addresses.map((address) => (
                            <TouchableOpacity
                                key={address._id}
                                style={styles.addressItem}
                                onPress={() => handleSelectAddress(address)}
                            >
                                <Text style={styles.addressText}>{address.address}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.noAddressesText}>No addresses available</Text>
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
    errorText: {
        color: "red",
        marginBottom: 10,
    },
    addressList: {
        marginBottom: 20,
    },
    addressItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    addressText: {
        fontSize: 16,
    },
    noAddressesText: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
        marginVertical: 20,
    },
});
