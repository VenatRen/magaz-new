import React, {useState, useContext, useEffect, useLayoutEffect} from "react";
import {
    LayoutAnimation,
    Platform,
    UIManager,
    View,
    StyleSheet,
    FlatList,
    TextInput,
    Text,
    Dimensions,
    Button,
    TouchableOpacity,
    KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { stateContext, dispatchContext } from "../../contexts";
import { HeaderBackButton, HeaderTitle, HeaderCartButton } from "../Header";
import OurText from "../OurText";
import {useTranslation} from "react-i18next";


import {
    SetDeliveryDetailsField,
    ChangeButtonStatus
} from "../../actions";
import Editor from "../Orders/editor";
import { NavigationContainer } from "@react-navigation/native";

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: "row",
    },
    textDelivery: {
        color: '#fff',
        fontWeight: "normal",
        paddingBottom: 10,    
    },
    text: {
        color: '#fff',
        fontWeight: "normal",
        marginRight: 10,   
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: 'center',
        

        
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        width: 90,
        marginLeft: 13,
        opacity: 0.7,
    },
    text_input: {
        height: 20,
        borderBottomWidth: 1,
        borderColor: "#fff",
        color: "#fff",
        maxWidth: 310,
        flexGrow: 1,
        
    },
    grad: {
        //height: Dimensions.get("window").height,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 220,

    },
    data: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: 233,    
        paddingTop:130,
    },
    header: {
        marginBottom: 20,
    },
    button_enabled: {
       
        paddingHorizontal: 8,
        paddingVertical: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#ffffff',
        position: "absolute",
        left: 1,
        right: 1,
        bottom: 40,
    },
    button_disabled: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#ffffffaa',
        position: "absolute",
        left: 1,
        right: 1,
        bottom: 40,
    },
    text_button: {
        color: "#3BF3AE",
        
    },
});







/** Компонент текстового поля */
const TextField = (props)=>{

    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const [isFocused, setFocus] = useState(false);
    const {fieldName, buttonEnabled, setButtonEnabled} = props;

    const [text, setText] = useState("");

    return (
                <View style={styles.container}>
                    <OurText style={{...styles.text, top: (isFocused||state.deliveryDetails[fieldName])?-20:0, opacity: (isFocused||state.deliveryDetails[fieldName])?0.7:1}} >{props.text}</OurText>
                    <TextInput value={state.deliveryDetails[fieldName]} onChangeText={(e)=>{ dispatch(SetDeliveryDetailsField( fieldName, e));
                        dispatch(ChangeButtonStatus(buttonEnabled, setButtonEnabled ));}} 
                        style={styles.text_input} onFocus={()=>{setFocus(true);LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);}} onBlur={()=>{setFocus(false);LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);}
                    }>
                    </TextInput>
                </View>
    )   

}




const PlaceOrderButton = (props) =>
{
    const {navigation, buttonEnabled, setButtonEnabled} = props;

    return (
        <TouchableOpacity activeOpacity={buttonEnabled ? 0.2 : 1} style={buttonEnabled ? styles.button_enabled : styles.button_disabled} onPress={()=>{
            if (buttonEnabled)
                navigation.navigate('Editor')
        }
        }>            
                <OurText style={styles.text_button}>Оформить заказ</OurText>
        </TouchableOpacity>
    )
}

/** Компонент деталей доставки */
const DeliveryDetails = (props) =>
{
    const {navigation} = props;

    const [buttonEnabled, setButtonEnabled] = useState(false);
    
    const {t} = useTranslation()
    const dispatch = useContext(dispatchContext);

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


    useEffect(() => {
        dispatch(ChangeButtonStatus(buttonEnabled, setButtonEnabled ));
    });
    return (
        <>
        <LinearGradient style={styles.grad} locations={[0, 1.0]} colors={["#1DC44F", "#3BF3AE"]}/>
        <View style={styles.main}>
            <View style={styles.header}>
                {/* <OurText style={styles.textDelivery}>Детали доставки</OurText> */}
                {/* <View style={styles.line}></View> */}
		    </View>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={192} style={styles.data}>
                <TextField buttonEnabled={buttonEnabled} setButtonEnabled={setButtonEnabled} fieldName="name" text="Имя"/>
                <TextField buttonEnabled={buttonEnabled} setButtonEnabled={setButtonEnabled} fieldName="phone"  text="Телефон"/>
                <TextField buttonEnabled={buttonEnabled} setButtonEnabled={setButtonEnabled} fieldName="address"  text="Адрес"/>
                <TextField buttonEnabled={buttonEnabled} setButtonEnabled={setButtonEnabled} fieldName="floor"  text="Этаж"/>
                <TextField buttonEnabled={buttonEnabled} setButtonEnabled={setButtonEnabled} fieldName="notes"  text="Примечания"/>
                <TextField buttonEnabled={buttonEnabled} setButtonEnabled={setButtonEnabled} fieldName="when" text="Когда привезти"/>
            </KeyboardAvoidingView>
            
            
        </View>
        <PlaceOrderButton buttonEnabled={buttonEnabled} setButtonEnabled={setButtonEnabled} navigation={navigation} />
    


        </>
    );
}

export default DeliveryDetails;