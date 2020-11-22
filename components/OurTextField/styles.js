import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	mainContainer: {
		alignItems: "center",
		justifyContent: "center",
        marginVertical: 20,
	},
    placeholder: {
        position: "absolute",
        left: 0,
        right: 0,

        color: "#fff",
        fontSize: 16,
        textAlign: "left",
    },
    placeholderFocused: {
    	top: -20,
    	opacity: .7,
    },
    placeholderUnfocused: {
    	top: 0,
    	opacity: 1,
    },
    placeholderValid: {
    	color: "#fff",
    },
    placeholderNotValid: {
    	color: "#f01a",
    	opacity: 1,
    },
    textInput: {
        width: "100%",
        borderBottomWidth: 1,
        borderColor: "#fff",
        color: "#fff",
        fontSize: 18,
    },
    textInputValid: {
    	color: "#fff",
        borderColor: "#fff",
    },
    textInputNotValid: {
    	color: "#f01a",
        borderColor: "#f01a",
    },
});

export default styles;