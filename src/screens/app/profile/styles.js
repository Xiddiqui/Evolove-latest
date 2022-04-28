import {StyleSheet} from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    recenttxt:{
        fontSize:fontSize.large,
        fontFamily:fontFamily.appTextRegular,
        color:colors.txtInputborder,
        marginTop:responsiveHeight(3),
        marginLeft:responsiveWidth(5)
    },
    image:{
        width:responsiveWidth(15),
        height:responsiveWidth(15),
        borderRadius:responsiveWidth(20/2),
        alignSelf:"center"
    },
    name:{
        color:colors.button,
        fontSize:fontSize.large,
        fontFamily:fontFamily.appTextBold,
        textAlign:'center',
        marginTop:responsiveHeight(2)
    },
    whiteBar:{
        backgroundColor:colors.whiteText,
        width:responsiveWidth(95),
        height:responsiveHeight(7),
        alignSelf:'center',
        borderRadius:responsiveWidth(7),
        marginTop:responsiveHeight(3),
        justifyContent:"center",
        marginBottom:responsiveHeight(2)
    },
    whiteBarinner:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        width:'90%',
        alignSelf:"center"
    },
    whiteBartxt:{
        fontFamily:fontFamily.appTextMedium,
        fontSize:fontSize.medium,
        
    },
    footer:{
        marginBottom:responsiveHeight(17)
    },
    FlatListStyle:{
        marginLeft:responsiveWidth(3),
        marginTop:responsiveHeight(1)
    },
    topTxt: {
        fontSize: fontSize.regular,
        fontFamily: fontFamily.appTextRegular,
        color: colors.bluelight,
        marginTop: responsiveHeight(2),
        width: responsiveWidth(90),
        alignSelf: 'center'
    },
})