import {StyleSheet} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../../globals/utilities/colors'
import { fontFamily } from '../../../../globals/utilities/fonts'
import { fontSize } from '../../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    pinkcard:{
        backgroundColor:colors.button,
        width:'100%',
        height:responsiveHeight(20),
        alignItems:'center',
        justifyContent:'center',
        marginTop:responsiveHeight(2)
    },
    priceView:{
        backgroundColor:colors.iconBackGround,
        width:responsiveWidth(40),
        height:responsiveHeight(6),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:responsiveWidth(3)
    },
    pricetext:{
        color:colors.whiteText,
        fontSize:fontSize.large,
        fontFamily:fontFamily.appTextRegular
    },
    toptxt:{
        fontSize:fontSize.regular,
        fontFamily:fontFamily.appTextRegular,
        color:colors.bluelight,
        marginTop:responsiveHeight(2),
        marginLeft:responsiveWidth(5)
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
        width:responsiveWidth(90),
        alignSelf:'center',
        backgroundColor:colors.iconBackGround,
        padding:responsiveHeight(1),
        borderRadius:responsiveWidth(2)
    },
    footer:{
        height:responsiveHeight(20)
    },
    txt:{
        color:colors.whiteText,
        fontFamily:fontFamily.appTextRegular
    }
})