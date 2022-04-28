import {StyleSheet} from 'react-native'
import { fonts } from 'react-native-elements/dist/config'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../../globals/utilities/colors'
import { fontFamily } from '../../../../globals/utilities/fonts'
import { fontSize } from '../../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    image:{
        // width:'100%',
         height:responsiveHeight(20),
        // position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    },
    descriptiontxt:{
        color:colors.whiteText,
        marginLeft:responsiveWidth(6),
        marginTop:responsiveHeight(2),
        fontSize:fontSize.large,
        fontFamily:fontFamily.appTextMedium
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
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.large
    },
    circlebtnview:{
        flexDirection:'row',
        width:responsiveWidth(32),
        justifyContent:'space-between',
        marginLeft:responsiveWidth(5)
    },
    maincontainerstyle:{
         backgroundColor:colors.iconBackGround,
        // backgroundColor:'red',
        // borderRadius:responsiveWidth(5),
        // marginTop:responsiveHeight(4)
    },
    btn1:{
        flexDirection:'row',
        height:responsiveHeight(6),
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:responsiveWidth(5),
        paddingRight:responsiveWidth(5),
        
    },
    curriculum:{
        backgroundColor:colors.iconBackGround,
        height:responsiveHeight(5),
        borderTopRightRadius:responsiveWidth(4),
        borderTopLeftRadius:responsiveWidth(4),
        marginTop:responsiveHeight(3),
        justifyContent:'center'
    },
    curriculumtxt:{
        fontSize:fontSize.large,
        color:colors.whiteText,
        marginLeft:responsiveWidth(3)
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
    },
    dis:{
        fontSize:fontSize.small,
        color:colors.greyText,
        fontFamily:fontFamily.appTextRegular,
        width:responsiveWidth(90),
        alignSelf:'center'
    },
    moduleArrstyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:responsiveWidth(75),
        alignSelf:'center',
        borderBottomWidth:responsiveWidth(0.3),
        borderColor:colors.greyText,
        marginBottom:responsiveHeight(1)
    }
})