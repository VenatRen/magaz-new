import React, { useContext, useLayoutEffect } from "react";
import { View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HeaderBackButton, HeaderTitle, HeaderCartButton } from "../../Header";
import { stateContext, dispatchContext } from "../../../contexts";
import { AddOrderToList, ClearCart, ClearDeliveryDetails } from "../../../actions";
import { ORDER_STATUS_TO_BE_SHIPPED } from "../Orders/orderStates";
import uuid from "react-native-uuid";

import OurText from "../../OurText";
import OurTextButton from "../../OurTextButton";

import styles from "./styles";

const DeliveryDetailsItem = (props) => {
    const { field, text } = props;
    return (
        <View style={styles.itemContainer}>
            <OurText style={styles.fieldText} translate={true}>{field}</OurText>
            <OurText style={styles.text} translate={!text}>{text || "notAvailable"}</OurText>
        </View>
    )
}

const DeliveryDetailsCheck = (props) => {
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const { navigation } = props;
    const { data, isOrderMade } = props.route.params;

    const [gradStart, gradEnd] = ["#931DC4", "#F33BC8"];

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderBackButton navigation={navigation}/>,
            headerCenter: (props)=><HeaderTitle navigation={navigation}/>,
            headerRight: (props)=><HeaderCartButton navigation={navigation}/>,
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    const goToDetailsEdit = (e) => {
        navigation.navigate("DeliveryDetails");
    };

    const makeAnOrder = (e) => {
        const orderData = {
            deliveryDetails: {
                name: state.deliveryDetails.name.value,
                phone: state.deliveryDetails.phone.value,
                address: state.deliveryDetails.address.value,
                floor: state.deliveryDetails.floor.value,
                notes: state.deliveryDetails.notes.value,
                time: state.deliveryDetails.time.value,
            },
            uuid: uuid.v1(),
            status:  ORDER_STATUS_TO_BE_SHIPPED,
            products: state.cartItems,
            totalPrice: state.cartTotalPrice,
        };
        dispatch(AddOrderToList(orderData));
        dispatch(ClearCart());
        dispatch(ClearDeliveryDetails());
        navigation.popToTop();
        navigation.navigate("Orders");
    };

    return (
        <>
        <LinearGradient style={styles.background} locations={[0, 1.0]} colors={[gradStart, gradEnd]}/>
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
            {
                !isOrderMade ?
                    <OurText style={styles.title} translate={true}>orderInfoCheck</OurText>
                : <></>
            }
            </View>
            <ScrollView>
                <DeliveryDetailsItem field={"orderFormName"}
                                     text={data.name}/>
                <DeliveryDetailsItem field={"orderFormPhone"}
                                     text={data.phone}/>
                <DeliveryDetailsItem field={"orderFormAddress"}
                                     text={data.address}/>
                <DeliveryDetailsItem field={"orderFormFloor"}
                                     text={data.floor}/>
                <DeliveryDetailsItem field={"orderFormNotes"}
                                     text={data.notes}/>
                <DeliveryDetailsItem field={"orderFormDeliveryTime"}
                                     text={data.time}/>
            </ScrollView>
            {
            !isOrderMade ?
                <View style={styles.bottomContainer}>
                    <OurTextButton style={styles.button} onPress={goToDetailsEdit} textStyle={{color: gradEnd}} translate={true}>orderInfoCheckEdit</OurTextButton>
                    <OurTextButton style={styles.button} onPress={makeAnOrder} textStyle={{color: gradEnd}} translate={true}>orderInfoCheckOrder</OurTextButton>
                </View>
                : <></>
            }
        </View>
        </>
    );
};

export default DeliveryDetailsCheck;