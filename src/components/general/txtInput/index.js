import React from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native'
import {
    responsiveHeight,
    responsiveFontSize,
    responsiveWidth
} from 'react-native-responsive-dimensions'
import { colors } from "../../../globals/utilities/colors";
import { fontFamily } from "../../../globals/utilities/fonts";
import { fontSize } from "../../../globals/utilities/size";

const MyTextInput = (props) => {
    const { placeholder, onchange, issecure, type, wid, value, editable, multiline , err} = props
    return (
        <View>
            <View style={[styles.textInput]}>
                <TextInput
                    onChangeText={onchange}
                    placeholder={placeholder}
                    placeholderTextColor={colors.txtInputborder}
                    secureTextEntry={issecure}
                    keyboardType={type}
                    value={value}
                    style={styles.textInputinner}
                    editable={editable}
                    multiline={multiline}
                />

            </View>
            {err ?
                <View>
                <Text style={styles.error}>{err}</Text>
            </View>:null
            }
            
        </View>
    )
}


const styles = StyleSheet.create({
    textInput: {
        width: responsiveWidth(90),
        alignSelf: "center",
        borderWidth: responsiveWidth(0.2),
        borderColor: colors.txtInputborder,
        marginTop: responsiveHeight(1.5),
        borderRadius: responsiveWidth(3),
    },
    textInputinner: {
        width: responsiveWidth(90),
        paddingVertical: responsiveHeight(2),
        paddingLeft: responsiveWidth(2),
        color: colors.txtInputborder,
        fontFamily: fontFamily.appTextRegular,

    },
    error: {
        color: 'red',
        fontSize:fontSize.small,
        marginTop:responsiveHeight(1),
        marginLeft:responsiveWidth(5),
        fontFamily:fontFamily.appTextRegular
    }
})
export default MyTextInput