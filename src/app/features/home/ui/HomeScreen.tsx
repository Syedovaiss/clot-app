import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ClothSearchBar } from "../../../../components/search/Search";
import colors from "../../../../config/colors/Colors";
import HomeHeader from "./HomeHeader";
import useNewArrival from "../hooks/useNewArrival";
import useTopSellingProducts from "../hooks/useTopSellingProducts";
import useSearch from "../hooks/useSearch";
import useCateogries from "../hooks/useCategories";
import { ScrollView } from "react-native-gesture-handler";
import { Categories } from "./Categories";
import { NewArrivals } from "./NewArrival";
import { TopSellingView } from "./TopSelling";
import useAvatar from "../hooks/useAvatar";
import { useAuth } from "../../../../config/auth/AuthProvider";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { getProduct } from "../../../../utils/Helpers";
import { Product } from "./Product";
import { ProductBottomSheet } from "../../product_details/ui/ProductDetailBottomSheet";
import { useFocusEffect } from "@react-navigation/native";

export const HomeScreen = ({ navigation }: { navigation: any }) => {
    const [getUserAvatar, avatar, avatarError] = useAvatar();
    const [getCategories, categories, categoriesError] = useCateogries();
    const [getNewArrival, newArrivals, newArrivalError] = useNewArrival();
    const [getTopSellingProducts, topSellingProducts, topSellingProductsError] = useTopSellingProducts();
    const auth = useAuth();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        getUserAvatar(auth.user)
        getCategories()
        getNewArrival()
        getTopSellingProducts()
    }, [])
    const closeBottomSheet = () => {
        setSelectedProduct(null);
        bottomSheetRef.current?.close(); 
    };
    const openBottomSheet = (item: any) => {
        let mappedProduct = getProduct(item)
        setSelectedProduct(mappedProduct);
        bottomSheetRef.current?.expand(); 
    };

    return (
        <View style={homeStyle.container}>
            <ScrollView>
                <HomeHeader avatar={avatar} onCartClicked={() => {
                    navigation.navigate('CartScreen')
                }} onProfileClicked={() => {
                    navigation.navigate('Profile')
                }} />
                <ClothSearchBar
                    placeholder="Search"
                    onQuerySubmit={(text) => {
                        navigation.navigate("SearchProduct", {query: text})
                    }}
                    onTextChanged={(text) => {
                        console.log(text)
                    }}
                />
                <View style={homeStyle.titleStyle} >
                    <Text style={homeStyle.titleTextStyle}>Categories</Text>
                </View>
                {categories ? <Categories categories={categories} onCategoryClicked={(item) => navigation.navigate("Products",{categoryId: item._id})} /> : <Text>No Categories Available</Text>}
                <View style={homeStyle.titleStyle} >
                    <Text style={homeStyle.titleTextStyle}>New In</Text>
                </View>

                {newArrivals ? <NewArrivals products={newArrivals} onNewArrivalClicked={(item) =>  openBottomSheet(item)} /> : <Text>No New Arrivals</Text>}
                <View style={homeStyle.titleStyle} >
                    <Text style={homeStyle.titleTextStyle}>Top Selling</Text>
                </View>
                {topSellingProducts ? <TopSellingView products={topSellingProducts} onTopSellingClicked={(item) => {openBottomSheet(item) }} /> : <Text>No New Arrivals</Text>}
            </ScrollView>
            {/* Bottom Sheet Component */}
         
            <ProductBottomSheet product={selectedProduct} onClose={closeBottomSheet} bottomSheetRef={bottomSheetRef}/>
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
        fontSize: 20,
        fontWeight: 'bold'

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
    bottomSheetContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        zIndex: 999,
    },
    productDetailName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productDetailDescription: {
        fontSize: 16,
        marginTop: 10,
    },
    contentContainer: {
        flex: 1,
        backgroundColor:'white'
    },
})