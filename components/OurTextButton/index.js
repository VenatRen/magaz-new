import React from "react";
import { TouchableOpacity } from "react-native";
import OurText from "~/components/OurText";
import styles from "./styles";

const OurTextButton = (props) => {
    const { disabled, onPress, children, translate, params } = props;
    const style = props.style || {};
    const textStyle = props.textStyle || {};

    return (
        <TouchableOpacity
            activeOpacity={ disabled ? 1 : .2 }
            style={disabled ? [styles.buttonDisabled, style] : [styles.buttonEnabled, style] }
            onPress={(e) => {
                if ( !disabled && onPress )
                    onPress(e);
            }}>

            <OurText style={[styles.textButton, textStyle]} translate={translate} params={params}>{children || ""}</OurText>
        </TouchableOpacity>
    );
};

export default OurTextButton;