import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 12,
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 16,
        paddingBottom: 4,
    },
    itemName: {
        color: "#FFF",
        fontSize: 18,
        maxWidth: 240,
    },
    productImage: {
        width: 96,
        height: 96,
        borderRadius: 8,
        marginRight: 6,
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    itemPrice: {
        color: "#FFF",
        fontSize: 17,
        marginHorizontal: 0,
        textAlign: "right",
    },
    itemCount: {
        color: "#FFF",
        fontSize: 18,
        marginHorizontal: 32,
        flexGrow: 0,
    },
    itemCountController: {
        width: 120,
        flexDirection: "column",
        alignItems: "flex-end",
        marginRight: 6,
    },
    borderContainer: {
        alignItems: "center",
        paddingTop: 7,
        overflow: "hidden",
    },
    itemBorder: {
        width: 340,
        borderWidth: .5,
        borderColor: "#fff5",
    },
});

export default styles;