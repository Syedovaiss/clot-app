import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { getImageUrl } from '../../../../utils/Constants';
import { ClothHeader } from '../../../../components/header/Header';
import colors from '../../../../config/colors/Colors';
import { ProductBottomSheet } from '../../product_details/ui/ProductDetailBottomSheet';
import { Product } from '../../home/ui/Product';
import BottomSheet from '@gorhom/bottom-sheet';
import { getProduct } from '../../../../utils/Helpers';
import useSearch from '../hooks/useSearch';

const { width } = Dimensions.get('window');
const numColumns = 2;

const SearchProduct = ({ navigation, route }: { navigation: any, route: any }) => {
    const { query } = route.params;

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchProduct, products, productError] = useSearch();

    useEffect(() => {
        searchProduct(query)
    }, [])

    const renderItem = ({ item }: { item: { id: string; image: string; title: string; price: string } }) => (
       <TouchableOpacity style={styles.productContainer} onPress={() => openBottomSheet(item)}>
         <View >
            <Image source={{ uri: getImageUrl(item.image) }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
        </View>
       </TouchableOpacity>
    );

    const onBackPress = () => {
        navigation.goBack()
    }
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
        <View style={styles.container}>
            <ClothHeader title='Products' onBackPress={onBackPress} />
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                columnWrapperStyle={styles.columnWrapper}
            />
            <ProductBottomSheet product={selectedProduct} onClose={closeBottomSheet} bottomSheetRef={bottomSheetRef} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.light.backgroundColor,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    productContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    productImage: {
        width: width / numColumns - 30,  // To adjust image size to fit within grid
        height: width / numColumns - 30,
        borderRadius: 8,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
});

export default SearchProduct;
