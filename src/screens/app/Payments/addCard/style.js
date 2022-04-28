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
        // position:"absolute",
        alignSelf:'center',
        // bottom:responsiveHeight(3)
        marginTop:responsiveHeight(3)
    },
    toptxt:{
        fontSize:fontSize.regular,
        fontFamily:fontFamily.appTextRegular,
        color:colors.bluelight,
        marginTop:responsiveHeight(2),
        marginLeft:responsiveWidth(5)
    },
    hlftxtinputstyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:responsiveWidth(90),
        alignSelf:'center'
    },
    savetxt:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.regular,
        marginLeft:responsiveWidth(2)
    },
    Saveview:{
        flexDirection:'row',
        alignItems:'center',
        width:responsiveWidth(40),
        marginLeft:responsiveWidth(5),
        marginTop:responsiveHeight(4)
    }
    
})