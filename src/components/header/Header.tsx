import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { BackIcon } from "../../../assets/images/BackIcon";
import colors from "../../config/colors/Colors";

interface HeaderProps {
    title: string;
    onBackPress: () => void;
}


export const ClothHeader = ({ title, onBackPress }: HeaderProps) => {
    return (
        <View style={styles.headerContainer}>
            {/* Back Icon */}
            <TouchableOpacity onPress={onBackPress}>
                <BackIcon width={40} height={40} />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 60,
      backgroundColor:colors.light.backgroundColor,
      paddingHorizontal: 16,
      marginTop: 16
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      flex: 1, 
      right: 16
    },
  });