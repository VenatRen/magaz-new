import React from "react";
import { View, FlatList} from "react-native";
import { STORE_ADDRESS } from "~/config";
import OurImage from "~/components/OurImage";
import styles from "./styles";

// Элемент галереи
const renderGalleryImg = ({item}) => {
    return (
            <View style={styles.left_bottom}>
                <OurImage
                    style={styles.picture_bottom}
                    url={`${STORE_ADDRESS}wp-content/uploads/${item.mediaDetails?.file}`}
                    disabled={true}
                    />
            </View>
    );
};

// Галерея
const GalleryImg = (props) => {
    const { data } = props;

    return (
        <FlatList 
            contentContainerStyle={styles.list}
            horizontal={true}
            data={data}
            renderItem={renderGalleryImg}
            keyExtractor={(item) => String(data.indexOf(item))}
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default GalleryImg;