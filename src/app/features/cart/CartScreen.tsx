import { StyleSheet, Text, View } from "react-native"
import colors from "../../../config/colors/Colors"
import BagIcon from "../../../../assets/images/Bag"
import { PrimaryButton } from "../../../components/button/PrimaryButton"

export const CartScreen = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.toolbarText}>Cart</Text>

        <View style={styles.centeredContent}>
            <BagIcon width={100} height={100} />
            <Text style={styles.contentText}>our Cart is Empty</Text>
            <PrimaryButton title="Explore Categories" onClick={() => {

            }} />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.backgroundColor,
        alignItems: 'center',
        paddingTop: 20,
    },
    toolbarText: {
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        position: 'absolute',
        top: 20,
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    contentText: {
        fontSize: 18,
        marginTop: 20
    },
});