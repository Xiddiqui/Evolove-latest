import {StyleSheet} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    flatlistheadertxt:{
        fontSize:fontSize.large,
        fontFamily:fontFamily.appTextRegular,
        color:colors.txtInputborder,
        marginTop:responsiveHeight(3),
        marginLeft:responsiveWidth(5)
    },
    flatlistView:{
        marginTop:responsiveHeight(3),
        marginLeft:responsiveWidth(5)
    },
    footer:{
        height:responsiveHeight(15)
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
        width:responsiveWidth(90),
        alignSelf:"center",
        marginTop:responsiveHeight(2),
        padding:responsiveHeight(1),
        borderRadius:responsiveWidth(3)
    },
    cardtxt:{
        fontSize:fontSize.regular,
        fontFamily:fontFamily.appTextRegular,
        color:colors.whiteText
    }
})