import React from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { Icon } from "react-native-elements/dist/icons/Icon";
import {
    responsiveHeight,
    responsiveFontSize,
    responsiveWidth
} from 'react-native-responsive-dimensions'
import { colors } from "../../../globals/utilities/colors";
import { fontFamily } from "../../../globals/utilities/fonts";

const SearchInput = (props) =>{
    const {placeholder,onchange,issecure,type,wid,value,editable}=props
    return(
        <View style={[styles.textInput]}>
        <Icon type={'font-awesome'} name={'search'} color={colors.txtInputborder}/>
            <TextInput
            onChangeText={onchange}
            placeholder={placeholder}
            placeholderTextColor={colors.txtInputborder}
            secureTextEntry={issecure}
            keyboardType={type}
            value={value}
            style={styles.textInputinner}
            editable={editable}
            />

        </View>
    )
}


const styles = StyleSheet.create({
    textInput:{
        width:responsiveWidth(90),
        alignSelf:"center",
        borderWidth:responsiveWidth(0.2),
        borderColor:colors.txtInputborder,
        marginTop:responsiveHeight(3),
        borderRadius:responsiveWidth(3),
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:responsiveWidth(5),
        marginBottom:responsiveHeight(1)
    },
    textInputinner:{
        width:responsiveWidth(80),
        paddingVertical:responsiveHeight(2),
        paddingLeft:responsiveWidth(5),
        color:colors.txtInputborder,
        fontFamily:fontFamily.appTextRegular,
    }
})
export default SearchInput