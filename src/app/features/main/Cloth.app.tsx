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

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

export const Cloth = () => {
    const { user } = useAuth()
    return (
        <SafeAreaView style={style.container}>
            <NavigationContainer>
                {user ? <Tab.Navigator screenOptions={{headerShown:false}}>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Notifications" component={NotificationsScreen} />
                    <Tab.Screen name="Orders" component={OrdersScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator> : <AuthStack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <AuthStack.Screen
                        name='LoginScreen'
                        component={LoginScreen}
                    />
                    <AuthStack.Screen
                        name='RegisterScreen'
                        component={RegisterScreen}
                    />
                </AuthStack.Navigator>}
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