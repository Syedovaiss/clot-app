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

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

export const Cloth = () => {
    const { user } = useAuth()
    return (
        <GestureHandlerRootView style={style.container}>
            <SafeAreaView style={style.container}>
                <NavigationContainer>
                    {user ? <AppNavigator /> : <AuthNavigator />}
                </NavigationContainer>
            </SafeAreaView>
        </GestureHandlerRootView>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        backgroundColor: colors.light.backgroundColor
    }
})
const AuthNavigator = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
        <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
        <AuthStack.Screen name='AboutScreen' component={AboutScreen} />
        <AuthStack.Screen name='Tabs' component={AppNavigator} />
    </AuthStack.Navigator>
);

const AppNavigator = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: {
                backgroundColor: colors.light.bottomTabBackgroundColor,
                height: 60,
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
            name="HomeScreen"
            component={HomeScreen}
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
            component={OrdersScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <OrderTabIcon width={24} height={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <ProfileTabIcon width={24} height={24} color={color} />
                ),
            }}
        />
    </Tab.Navigator>
);