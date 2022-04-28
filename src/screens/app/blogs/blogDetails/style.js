import {StyleSheet} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../../globals/utilities/colors'
import { fontFamily } from '../../../../globals/utilities/fonts'
import { fontSize } from '../../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    image:{
        width:'100%',
        height:responsiveHeight(20)
    },
    name:{
        color:colors.whiteText,
        fontSize:fontSize.large
    },
    nameView:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:responsiveWidth(90),
        alignSelf:'center',
        marginTop:responsiveHeight(2)
    },
    datetxt:{
        color:colors.greyText,
        fontSize:fontSize.medium
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
        marginTop:responsiveHeight(2)
    },
    discription:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.small,
        width:responsiveWidth(90),
        alignSelf:'center',
        marginTop:responsiveHeight(2)
    },
    image1:{
        height:responsiveHeight(25),
        width:responsiveWidth(90),
        alignSelf:'center',
        borderRadius:responsiveWidth(3)
    },
})