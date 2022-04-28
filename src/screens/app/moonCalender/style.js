import {StyleSheet} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    Calendarcontainer:{
        backgroundColor:colors.iconBackGround,
        width:responsiveWidth(90),
        borderRadius:responsiveWidth(3),
        paddingBottom:responsiveHeight(1),
        alignSelf:'center',
        marginTop:responsiveHeight(2)
    },
    calanderbtn:{
        backgroundColor:colors.button,
        height:responsiveWidth(7),
        width:responsiveWidth(7),
        borderRadius:responsiveWidth(7/2),
        alignItems:'center',
        justifyContent:'center'
    },
    ring:{
        height:responsiveWidth(7),
        width:responsiveWidth(7),
        borderRadius:responsiveWidth(7/2),
        borderWidth:responsiveWidth(0.5),
        borderColor:colors.yellow
    },
    ringview:{
        flexDirection:"row",
        alignItems:'center',
        marginLeft:responsiveWidth(5),
        marginTop:responsiveHeight(4),
        width:responsiveWidth(50)
    },
    moontxt:{
        color:colors.whiteText,
        fontSize:fontSize.large,
        marginLeft:responsiveWidth(2),
        fontFamily:fontFamily.appTextRegular
    },
    moonImage:{
        width:responsiveWidth(10),
        height:responsiveWidth(10),
        resizeMode:'contain',
        marginLeft:responsiveWidth(2)
    }
})