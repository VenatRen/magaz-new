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
    scrollView: {
        width: "100%",
    },
    details: {
        paddingHorizontal: 32,
    },
    mainContainer: {
        height: "100%",
        paddingVertical: 20,
        justifyContent: "space-between",
    },
    infoContainer: {
        maxHeight: "90%",
    },
    bottomContainer: {
        paddingHorizontal: 16,
    },  
});

export default styles;