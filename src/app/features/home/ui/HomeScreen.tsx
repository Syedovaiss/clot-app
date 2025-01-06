import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ClothSearchBar } from "../../../../components/search/Search";
import colors from "../../../../config/colors/Colors";
import HomeHeader from "./HomeHeader";
import useNewArrival from "../hooks/useNewArrival";
import useTopSellingProducts from "../hooks/useTopSellingProducts";
import useSearch from "../hooks/useSearch";
import useCateogries from "../hooks/useCategories";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Categories } from "./Categories";
import FastImage from "react-native-fast-image";
import { NewArrivals } from "./NewArrival";
import { TopSellingView } from "./TopSelling";

export const HomeScreen = () => {
    const [getCategories, categories, categoriesError] = useCateogries();
    const [getNewArrival, newArrivals, newArrivalError] = useNewArrival();
    const [getTopSellingProducts, topSellingProducts, topSellingProductsError] = useTopSellingProducts();
    const [search, searchResult, searchError] = useSearch()

    useEffect(() => {
        getCategories()
        getNewArrival()
        getTopSellingProducts()
    }, [])

    return (
        <View style={homeStyle.container}>
            <ScrollView>
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
                <View style={homeStyle.titleStyle} >
                    <Text style = {homeStyle.titleTextStyle}>Categories</Text>
                    <Text style = {homeStyle.seeAllText}>See All</Text>
                </View>                
                {categories ? <Categories categories={categories} onCategoryClicked={(item) => console.log(item)} /> : <Text>No Categories Available</Text>}
                <View style={homeStyle.titleStyle} >
                    <Text style = {homeStyle.titleTextStyle}>New In</Text>
                    <Text style = {homeStyle.seeAllText}>See All</Text>
                </View>

                {newArrivals ? <NewArrivals products={newArrivals} onNewArrivalClicked={(item) => console.log(item)} />  : <Text>No New Arrivals</Text>}
                <View style={homeStyle.titleStyle} >
                    <Text style = {homeStyle.titleTextStyle}>Top Selling</Text>
                    <Text style = {homeStyle.seeAllText}>See All</Text>
                </View>
                {topSellingProducts ? <TopSellingView products={topSellingProducts} onTopSellingClicked={(item) => console.log(item)} /> : <Text>No New Arrivals</Text>}
            </ScrollView>
        </View>
    )
}

const homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.backgroundColor
    },
    titleStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 16,
    },
    titleTextStyle: {
        fontSize:20,
        fontWeight:'bold'

    },
    seeAllText: {
        fontSize: 16,
        color: colors.light.textColor,
        textDecorationLine: 'underline',
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 15,
    },
    categoryImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    categoryItemText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
})