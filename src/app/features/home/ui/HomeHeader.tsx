import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DownArrow from '../../../../../assets/images/DownArrow';
import FastImage from 'react-native-fast-image';
import { PROFILE_THUMBNAIL } from '../../../../utils/Constants';
import colors from '../../../../config/colors/Colors';
import CartIcon from '../../../../../assets/images/CartIcon';

const HomeHeader = () => {
    const [selectedValue, setSelectedValue] = useState('Men'); 

    return (
        <View style={styles.rowContainer}>
            {/* Profile Image */}
            <View style={styles.profileContainer}>
                <FastImage
                    style={styles.profileImage}
                    source={{
                        uri: PROFILE_THUMBNAIL,
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>

            {/* Dropdown */}
            <RNPickerSelect
                onValueChange={(value) => setSelectedValue(value)} 
                value={selectedValue} 
                items={[
                    { label: 'Men', value: 'Men' },
                    { label: 'Women', value: 'Women' },
                ]}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false} 
                Icon={() => (
                    <DownArrow width={24} height={24} style={styles.dropDownIconStyle} /> 
                )}
            />

            {/* Cart Icon */}
            <TouchableOpacity style={styles.cartContainer}>
                <CartIcon width={32} height={32} style={styles.cartIconStyle} />
            </TouchableOpacity>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: 16,
    },
    profileContainer: {
        width: 50, 
        height: 50,
        borderRadius: 25, 
        overflow: 'hidden', 
        borderWidth: 2,
        borderColor: '#ddd', 
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', 
    },
    cartContainer: {
        width: 50,
        height: 50,
        backgroundColor: colors.light.buttonColor, 
        borderRadius: 25, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    cartIconStyle: {
        transform: [
            { translateX: 4 },  
            { translateY: 4 },  
          ]
    },
    dropDownIconStyle: {
        transform: [
            { translateX: -15 },  
            { translateY: 10 }, 
          ]
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        padding: 10,
        backgroundColor: colors.light.fieldBackground,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.light.fieldBackground,
        width: 150, 
        height: 50,
        marginBottom: 5,
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign:'center'
    },
    inputAndroid: {
        fontSize: 16,
        padding: 10,
        backgroundColor: colors.light.fieldBackground,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.light.fieldBackground,
        width: 150, 
        height: 50,
        marginBottom: 5,
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign:'center'
    }
});

export default HomeHeader;
