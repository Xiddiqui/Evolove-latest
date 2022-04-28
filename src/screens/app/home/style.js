import {StyleSheet} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    seeallTab:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:responsiveWidth(90),
        alignSelf:'center',
        marginTop:responsiveWidth(4),
        alignItems:"center"
    },
    banner:{
        height:responsiveHeight(20),
        width:responsiveWidth(90),
        alignSelf:'center',
        marginTop:responsiveHeight(2)

    },
    bannertxt:{
        fontSize:fontSize.large,
        fontFamily:fontFamily.appTextRegular,
        color:colors.whiteText,
        width:responsiveWidth(65),
        marginTop:responsiveHeight(3),
        marginLeft:responsiveWidth(7)
    },
    whitecircle:{
        backgroundColor:colors.whiteText,
        height:responsiveWidth(6),
        width:responsiveWidth(6),
        borderRadius:responsiveWidth(6/2),
        alignItems:'center',
        justifyContent:'center'
    },
    learnmoreView:{
        flexDirection:'row',
        marginLeft:responsiveWidth(7),
        marginTop:responsiveHeight(2),
        width:responsiveWidth(40)
    },
    learnmoretxt:{
        fontSize:fontSize.medium,
        marginLeft:responsiveWidth(3),
        fontFamily:fontFamily.appTextMedium,
        color:colors.whiteText,
    },
    seeallTabheadingtxt:{
        fontSize:fontSize.medium,
        color:colors.whiteText,
        fontFamily:fontFamily.appTextMedium
    },
    seealltxt:{
        fontSize:fontSize.medium,
        color:colors.greyText,
        fontFamily:fontFamily.appTextRegular
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
        marginTop:responsiveHeight(2),
        width:responsiveWidth(45)
    },
    FlatListstyle:{
        marginTop:responsiveHeight(2)
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
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        height:responsiveHeight(47),
        elevation: 5
      },
      modalText:{
          fontSize:fontSize.h5,
          color:colors.whiteText,
          fontFamily:fontFamily.appTextMedium,
          marginTop:responsiveHeight(2),
          marginLeft:responsiveWidth(4)
      },
      ModalbuttonView:{
        flexDirection:"row",
        width:responsiveWidth(75),
        justifyContent:'space-between'
      },
      video:{
        //  width:'100%',
        marginTop:responsiveHeight(15),
          height:responsiveHeight(20),
         position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    },
})