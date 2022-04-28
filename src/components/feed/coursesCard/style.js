import { StyleSheet } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'
export const styles = StyleSheet.create({
    card: {
        // height: responsiveWidth(40),
        width: responsiveWidth(45),
        backgroundColor: colors.iconBackGround,
        borderRadius: responsiveWidth(3)
    },
    cardimage: {
        width: '100%',
        height: responsiveWidth(23),
        borderTopLeftRadius: responsiveWidth(3),
        borderTopRightRadius: responsiveWidth(3)
    },
    cardheading: {
        fontSize: fontSize.regular,
        color: colors.whiteText,
        fontFamily: fontFamily.appTextMedium,
    },
    designationtxt: {
        fontSize: fontSize.small,
        color: colors.greyText,
        fontFamily: fontFamily.appTextRegular
    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
         width: '100%',
        alignSelf: 'center'
    },

    txtView: {
        width: '90%',
        // marginTop: responsiveHeight(2),
        alignSelf: "center"
    },
    btn:{
        backgroundColor:colors.button,
        width:responsiveWidth(25),
        height:responsiveHeight(4),
        borderRadius:responsiveWidth(4),
        alignItems:'center',
        justifyContent:'center',
        marginTop:responsiveHeight(1),
        marginBottom:responsiveHeight(2)
    },
    btntxt:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.regular
    },
    circle:{
        backgroundColor:colors.iconBackGround,
        width:responsiveWidth(10),
        height:responsiveWidth(10),
        borderRadius:responsiveWidth(10/2),
        marginTop:responsiveHeight(-3),
        alignItems:'center',
        justifyContent:'center'
    },
    circlebtnview:{
        flexDirection:'row',
        width:responsiveWidth(24),
        justifyContent:'flex-end',
        alignSelf:'flex-end',
        marginRight:responsiveWidth(3),
    },
    pricetxt:{
        color:colors.greenTxt,
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.small
    }
})