import {StyleSheet} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    mainView:{
        alignItems:"center"
    },
    txt:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.h5,
        marginTop:responsiveHeight(3)
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
      buttonView:{
        flexDirection:"row",
        width:responsiveWidth(75),
        justifyContent:'space-between'
      }
})