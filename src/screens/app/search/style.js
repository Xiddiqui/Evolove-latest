import {StyleSheet} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    flatlistheadertxt:{
        fontSize:fontSize.large,
        fontFamily:fontFamily.appTextRegular,
        color:colors.txtInputborder,
        marginTop:responsiveHeight(3),
        marginLeft:responsiveWidth(5)
    },
    flatlistView:{
        marginTop:responsiveHeight(3),
        marginLeft:responsiveWidth(5)
    },
    footer:{
        height:responsiveHeight(20)
    },
    header:{
        fontFamily:fontFamily.appTextBold,
        textAlign:'center',
        fontSize:fontSize.large,
        marginTop:responsiveHeight(2),
        color:colors.whiteText
    },
    headertxt:{
        fontSize:fontSize.large,
        fontFamily:fontFamily.appTextMedium,
        color:colors.whiteText,
        marginLeft:responsiveWidth(5),
        marginBottom:responsiveHeight(1)
    }
})