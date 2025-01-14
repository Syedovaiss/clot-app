import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { getImageUrl } from "../../../../utils/Constants";
import CircularColor from "../../../../components/circular_color_dot/CircularColorDot";
import { PrimaryButton } from "../../../../components/button/PrimaryButton";
import colors from "../../../../config/colors/Colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { Address } from "../../address/hooks/useAddresses";
import { AddressBottomSheet } from "./AddressBottomSheet";
import { PaymentBottomSheet } from "./PaymentBottomSheet";
import { PaymentMethods } from "../../payment/hook/usePayments";
import Toast from 'react-native-simple-toast'
import placeOrder, { PlaceOrderRequest } from "../hook/placeOrder";
import { useAuth } from "../../../../config/auth/AuthProvider";
import { isNotEmpty } from "../../../../utils/Helpers";

export const CheckoutScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const { products, amount } = route.params;
    const auth = useAuth();
    const addressBottomSheetRef = useRef<BottomSheet>(null);
    const paymentBottomSheetRef = useRef<BottomSheet>(null);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethods | null>(null);
    const [placeOrderItems,order,orderError] = placeOrder();

    useEffect(() => {
        if(isNotEmpty(orderError)) {
            Toast.show(orderError? orderError: "",Toast.SHORT)
        }
        if(order) {
            Toast.show("Order Placed Successfully!",Toast.SHORT)
            navigation.navigate('HomeScreen')
        }
    },[order,orderError])

    const openAddressBottomSheet = () => {
        addressBottomSheetRef.current?.expand()
    }

    const openPaymentBottomSheet = () => {
        paymentBottomSheetRef.current?.expand()
    }

    const onPlaceOrder = () => {
        if(selectedAddress === null) {
            Toast.show("Please select address",Toast.SHORT)
        } else if(selectedPaymentMethod === null) {
            Toast.show("Please select payment method",Toast.SHORT)
        } else {
            let request: PlaceOrderRequest = {
                addressId: selectedAddress._id,
                paymentId: selectedPaymentMethod._id,
                cartItems:products,
                amount: amount
            }
            placeOrderItems(auth.user,request)
        }
    }
    const renderProduct = ({ item }: { item: any }) => (
        <View style={styles.productItem}>
            <FastImage
                source={{ uri: getImageUrl(item.image), priority: FastImage.priority.high }}
                style={styles.productImage}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDetails}>
                    Size: <Text style={{ fontWeight: 'bold' }}>{item.size || 'N/A'}</Text> |
                    Color: <CircularColor hexCode={item.color} size={15} />
                </Text>
                <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            {/* Toolbar */}
            <Text style={styles.toolbarText}>Checkout</Text>

            {/* Product List */}
            <View style={styles.productList}>
                <FlatList
                    data={products}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item._id.toString()}
                />
            </View>

            {/* Address Section */}
            <TouchableOpacity
                style={styles.selectionView}
                onPress={() => openAddressBottomSheet()}
            >
                <Text style={styles.selectionLabel}>{selectedAddress?.address || "Select an address"}</Text>
            </TouchableOpacity>

            {/* Payment Section */}
            <TouchableOpacity
                style={styles.selectionView}
                onPress={() => openPaymentBottomSheet()} 
            >
                <Text style={styles.selectionLabel}>{selectedPaymentMethod?.cardNumber || "Select a payment method"}</Text>
            </TouchableOpacity>

            {/* Pricing Summary */}
            <View style={styles.pricingContainer}>
                <View style={styles.pricingRow}>
                    <Text style={styles.pricingLabel}>Subtotal</Text>
                    <Text style={styles.pricingValue}>Rs. {amount?.subTotal}</Text>
                </View>
                <View style={styles.pricingRow}>
                    <Text style={styles.pricingLabel}>Shipping</Text>
                    <Text style={styles.pricingValue}>Rs. {amount?.shippingFee}</Text>
                </View>
                <View style={styles.pricingRow}>
                    <Text style={styles.pricingLabel}>Tax</Text>
                    <Text style={styles.pricingValue}>Rs. {amount?.tax}</Text>
                </View>
                <View style={styles.pricingRow}>
                    <Text style={styles.pricingLabel}>Total</Text>
                    <Text style={styles.pricingValue}>Rs. {amount?.total}</Text>
                </View>
            </View>

            {/* Place Order Button */}
            <PrimaryButton
                title="Place Order"
                onClick={onPlaceOrder}
            />

            <AddressBottomSheet
                onSelectAddress={(address) => { setSelectedAddress(address) }}
                onClose={() => addressBottomSheetRef.current?.close()}
                bottomSheetRef={addressBottomSheetRef}
            />
            <PaymentBottomSheet
            onSelectPayment={(payment) => setSelectedPaymentMethod(payment)}
            onClose={() => paymentBottomSheetRef.current?.close()}
            bottomSheetRef={paymentBottomSheetRef}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.backgroundColor,
        padding: 20,
    },
    toolbarText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    productList: {
        marginBottom: 30,
    },
    productItem: {
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
        color: colors.light.textColor,
        marginTop: 4,
    },
    quantityText: {
        fontSize: 14,
        color: colors.light.textColor,
        marginTop: 8,
    },
    selectionView: {
        backgroundColor: colors.light.fieldBackground,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectionValue: {
        fontSize: 14,
        color: colors.light.textColor,
    },
    pricingContainer: {
        marginBottom: 20,
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
});
