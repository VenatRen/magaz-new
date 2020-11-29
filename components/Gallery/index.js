import React from "react";
import { View, FlatList} from "react-native";
import { STORE_ADDRESS } from "~/config";
import OurImage from "~/components/OurImage";
import styles from "./styles";

// Элемент галереи
const RenderGalleryImg = (props) => {
    const {item, onPress, index} = props;
    
    return (
            <View style={styles.left_bottom}>
                <OurImage
                    style={styles.picture_bottom}
                    url={`${STORE_ADDRESS}wp-content/uploads/${item.mediaDetails?.file}`}
                    onPress={(e) => {
                        if ( onPress )
                            onPress(e, index);
                    }}
                    />
            </View>
    );
};

// Галерея
const GalleryImg = (props) => {
    const { data, onPress } = props;

    return (
        <FlatList 
            contentContainerStyle={styles.list}
            horizontal={true}
            data={data}
            renderItem={({item})=><RenderGalleryImg item={item} onPress={onPress} index={data.indexOf(item)}/>}
            keyExtractor={(item) => String(data.indexOf(item))}
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default GalleryImg;