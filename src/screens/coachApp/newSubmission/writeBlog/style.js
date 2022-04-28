import {StyleSheet} from 'react-native'
import { colorsDark } from 'react-native-elements/dist/config'
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
        fontSize:fontSize.medium,
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
        marginTop:responsiveHeight(3)
    },
    toptxt:{
        fontSize:fontSize.regular,
        fontFamily:fontFamily.appTextRegular,
        color:colors.bluelight,
        marginTop:responsiveHeight(2),
        marginLeft:responsiveWidth(5)
    },
    addImagebtn:{
        color:colors.button,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.regular
    },
    writeblogview:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:responsiveWidth(5),
        marginTop:responsiveHeight(2)
    },
    txtinput:{
        width:responsiveWidth(90),
        alignSelf:'center',
        borderRadius:responsiveWidth(3),
        borderWidth:responsiveWidth(0.3),
        borderColor:colors.txtInputborder,
        paddingBottom:responsiveHeight(20),
        marginTop:responsiveHeight(1)
    },
    innertxtinput:{
        color:colors.whiteText,
        width:responsiveWidth(85),
        alignSelf:'center',
        marginTop:responsiveHeight(1),
        // backgroundColor:'red'
    },
    addimagecard:{
        width:'100%',
        height:responsiveHeight(20),
        backgroundColor:colors.iconBackGround,
        marginTop:responsiveHeight(1),
        alignItems:'center',
        justifyContent:'center'
    },
    uploadtxt:{
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.medium,
        color:colors.bluelight
    },
    footer:{
        marginBottom:responsiveHeight(3)
    }
    
})