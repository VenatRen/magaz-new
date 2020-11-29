import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { addImageToDB, getImageFromDB } from "~/db_handler";
import OurText from "~/components/OurText";
import styles from "./styles";

const placeholder = require("~/assets/image_placeholder.png");

const OurImage = (props) => {
    const {url, title, onPress, style, disabled} = props;
    const [image, setImage] = useState(Image.resolveAssetSource(placeholder).uri);
    const onSuccess = ( tr, result ) => {
        if ( !result.rows.length ) {
            fetch(url)
            .then( res =>  res.blob() )
            .then( data => {
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = () => {
                    setImage(reader.result);
                    addImageToDB(url, reader.result);
                };
            });
        } else {
            const imageData = result.rows.item(0).imageData;

            if ( imageData )
                setImage(imageData);
        }

    };
    const onFail = (tr, err) => {
        console.log(`ERROR TO GET IMAGE.\n\tURL: ${url}\n\tERROR: ${err}`);
    };

    useEffect( () => {
        if ( url )
            getImageFromDB(url, onSuccess, onFail);
    }, []);
    

    return (
        <TouchableOpacity style={styles.container} activeOpacity={onPress && !disabled ? 0 : 1} onPress={(e) => {
            if (!disabled)
                onPress(e);
        }}>
            <Image style={style || styles.image} source={{uri: image}}/>
            {
                title ?
                    <OurText style={styles.title}>{title}</OurText> :
                    <></>
            }
        </TouchableOpacity>
    );
};

export default OurImage;