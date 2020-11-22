import React, { useState, useContext, useLayoutEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { HeaderBackButton, HeaderTitle, HeaderCartButton } from "../../Header";
import { stateContext, dispatchContext } from "../../../contexts";
import { ChangeDeliveryField } from "../../../actions";
import OurText from "../../OurText";
import OurTextButton from "../../OurTextButton";
import OurTextField from "../../OurTextField";
import styles from "./styles";

const DeliveryDetails = (props) => {
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const { navigation } = props;
    const { t } = useTranslation();
    const [gradStart, gradEnd] = ["#1DC44F", "#3BF3AE"];

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderBackButton navigation={navigation}/>,
            headerCenter: (props)=><HeaderTitle navigation={navigation} title={"deliveryDetailsTitle"} />,
            headerRight: (props)=><HeaderCartButton navigation={navigation}/>,
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    const validateForm = (value, name) => {
        const PHONE_PATTERN = /^((\+7|7|8)+([0-9]){10})$/;

        if ( value.trim() !== "" ||
                name === "floor" || name === "notes" ) {
            if ( !( name === "phone" && !value.toLowerCase().match(PHONE_PATTERN) ) ) {
                dispatch(ChangeDeliveryField(name, value, true));
                return true;
            }
        }
        dispatch(ChangeDeliveryField(name, value, false));
    };

    const goToDetailsCheck = (e) => {
        const deliveryDetails = {
            name: state.deliveryDetails.name.value,
            phone: state.deliveryDetails.phone.value,
            address: state.deliveryDetails.address.value,
            floor: state.deliveryDetails.floor.value,
            notes: state.deliveryDetails.notes.value,
            time: state.deliveryDetails.time.value,
        };
        navigation.navigate("DeliveryDetailsCheck", { data: deliveryDetails, isOrderMade: false });
    };

    return (
        <>
        <LinearGradient style={styles.background} locations={[0, 1.0]} colors={[gradStart, gradEnd]}/>
        <View style={styles.mainContainer}>
            <KeyboardAvoidingView style={styles.infoContainer}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                {
                    Object.keys(state.deliveryDetails).map( (fieldName, i ) => {
                    return <OurTextField name={state.deliveryDetails[fieldName].name}
                                  defValue={state.deliveryDetails[fieldName].value}
                                  onValidate={validateForm}
                                  placeholder={t(state.deliveryDetails[fieldName].placeholder)}
                                  key={i}/>
                              })
                }
                </ScrollView>
            </KeyboardAvoidingView>
            <OurTextButton disabled={!state.allDetailsAreValid} onPress={goToDetailsCheck} textStyle={{color: gradEnd}} translate={true}>orderInfoCheckOrder</OurTextButton>
        </View>
        </>
    );
};

export default DeliveryDetails;