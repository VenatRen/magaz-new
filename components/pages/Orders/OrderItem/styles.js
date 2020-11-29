import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 8,
        paddingBottom: 12,
        overflow: "hidden",
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "hidden",
    },
    infoContainer: {
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: "hidden",
    },
    infoContainerReversed: {
        alignItems: "flex-end",
        justifyContent: "center",
        overflow: "hidden",
    },
    textField: {
        color: "#fffd",
        fontSize: 20,
        overflow: "hidden",
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
        overflow: "hidden",
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
        overflow: "hidden",
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