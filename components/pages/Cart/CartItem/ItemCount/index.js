import React, { useContext } from "react";
import { View, Dimensions, Alert } from "react-native";
import { faPlusCircle, faMinusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { dispatchContext } from "~/contexts";
import { useTranslation } from "react-i18next";
import OurIconButton from "~/components/OurIconButton";
import styles from "./styles";

import {
    DeleteProductFromCart,
    DecreaseProductQuantity,
    IncreaseProductQuantity,
    ShowModal,
} from "~/actions";


const size = Math.max(Dimensions.get("window").width, Dimensions.get("window").height) * .05;

/** Компонент, который отображает количество товаров в корзине */
const ItemCount = (props) => {
    const dispatch = useContext(dispatchContext);
    const { productId, quantity, onRemove } = props;
    const { t } = useTranslation();

    const deleteModalData = {
        title: { text: "cartDeleteTitle", params: {} },
        text: { text: "cartDeleteMessage", params: {} },
        animationIn: "fadeInRight",
        animationOut: "fadeOutLeft",
        buttons: [
            {
                text: "cancel",
                textStyle: {
                    color: "#383838",
                },
            },
            {
                text: "ok",
                onPress: (e) => {

                    if ( onRemove )
                        onRemove( () => {
                            dispatch(DeleteProductFromCart(productId));
                        });
                    else
                        dispatch(DeleteProductFromCart(productId));
                },
            }
        ],
    };

    const plusPressed = (e) => {
        // Добавляем 1 товар
        dispatch(IncreaseProductQuantity(productId));
    };
    const minusPressed = (e) => {
        // Удаляем товар, если остался один товар
        if ( quantity <= 1 ) {
            dispatch(ShowModal(deleteModalData));
        } else {
            // Или вычитаем 1 товар
            dispatch(DecreaseProductQuantity(productId, dispatch, t));
        }
    };
    const deletePressed = (e) => {
        dispatch(ShowModal(deleteModalData));
    };

    return (
        <View style={styles.container}>
            <View style={styles.itemControl}>
                <OurIconButton size={size}
                               style={{margin: 1, marginLeft: 0}}
                               icon={faPlusCircle}
                               onPress={plusPressed}
                               doLongPress={true}/>
                <OurIconButton size={size}
                               style={{margin: 1}}
                               icon={faMinusCircle}
                               onPress={minusPressed}
                               doLongPress={true}/>
                <OurIconButton size={size}
                               style={{margin: 1, marginRight: 0}}
                               icon={faTimesCircle}
                               onPress={deletePressed}/>
            </View>
        </View>
    );
}

export default React.memo(ItemCount); 