import { TouchableOpacity, View , Text, StyleSheet} from "react-native";
import OrderIcon from "../../../../assets/images/OrderIcon";
import RightArrow from "../../../../assets/images/RightArrow";
import colors from "../../../config/colors/Colors";
import { buildOrderNumber } from "../../../utils/Helpers";

export const OrderTile = ({ orderNumber, itemsCount, onPress }: { orderNumber: string; itemsCount: number; onPress: () => void }) => (
    <TouchableOpacity style={styles.orderTile} onPress={onPress}>
        <View style={styles.orderTileContent}>
            <OrderIcon width={30} height={30} /> {/* Order icon */}
            <View style={styles.orderDetails}>
                <Text style={styles.orderNumber}>#{buildOrderNumber(orderNumber)}</Text>
                <Text style={styles.itemsCount}>Items: {itemsCount}</Text>
            </View>
        </View>
        <RightArrow width={32} height={32} />
    </TouchableOpacity>
);


const styles = StyleSheet.create({
    orderTile: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.light.fieldBackground,
        marginVertical: 12,
        padding: 16,
        borderRadius: 8,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    orderTileContent: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    orderDetails: {
        marginLeft: 10,
        flexDirection: "column",
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.light.textColor,
    },
    itemsCount: {
        fontSize: 14,
        color: colors.light.textColor,
    },
    orderTileRight: {
        flexDirection: "row",
        alignItems: "center",
    }
});
