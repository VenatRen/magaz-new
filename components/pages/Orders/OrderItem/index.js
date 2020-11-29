import React, { useState, useContext } from "react";
import { Animated, View, TouchableOpacity, LayoutAnimation } from "react-native";
import { dispatchContext } from "~/contexts";
import { ChangeOrderStatus, DeleteOrder } from "~/actions";
import { STORE_ADDRESS } from "~/config";
import OurText from "~/components/OurText";
import OurTextButton from "~/components/OurTextButton";
import OurImage from "~/components/OurImage";
import OurImageSlider from "~/components/OurImageSlider";
import { statusToText, ORDER_STATUS_CANCELED } from "../orderStates";
import styles from "./styles";

const MAX_IMAGES = 4;
const ANIMATION_DURATION = 200;

const OrderItem = (props) => {
    const dispatch = useContext(dispatchContext);
    const { data, navigation } = props;
    const [opacity, setOpacity] = useState(new Animated.Value(1));
    const [height, setHeight] = useState(null);

    const images = Array.from(data.products.values()).map( (v, i) => {
        return `${STORE_ADDRESS}wp-content/uploads/${v.imageLink}`;
    });

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = (e) => {
        setModalVisible(!isModalVisible);
    };

    const viewInfo = (e) => {
        navigation.navigate("DeliveryDetailsCheck", { data: data.deliveryDetails, isOrderMade: true });
    }
    const cancelOrder = (e) => {
        dispatch(ChangeOrderStatus(data.uuid, ORDER_STATUS_CANCELED));
    };
    const deleteOrder = (e) => {
        LayoutAnimation.configureNext(LayoutAnimation.create(
            ANIMATION_DURATION,
            LayoutAnimation.Types.linear,
            LayoutAnimation.Properties.scaleY,
        ));
        Animated.timing(opacity, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start(() => dispatch(DeleteOrder(data.uuid)));
        setHeight(0.01);
    };

    const [gradStart, gradEnd] = ["#931DC4", "#F33BC8"];

    return (
        <Animated.View style={[styles.mainContainer, { opacity, height }]}>
            <View style={styles.topContainer}>
                <View style={styles.infoContainer}>
                    <OurText style={styles.textField} translate={true}>orderStatus</OurText>
                    <OurText style={styles.text} translate={true}>{statusToText(data.status)}</OurText>
                </View>
                <View style={styles.infoContainer}>
                    <OurText style={styles.textField}>{data.totalPrice}$</OurText>
                </View>
            </View>
            <View style={styles.middleContainer}>
                {
                    images.map( (url, i) => {
                        if ( i > MAX_IMAGES - 1 )
                            return;
                        else
                            return <OurImage style={styles.productImage} onPress={toggleModal} url={url} key={i} />;
                    })
                }
                <OurImageSlider data={images} isModalVisible={isModalVisible} toggleModal={toggleModal} />
            </View>
            <View style={styles.bottomContainer}>
                {
                    data.status !== ORDER_STATUS_CANCELED ?
                        <OurTextButton style={styles.button} onPress={cancelOrder} textStyle={{color: gradEnd}} translate={true}>orderCancel</OurTextButton>
                    :
                        <OurTextButton style={styles.button} onPress={deleteOrder} textStyle={{color: gradEnd}} translate={true}>orderDelete</OurTextButton>
                }
                <OurTextButton style={styles.button} onPress={viewInfo} textStyle={{color: gradEnd}} translate={true}>orderViewInfo</OurTextButton>
            </View>
            <View style={styles.borderContainer}>
                <View style={styles.itemBorder}/>
            </View>
        </Animated.View>
    );
};

export default OrderItem; 