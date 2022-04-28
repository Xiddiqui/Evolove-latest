import {StyleSheet} from 'react-native'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import {colors} from '../../../globals/utilities/colors'

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background,
        alignItems:'center',
        justifyContent:'center'
    },
    logoImage:{
        height:responsiveWidth(35),
        width:responsiveWidth(35),
        resizeMode:'contain'
    }
})