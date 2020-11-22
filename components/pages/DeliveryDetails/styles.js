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
        justifyContent: "space-between",
    },
    infoContainer: {
        paddingHorizontal: 20,
        maxHeight: "90%",
    },
});

export default styles;