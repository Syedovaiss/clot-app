import React, { useCallback, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useAddresses, { Address } from '../hooks/useAddresses';
import { useAuth } from '../../../../config/auth/AuthProvider';
import { BackIcon } from '../../../../../assets/images/BackIcon';
import { PrimaryButton } from '../../../../components/button/PrimaryButton';
import colors from '../../../../config/colors/Colors';

const AddressesScreen = ({ navigation }: { navigation: any }) => {
    const auth = useAuth()
    const [getAddresses, addresses, error] = useAddresses();

    useFocusEffect(
       useCallback(() => {
        getAddresses(auth.user);
       },[])
    )

    const renderAddressItem = ({ item }: { item: Address }) => (
        <View style={styles.addressTile}>
            <Text style={styles.addressName}>{item.addressType}</Text>
            <Text style={styles.addressDetail}>{item.address}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Back Arrow Button */}
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <BackIcon width={50} height={50} />
            </TouchableOpacity>

            {/* Address List */}
            <FlatList
                data={addresses}
                keyExtractor={(item) => item._id}
                renderItem={renderAddressItem}
                contentContainerStyle={styles.addressList}
            />
             {/* Add New Address Button */}
            <PrimaryButton title='Add New' onClick={() => {
                navigation.navigate('AddNewAddressScreen')
            }} />
        
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.backgroundColor,
        paddingTop: 20,
        paddingHorizontal: 15
    },
    addressList: {
        paddingBottom: 80, 
    },
    addressTile: {
        backgroundColor: colors.light.fieldBackground,
        borderRadius: 15,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        elevation: 1, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    addressName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.light.textColor
    },
    addressDetail: {
        fontSize: 14,
        color: colors.light.placeholderColor,
        marginTop: 5,
    }
});

export default AddressesScreen;
