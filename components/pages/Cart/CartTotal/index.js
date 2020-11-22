import React from "react";
import { View } from "react-native";
import styles from "./styles";
import OurText from "../../../OurText";

/** Компонент, который показывает итоговую цену */
const CartTotal = (props) => {
    const { total } = props;

    return (
        <View style={styles.container}>
            <OurText style={styles.text} params={{total, currency: "$"}}>cartTotal</OurText>
        </View>
    );
};

export default React.memo(CartTotal); 