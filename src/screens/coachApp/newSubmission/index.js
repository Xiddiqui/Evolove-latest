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
import { AppButton, AppButtonLarge, CategoryButton, SocialButton } from '../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../components/general/header'
import MyTextInput from '../../../components/general/txtInput'
import { appImages } from '../../../globals/utilities/assets'
import { colors } from '../../../globals/utilities/colors'
import { fontSize } from '../../../globals/utilities/size'
import { styles } from './style'

const NewSubmission = (props) => {
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'New Submission'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>{'Select what type of product you want to submit'}</Text>
                <CategoryButton Title={'Course'} onPress={()=>{props.navigation.navigate('CourseSubmission')}}/>
                <CategoryButton Title={'Product'} onPress={()=>{props.navigation.navigate('ProductSubmission')}}/>
                <CategoryButton Title={'Blog'} onPress={()=>{props.navigation.navigate('BlogSubmission')}}/>
            </View>
        </ImageBackground>
    )
}
export default NewSubmission