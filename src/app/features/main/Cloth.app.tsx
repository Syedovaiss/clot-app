import LoginScreen from '../login/ui/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../../../config/auth/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreen } from '../home/ui/HomeScreen';
import { NotificationsScreen } from '../notifications/NotificationScreen';
import { OrdersScreen } from '../orders/OrdersScreen';
import { ProfileScreen } from '../profile/ProfileScreen';
import { StatusBar, StyleSheet } from 'react-native';
import colors from '../../../config/colors/Colors';
import { RegisterScreen } from '../register/ui/Register.ui';
import { AboutScreen } from '../about/ui/About';
import HomeTabIcon from '../../../../assets/images/HomeTabIcon';
import NotificationTabIcon from '../../../../assets/images/NotificationTabIcon';
import OrderTabIcon from '../../../../assets/images/OrderTabIcon';
import ProfileTabIcon from '../../../../assets/images/ProfileTabIcon';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CartScreen } from '../cart/CartScreen';
import { AddNewAddress } from '../address/ui/AddNewAddress';
import AddressesScreen from '../address/ui/Address';
import { AddNewPaymentMethodsScreen } from '../payment/ui/AddNewPaymentMethod';
import { PaymentMethodsScreen } from '../payment/ui/Payment';
import { WishlistScreen } from '../wishlist/ui/Wishlist';
import { CheckoutScreen } from '../checkout/ui/CheckoutScreen';
import { OrderDetails } from '../order_details/OrderDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const Cloth = () => {
    const { user } = useAuth()
    return (
        <GestureHandlerRootView style={style.container}>
            <SafeAreaView style={style.safeArea}>
                <NavigationContainer>
                    {user ? <AppNavigator /> : <AuthNavigator />}
                </NavigationContainer>
            </SafeAreaView>
        </GestureHandlerRootView>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    safeArea: {
        flex: 1,
        marginTop: 20,
        backgroundColor: colors.light.backgroundColor
    }
})
const HomeStackNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="Profile" component={ProfileStackNavigator} />
        <Stack.Screen name='CheckoutScreen' component={CheckoutScreen}/>
    </Stack.Navigator>
);


const OrdersStackNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
        <Stack.Screen name='OrderDetails' component={OrderDetails} />
    </Stack.Navigator>
);

const ProfileStackNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="AddressesScreen" component={AddressesScreen} />
        <Stack.Screen name="AddNewAddressScreen" component={AddNewAddress} />
        <Stack.Screen name="PaymentMethodsScreen" component={PaymentMethodsScreen} />
        <Stack.Screen name="AddNewPaymentMethodsScreen" component={AddNewPaymentMethodsScreen} />
        <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
        <Stack.Screen name='Auth' component={AuthNavigator} />
    </Stack.Navigator>
);
const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name='AboutScreen' component={AboutScreen} />
        <Stack.Screen name='Tabs' component={AppNavigator} />
    </Stack.Navigator>
);

const AppNavigator = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: {
                backgroundColor: colors.light.bottomTabBackgroundColor,
                height: 80,
                borderTopWidth: 1
            },
            headerShown: false,
            tabBarInactiveTintColor: colors.light.tabBarInActiveColor,
            tabBarActiveTintColor: colors.light.tabBarActiveColor,
            tabBarLabelStyle: {
                display: 'none'
            }
        }}
    >
        <Tab.Screen
            name="HomeStack"
            component={HomeStackNavigator}
            options={{
                tabBarIcon: ({ color }) => (
                    <HomeTabIcon width={24} height={24} color={color} />
                ),
            }} />
        <Tab.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <NotificationTabIcon width={24} height={24} color={color} />
                ),
            }} />
        <Tab.Screen
            name="Orders"
            component={OrdersStackNavigator}
            options={{
                tabBarIcon: ({ color }) => (
                    <OrderTabIcon width={24} height={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileStackNavigator}
            options={{
                tabBarIcon: ({ color }) => (
                    <ProfileTabIcon width={24} height={24} color={color} />
                ),
            }}
        />
    </Tab.Navigator>
);