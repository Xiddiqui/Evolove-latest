import { StyleSheet } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../../globals/utilities/colors'
import { fontFamily } from '../../../../globals/utilities/fonts'
import { fontSize } from '../../../../globals/utilities/size'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    buttonView: {
        position: "absolute",
        alignSelf: 'center',
        bottom: responsiveHeight(3)
    },
    toptxt: {
        fontSize: fontSize.regular,
        fontFamily: fontFamily.appTextRegular,
        color: colors.bluelight,
        marginTop: responsiveHeight(2),
        marginLeft: responsiveWidth(5)
    },
    titletext: {
        color: colors.whiteText,
        width: responsiveWidth(90),
        alignSelf: 'center',
        fontFamily: fontFamily.appTextRegular,
        marginTop: responsiveHeight(2)
    },
    card: {
        backgroundColor: colors.iconBackGround,
        width: responsiveWidth(90),
        height: responsiveHeight(20),
        alignSelf: 'center',
        borderRadius: responsiveWidth(3),
        marginTop: responsiveHeight(1),
        alignItems: 'center',
        justifyContent: 'center'
    },
    uploadtxt: {
        fontFamily: fontFamily.appTextRegular,
        fontSize: fontSize.medium,
        color: colors.bluelight
    },
    video: {
        height: responsiveHeight(20),
        // position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    ERR:{
        color:'red',
        fontFamily:fontFamily.appTextRegular,
        fontSize:fontSize.regular,
        marginLeft:responsiveWidth(5),
        marginTop:responsiveHeight(1)
    }

})