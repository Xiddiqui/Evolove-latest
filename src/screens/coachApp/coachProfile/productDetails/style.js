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
        // marginLeft:responsiveWidth(1),
        marginTop:responsiveHeight(1),
        marginBottom:responsiveHeight(1)
    },
    discription:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.small,
        width:responsiveWidth(90),
        alignSelf:'center',
        marginTop:responsiveHeight(2)
    },
    bage:{
        backgroundColor:colors.button,
        paddingHorizontal:responsiveWidth(2),
        borderRadius:responsiveWidth(4),
        alignItems:'center',
        justifyContent:'center',
        marginLeft:responsiveWidth(2),
        height:responsiveHeight(4)
    },
    bageTxt:{
        fontSize:fontSize.medium,
        fontFamily:fontFamily.appTextRegular,
        color:colors.whiteText
    },
    publishView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:responsiveWidth(90),
        alignSelf:'center',
        marginTop:responsiveHeight(2)
    },
    publishtxt:{
        color:colors.whiteText,
        fontSize:fontSize.large,
        fontFamily:fontFamily.appTextMedium
    },
    publishername:{
        color:colors.txtInputborder,
    },
    circlebtnview:{
        flexDirection:'row',
        width:responsiveWidth(32),
        justifyContent:'space-between',
        marginLeft:responsiveWidth(5)
    },
    maincontainerstyle:{
        backgroundColor:colors.iconBackGround,
        borderRadius:responsiveWidth(5),
        marginTop:responsiveHeight(4)
    },
    btn1:{
        flexDirection:'row',
        height:responsiveHeight(6),
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:responsiveWidth(5),
        paddingRight:responsiveWidth(5),
        
    },
    Headertxt:{
        color:colors.whiteText,
        fontSize:fontSize.medium,
        fontFamily:fontFamily.appTextRegular
    },
    collapsablecontent:{
        color:colors.greyText,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.regular
    },
    openbtn:{
        width:responsiveWidth(90),
        alignSelf:'center'
    }
})