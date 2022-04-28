import {StyleSheet} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import {colors} from '../../../../globals/utilities/colors'
import { fontFamily } from '../../../../globals/utilities/fonts'
import { fontSize } from '../../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background,
    },
    headingTextView:{
        width:responsiveWidth(90),
        alignSelf:'center',
        marginTop:responsiveHeight(3)
    },
    headingText:{
        fontSize:fontSize.h3,
        fontFamily:fontFamily.appTextBold,
        color:colors.whiteText
    },
    txt:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.regular
    },
    bottomView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:responsiveWidth(90),
        alignSelf:'center',
        marginTop:responsiveHeight(5)
    },
    sliderImage:{
        width:responsiveWidth(15),
        height:responsiveWidth(15),
        resizeMode:'contain',
        marginTop:responsiveHeight(2)
    }
})