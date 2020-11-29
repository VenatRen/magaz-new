import React, { useContext, useState } from "react";
import { View } from "react-native";
import PickerModal from 'react-native-picker-modal-view';
import PickerButton from "~/components/PickerButton";
import OurText from "~/components/OurText";
import styles from "./styles";

const OurPicker = (props) => {
    const { data, onValueChange } = props;
    const items = data.options.map( (v, i) => { return {Name: v, Value: v, Id: i} });
    const [selected, setSelected] = useState(items[0]);

    return (
        <View style={styles.pickerContainer}>
            <OurText style={styles.pickerName}>{data.name}</OurText>

            <PickerModal
                renderSelectView={(disabled, sel, showModal) =>
                    <PickerButton
                        disabled={disabled}
                        onPress={showModal}>{selected.Name || ""}</PickerButton>
                }
                onSelected={(val) => {
                    if ( val && Object.keys(val).length !== 0 ) {
                        setSelected(val);

                        if (onValueChange)
                            onValueChange(val);
                    }
                }}
                items={items}
                showToTopButton={true}
                selected={selected}
                backButtonDisabled={true}
                showAlphabeticalIndex={true}
                autoGenerateAlphabeticalIndex={true}
                requireSelection={false}
                autoSort={false}
            />
        </View>
    )
};

// export const AttrPickersParent = (props) => {
//     const { data } = props;
//     return (
//         <>
//             {data.map( (v, i) =>
//             {
//                 return <AttrPicker data={v} key={i}/>
//             })}
//         </>
//     )
// };

export default OurPicker;