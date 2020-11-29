import React, { useContext } from "react";
import { View } from "react-native";
import { STORE_ADDRESS } from "~/config";
import { dispatchContext } from "~/contexts";
import OurImage from "~/components/OurImage";
import styles from "./styles";


/**Компонент категории */
const CategoryItem = (props) =>
{
    // Получаем имя, url картинки, навигацию и id из props
    const { name, imageUrl, navigation, id, cached } = props;
    const dispatch = useContext(dispatchContext);
    const url = imageUrl ? `${STORE_ADDRESS}wp-content/uploads/${imageUrl}` : null;

    // Обрабатываем нажатие на иконку категории
    const onPress = (e) => {
        // Устанавливаем id данной категории
        // для отображения списка товаров
        // dispatch(SetCategoryPageId( {id, name} ));

        // Переходим к списку продуктов
        
        navigation.navigate("ProductList", {currentCategory:{id, name} });
    };

    return (
        <View style={styles.view}>
            <OurImage
                url={url}
                title={name}
                onPress={onPress}
                disabled={cached}
            />
        </View>
    );
};

export default CategoryItem;