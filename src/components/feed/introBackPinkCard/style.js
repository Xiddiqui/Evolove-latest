import { StyleSheet} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { colors } from '../../../globals/utilities/colors';
import {fontSize} from '../../../globals/utilities/size'
import {fontFamily} from '../../../globals/utilities/fonts'

export const styles = StyleSheet.create({
    card:{
        backgroundColor:colors.pinkCard,
        height:responsiveHeight(47),
        width:'100%',
        borderBottomLeftRadius:responsiveWidth(15),
        borderBottomRightRadius:responsiveWidth(15)
    },
    skipButton:{
        alignSelf:'flex-end',
        marginTop:responsiveHeight(5),
        marginRight:responsiveWidth(4)
    },
    skipButtonText:{
        color:colors.whiteText,
        fontSize:fontSize.medium,
        fontFamily:fontFamily.appTextRegular
    },
    image:{
        width:responsiveWidth(80),
        height:responsiveWidth(60),
        resizeMode:'contain',
        alignSelf:'center'
    }
  });