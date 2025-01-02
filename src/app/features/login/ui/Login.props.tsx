
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackProps } from "../../main/AuthStack.navigation.props";

type LoginScreenNavigationProp = StackNavigationProp<AuthStackProps, 'LoginScreen'>;

export type LoginScreenProps = {
    navigation: LoginScreenNavigationProp;
};