import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-end",
        width: Dimensions.get("window").width / 2,
        borderTopWidth: .5,
        borderColor: "#FFF",
        marginTop: 2,
    },
    text: {
        fontSize: 16,
        textTransform: "uppercase",
        color: "#FFF",
        textAlign: "right",
        paddingRight: 4,
    }
});

export default styles;