import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import HeartFilledIcon from '../../../../../assets/images/HeartFilledIcon';
import useWishList from '../hooks/useWishList';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../../../config/auth/AuthProvider';
import { getImageUrl } from '../../../../utils/Constants';
import colors from '../../../../config/colors/Colors';
import removeWishListItem from '../hooks/removeWishListItem';
import { ApiResult } from '../../../../utils/APIResult';
import { getProduct, isNotEmpty } from '../../../../utils/Helpers';
import Toast from 'react-native-simple-toast'
import { BackIcon } from '../../../../../assets/images/BackIcon';
import BottomSheet from '@gorhom/bottom-sheet';
import { Product } from '../../home/ui/Product';
import { ProductBottomSheet } from '../../product_details/ui/ProductDetailBottomSheet';

export const WishlistScreen = ({ navigation }: { navigation: any }) => {
    const [getWishlist, wishlist, wishlistError] = useWishList();
    const [removeProduct, result, removalError] = removeWishListItem();
    const auth = useAuth();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const closeBottomSheet = () => {
        setSelectedProduct(null);
        bottomSheetRef.current?.close();
    };
    const openBottomSheet = (item: any) => {
        let mappedProduct = getProduct(item)
        setSelectedProduct(mappedProduct);
        bottomSheetRef.current?.expand();
    };


    useFocusEffect(
        useCallback(() => {
            getWishlist(auth.user)
        }, [])
    )
    useEffect(() => {
        if (result === ApiResult.Success) {
            getWishlist(auth.user)
        }

        if (isNotEmpty(removalError)) {
            Toast.show(`${removalError}`, Toast.LONG)
        }
    }, [result, removalError])
    const toggleFavorite = (id: string) => {
        removeProduct(id, auth.user)
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={{ marginStart: 20, marginTop: 20 }} onPress={() => navigation.goBack()}>
                <BackIcon width={50} height={50} />
            </TouchableOpacity>
            {wishlist.length === 0 ? <Text style={styles.noItemText}> No Items In Wishlist</Text> : <FlatList
                data={wishlist}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.productContainer} onPress={() => openBottomSheet(item)}>
                            <View>
                                <TouchableOpacity
                                    style={styles.favoriteIcon}
                                    onPress={() => toggleFavorite(item._id)}
                                >
                                    <HeartFilledIcon width={50} height={50} />
                                </TouchableOpacity>

                                <Image source={{ uri: getImageUrl(item.image) }} style={styles.productImage} />
                                <Text style={styles.productTitle}>{item.title}</Text>
                                <Text style={styles.productPrice}>{item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item) => item._id}
                numColumns={2}
                contentContainerStyle={styles.grid}
            />}

            <ProductBottomSheet product={selectedProduct} onClose={closeBottomSheet} bottomSheetRef={bottomSheetRef} />

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.backgroundColor
    },
    grid: {
        padding: 10,
    },
    productContainer: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        backgroundColor: colors.light.fieldBackground,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        padding: 10,
        position: 'relative',
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        marginStart: 15,
        marginTop: 5,
        zIndex: 1,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
    },
    productTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productPrice: {
        marginTop: 5,
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
    noItemText: {
        fontSize: 20,
        justifyContent: 'center'
    }
});
