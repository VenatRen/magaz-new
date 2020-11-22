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
    },
    flatList: {
        paddingTop: 12,
    },
    emptyTextContainer: {
        alignItems: "center",
        marginTop: 12,
    },
    emptyText: {
        color: "#fff",
        fontSize: 24,
    }
});

export default styles;