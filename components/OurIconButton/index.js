import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const LONG_PRESS_DELAY = 150;

const OurIconButton = (props) => {
    const { onPress, doLongPress, longPressDelay, icon, size, children, style } = props;
    const [timer, setTimer] = useState(null);
    
    const clearTimer = () => {
        if ( timer ) {
            clearInterval(timer);
            setTimer(null);
        }
    };
    const onLongPress = (e) => {
        if ( doLongPress ) {
            clearTimer();
            const tmr = setInterval(() => {
                onPress(e);
            }, longPressDelay || LONG_PRESS_DELAY );
            setTimer(tmr);
        }
    };
    const onPressOut = (e) => {
        clearTimer();
    };

    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress} onPressOut={onPressOut} style={ [styles.button, style] }>
            <FontAwesomeIcon size={size} color={"#fff"} icon={icon}/>
            {children}
        </TouchableOpacity>
    );
};

export default React.memo(OurIconButton);