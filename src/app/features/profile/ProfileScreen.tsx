import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import FastImage from 'react-native-fast-image'; // if you're using FastImage for optimized images
import colors from '../../../config/colors/Colors';
import userUserInfo from './hooks/userUserInfo';
import { useAuth } from '../../../config/auth/AuthProvider';
import { getImageUrl, HELP_URL, SUPPORT_URL } from '../../../utils/Constants';
import RightArrow from '../../../../assets/images/RightArrow';
import Toast from 'react-native-simple-toast';

export const ProfileScreen = ({ navigation }: { navigation: any }) => {
    const auth = useAuth()
    const [getUserInfo, userInfo, error] = userUserInfo()
    const openHelpAndSupport = (url: string) => {
        Linking.openURL(url).catch((err) =>
            Toast.show(
                'Failed to open the URL: ' + err,
                Toast.LONG
            )

        );
    }
    const onSignout = () => {
        Alert.alert(
            'Confirm Action',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Sign out cancelled!'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        console.log("Logging out!")
                        // auth.clearUserData()
                        // navigation.navigate('LoginScreen')
                    },
                },
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        getUserInfo(auth.user)
    }, [])

    return (
        <View style={styles.container}>
            {/* Avatar and User Info Section */}
            <View style={styles.avatarContainer}>
                <FastImage
                    source={{ uri: getImageUrl(userInfo?.avatar) }}
                    style={styles.avatar}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>

            {/* User Info Tile (Name + Phone Number) */}
            <View style={styles.userInfoTile}>
                <Text style={styles.userName}>{`${userInfo?.firstName} ${userInfo?.lastName}`}</Text>
                <Text style={styles.userEmail}>{userInfo?.email}</Text>
                <Text style={styles.userPhone}>{userInfo?.phoneNumber}</Text>
            </View>

            {/* List of Tiles Below */}
            <View style={styles.tileList}>
                <TouchableOpacity style={styles.tile} onPress={() => { navigation.navigate('AddressesScreen') }}>
                    <Text style={styles.tileText}>Address</Text>
                    <RightArrow width={24} height={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={() => { navigation.navigate('PaymentMethodsScreen')  }}>
                    <Text style={styles.tileText}>Payment</Text>
                    <RightArrow width={24} height={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={() => { }}>
                    <Text style={styles.tileText}>Wishlist</Text>
                    <RightArrow width={24} height={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tile} onPress={() => {
                    openHelpAndSupport(HELP_URL)
                }}>
                    <Text style={styles.tileText}>Help</Text>
                    <RightArrow width={24} height={24} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tile} onPress={() => {
                    openHelpAndSupport(SUPPORT_URL)
                }}>
                    <Text style={styles.tileText}>Support</Text>
                    <RightArrow width={24} height={24} />
                </TouchableOpacity>

                <TouchableOpacity onPress={onSignout}>
                    <View style={styles.signOutContainer} >
                        <Text style={styles.signOutText}>Sign out</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.light.backgroundColor,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.light.buttonColor,
    },
    userInfoTile: {
        backgroundColor: colors.light.fieldBackground,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.light.textColor,
    },
    userEmail: {
        fontSize: 14,
        color: colors.light.placeholderColor,
    },
    userPhone: {
        fontSize: 14,
        color: colors.light.placeholderColor,
    },
    tileList: {
        marginTop: 16,
    },
    tile: {
        flexDirection: "row",
        backgroundColor: colors.light.fieldBackground,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        justifyContent: 'space-between'
    },
    tileText: {
        fontSize: 16,
        color: colors.light.textColor,
    },
    signOutContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    signOutText: {
        color: colors.light.red,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
