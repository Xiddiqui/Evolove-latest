import {StyleSheet} from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background
    },
    heading:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextMedium,
        fontSize:fontSize.h4,
        marginLeft:responsiveHeight(3),
        marginTop:responsiveHeight(1)
    },
    forgotbtn:{
        alignSelf:'flex-end',
        marginRight:responsiveWidth(5),
        marginTop:responsiveHeight(3)
    },
    forgotbtntxt:{
        color:colors.BlueText,
        textDecorationLine:'underline',
        fontSize:fontSize.medium
    },
    ortxt:{
        color:colors.whiteText,
        fontSize:fontSize.large,
        fontFamily:fontFamily.appTextRegular,
        textAlign:'center',
        marginTop:responsiveHeight(4)
    },
    socialvIW:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:responsiveWidth(60),
        alignSelf:'center'
    },
    footerview:{
        alignItems:'center',
        flexDirection:'row',
        alignSelf:'center',
        marginTop:responsiveHeight(4)
    },
    footertxt:{
        color:colors.whiteText,
        fontSize:fontSize.medium,
        fontFamily:fontFamily.appTextRegular
    },
    footerTouchabletxt:{
        color:colors.BlueText,
        fontSize:fontSize.medium,
        fontFamily:fontFamily.appTextMedium,
        marginLeft:responsiveWidth(1)
    }
})