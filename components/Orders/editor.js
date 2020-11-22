import React, {useState, useContext, useLayoutEffect} from "react";
import { LayoutAnimation, Platform, UIManager, View, StyleSheet, TextInput, Text, Dimensions, Button, TouchableOpacity, ScrollView } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import { stateContext, dispatchContext } from "../../contexts";

import Header from "./../Header/index";
import OurText from "../OurText";
import {useTranslation} from "react-i18next";
import { HeaderTitle, HeaderCartButton, HeaderBackButton } from "../Header";

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
        paddingBottom: 10,
        bottom: 45,   
    },
    text: {
        color: '#fff',
        fontWeight: "normal",
        marginRight: 10,   
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        width: 90,
        marginLeft: 16,
        opacity: 0.7,
        bottom: 42,
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
//        justifyContent: "center",
        alignItems: "center",
       

    },
    data: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: 300,
       
    },
    header: {
        marginBottom: 20,
        bottom: 60,
    },
    Buttons: {
    //    top: 90,
       flex:1,
       justifyContent: "flex-end",
    //    flexDirection: "row",
    },
    Buttons_style: {
        flexDirection: "row",
    },
    button_back: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#ffffff',
        height:40,
        marginBottom: 10,
        width:150,
        marginRight:25,
    },
    button_go: {
        width:150,
        height:40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginBottom:10,
    },    
    text_button: {
        color: "#961EC4",
        
    }, 
    time: {
        bottom: 18,
    }, 
    UpHeader: {
        color: '#fff',
    },
    text_info: {
        marginBottom: 10,
        color: "#fff",
    }
});

const TextField = (props)=>{

    const [isFocused, setFocus] = useState(false);
    
    const [text, setText] = useState("");
    

    

    return (
                <View style={styles.container}>
                    <OurText style={{...styles.text, top: (isFocused||text)?-20:0, opacity: (isFocused||text)?0.7:1}} >{props.text}</OurText>
                    <TextInput value={text} onChangeText={(e)=>{setText(e)}} style={styles.text_input} onFocus={()=>{setFocus(true);LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);}} onBlur={()=>{setFocus(false);LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);}} ></TextInput>
                </View>
    )   

}



/** Компонент списка заказов */
const Editor = (props) =>
{

    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const { navigation } = props;
    const {t} = useTranslation()

    const [gradStart, gradEnd] = ["#931DC4", "#F33BC8"];

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderBackButton navigation={navigation}/>,
            headerCenter: (props)=><HeaderTitle navigation={navigation} title={"editor"}/>,
            headerRight: (props)=><HeaderCartButton navigation={navigation}/>,
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    return (
        <>
        <LinearGradient style={styles.grad} locations={[0, 1.0]} colors={["#931DC4", "#F33BC8"]}/>
        <View style={styles.main}>
            <View style={styles.header}>
                {/* <OurText style={styles.textDelivery}>Редактор заказов</OurText>
                <View style={styles.line}></View> */}
		    </View>
            <View style={styles.data}>
                <OurText style={styles.text_info}>Имя: {state.deliveryDetails["name"]}</OurText>
                <OurText style={styles.text_info}>Телефон: {state.deliveryDetails["phone"]}</OurText>
                <OurText style={styles.text_info}>Адрес: {state.deliveryDetails["address"]}</OurText>
                <OurText style={styles.text_info}>Этаж: {state.deliveryDetails["floor"]}</OurText>
                <OurText style={styles.text_info}>Примечания: {state.deliveryDetails["notes"]}</OurText>
                <OurText style={styles.text_info}>Когда привезти: {state.deliveryDetails["when"]}</OurText>      
            </View>
            <View style={styles.Buttons}>
                <View style={styles.Buttons_style}>
                   <TouchableOpacity style={styles.button_back} onPress={()=>{navigation.navigate('DeliveryDetails')}}>
                        <OurText style={styles.text_button}>Редактировать</OurText>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.button_go} onPress={()=>{navigation.navigate('Orders')}}>
                         <OurText style={styles.text_button}>Разместить заказ</OurText>
                   </TouchableOpacity>
                </View>
            </View>
        </View>    
        </>       
    );
}

export default Editor;