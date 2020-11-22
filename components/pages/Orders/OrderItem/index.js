import React, { useState, useContext } from "react";
import { Animated, Dimensions, View, TouchableOpacity } from "react-native";
import { dispatchContext } from "../../../../contexts";
import { ChangeOrderStatus, DeleteOrder } from "../../../../actions";
import styles from "./styles";
import OurText from "../../../OurText";
import OurTextButton from "../../../OurTextButton";
import OurImage from "../../../OurImage";
import OurImageSlider from "../../../OurImageSlider";
import { ListAnimation } from "../../../../Animations";
import { STORE_ADDRESS } from "../../../../config";
import { statusToText, ORDER_STATUS_CANCELED } from "../orderStates";


const itemWidth = Dimensions.get("window").width;
const itemHeight = 168;
const itemHeight2 = 152;
const totalHeight = 440;

const MAX_IMAGES = 4;



const OrderItem = (props) => {
    const dispatch = useContext(dispatchContext);
    const { x, y, index, data, navigation } = props;

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
        dispatch(DeleteOrder(data.uuid));
    };

    const [gradStart, gradEnd] = ["#931DC4", "#F33BC8"];

    const [translateX, translateY, scale, opacity] = ListAnimation(x, y, totalHeight, itemHeight2, itemWidth, index);

    return (
        <Animated.View style={[styles.mainContainer, {height: itemHeight, width:itemWidth}, { opacity, transform: [{ translateX }, { scale }] }]}>
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