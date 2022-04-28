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
        position:"absolute",
        bottom:responsiveHeight(3),
        flexDirection:"row",
        alignItems:"center",
        width:responsiveWidth(90),
        alignSelf:"center"
    },
    toptxt:{
        fontSize:fontSize.regular,
        fontFamily:fontFamily.appTextRegular,
        color:colors.bluelight,
        marginTop:responsiveHeight(2),
        marginLeft:responsiveWidth(5)
    },
    calanderBtn:{
        flexDirection: 'row',
        marginBottom: responsiveHeight(1),
        borderWidth:responsiveWidth(0.2),
        borderColor:colors.txtInputborder,
        paddingVertical:responsiveHeight(2),
        width:responsiveWidth(90),
        alignSelf:"center",
        borderRadius:responsiveWidth(3),
        paddingLeft:responsiveWidth(3),
        marginTop:responsiveHeight(1.5)
    },
    taskIcon:{
        width:responsiveWidth(5),
        height:responsiveWidth(5)
    },
    taskList:{
        flexDirection:"row",
        alignItems:'center',
        width:responsiveWidth(90),
        alignSelf:'center',
        marginTop:responsiveHeight(2),
    },
    taskListtxt:{
       fontFamily:fontFamily.appTextRegular,
       color:colors.whiteText,
       marginLeft:responsiveWidth(3),
       fontSize:fontSize.large
    },
    listinner:{
        flexDirection:"row",
        alignItems:'center'
    },
    dis:{
        fontSize:fontSize.small,
        fontFamily:fontFamily.appTextRegular,
        color:colors.txtInputborder,
        width:responsiveWidth(90),
        alignSelf:"center",
        marginTop:responsiveHeight(2),
        lineHeight:responsiveHeight(2)
    },
    card:{
        backgroundColor:colors.iconBackGround,
        height:responsiveHeight(10),
        width:responsiveWidth(90),
        alignSelf:"center",
        borderRadius:responsiveWidth(4),
        marginTop:responsiveHeight(3),
        borderLeftWidth:responsiveWidth(4),
        borderColor:colors.yellow
    },
    cardtxt:{
        fontSize:fontSize.large,
        fontFamily:fontFamily.appTextRegular,
        color:colors.whiteText
    },
    cardToptxt:{
        flexDirection:'row',
        marginTop:responsiveHeight(2),
        width:responsiveWidth(70),
        justifyContent:'space-between',
        marginLeft:responsiveWidth(4)
    },
    durationtxt:{
        fontFamily:fontFamily.appTextRegular,
        color:colors.whiteText,
        fontSize:fontSize.small,
        marginLeft:responsiveWidth(1)
    },
    durationView:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:responsiveHeight(1),
        marginLeft:responsiveWidth(4)
    },
    greycircle:{
        height:responsiveWidth(13),
        width:responsiveWidth(13),
        backgroundColor:colors.iconBackGround,
        borderRadius:responsiveWidth(13/2),
        alignItems:"center",
        justifyContent:"center",
        marginLeft:responsiveWidth(2)
    },
    greenbtn:{
        backgroundColor:colors.greenTxt,
        height:responsiveHeight(5),
        width:responsiveWidth(40),
        alignItems:"center",
        justifyContent:"center",
        marginLeft:responsiveWidth(4),
        borderRadius:responsiveWidth(7)
    },
    greenbtntxt:{
        fontFamily:fontFamily.appTextRegular,
        color:colors.whiteText,
        fontSize:fontSize.large
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
      ModalbuttonView:{
        flexDirection:"row",
        width:responsiveWidth(75),
        justifyContent:'space-between'
      }
    
})