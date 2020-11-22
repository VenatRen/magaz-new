import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        padding: 8,
        paddingTop: 12,
        minHeight: 120,
        backgroundColor: "#fff",
        borderRadius: 1.5,
        alignItems: "center",
        justifyContent: "space-between",
    },
    topContainer: {
    },
    title: {
        color: "#383838",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
    middleContainer: {
    },
    text: {
        fontSize: 16,
        textAlign: "center",
    },
    bottomContainer: {
        flexDirection: "row",
        alignSelf: "flex-end",
    },
    button: {
        borderRadius: 1,
        backgroundColor: null,
    },
    buttonText: {
        color: "#fc0341",
        textTransform: "uppercase",
    },
});

export default styles;