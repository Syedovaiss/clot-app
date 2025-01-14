import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../../config/colors/Colors';
import FastImage from 'react-native-fast-image';
import { getImageUrl } from '../../../utils/Constants';
import VisaIcon from '../../../../assets/images/VisaIcon';
import MastercardIcon from '../../../../assets/images/MastercardIcon';
import { ClothHeader } from '../../../components/header/Header';

export const OrderDetails = ({ navigation,route }: { navigation:any, route: any }) => {
    const { orders } = route.params;

    // Render function for each cart item
    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.productCard}>
            <FastImage source={{ uri:getImageUrl( item.image) }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
                <View style={styles.productPriceInfo}>
                    <Text>Price: {item.price}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                </View>
            </View>
        </View>
    );

    const onBackPress = () => {
        console.log("Going...")
        navigation.goBack()
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ClothHeader title='Order Details' onBackPress={onBackPress} />
            {/* Order Items */}
            {orders.data.map((items:any) => (
                <FlatList
                    key={items.id}
                    data={items.cartItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.productList}
                />
            ))}

            {/* Shipping Address */}
            <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>Shipping Address</Text>
                <Text>{orders.shippingAddress}</Text>
            </View>

            {/* Payment Info */}
            <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>Payment Info</Text>
                <View style={styles.cardDetails}>
                {orders.paymentInfo.cardType === 'Visa' ? <VisaIcon width={50} height={50} /> : <MastercardIcon width={24} height={24} />}
                <Text style={styles.cardDetailText}>{orders.paymentInfo.cardHolderName}</Text>
                </View>
              
            </View>

            {/* Pricing Details */}
            <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>Pricing Details</Text>
                <Text>Subtotal: {orders.data[0].pricing.subTotal} PKR</Text>
                <Text>Shipping: {orders.data[0].pricing.shipping} PKR</Text>
                <Text>Tax: {orders.data[0].pricing.tax} PKR</Text>
                <Text>Total: {orders.data[0].pricing.total} PKR</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.light.backgroundColor,
        padding: 16,
    },
    productList: {
        padding: 0,
    },
    productCard: {
        flexDirection: 'row',
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    productInfo: {
        flex: 1,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDescription: {
        fontSize: 14,
        color: '#555',
        marginVertical: 4,
    },
    productPriceInfo: {
        marginTop: 8,
        fontSize: 14,
        color: '#333',
    },
    infoCard: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardDetails: {
        flexDirection:'row'
    },
    cardDetailText: {
        marginTop:16,
        marginStart:8,
        fontWeight:'500'
    }
});
