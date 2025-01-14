import React, { RefObject, useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { Product } from "../../home/ui/Product";
import { getImageUrl } from "../../../../utils/Constants";
import HeartUnfilledIcon from "../../../../../assets/images/HeartUnFilled";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import FastImage from "react-native-fast-image";
import CloseIcon from "../../../../../assets/images/CloseIcon";
import colors from "../../../../config/colors/Colors";
import HeartFilledIcon from "../../../../../assets/images/HeartFilledIcon";
import CircularColor from "../../../../components/circular_color_dot/CircularColorDot";
import { getPriceValue, isNotEmpty } from "../../../../utils/Helpers";
import Toast from 'react-native-simple-toast'
import addToCart, { CartItem } from "../../cart/hook/addToCart";
import addToWishlist from "../../wishlist/hooks/addToWishlist";
import { useAuth } from "../../../../config/auth/AuthProvider";
import removeWishListItem from "../../wishlist/hooks/removeWishListItem";


export const ProductBottomSheet = ({ product, onClose, bottomSheetRef }: { product: Product | null, onClose: () => void, bottomSheetRef: RefObject<BottomSheetMethods> }) => {

    const [addItemToCart,cartResponse,cartError] = addToCart();
    const auth = useAuth();
    const [addItemToWishlist, wishListAddResult, wishListAddError] = addToWishlist();
    const [removeItemFromWishlist, wishListRemovalResult, wishListRemovalError] = removeWishListItem();
    const [isFavourite, setFavourite] = useState<boolean>(false)
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    useEffect(() => {
        if (isNotEmpty(wishListAddError)) {
            Toast.show(wishListAddError!, Toast.SHORT)
        }
    }, [wishListAddResult, wishListAddError])

    useEffect(() => {
        if (isNotEmpty(wishListRemovalError)) {
            Toast.show(wishListAddError!, Toast.SHORT)
        }
    }, [wishListRemovalResult, wishListRemovalError])


    const handleQuantityChange = (type: "increase" | "decrease") => {
        if (type === "increase") {
            setQuantity(prevQuantity => prevQuantity + 1);
        } else if (type === "decrease" && quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const onAddToBag = () => {
        if (selectedSize === null) {
            Toast.show("Please select size", Toast.SHORT)
        } else if (selectedColor === null) {
            Toast.show("Please select color", Toast.SHORT)
        } else {
            const cartItem: CartItem = {
                productId: product?._id,
                quantity: quantity,
                size: selectedSize,
                color: selectedColor
            };
            addItemToCart(auth.user,[cartItem])
            setSelectedColor(null)
            setSelectedSize(null)
            onClose()
        }
    }

    const totalPrice = getPriceValue(product?.price) * quantity;
    const onHeartIconTapped = () => {
        setFavourite(!isFavourite)
        if (isFavourite) {
            removeItemFromWishlist(product?._id!, auth.user)
        } else {
            addItemToWishlist(product?._id!, auth.user)
        }
    }

    return (
        <BottomSheet
            snapPoints={['50%', '90%']}
            index={product ? 0 : -1}
            ref={bottomSheetRef}
        >
            <BottomSheetScrollView style={styles.container}>
                {/* Image and Icons */}
                <View style={styles.imageContainer}>
                    <FastImage source={{ uri: getImageUrl(product?.image), priority: FastImage.priority.high, }} style={styles.productImage} resizeMode={FastImage.resizeMode.cover} />
                    <TouchableOpacity style={styles.heartIcon} onPress={onHeartIconTapped}>
                        {isFavourite ? <HeartFilledIcon width={24} height={24} /> : <HeartUnfilledIcon width={24} height={24} />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <CloseIcon width={24} height={24} />
                    </TouchableOpacity>
                </View>

                {/* Title and Description */}
                <Text style={styles.productTitle}>{product?.title}</Text>
                <Text style={styles.productDescription}>{product?.description}</Text>

                {/* Size */}
                <View style={styles.optionContainer}>
                    <Text style={styles.optionTitle}>Size</Text>
                    <View style={styles.optionRow}>
                        {product?.size.map((size) => (
                            <TouchableOpacity
                                key={size}
                                style={[styles.optionButton, selectedSize === size && styles.selectedOption]}
                                onPress={() => setSelectedSize(size)}
                            >
                                <Text style={styles.optionText}>{size}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Color */}
                <View style={styles.optionContainer}>
                    <Text style={styles.optionTitle}>Color</Text>
                    <View style={styles.optionRow}>
                        {product?.availableColors.map((color) => (
                            <TouchableOpacity
                                key={color}
                                style={[styles.optionButton, selectedColor === color && styles.selectedOption]}
                                onPress={() => setSelectedColor(color)}
                            >
                                {/* <Text style={styles.optionText}>{color}</Text> */}
                                <CircularColor hexCode={color} size={15} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Quantity */}
                <View style={styles.quantityContainer}>
                    <Text style={styles.quantityTitle}>Quantity</Text>
                    <View style={styles.quantityRow}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange("increase")}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange("decrease")}
                        >
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>


                    </View>
                </View>

                {/* Bottom Button */}
                <View style={styles.bottomButtonContainer}>
                    <Text style={styles.totalPrice}>Rs.{totalPrice}</Text>
                    <TouchableOpacity style={styles.addToBagButton} onPress={onAddToBag}>
                        <Text style={styles.addToBagText}>Add to Bag</Text>
                    </TouchableOpacity>
                </View>

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
    imageContainer: {
        position: "relative",
        alignItems: "center"
    },
    productImage: {
        width: "100%",
        height: 300,
        borderRadius: 10,
    },
    heartIcon: {
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: colors.light.fieldBackground,
        borderRadius: 50,
        padding: 5
    },
    closeIcon: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: colors.light.fieldBackground,
        borderRadius: 50,
        padding: 5,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
    },
    productDescription: {
        fontSize: 16,
        color: "gray",
        marginTop: 10,
    },
    optionContainer: {
        marginTop: 20,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    optionRow: {
        flexDirection: "row",
        marginTop: 10,
    },
    optionButton: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginRight: 10,
    },
    selectedOption: {
        backgroundColor: "#eee",
    },
    optionText: {
        fontSize: 16,
    },
    quantityContainer: {
        marginTop: 20,
    },
    quantityTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    quantityButton: {
        backgroundColor: colors.light.buttonColor,
        borderWidth: 1,
        borderColor: colors.light.buttonColor,
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.light.white
    },
    quantityText: {
        fontSize: 18,
        fontWeight: "500",
    },
    bottomButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingVertical: 10,
        backgroundColor: colors.light.buttonColor,
        borderRadius: 30,
        width: '100%',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginStart: 16

    },
    addToBagButton: {
        backgroundColor: colors.light.buttonColor,
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 30,
        alignItems: "center",
    },
    addToBagText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
