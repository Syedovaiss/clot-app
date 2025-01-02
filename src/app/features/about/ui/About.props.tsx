import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackProps } from "../../main/AuthStack.navigation.props";
import { RouteProp } from "@react-navigation/native";

type AboutScreenNavigationProp = StackNavigationProp<AuthStackProps, 'AboutScreen'>;
type AboutScreenRouteProp = RouteProp<AuthStackProps,'AboutScreen'>;


export type AboutScreenProps = {
    navigation: AboutScreenNavigationProp;
    route:AboutScreenRouteProp
};