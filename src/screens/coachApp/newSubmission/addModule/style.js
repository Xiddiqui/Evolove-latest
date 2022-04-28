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
    buttonView:{
        // position:"absolute",
        marginTop:responsiveHeight(7)
    },
    toptxt:{
        fontSize:fontSize.regular,
        fontFamily:fontFamily.appTextRegular,
        color:colors.bluelight,
        marginTop:responsiveHeight(2),
        marginLeft:responsiveWidth(5)
    },
    titletext:{
        color:colors.whiteText,
        alignSelf:'center',
        fontFamily:fontFamily.appTextRegular,
        marginTop:responsiveHeight(2)
    },
    card:{
        backgroundColor:colors.iconBackGround,
        width:responsiveWidth(90),
        height:responsiveHeight(20),
        alignSelf:'center',
        borderRadius:responsiveWidth(3),
        marginTop:responsiveHeight(1),
        alignItems:'center',
        justifyContent:'center'
    },
    uploadtxt:{
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.medium,
        color:colors.bluelight
    },
    input:{
        borderWidth:responsiveWidth(0.2),
        borderColor:colors.whiteText,
        width:responsiveWidth(65),
        borderRadius:responsiveWidth(3),
        marginLeft:responsiveWidth(5),
        color:colors.whiteText,
        paddingLeft:responsiveWidth(2),
        fontFamily:fontFamily.appTextRegular
    },
    circle:{
        backgroundColor:colors.iconBackGround,
        width:responsiveWidth(6),
        height:responsiveWidth(6),
        borderRadius:responsiveWidth(6/2),
        alignItems:'center',
        justifyContent:'center',
        
    },
    circletxt:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.medium
    },
    addBtn:{
        backgroundColor:colors.button,
        height:responsiveHeight(6),
        width:responsiveWidth(24),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:responsiveWidth(3),
        marginLeft:responsiveWidth(3),
        flexDirection:'row'
    },
    moduleInputView:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:responsiveHeight(2)
    },
    btnTxt:{
        fontSize:fontSize.medium,
        fontFamily:fontFamily.appTextRegular,
        color:colors.whiteText
    },
    flatlistView:{
        backgroundColor:colors.iconBackGround,
        width:'100%',
        alignSelf:'center',
        marginTop:responsiveHeight(1),
        height:responsiveHeight(7),
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:responsiveWidth(10),
        justifyContent:'space-between',
        paddingRight:responsiveWidth(10)
    },
    flatListText: {
        color:colors.whiteText,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.large
    },
    Button: {
        // flex: 1,
        height: responsiveHeight(6.5),
        width: responsiveWidth(90),
        alignSelf: 'center',
        marginTop: responsiveHeight(3),
        alignItems: 'center',
        borderRadius: responsiveWidth(15),
        justifyContent: 'center',
        backgroundColor:colors.greyText
    },
    buttonText: {
        fontSize: responsiveFontSize(2),
        color: colors.whiteText,
        backgroundColor: 'transparent',
        fontFamily:fontFamily.appTextMedium,
        marginLeft:responsiveWidth(2)
    },
    
})