import {StyleSheet} from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Colors } from 'react-native/Libraries/NewAppScreen'
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
        alignSelf:'center',
        bottom:responsiveHeight(3)
    },
    toptxt:{
        fontSize:fontSize.regular,
        fontFamily:fontFamily.appTextRegular,
        color:colors.bluelight,
    },
    card:{
        backgroundColor:colors.iconBackGround,
        width:responsiveWidth(90),
        alignSelf:'center',
        marginTop:responsiveHeight(2),
        flexDirection:'row',
        alignItems:'center',
        height:responsiveHeight(7),
        borderRadius:responsiveWidth(4),
        paddingLeft:responsiveWidth(4)
    },
    cardTxt:{
        color:colors.whiteText,
        fontSize:fontSize.large,
        fontFamily:fontFamily.appTextRegular,
        width:responsiveWidth(70)
    },
    addcardview:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:responsiveHeight(3),
        width:responsiveWidth(90),
        alignSelf:'center',
        justifyContent:'space-between'
    },
    changetxt:{
        fontSize:fontSize.regular,
        fontFamily:fontFamily.appTextRegular,
        color:colors.lightPink, 
    },
    MasterCard:{
        height:responsiveWidth(7),
        width:responsiveWidth(7),
        resizeMode:'contain',
        marginLeft:responsiveWidth(6)
    }
    
})