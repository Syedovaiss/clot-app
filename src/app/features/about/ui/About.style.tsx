import { StyleSheet } from "react-native";
import colors from "../../../../config/colors/Colors";
export const aboutStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.backgroundColor,
        paddingBottom: 20, 
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',  
        padding: 10,
        width: '100%',
        marginTop: 16,
    },
    ageRangeLabel: {
        fontSize: 18,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        textAlign: 'center',
    },
    selectedAgeRangeText: {
        fontSize: 16,
        color: '#333',
    },
    bodyTextStyle: {
        marginTop: 16,
        marginStart: 16,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 30, 
    },
});
