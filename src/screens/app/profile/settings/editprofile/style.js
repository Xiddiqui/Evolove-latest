import { StyleSheet } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../../../globals/utilities/colors'
import { fontFamily } from '../../../../../globals/utilities/fonts'
import { fontSize } from '../../../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    recenttxt: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.appTextRegular,
        color: colors.txtInputborder,
        marginTop: responsiveHeight(3),
        marginLeft: responsiveWidth(5)
    },
    image: {
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        borderRadius: responsiveWidth(20 / 2),
        alignSelf: "center",
        alignItems:'flex-end',
        justifyContent:'flex-end'
    },
    camerabtn:{
        width:responsiveWidth(5),
        height:responsiveWidth(5),
        borderRadius:responsiveWidth(5/2),
        backgroundColor:colors.button,
        alignItems:'center',
        justifyContent:"center"
    },
    name: {
        color: colors.button,
        fontSize: fontSize.large,
        fontFamily: fontFamily.appTextBold,
        textAlign: 'center',
        marginTop: responsiveHeight(2)
    },
    topTxt: {
        fontSize: fontSize.regular,
        fontFamily: fontFamily.appTextRegular,
        color: colors.bluelight,
        marginTop: responsiveHeight(4),
        width: responsiveWidth(90),
        alignSelf: 'center'
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
        backgroundColor:colors.whiteText   ,
    },
    settingsbtntxt:{
        color:colors.button,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.regular,
        marginLeft:responsiveWidth(5),
        width:responsiveWidth(65),
    },
    footer: {
        marginBottom: responsiveHeight(17)
    },
     centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
        backgroundColor:'rgba(0,0,0,0.7)'
      },
      modalView: {
        margin: 20,
        backgroundColor:colors.iconBackGround,
        borderRadius: 20,
        width:responsiveWidth(90),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText:{
          fontSize:fontSize.large,
          color:colors.whiteText,
          fontFamily:fontFamily.appTextMedium,
          marginTop:responsiveHeight(1)
      },
      buttonView:{
        flexDirection:"row",
        width:responsiveWidth(75),
        justifyContent:'space-between'
      },
      buttonView1:{
        // position:"absolute",
        alignSelf:'center',
        // bottom:responsiveHeight(2)
        marginTop:responsiveHeight(7)
    },

})