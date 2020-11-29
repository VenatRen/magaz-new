import React, { useState, useContext, useLayoutEffect } from "react";
import { Animated, FlatList, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { stateContext } from "~/contexts";
import { HeaderBackButton, HeaderCartButton, HeaderTitle } from "~/components/Header/index";
import OurText from "~/components/OurText";
import OurTextButton from "~/components/OurTextButton";
import OrderItem from "./OrderItem";
import styles from "./styles";


const LocallyAnimatedFlatList = ({data, navigation}) => {
    
    const renderItemsBlock = ({item, index}) => {
        return (
            <OrderItem navigation={navigation} data={item}/>
        );
    };

    return (
        <FlatList
            style={styles.flatList}
            data={data}
            renderItem={renderItemsBlock}
            keyExtractor={(item, index) => String(index)}
        />
    )
};

const MemoedLocallyAnimatedFlatList = React.memo(LocallyAnimatedFlatList);

const Orders = (props) => {
    const state = useContext(stateContext);
    const { navigation } = props;

    const [gradStart, gradEnd] = ["#931DC4", "#F33BC8"];

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderBackButton navigation={navigation}/>,
            headerCenter: (props)=><HeaderTitle navigation={navigation} title={"ordersTitle"}/>,
            headerRight: (props)=><HeaderCartButton navigation={navigation}/>,
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    return (
        <>
        <LinearGradient style={styles.background} locations={[0, 1.0]} colors={[gradStart, gradEnd]}/>
        <View style={styles.mainContainer}>
        {
        	state.orders.size === 0 ?
        		<View style={styles.emptyTextContainer}>
        			<OurText style={styles.emptyText} translate={true}>ordersEmpty</OurText>
        		</View>
        	:
        		<MemoedLocallyAnimatedFlatList navigation={navigation} data={Array.from(state.orders.values())}/>
        }
        </View>
        </>
    );
};

export default Orders;