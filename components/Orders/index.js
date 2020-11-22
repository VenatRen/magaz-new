import React, {useState, useContext, useLayoutEffect} from "react";
import { LayoutAnimation, Platform, UIManager,FlatList, View, StyleSheet, TextInput, Text, Dimensions, Button, TouchableOpacity, ScrollView } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import { stateContext, dispatchContext } from "../../contexts";

import Header from "./../Header/index";
import OurText from "../OurText";
import {useTranslation} from "react-i18next";
import { HeaderTitle, HeaderCartButton, HeaderBackButton } from "../Header";


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
/* Компонент списка заказов */
const Orders = (props) => { 

    const { navigation } = props;  
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const {t} = useTranslation()


const DATA =[
    {
        id: '1',
        title: "item"
    },
    {
        id: '2',
        title: "item"
    },
    {
        id: '3',
        title: "item"
    },
    {
        id: '4',
        title: "item"
    },
    {
        id: '5',
        title: "item"
    },
    {
        id: '6',
        title: "item"
    },
    {
        id: '7',
        title: "item"
    },
    {
        id: '8',
        title: "item"
    },
    {
        id: '9',
        title: "item"
    },
    {
        id: '10',
        title: "item"
    },
    {
        id: '11',
        title: "item"
    },
    {
        id: '12',
        title: "item"
    },
    {
        id: '13',
        title: "item"
    },
    {
        id: '14',
        title: "item"
    },
    {
        id: '15',
        title: "item"
    },   {
        id: '16',
        title: "item"
    },
    {
        id: '17',
        title: "item"
    },
       {
        id: '18',
        title: "item"
    },   {
        id: '19',
        title: "item"
    },   {
        id: '20',
        title: "item"
    },   {
        id: '21',
        title: "item"
    },   {
        id: '22',
        title: "item"
    },   {
        id: '23',
        title: "item"
    },   {
        id: '24',
        title: "item"
    },
    
];
    
const [gradStart, gradEnd] = ["#931DC4", "#F33BC8"];

useLayoutEffect( () => {
    navigation.setOptions({
        headerLeft: (props)=><HeaderBackButton navigation={navigation}/>,
        headerCenter: (props)=><HeaderTitle navigation ={navigation} title={"completedOrdersTitle"}/>,
        headerRight: (props)=><HeaderCartButton navigation={navigation}/>,
        headerStyle: {
            backgroundColor: gradStart,
        },
    });
}, [navigation]);



const Item = ({title, style, index}) => (
    <View style={styles.data}>
        <OurText style={styles.text_info}>Имя: {state.deliveryDetails["name"]}</OurText>
        <OurText style={styles.text_info}>Телефон: {state.deliveryDetails["phone"]}</OurText>
        <OurText style={styles.text_info}>Адрес: {state.deliveryDetails["address"]}</OurText>
        <OurText style={styles.text_info}>Этаж: {state.deliveryDetails["floor"]}</OurText>
        <OurText style={styles.text_info}>Примечания: {state.deliveryDetails["notes"]}</OurText>
        <OurText style={styles.text_info}>Когда привезти: {state.deliveryDetails["when"]}</OurText>
        <View style={styles.Buttons}>
            <TouchableOpacity style={styles.button_go}>
                <OurText style={styles.text_button}>Зарегистрировать заказ</OurText>
            </TouchableOpacity>
        </View>
        <View style={styles.Buttons}>
            <TouchableOpacity style={styles.button_del}>
                <OurText style={styles.text_button}>Отменить заказ</OurText>
            </TouchableOpacity>
        </View>
    </View>

);   


   
    



    return (
        <>
        <LinearGradient style={styles.grad} locations={[0, 1.0]} colors={["#931DC4", "#F33BC8"]}/>
        <View style={styles.main}>
            <View style={styles.header}>
                {/* <OurText style={styles.textDelivery}>Выполненые заказы</OurText>
                <View style={styles.line}></View> */}
		    </View>
        </View>
        <FlatList
        contentContainerStyle={{alignItems:"center", justifyContent: "center"}}
        data={DATA}
        renderItem={({ item, index }) => (
            <Item title={item.title} index={index} />
        )}
        keyExtractor={item => item.id}
        />        
        </>
    );
}

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
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        width: 90,
        marginLeft: 25,
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
        padding: 20,
        
       

    },
    data: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: Dimensions.get("window").width,
        left: 12,
        paddingTop: 40,
    },
    header: {
        marginBottom: 20,
    },
    button_go: {
       
        paddingHorizontal: 12,
        paddingVertical: 6,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#ffffff',
        left: 70,
        right:0,
        marginBottom:10,
        top: 15,
        width: 220,
    },
    button_del: {
       
        paddingHorizontal: 12,
        paddingVertical: 6,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#ffffff',
        left: 70,
        right:0,
        marginBottom:10,
        top: 15,
        width: 220,
    },    
    text_button: {
        color: "#961EC4",
        
    },
    UpHeader: {
        color: '#fff',
    },
    text_info: {
        
        color: "#fff",
    }
});
export default Orders;