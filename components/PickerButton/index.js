import React from "react";
import { TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import OurText from "~/components/OurText";
import styles from "./styles";

const PickerButton = (props) => {
    const { style, onPress, children } = props;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={style ? style : styles.picker}>
                <OurText style={styles.text}>{children}</OurText>
                <FontAwesomeIcon style={styles.icon} size={16} color={"#fff"} icon={faChevronLeft}/>
            </View>
        </TouchableOpacity>
    );
};

export default PickerButton;