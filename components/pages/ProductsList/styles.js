import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    view: {
    },
    items: {
        justifyContent: "center",
    },
    headTitle:{
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 8,
    },
    textTitle:{
        fontSize: 25,
        color:"#fff",
        textAlign:"center",
        borderBottomWidth: 2,
        borderColor: "#FFF",
    },
    productList: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        minHeight: "100%",
    },
});

export default styles;