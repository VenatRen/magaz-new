import React, { useContext, useState, useEffect } from "react";
import { Animated, Dimensions, View } from "react-native";
import { stateContext } from "../../../../contexts";
import ItemCount from "./ItemCount";
import styles from "./styles";
import OurText from "../../../OurText";
import OurImage from "../../../OurImage";
import OurImageSlider from "../../../OurImageSlider";
import { ListAnimation } from "../../../../Animations";
import { STORE_ADDRESS } from "../../../../config";


const itemWidth = Dimensions.get("window").width;
const itemHeight = 156;
const itemHeight2 = 164;
const totalHeight = 440;


/** Компонент товара в корзине */
const CartItem = (props) => {
    const { x, y, index, productId, name, price, productQuantity, imageLink } = props;
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [translateX, translateY, scale, opacity] = ListAnimation(x, y, totalHeight, itemHeight2, itemWidth, index);

    return (
        <Animated.View style={[styles.mainContainer, {height: itemHeight, width:itemWidth}, { opacity, transform: [{ translateX }, { scale }] }]}>
            <View style={styles.topContainer}>
                <OurText style={styles.itemName}>{name}</OurText>
                <OurImage style={styles.productImage} url={`${STORE_ADDRESS}wp-content/uploads/${imageLink}`} onPress={toggleModal}/>
                <OurImageSlider data={[`${STORE_ADDRESS}wp-content/uploads/${imageLink}`]} isModalVisible={isModalVisible} toggleModal={toggleModal} />
            </View>
            <View style={styles.bottomContainer}>
                <OurText style={styles.itemCount} params={{quantity: productQuantity}}>cartPcs</OurText>
                <View style={styles.itemCountController}>
                    <OurText style={styles.itemPrice}>{price * productQuantity}$</OurText>
                    <ItemCount productId={productId} quantity={productQuantity}/>
                </View>
            </View>
            <View style={styles.borderContainer}>
                <View style={styles.itemBorder}/>
            </View>
        </Animated.View>
    );
};

export default React.memo(CartItem); 