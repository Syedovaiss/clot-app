import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../config/colors/Colors";
import BagIcon from "../../../../assets/images/Bag";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext, useEffect } from "react";
import useCartItems from "./hook/useCartItems";
import { useAuth } from "../../../config/auth/AuthProvider";
import { FlatList } from "react-native-gesture-handler";
import { getImageUrl } from "../../../utils/Constants";
import FastImage from "react-native-fast-image";
import CircularColor from "../../../components/circular_color_dot/CircularColorDot";
import incrementCartItem from "./hook/incrementCartItem";
import decrementCartItem from "./hook/decrementCartItem";
import useClearCart from "./hook/useClearCart";
import { ClothHeader } from "../../../components/header/Header";

export const CartScreen = ({ navigation }: { navigation: any }) => {
    const auth = useAuth();
    const [getCartItems, cartItems, cartError] = useCartItems();
    const [increaseItem,incrementResponse,incrementError] = incrementCartItem();
    const [decrementItems,decrementReponse,decrementError] = decrementCartItem();
    const [clearItems,clearItemsResponse,clearItemError] = useClearCart();

    useFocusEffect(
        useCallback(() => {
            if (auth.user) {
                getCartItems(auth.user);
            }
        }, [])
    );

    const onRemoveAll = () => {
        clearItems(auth.user);
        getCartItems(auth.user);
    }

    const onIncrementProduct = (productId: string) => {
        console.log("Incrementing");
        increaseItem(auth.user,productId)
        getCartItems(auth.user);  
    }
    const onDecrementProduct = (productId: string) => {
        console.log("Decrementing");
        decrementItems(auth.user,productId)
        getCartItems(auth.user);  
    }
    const emptyView = () => (
        <View style={styles.centeredContent}>
            <BagIcon width={100} height={100} />
            <Text style={styles.contentText}>Your Cart is Empty</Text>
            <PrimaryButton
                title="Explore Categories"
                onClick={() => navigation.navigate("HomeScreen")} 
            />
        </View>
    );
    const renderCartItems = () => (
        <View style={styles.cartItemsContainer}>
            <TouchableOpacity style={styles.removeAllStyle} onPress={onRemoveAll} >
                <Text style={styles.removeAllText}>Remove All</Text>
            </TouchableOpacity>

            <FlatList
                data={cartItems?.products}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <FastImage
                            source={{ uri: getImageUrl(item.image), priority: FastImage.priority.high }}
                            style={styles.productImage}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <View style={styles.productInfo}>
                            <Text style={styles.productTitle}>{item.title}</Text>
                            {/* Updated text color and added padding for visibility */}
                            <Text style={styles.productDetails}>
                                Size: <Text style={{ fontWeight: 'bold' }}>{item.size || 'N/A'}</Text> | Color: <CircularColor hexCode={item.color} size={15} />
                            </Text>
                        </View>

                        <View style={styles.quantityContainer}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => onDecrementProduct(item._id)}
                            >
                                <Text style={styles.quantityCounterText}>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.quantityText}>{item.quantity}</Text>

                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => onIncrementProduct(item._id)}
                            >
                                <Text style={styles.quantityCounterText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <View style={styles.pricingContainer}>
                <View style={styles.pricingRow}>
                    <Text style={styles.pricingLabel}>Shipping</Text>
                    <Text style={styles.pricingValue}>Rs. {cartItems?.amount?.shippingFee}</Text>
                </View>
                <View style={styles.pricingRow}>
                    <Text style={styles.pricingLabel}>Subtotal</Text>
                    <Text style={styles.pricingValue}>Rs. {cartItems?.amount?.subTotal}</Text>
                </View>
                <View style={styles.pricingRow}>
                    <Text style={styles.pricingLabel}>Tax</Text>
                    <Text style={styles.pricingValue}>Rs. {cartItems?.amount?.tax}</Text>
                </View>
                <View style={styles.pricingRow}>
                    <Text style={styles.pricingLabel}>Total</Text>
                    <Text style={styles.pricingValue}>Rs. {cartItems?.amount?.total}</Text>
                </View>
            </View>

            <PrimaryButton
                title="Checkout"
                onClick={() =>
                    navigation.navigate("CheckoutScreen", {
                        products:cartItems?.products,
                        amount: cartItems?.amount
                    })
                } 
            />
        </View>
    );

    const onBackPress = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <ClothHeader title="Cart" onBackPress={onBackPress} />
            {cartItems?.products ? renderCartItems() : emptyView()}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.backgroundColor,
        alignItems: 'center',
        paddingTop: 20,
    },
    toolbarText: {
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        position: 'absolute',
        marginTop: 50,
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    contentText: {
        fontSize: 18,
        marginTop: 20,
    },
    cartItemsContainer: {
        marginTop: 32,
        width: '100%',
        paddingHorizontal: 20,
    },
    removeAllStyle: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    removeAllText: {
        color: colors.light.textColor,
        fontSize: 16,
    },
    cartItem: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.light.fieldBackground,
        paddingBottom: 10,
        paddingTop: 10,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    productInfo: {
        flex: 1,
        marginLeft: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productDetails: {
        fontSize: 14,
        color: colors.light.textColor, // Updated to a darker color for visibility
        marginTop: 4,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    quantityButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.light.buttonColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityCounterText: {
        color: 'white',
        fontSize: 18,
    },
    quantityText: {
        color: 'black',
        fontSize: 18,
        marginHorizontal: 8
    },
    pricingContainer: {
        marginTop: 30,
        width: '100%',
        paddingHorizontal: 20,
    },
    pricingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    pricingLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    pricingValue: {
        fontSize: 16,
        color: colors.light.textColor,
    },
    checkoutButton: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
});