import React from "react";
import { View, } from "react-native";
import SplashStyle from "./SplashStyle";
import { SplashLogo } from "../../../../assets/images/SplashLogo";

const SplashScreen = () => {
    const splashScreenStyles = SplashStyle()
    return (
        <View style={splashScreenStyles.container}>
            <SplashLogo width={175} height={80} />
        </View>
    )
}


export default SplashScreen;