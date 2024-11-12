
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackProps } from "../../main/AuthStack.navigation.props";

type RegisterScreenNavigationProps = StackNavigationProp<AuthStackProps, 'RegisterScreen'>;

export type RegisterScreenProps = {
    navigation: RegisterScreenNavigationProps;
};