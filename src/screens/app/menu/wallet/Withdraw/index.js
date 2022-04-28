import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../../components/general/header'
import MyTextInput from '../../../../../components/general/txtInput'
import { appImages } from '../../../../../globals/utilities/assets'
import { colors } from '../../../../../globals/utilities/colors'
import { fontSize } from '../../../../../globals/utilities/size'
import { styles } from './style'

const Withdraw = (props) => {
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Withdraw'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>{'How much you want to withdraw'}</Text>
                <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Amount'}</Text>
                <MyTextInput placeholder={'$ 59.00'} type={'numeric'} />
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Continue'} onPress={() => { props.navigation.navigate('Bank') }} />
                </View>
            </View>
        </ImageBackground>
    )
}
export default Withdraw