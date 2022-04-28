import {StyleSheet} from 'react-native'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'

export const styles = StyleSheet.create({
    text:{
        color:colors.button,
        fontFamily:fontFamily.appTextMedium,
        textAlign:'center',
        fontSize:fontSize.h3,
        marginTop:responsiveHeight(10)
    }
})