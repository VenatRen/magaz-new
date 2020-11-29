import React, { useState, useLayoutEffect } from "react";
import { Animated, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { STORE_ADDRESS } from "~/config";
import { getProductListQuery } from "~/queries";
import useFetch from "~/network_handler";
import { HeaderBackButton, HeaderCartButton, HeaderTitle } from "~/components/Header/index";
import OurActivityIndicator from "~/components/OurActivityIndicator";
import ProductsItem from './ProductsItem/index';
import styles from "./styles";


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const LocallyAnimatedFlatList = ({data, refreshing, onRefresh}) => {
    const [x, setX] = useState(new Animated.Value(0));
    const [y, setY] = useState(new Animated.Value(0));
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x, y } } }], {
        useNativeDriver: true,
    });

    const renderProductItem = ({item, index})=>{
        return (
            <ProductsItem index={index} id={item.databaseId} data={item} x={x} y={y}
            imageUrl={item.image?.mediaDetails?.file} name={item.name} />
        )
    };

    return (
        <AnimatedFlatList
            contentContainerStyle={{paddingTop: 12}}
            initialNumToRender={2}
            data={data}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={ renderProductItem }
            keyExtractor={item => String(item.databaseId)}

            {...{ onScroll }}
        />
    )
};

const MemoedLocallyAnimatedFlatList = React.memo(LocallyAnimatedFlatList);

/**Список товаров той или иной категории */
const ProductsList = (props) => {
    const { navigation } = props;
    const { currentCategory } = props.route.params;

    const [gradStart, gradEnd] = ['#499eda', '#2454e5'];

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderBackButton navigation={navigation}/>,
            headerCenter: (props)=><HeaderTitle navigation={navigation} title={currentCategory.name}/>,
            headerRight: (props)=><HeaderCartButton navigation={navigation}/>,
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    const [
        data,
        loading,
        error,
        fetchData,
        abortController
    ] = useFetch(`${STORE_ADDRESS}graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: getProductListQuery(currentCategory.id),
    });

    return (
        <>
            <LinearGradient
                style={styles.productList}
                locations={[0, 1.0]}
                colors={[gradStart, gradEnd]} />
            {
                ( loading || error || abortController.signal.aborted ) ?
                    <OurActivityIndicator error={error} abortController={abortController} doRefresh={fetchData} buttonTextColor={gradStart}/>
                :
                    <MemoedLocallyAnimatedFlatList data={data?.data?.products?.nodes} refreshing={loading} onRefresh={()=>{fetchData()}}/>
            }
        </>
    );
};

export default React.memo(ProductsList);