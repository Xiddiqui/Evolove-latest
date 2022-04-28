import React from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import {
    responsiveHeight,
    responsiveFontSize,
    responsiveWidth
} from 'react-native-responsive-dimensions'
import { colors } from "../../../globals/utilities/colors";
import { fontFamily } from "../../../globals/utilities/fonts";
import MaskInput from 'react-native-mask-input';


const HalfTextInput = (props) =>{
    const {placeholder,onchange,issecure,type,wid,value,editable,multiline,mask}=props
    return(
        <View style={[styles.textInput]}>
            <MaskInput
            onChangeText={onchange}
            placeholder={placeholder}
            placeholderTextColor={colors.txtInputborder}
            secureTextEntry={issecure}
            keyboardType={type}
            value={value}
            style={styles.textInputinner}
            editable={editable}
            multiline={multiline}
            mask={mask}
            />

        </View>
    )
}


const styles = StyleSheet.create({
    textInput:{
        width:responsiveWidth(40),
        alignSelf:"center",
        borderWidth:responsiveWidth(0.2),
        borderColor:colors.txtInputborder,
        marginTop:responsiveHeight(1.5),
        borderRadius:responsiveWidth(3),
    },
    textInputinner:{
        width:responsiveWidth(40),
        paddingVertical:responsiveHeight(2),
        paddingLeft:responsiveWidth(2),
        color:colors.txtInputborder,
        fontFamily:fontFamily.appTextRegular,
    }
})
export default HalfTextInput