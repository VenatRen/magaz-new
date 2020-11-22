import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        minHeight: "100%",
    },
    mainContainer: {
        height: "100%",
        paddingVertical: 20,
        paddingHorizontal: 8,
    },
    topContainer: {
        alignItems: "center",
    },
    title: {
        color: "#fff",
        fontSize: 24,
        textAlign: "center",
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,
    },
    button: {
        paddingHorizontal: 25,
    },
    itemContainer: {
        padding: 8,
        borderBottomWidth: .5,
        borderColor: "#fff5",
    },
    fieldText: {
        color: "#fffd",
        fontSize: 20,
    },
    text: {
        color: "#fff",
        fontSize: 16,
        paddingLeft: 16,
    }
});

export default styles;