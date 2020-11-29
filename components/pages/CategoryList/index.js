import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useLayoutEffect } from "react";
import { FlatList } from "react-native";
import { stateContext, dispatchContext } from "~/contexts";
import { SetCategoryList, ShowModal } from "~/actions";
import { getCategoryListQuery } from "~/queries";
import { addCategoryToDB, getCategoryListFromDB } from "~/db_handler";
import useFetch from "~/network_handler";
import { STORE_ADDRESS } from "~/config";
import { expo } from "~/app.json";
import OurActivityIndicator from "~/components/OurActivityIndicator";
import CategoryItem from "./CategoryItem";
import styles from "./styles";

import { HeaderTitle, HeaderCartButton } from "~/components/Header";

/**Список категорий товаров*/
const CategoryList = (props) => {
    const { navigation } = props;
    const [gradStart, gradEnd] = ["#65B7B9", "#078998"];
    const showAppInfo = (e) => {
        const data = {
            title: { text: expo.name, params: {} },
            text: { text: "appInfo", params: { version: expo.version } },
            animationIn: "bounceInDown",
            animationOut: "bounceOutUp",
            buttons: [{
                text: "ok",
            }]
        };
        dispatch(ShowModal(data));
    };

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderTitle navigation={navigation} title={"categoryListTitle"} onPress={showAppInfo}/>,
            headerCenter: (props)=>{},
            headerRight: (props)=><HeaderCartButton navigation={navigation}/>,
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    const GetCategoryItem = ({item}) => {
        return (
            <CategoryItem navigation={navigation} name={item.name} id={item.productCategoryId} imageUrl={item?.image?.mediaDetails?.file} cached={item.cached}/>
        )
    };

    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);

    const onMount = (setLoading, setError, abortController) => {
        if ( !state?.categories?.length ) {
            getCategoryListFromDB((tr, result) => {
                let data = [];
                for (let i = 0; i <= result.rows.length; i++) {
                    const row = result.rows.item(i);

                    if (row)
                        data.push({
                            name: row.name,
                            productCategoryId: row.productCategoryId,
                            image: {
                                mediaDetails: {
                                    file: row.imageLink,
                                }
                            },
                            cached: true,
                        });
                }
                dispatch(SetCategoryList(data));
                setLoading(false);
            });
        }
    };
    const onSuccess = ({data}) => {
        data?.productCategories?.nodes?.map( (v, i) => {
            addCategoryToDB(v.name, v.productCategoryId, v.image?.mediaDetails?.file);
        });
        dispatch(SetCategoryList(data?.productCategories?.nodes));
    };

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
        body: getCategoryListQuery(),
    }, undefined, onMount, onSuccess);

    return (
        <>
            <LinearGradient
                style={styles.background}
                locations={[0, 1.0]}
                colors={[gradStart, gradEnd]} />
            {
                ( loading || error || abortController.signal.aborted ) ?
                    <OurActivityIndicator error={error} abortController={abortController} doRefresh={fetchData} buttonTextColor={gradStart}/>
                    :
                    <FlatList
                        contentContainerStyle={{paddingTop: 12, alignItems: "center", justifyContent: "center"}}
                        numColumns={2}
                        data={state.categories}
                        refreshing={loading}
                        onRefresh={() => {fetchData()}}
                        renderItem={GetCategoryItem}
                        keyExtractor={(item, key) => String(key)}/>
            }
        </>
    );
};

export default CategoryList;