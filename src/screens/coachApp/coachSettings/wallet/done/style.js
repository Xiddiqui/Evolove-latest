import {StyleSheet} from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../../../globals/utilities/colors'
import { fontFamily } from '../../../../../globals/utilities/fonts'
import { fontSize } from '../../../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        width:responsiveWidth(40),
        height:responsiveWidth(40),
        resizeMode:'contain'
    },
    paymenttxt:{
        color:colors.whiteText,
        fontSize:fontSize.h5,
        fontFamily:fontFamily.appTextMedium,
        marginTop:responsiveHeight(3)
    }
   
    
})