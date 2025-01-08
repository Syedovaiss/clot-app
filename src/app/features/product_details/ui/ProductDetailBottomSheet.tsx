import React, { RefObject, useCallback, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { Product } from "../../home/ui/Product";
import { getImageUrl } from "../../../../utils/Constants";
import HeartUnfilledIcon from "../../../../../assets/images/HeartUnFilled";
import HeartFilledIcon from "../../../../../assets/images/HeartFilledIcon";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import FastImage from "react-native-fast-image";


export const ProductBottomSheet = ({ product, onClose, bottomSheetRef, onChange }: { product: Product | null, onClose: () => void, bottomSheetRef: RefObject<BottomSheetMethods>, onChange: (index: number) => void }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product?.size[0]);
    const [selectedColor, setSelectedColor] = useState("Red");

    const handleQuantityChange = (type: "increase" | "decrease") => {
        if (type === "increase") {
            setQuantity(prevQuantity => prevQuantity + 1);
        } else if (type === "decrease" && quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    //   const totalPrice = product.price * quantity;
    const totalPrice = 100 * quantity;


    return (
        <BottomSheet
            snapPoints={['50%', '90%']}
            index={0}
            ref={bottomSheetRef}
        >
            <BottomSheetScrollView style={styles.container}>
                {/* Image and Icons */}
                <View style={styles.imageContainer}>
                    <FastImage source={{ uri: getImageUrl(product?.image), priority: FastImage.priority.high, }} style={styles.productImage} resizeMode={FastImage.resizeMode.cover} />
                    <TouchableOpacity style={styles.heartIcon}>
                        <HeartUnfilledIcon width={24} height={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>

                        <HeartFilledIcon width={24} height={24} />
                    </TouchableOpacity>
                </View>

                {/* Title and Description */}
                <Text style={styles.productTitle}>{product?.title}</Text>
                <Text style={styles.productDescription}>{product?.description}</Text>

                {/* Size */}
                <View style={styles.optionContainer}>
                    <Text style={styles.optionTitle}>Size</Text>
                    <View style={styles.optionRow}>
                        {["S", "M", "L"].map((size) => (
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
                        {["Red", "Blue", "Green"].map((color) => (
                            <TouchableOpacity
                                key={color}
                                style={[styles.optionButton, selectedColor === color && styles.selectedOption]}
                                onPress={() => setSelectedColor(color)}
                            >
                                <Text style={styles.optionText}>{color}</Text>
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
                            onPress={() => handleQuantityChange("decrease")}
                        >
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange("increase")}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Bottom Button */}
                <View style={styles.bottomButtonContainer}>
                    <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
                    <TouchableOpacity style={styles.addToBagButton}>
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
        alignItems: "center",
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 50,
        padding: 5,
    },
    closeIcon: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
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
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    quantityButton: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 50,
        padding: 10,
        marginRight: 20,
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: "bold",
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
        paddingVertical: 20,
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: "bold",
    },
    addToBagButton: {
        backgroundColor: "#6a0dad",
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 25,
    },
    addToBagText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
