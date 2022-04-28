import {StyleSheet} from 'react-native'
import {
    responsiveHeight,
    responsiveFontSize,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
import { colors } from '../../../globals/utilities/colors';
  import {fontFamily} from '../../../globals/utilities/fonts';
import { fontSize } from '../../../globals/utilities/size';

export const styles = StyleSheet.create({
    header: {
      // backgroundColor: 'red',
      paddingVertical: responsiveHeight(2),
      paddingTop: responsiveHeight(6),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      paddingLeft: responsiveWidth(4),
    },
    hedingtxt: {
      fontSize: fontSize.medium,
      color:colors.button,
      paddingRight:responsiveWidth(5),
      // paddingLeft: responsiveWidth(7),
      // width: responsiveWidth(60),
      fontFamily:fontFamily.appTextRegular,
    },
    circle:{
      backgroundColor:colors.iconBackGround,
      height:responsiveWidth(10),
      width:responsiveWidth(10),
      borderRadius:responsiveWidth(10/2),
      alignItems:'center',
      justifyContent:'center'
    },
    circle1:{
      // backgroundColor:colors.iconBackGround,
      height:responsiveWidth(10),
      width:responsiveWidth(10),
      borderRadius:responsiveWidth(10/2),
      alignItems:'center',
      justifyContent:'center'
    },
    header1: {
      // backgroundColor: colors.background,
      paddingVertical: responsiveHeight(2),
      paddingTop: responsiveHeight(6),
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: responsiveWidth(4),
    },
    hedingtxt1: {
      fontSize: responsiveFontSize(2.7),
      color:colors.button,
      paddingLeft: responsiveWidth(7),
      width: responsiveWidth(60),
      fontFamily: fontFamily.appTextBold,
    },
    Logo1:{
      height:responsiveWidth(20),
      width:responsiveWidth(20),
      resizeMode:'contain'
    }
  });