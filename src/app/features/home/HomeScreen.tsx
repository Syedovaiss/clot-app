import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ClothSearchBar } from "../../../components/search/Search";
import colors from "../../../config/colors/Colors";
import HomeHeader from "./HomeHeader";

export const HomeScreen = () => {
    
    return (
        <View style={homeStyle.container}>
            <HomeHeader />
            <ClothSearchBar
                placeholder="Search"
                onQuerySubmit={(text) => {
                    console.log(text);
                }}
                onTextChanged={(text) => {
                    console.log(text)
                }}
            />
            <View style={homeStyle.categoryTitleStyle} >
                <Text>Categories</Text>
                <Text>See All</Text>
            </View>
        </View>
    )
}

const homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.backgroundColor
    },
    categoryTitleStyle: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 16, 
        marginVertical: 16, 
    },
    categoryText: {
        fontSize: 18, 
        fontWeight: 'bold', 
        color: colors.dark.textColor,
    },
    seeAllText: {
        fontSize: 16, 
        color: colors.light.textColor, 
        textDecorationLine: 'underline', 
    }
})