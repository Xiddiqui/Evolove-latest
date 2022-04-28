import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native'
import { Icon } from 'react-native-elements'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../../components/general/button'
import HalfTextInput from '../../../../../components/general/halfTxtInput'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../../components/general/header'
import MyTextInput from '../../../../../components/general/txtInput'
import { appImages } from '../../../../../globals/utilities/assets'
import { colors } from '../../../../../globals/utilities/colors'
import { fontSize } from '../../../../../globals/utilities/size'
import { styles } from './style'

const Bank = (props) => {
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Bank Accounts'}
                    Back={() => props.navigation.goBack()}
                />
                <View style={styles.addcardview}>
                <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Added Bank'}</Text>
                <TouchableOpacity>
                    <Text style={styles.changetxt}>Edit Details</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTxt}>Account Number : 8323434****</Text>
                    <Image source={appImages.Bank} style={styles.MasterCard}/>
                </View>
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Submit Request'} onPress={() => { props.navigation.navigate('Done') }} />
                </View>
            </View>
        </ImageBackground>
    )
}
export default Bank