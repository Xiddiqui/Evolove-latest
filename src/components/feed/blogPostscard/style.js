import React from 'react'
import {StyleSheet} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'

export const styles = StyleSheet.create({
    card:{
        flexDirection:'row',
        width:responsiveWidth(90),
        alignSelf:'center',
        // alignItems:'center',
        marginTop:responsiveHeight(3)
    },
    pic:{
        height:responsiveWidth(30),
        width:responsiveWidth(30),
        borderRadius:responsiveWidth(5)

    },
    txt:{
        color:colors.txtInputborder,
        width:responsiveWidth(59),
        marginLeft:responsiveWidth(2),
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.small
    },
    heading:{
        color:colors.whiteText,
        marginLeft:responsiveWidth(2),
        fontFamily:fontFamily.appTextRegular ,
        fontSize:fontSize.regular,
        width:responsiveWidth(35)
    },
    headingView:{
        flexDirection:'row',
        alignItems:'center'
    },
    bage:{
        backgroundColor:'green',
        width:responsiveWidth(15),
        borderRadius:responsiveWidth(4),
        alignItems:'center',
        justifyContent:'center',
        marginLeft:responsiveWidth(2),
        height:responsiveHeight(3)
    },
    bageTxt:{
        fontSize:fontSize.medium,
        fontFamily:fontFamily.appTextRegular,
        color:colors.whiteText
    }
})