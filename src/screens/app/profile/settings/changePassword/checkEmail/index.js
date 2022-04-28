
import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native'
import { AppButton, SocialButton } from '../../../../../../components/general/button'
import { AuthHeader } from '../../../../../../components/general/header'
import MyTextInput from '../../../../../../components/general/txtInput'
import { appImages } from '../../../../../../globals/utilities/assets'
import { colors } from '../../../../../../globals/utilities/colors'
import { fontSize } from '../../../../../../globals/utilities/size'
import { styles } from './style'

const CheckEmail = (props) => {
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AuthHeader
                name={'chevron-left'} type={'feather'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.heading}>{'Check Your Email'}</Text>
                <Text style={[styles.heading,{fontSize:fontSize.medium,color:colors.txtInputborder}]}>{'Please Cheack your mail. We Have Sent You An Email That Contains A Verification Code'}</Text>
                <Image source={appImages.checkEmail} style={styles.Image}/>
                <AppButton Title={'Done'} onPress={()=>{props.navigation.navigate('CoachProfile')}}/>
            </View>
        </ImageBackground>
    )
}
export default CheckEmail