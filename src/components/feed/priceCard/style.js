import { StyleSheet } from 'react-native'
import { fonts } from 'react-native-elements/dist/config'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'

export const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.button,
        height: responsiveHeight(10),
        width: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft:responsiveWidth(4),
        paddingRight:responsiveWidth(4)

    },
    priceTxt: {
        color: colors.whiteText,
        fontSize: fontSize.h6,
        fontFamily: fontFamily.appTextRegular
    },
    btn: {
        backgroundColor:colors.button,
        height: responsiveHeight(5),
        width: responsiveWidth(30),
        borderRadius: responsiveWidth(5),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btnTxt:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextMedium,
        fontSize:fontSize.medium
    }
})