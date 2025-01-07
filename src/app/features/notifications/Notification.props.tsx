import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackProps } from "../main/AuthStack.navigation.props";

type NotificationNavigationProps = StackNavigationProp<AuthStackProps, 'RegisterScreen'>;

export type RegisterScreenProps = {
    navigation: NotificationNavigationProps;
};