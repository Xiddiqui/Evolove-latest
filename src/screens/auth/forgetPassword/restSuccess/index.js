import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import { AppButton, LeftArrowButton, SocialButton } from '../../../../components/general/button'
import { AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/size'
import { styles } from './style'

const RestSuccess = (props) => {
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
            <Image source={appImages.Reset} style={styles.Image}/>
                <Text style={styles.heading}>{'Password Reset'}</Text>
                <Text  style={[styles.heading,styles.heading2]}>{'Your Password Has Been Reset Successfuly'}</Text>
                <LeftArrowButton Title={'Back To Login Page'} onPress={()=>{props.navigation.navigate('Login')}}/>
            </View>
        </ImageBackground>
    )
}
export default RestSuccess