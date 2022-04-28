import {StyleSheet} from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background
    },
    heading:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextMedium,
        fontSize:fontSize.h5,
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
        marginTop:responsiveHeight(2),
        marginLeft:responsiveWidth(5)
    },
    card:{
        backgroundColor:colors.iconBackGround,
        height:responsiveHeight(8),
        width:responsiveWidth(35),
        borderRadius:responsiveWidth(4),
        alignItems:"center",
        justifyContent:"center"
    },
    cardtxt:{
        fontSize:fontSize.large,
        color:colors.whiteText,
        fontFamily:fontFamily.appTextRegular
    },
    cardview:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:responsiveWidth(90),
        alignSelf:'center',
        marginTop:responsiveHeight(1),
        paddingBottom:responsiveHeight(4),
        borderBottomWidth:responsiveWidth(1),
        color:colors.iconBackGround
    }
    
})