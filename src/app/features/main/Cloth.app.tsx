import LoginScreen from '../login/ui/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../../../config/auth/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreen } from '../home/HomeScreen';
import { NotificationsScreen } from '../notifications/NotificationScreen';
import { OrdersScreen } from '../orders/OrdersScreen';
import { ProfileScreen } from '../profile/ProfileScreen';
import { StyleSheet } from 'react-native';
import colors from '../../../config/colors/Colors';
import { RegisterScreen } from '../register/ui/Register.ui';
import HomeTabIcon from '../../../../assets/images/HomeTabIcon';
import NotificationTab from '../../../../assets/images/NotificationTab';
import OrderTab from '../../../../assets/images/OrderTab';
import ProfileTab from '../../../../assets/images/ProfileTab';

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

const AuthNavigator = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
        <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
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
                tabBarIcon: ({color}) => (
                    <HomeTabIcon width={24} height={24} color={color} />
                ),
            }} />
        <Tab.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
                tabBarIcon: ({color}) => (
                    <NotificationTab width={24} height={24} color={color} />
                ),
            }} />
        <Tab.Screen
            name="Orders"
            component={OrdersScreen}
            options={{
                tabBarIcon: ({color}) => (
                    <OrderTab width={24} height={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarIcon: ({color}) => (
                    <ProfileTab width={24} height={24} color={color} />
                ),
            }}
        />
    </Tab.Navigator>
);

export const Cloth = () => {
    const { user } = useAuth()
    return (
        <SafeAreaView style={style.container}>
            <NavigationContainer>
                {user ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.backgroundColor
    }
})