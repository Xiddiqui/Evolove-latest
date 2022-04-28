import {StyleSheet} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../../globals/utilities/colors'
import { fontFamily } from '../../../../globals/utilities/fonts'
import { fontSize } from '../../../../globals/utilities/size'

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
    stripContainer:{
        height:responsiveWidth(32),
        width:responsiveWidth(90),
        alignSelf:'center',
        borderRadius:responsiveWidth(4) 
    },
    stripheadertxt:{
        color: colors.whiteText,
        fontSize:fontSize.medium,
        marginTop:responsiveHeight(2)
    },
    iconright:{
        left:responsiveWidth(68),
        bottom:responsiveHeight(2.5),
    },
    iconleft:{
        left:responsiveWidth(17),
        bottom:responsiveHeight(2.5),
    },
    iconsView:{
        position:"absolute",
        alignSelf:"flex-end",
        bottom:responsiveHeight(15),
        right:responsiveWidth(7),
    },
    CircleBtn:{
        width:responsiveWidth(15),
        height:responsiveWidth(15),
        marginTop:responsiveHeight(2),
        resizeMode:"contain"
    },
    list: {
        flex: 1,
        marginTop:20,
      },
      listTitle:{
          color:colors.whiteText,
          fontFamily:fontFamily.appTextRegular
      },
      timeconatainer:{
        //   backgroundColor:"red"
        // marginVertical:responsiveHeight(5)
      },
      timetxt:{
          color:colors.txtInputborder,
          fontFamily:fontFamily.appTextRegular
      },
      eventContainerStyle:{
          backgroundColor:colors.iconBackGround,
          marginTop:responsiveHeight(2),
          borderRadius:responsiveWidth(3),
          borderLeftWidth:responsiveWidth(4),
          borderColor:colors.yellow,
          marginVertical:responsiveHeight(2)
        }
})