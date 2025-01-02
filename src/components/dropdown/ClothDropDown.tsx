
export type DropdownItem = {
    label: string;
    value: string;
};

export type ClothDropDownProps = {
    data: DropdownItem[],
    searchPlaceholder?: string,
    placeholder:string,
    onSelection: (text: string) => void
}

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import colors from '../../config/colors/Colors';

const ClothDropDown = (props: ClothDropDownProps) => {
    const [value, setValue] = useState<string | null>(null);

    return (
        <View style={styles.container}>
            {/* {renderLabel()} */}
            <Dropdown
                style={[styles.dropdown && { borderColor: colors.light.fieldBackground  }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={props.data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={props.placeholder}
                searchPlaceholder={props.searchPlaceholder ? props.searchPlaceholder : "Search..."}
                value={value}
                onChange={item => {
                    setValue(item.value);
                    props.onSelection(item.value)
                }}
            />
        </View>
    );
};

export default ClothDropDown;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light.fieldBackground ,
        marginStart: 16,
        marginTop: 16,
        marginEnd: 16,
        borderRadius: 12,
        padding:16
    },
    dropdown: {
        height: 50,
        borderColor: colors.light.fieldBackground ,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginStart:8,
        fontSize: 16,
        fontFamily: 'Circular-Book'
    },
    label: {
        backgroundColor: 'grey',
        zIndex: 999,
        fontFamily: 'Circular-Book',
        fontSize: 12,
        color: colors.light.textColor
    },
    placeholderStyle: {
        fontSize: 12,
        fontFamily: 'Circular-Book',
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: 'Circular-Book',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily: 'Circular-Book',
    },
});