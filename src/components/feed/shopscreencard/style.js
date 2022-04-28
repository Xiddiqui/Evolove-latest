import {StyleSheet} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'
export const styles = StyleSheet.create({
    card:{
    height:responsiveWidth(40),
    width:responsiveWidth(47),
    backgroundColor:colors.iconBackGround,
    borderRadius:responsiveWidth(3)
    },
    cardimage:{
        width:'100%',
        height:responsiveWidth(23),
        borderTopLeftRadius:responsiveWidth(3),
        borderTopRightRadius:responsiveWidth(3)
    },
    cardheading:{
        fontSize:fontSize.medium,
        color:colors.whiteText,
        fontFamily:fontFamily.appTextMedium,
        width:'90%',
        alignSelf:'center',
        marginTop:responsiveHeight(1)
    },
    priceView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'90%',
        alignSelf:'center'
    },
    type:{
        fontSize:fontSize.medium,
        color:colors.greyText,
        fontFamily:fontFamily.appTextMedium
    },
    pricetxt:{
        fontSize:fontSize.medium,
        color:colors.greenTxt,
        fontFamily:fontFamily.appTextMedium
    }
})