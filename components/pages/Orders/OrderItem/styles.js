import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 8,
        paddingBottom: 12,
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    infoContainer: {
        alignItems: "flex-start",
        justifyContent: "center",
    },
    infoContainerReversed: {
        alignItems: "flex-end",
        justifyContent: "center",
    },
    textField: {
        color: "#fffd",
        fontSize: 20,
    },
    text: {
        color: "#fff",
        fontSize: 16,
        paddingLeft: 12,
    },
    textReversed: {
        color: "#fff",
        fontSize: 16,
        paddingRight: 12,
    },
    middleContainer: {
        flexDirection: "row-reverse",
    },
    productImage: {
        width: 64,
        height: 64,
        margin: 4,
        borderRadius: 8,
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        paddingHorizontal: 25,
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