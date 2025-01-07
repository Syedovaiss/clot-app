import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BagIcon from "../../../../assets/images/Bag";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import colors from "../../../config/colors/Colors";
import CheckoutIcon from "../../../../assets/images/Checkout";

export const OrdersScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.toolbarText}>Orders</Text>

            <View style={styles.centeredContent}>
                <CheckoutIcon width={100} height={100} />
                <Text style={styles.contentText}>No Orders Yet</Text>
                <PrimaryButton title="Explore Categories" onClick={() => {

                }} />
            </View>
        </View>
    )
}

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
        top: 20,
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    contentText: {
        fontSize: 18,
        marginTop: 20
    },
});