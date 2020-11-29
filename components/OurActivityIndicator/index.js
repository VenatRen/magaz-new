import React, { useState } from "react";
import { TouchableOpacity, ActivityIndicator, View } from "react-native";
import OurText from "~/components/OurText";
import OurTextButton from "~/components/OurTextButton";
import styles from "./styles";

const OurActivityIndicator = (props) => {
    const { error, abortController, doRefresh, translate, params, buttonTextColor } = props;

    const [aborted, setAborted] = useState(false);
    const onLongPress = (e) => {
        if ( abortController && !abortController.signal.aborted ) {
            abortController.abort();
            setAborted(true);
        }
    };
    return (
        <View style={styles.container}>
            {
                aborted ?
                    <>
                        <OurText translate={true} style={styles.abortText}>activityAborted</OurText>
                        <OurTextButton onPress={(e)=>{
                            setAborted(false);
                            doRefresh(e);
                        }} translate={true} textStyle={{color: buttonTextColor, paddingHorizontal: 32}}>activityAbortedRefresh</OurTextButton>
                    </>
                    : error ?
                        <OurText translate={translate} params={params} style={styles.text}>{error}</OurText>
                    :
                        <TouchableOpacity onLongPress={onLongPress} delayLongPress={100}>
                            <ActivityIndicator style={styles.indicator} color={"#fff"} size={64}/>
                        </TouchableOpacity>
            }
        </View>
    );
};

export default OurActivityIndicator;