import {StyleSheet} from 'react-native'
import { fonts } from 'react-native-elements/dist/config'
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
    Image:{
        width:responsiveWidth(80),
        height:responsiveWidth(80),
        resizeMode:'contain',
        alignSelf:'center'
    },
    buttonView:{
        // position:"absolute",
        alignSelf:'center',
        marginTop:responsiveHeight(7)
        // bottom:responsiveHeight(3)
    },
    toptxt:{
        fontSize:fontSize.regular,
        fontFamily:fontFamily.appTextRegular,
        color:colors.bluelight,
        marginTop:responsiveHeight(2),
        marginLeft:responsiveWidth(5)
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor:colors.iconBackGround,
        borderRadius: 20,
        width:responsiveWidth(90),
        paddingBottom:responsiveHeight(2),
        // alignItems: "center",
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
          marginTop:responsiveHeight(1),
          textAlign:'center'
      },
      textInput: {
        width: responsiveWidth(90),
        alignSelf: "center",
        height:responsiveHeight(7),
        borderWidth: responsiveWidth(0.2),
        borderColor: colors.txtInputborder,
        marginTop: responsiveHeight(1.5),
        borderRadius: responsiveWidth(3),
        justifyContent:'center',
        paddingLeft:responsiveWidth(2)
    },
    catitemtxt:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.regular
    },
    catitemview:{
        marginLeft:responsiveWidth(5),
        marginTop:responsiveHeight(2),
    },
    lable:{
        color:colors.txtInputborder,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.regular
    },
    err:{
        color: 'red',
        fontSize:fontSize.small,
        marginTop:responsiveHeight(1),
        marginLeft:responsiveWidth(5),
        fontFamily:fontFamily.appTextRegular
    }
    
})