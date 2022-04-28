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
    toptxt:{
        fontSize:fontSize.regular,
        fontFamily:fontFamily.appTextRegular,
        color:colors.bluelight,
        marginTop:responsiveHeight(2),
        marginLeft:responsiveWidth(5)
    },
    dp:{
        width:responsiveWidth(13),
        height:responsiveWidth(13),
        borderRadius:responsiveWidth(13/2)
    },
    userName:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.medium
    },
    userDetailsView:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:responsiveWidth(5),
        marginTop:responsiveHeight(4)
    },
    FlatListstyle:{
        marginTop:responsiveHeight(2)
    }
})