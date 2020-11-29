import React from "react";
import { View } from "react-native";
import OurText from "~/components/OurText";
import styles from "./styles";

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