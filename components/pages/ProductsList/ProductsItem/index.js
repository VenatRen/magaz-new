import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Dimensions, Animated } from "react-native";
import styles from "./styles";
import { STORE_ADDRESS } from "../../../../config";
import { dispatchContext } from "../../../../contexts";
import OurText from "../../../OurText";
import OurImage from "../../../OurImage";
import { useTranslation } from "react-i18next";
import { AddProductToCart } from "../../../../actions";
import OurTextButton from "../../../OurTextButton";
import { ListAnimation } from "../../../../Animations";
import GalleryImg from "../../../Gallery";
import OurPicker from "../../../OurPicker";
import OurImageSlider from "../../../OurImageSlider";


const totalHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;
const itemHeight = totalHeight / 2;
const itemHeight2 = itemHeight + 16;


/** Список товаров той или иной категории */
const ProductsItem = (props) => {
    const {data, x, y, index, name, imageUrl} = props;
    const dispatch = useContext(dispatchContext);
    const itemAttributes = data?.attributes?.nodes || [];
    const {t} = useTranslation();
    const url = data?.image?.mediaDetails?.file ? `${STORE_ADDRESS}wp-content/uploads/${data?.image?.mediaDetails?.file}` : null;
    const images = [url, ...(data?.galleryImages?.nodes.map((obj) => {
        return `${STORE_ADDRESS}wp-content/uploads/${obj?.mediaDetails?.file}`
    }))];
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Обрабатываем нажатие на кнопку "Купить"
    const buyProduct = (e, data) => {

        const productQuantity = 1;
        const price = data.price ? data.price.match(/\d{1,5}.*\d*/)[0] : 0;

        // Заносим данные
        let payload = {
            productId: data.productId,
            name: data.name,
            productQuantity: productQuantity,
            price: price,
            stockQuantity: data.stockQuantity || 99,
            selectedVariants: [
                "variantID",
            ],
            imageLink: data.image?.mediaDetails?.file,
        };
        // Добавляем в корзину
        dispatch(AddProductToCart(payload, dispatch, t));
    };

    const [translateX, translateY, scale, opacity] = ListAnimation(x, y, totalHeight, itemHeight2, itemWidth, index);

    return (
        <Animated.View style={[styles.mainContainer, {height: itemHeight}, { opacity, transform: [{ translateX }, { scale }] }]}>
            <View style={styles.titleContainer}>
                <OurText style={styles.title}>{name}</OurText>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoTopContainer}>
                    <OurImage url={url}
                              onPress={toggleModal} />
                    <View style={styles.attributesContainer}>
                        {
                            itemAttributes.length !== 0 ?
                                itemAttributes.map( (attr, i) => {
                                    return <OurPicker data={attr} key={i}/>
                                })
                            :
                                <></>
                        }
                    </View>
                    <OurImageSlider data={images} isModalVisible={isModalVisible} toggleModal={toggleModal} />
                </View>
                <View style={styles.infoMiddleContainer}>
                    <GalleryImg data={data?.galleryImages?.nodes}/>
                </View>
                <View style={styles.infoBottomContainer}>
                    <OurText style={styles.infoPrice}
                             params={{
                                 price: ( data.price === 0 || !data.price ) ? t("productFree") : data.price
                             }}>productPrice</OurText>
                    <OurTextButton style={styles.buyButton}
                                   textStyle={styles.buyButtonText}
                                   translate={true}
                                   onPress={(e) => buyProduct(e, data)}
                    >productBuy</OurTextButton>
                </View>
            </View>
            <View style={styles.descriptionContainer}>
                <OurText style={styles.descriptionText}>{data.description?.replace(/<\/*.+?\/*>/gi, "") || ""}</OurText>
            </View>
        </Animated.View>
    );
};

export default React.memo(ProductsItem);
