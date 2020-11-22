import { StyleSheet, Dimensions } from "react-native";

// CART PAGE STYLES

const styles = StyleSheet.create({
    cartList: {
        flexDirection: "column",
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        minHeight: Dimensions.get("window").height,
    },
    items: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: Dimensions.get("window").width,
    },
    emptyText: {
        marginTop: 18,
        color: "#fff",
        fontSize: 24,
        textAlign: "center",
    },
    cartIcon: {
        width: 140,
        borderBottomWidth: 1,
        borderColor: "#FFF",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 8,
    },
    checkoutButton: {
        width: Dimensions.get("window").width - 16,
        left: 0,
        right: 0,
        bottom: 0,
        marginTop: 8,
        marginBottom: 30,
    },
});

export default styles;