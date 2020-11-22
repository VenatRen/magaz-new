import React, { useEffect } from "react";
import { View, StatusBar } from "react-native";
import { STORE_ADDRESS } from "../../config";
import OurImage from "../OurImage";
import Modal from 'react-native-modal';
import ViewPager from '@react-native-community/viewpager';
import OurTextButton from "../OurTextButton";
import styles from "./styles";

const BACKDROP_OPACITY = .7;

const OurImageSlider = (props) => {
    const { data, isModalVisible, toggleModal } = props;

    useEffect( () => {
        if ( isModalVisible )
            StatusBar.setBackgroundColor(`rgba(0, 0, 0, ${BACKDROP_OPACITY})`);
        else
            StatusBar.setBackgroundColor("rgba(0, 0, 0, 0)");
    }, [isModalVisible]);

    return (
        <Modal onBackdropPress={toggleModal} onBackButtonPress={toggleModal} isVisible={isModalVisible} backdropOpacity={BACKDROP_OPACITY} backdropTransitionOutTiming={0}>      
            <ViewPager style={styles.viewPager} showPageIndicator={true}>
                {
                    data.map((url, i) =>
                        <View 
                        style={styles.modalPicture}
                        key = {i}>
                            <OurImage
                                url={url}
                                style={styles.modalPictureGallery}
                                disabled={true}
                            />
                        </View>
                )}
            </ViewPager>
            <OurTextButton
                style={styles.modalButton}
                onPress={toggleModal}
                translate={true}
            >close</OurTextButton>
        </Modal>
    );
};

export default OurImageSlider;