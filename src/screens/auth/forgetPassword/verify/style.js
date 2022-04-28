import {StyleSheet} from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../../globals/utilities/colors'
import { fontFamily } from '../../../../globals/utilities/fonts'
import { fontSize } from '../../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background
    },
    heading:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextMedium,
        fontSize:fontSize.h4,
        textAlign:'center',
        marginTop:responsiveHeight(1),
        width:responsiveWidth(90),
        alignSelf:'center'
    },
    txt:{
        color:colors.txtInputborder,
        width:responsiveWidth(90),
        alignSelf:'center',
        marginTop:responsiveHeight(1),
        marginBottom:responsiveHeight(1),
        fontSize:fontSize.medium
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
        color:colors.button,
        fontSize:fontSize.medium,
        fontFamily:fontFamily.appTextMedium,
        marginLeft:responsiveWidth(1)
    }
    
})