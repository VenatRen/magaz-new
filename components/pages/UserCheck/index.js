import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { STORE_ADDRESS } from "~/config";
import { getUserRegisterQuery, getUserLoginQuery } from "~/queries";
import { stateContext, dispatchContext } from "~/contexts";
import { USER_STATUS_REGISTERED } from "~/userStatus";
import { HeaderTitle } from "~/components/Header";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { randomString } from "~/utils";
import OurActivityIndicator from "~/components/OurActivityIndicator";
import styles from "./styles";

const UserCheck = (props) => {
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);

    const { navigation, nextPage } = props;
    const [gradStart, gradMiddle, gradEnd] = ["#B0E8E4", "#86A8E7","#7F7FD5"];
    const isRegistered = state.user.status === USER_STATUS_REGISTERED;
    const userUuid = uuidv4();
    const regQuery = getUserRegisterQuery(userUuid, state.deliveryDetails.email.value, randomString(32), randomString(16));
    console.log(regQuery);

    const fetchData = async () => {
        const res = await fetch(`${STORE_ADDRESS}graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: !isRegistered ? regQuery : 
                                    getUserLoginQuery(state.user.uuid, state.user.username, state.user.password),
        });
        const data = await res.json();
        console.log("data", data.data, data.errors);
    };
    useEffect(() => {
        fetchData();
    }, []);

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=>{},
            headerCenter: (props)=><HeaderTitle navigation={navigation} title={"userCheckTitle"}/>,
            headerRight: (props)=>{},
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    return (
        <>
            <LinearGradient
                style={styles.background}
                locations={[0, .8, 1]}
                colors={[gradStart, gradMiddle, gradEnd]} />

            <OurActivityIndicator />
        </>
    );
};

export default UserCheck;