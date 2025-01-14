import React, { useCallback } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import colors from "../../../config/colors/Colors";
import CheckoutIcon from "../../../../assets/images/Checkout";
import { useAuth } from "../../../config/auth/AuthProvider";
import useOrders from "./hooks/useOrders";
import { useFocusEffect } from "@react-navigation/native";
import { OrderTile } from "./OrderTile";

export const OrdersScreen = ({ navigation }: { navigation: any }) => {
    const auth = useAuth();
    const [getOrders,orders,orderError] = useOrders();
    const fetchOrders = useCallback(() => {
        getOrders(auth.user);
    }, [auth.user, getOrders]);

     useFocusEffect(
        useCallback(() => {
            fetchOrders();
        }, [])
    );
    const onOrderPress = (orderId: string) => {
        navigation.navigate("OrderDetails", { orders }); 
    };

    const renderItem = ({ item }: { item: { _id: string; cartItems: any[] } }) => (
        <OrderTile
            orderNumber={item._id}
            itemsCount={item.cartItems.length}
            onPress={() => onOrderPress(item._id)}
        />
    );
    return (
        <View style={styles.container}>
            <Text style={styles.toolbarText}>Orders</Text>

            {/* Conditional rendering for empty or populated orders list */}
            {orders?.data.length === 0 ? (
                <View style={styles.centeredContent}>
                    <CheckoutIcon width={100} height={100} />
                    <Text style={styles.contentText}>No Orders Yet</Text>
                    <PrimaryButton title="Explore Categories" onClick={() => navigation.navigate("HomeScreen")} />
                </View>
            ) : (
                <FlatList
                    data={orders?.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.orderList}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.backgroundColor,
        paddingTop: 20,
        paddingHorizontal: 16
    },
    toolbarText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop:50
    },
    orderList: {
        flexGrow: 1,
    },
    orderTile: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.light.fieldBackground,
        marginBottom: 12,
        padding: 16,
        borderRadius: 8,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    orderTileContent: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    orderDetails: {
        marginLeft: 10,
        flexDirection: "column",
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.light.textColor,
    },
    itemsCount: {
        fontSize: 14,
        color: colors.light.textColor,
    },
    orderTileRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    centeredContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    contentText: {
        fontSize: 18,
        marginTop: 20,
    },
});
