import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        minHeight: "100%",
    },
    categorylist: {
        flexDirection:"row",
    },
    loading: {
        alignSelf: "center",
        justifyContent: "center",
    },
    error: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
    },
});

export default styles;