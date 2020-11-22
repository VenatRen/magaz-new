import React, { useContext, useEffect } from "react";
import { View, StatusBar } from "react-native";
import Modal from 'react-native-modal';
import OurText from "../OurText";
import OurTextButton from "../OurTextButton";
import { stateContext, dispatchContext } from "../../contexts";
import { CloseModal } from "../../actions";
import styles from "./styles";

const BACKDROP_OPACITY = .7;

const OurModal = (props) => {
    const state = useContext(stateContext);
    const modal = state.modal;
    const dispatch = useContext(dispatchContext);
    const defaultButtons = [
        {
            text: "ok",
        }
    ];

    useEffect( () => {
        if ( modal.visible )
            StatusBar.setBackgroundColor(`rgba(0, 0, 0, ${BACKDROP_OPACITY})`);
        else
            StatusBar.setBackgroundColor("rgba(0, 0, 0, 0)");
    }, [modal.visible]);

    return (
        <Modal {...props} isVisible={modal.visible} animationIn={modal.animationIn} animationOut={modal.animationOut} backdropOpacity={BACKDROP_OPACITY} backdropTransitionOutTiming={0}>
            <View style={styles.mainContainer}>
                <View style={styles.topContainer}>
                    <OurText style={styles.title} translate={true} params={modal.title.params}>{modal.title.text}</OurText>
                </View>
                <View style={styles.middleContainer}>
                    <OurText style={styles.text} translate={true} params={modal.text.params}>{modal.text.text}</OurText>
                </View>
                <View style={styles.bottomContainer}>
                    {
                        modal.buttons.length === 0 ?
                            defaultButtons.map( (button, index) => {
                                return <OurTextButton style={[styles.button, button.style]}
                                                      textStyle={[styles.buttonText, button.textStyle]}
                                                      onPress={(e) => {
                                                        if ( button.onPress )
                                                            button.onPress(e);

                                                        dispatch(CloseModal());
                                                      }}
                                                      translate={true}
                                                      params={button.params}
                                                      key={index}>{button.text}</OurTextButton>;
                            } )
                        :
                            modal.buttons.map( (button, index) => {
                                return <OurTextButton style={[styles.button, button.style]}
                                                      textStyle={[styles.buttonText, button.textStyle]}
                                                      onPress={(e) => {
                                                        if ( button.onPress )
                                                            button.onPress(e);

                                                        dispatch(CloseModal());
                                                      }}
                                                      translate={true}
                                                      params={button.params}
                                                      key={index}>{button.text}</OurTextButton>;
                            } )
                    }
                </View>
            </View>
        </Modal>
    );
};

export default React.memo(OurModal);