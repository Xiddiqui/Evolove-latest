import {StyleSheet} from 'react-native'
import { colors } from '../../../globals/utilities/colors'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'

 export const styles = StyleSheet.create({
    Button: {
        // flex: 1,
        height: responsiveHeight(6.5),
        width: responsiveWidth(60),
        alignSelf: 'center',
        marginTop: responsiveHeight(3),
        alignItems: 'center',
        borderRadius: responsiveWidth(15),
        justifyContent: 'center',
        backgroundColor:colors.button
    },
    buttonText: {
        fontSize: responsiveFontSize(2),
        color: colors.whiteText,
        backgroundColor: 'transparent',
        fontFamily:fontFamily.appTextMedium,
        marginLeft:responsiveWidth(2)
    },
    Button1:{
        height: responsiveHeight(7),
        width: responsiveWidth(28),
        alignSelf: 'center',
        marginTop: responsiveHeight(3),
        alignItems: 'center',
        borderRadius: responsiveWidth(4),
        justifyContent: 'center',
        borderWidth:responsiveWidth(0.2),
        borderColor:colors.txtInputborder
    },
    icon:{
        width:responsiveWidth(8),
        height:responsiveHeight(8),
        resizeMode:'contain'
    },
    Button2:{
        height: responsiveHeight(4),
        width: responsiveWidth(25),
        marginTop: responsiveHeight(3),
        alignItems: 'center',
        borderRadius: responsiveWidth(5),
        justifyContent: 'center',
        backgroundColor:colors.iconBackGround 
    },
    Button5:{
       paddingHorizontal:responsiveWidth(6),
       paddingVertical:responsiveHeight(0.5),
        alignItems: 'center',
        borderRadius: responsiveWidth(2),
        justifyContent: 'center',
        backgroundColor:colors.iconBackGround 
    },
    buttonText2:{
        fontSize:fontSize.small,
        color: colors.txtInputborder,
        backgroundColor: 'transparent',
        fontFamily:fontFamily.appTextRegular
    },
    Button3:{
        height: responsiveWidth(13),
        width: responsiveWidth(13),
        marginTop: responsiveHeight(3),
        alignItems: 'center',
        borderRadius: responsiveWidth(13/2),
        justifyContent: 'center',
        backgroundColor:colors.iconBackGround  
    },
    settingsbtn:{
        flexDirection:'row',
        width:responsiveWidth(90),
        alignSelf:'center',
        alignItems:'center',
        marginTop:responsiveHeight(2)
    },
    circle:{
        height: responsiveWidth(10),
        width: responsiveWidth(10),
        alignItems: 'center',
        borderRadius: responsiveWidth(10/2),
        justifyContent: 'center',
        backgroundColor:colors.iconBackGround   ,
    },
    settingsbtntxt:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.regular,
        marginLeft:responsiveWidth(5),
        width:responsiveWidth(65),
    },
    textInput:{
        width:responsiveWidth(90),
        alignSelf:"center",
        borderWidth:responsiveWidth(0.2),
        borderColor:colors.txtInputborder,
        marginTop:responsiveHeight(3),
        borderRadius:responsiveWidth(3),
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:responsiveWidth(5),
        marginBottom:responsiveHeight(1)
    },
    textInputinner:{
        width:responsiveWidth(80),
        paddingVertical:responsiveHeight(2),
        paddingLeft:responsiveWidth(5),
        color:colors.txtInputborder,
        fontFamily:fontFamily.appTextRegular,
    },
    catbtn:{
        backgroundColor:colors.button,
        height:responsiveHeight(10),
        width:responsiveWidth(90),
        alignSelf:'center',
        borderRadius:responsiveWidth(2),
        alignItems:'center',
        justifyContent:'center',
        marginTop:responsiveHeight(2)
    }
})