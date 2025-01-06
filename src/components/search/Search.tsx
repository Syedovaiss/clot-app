import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import colors from '../../config/colors/Colors'; // Make sure to define colors in your colors file
import SearchIcon from '../../../assets/images/SearchIcon';
import { SearchBarProps } from './Search.props';

export const ClothSearchBar = (props: SearchBarProps) => {
    const [inputText, setInputText] = useState('');

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer}>
                <SearchIcon width={24} height={24} />
            </TouchableOpacity>
            <TextInput
                style={styles.inputStyle}
                placeholder={props.placeholder}
                placeholderTextColor={colors.light.placeholderColor}
                value={inputText}
                onChangeText={(text) => {
                    setInputText(text)
                    props.onTextChanged(text)
                }}
                onSubmitEditing={() => props.onQuerySubmit(inputText)}
                returnKeyType="search"
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.light.fieldBackground,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 10,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },
    inputStyle: {
        flex: 1,
        fontSize: 16,
        color: colors.light.textColor,
        paddingVertical: 0,
        height: 32,
    },
});