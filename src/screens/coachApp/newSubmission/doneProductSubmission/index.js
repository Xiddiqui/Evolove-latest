import React, { useState , useEffect} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontFamily } from '../../../../globals/utilities/fonts'
import { fontSize } from '../../../../globals/utilities/size'
import { styles } from './style'

const ProductSubmissionDone = (props) => {

    useEffect(()=>{
        setTimeout(()=>{
            props.navigation.navigate('CoachProfile')
        },1000)
    },[])
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%',alignItems:'center',justifyContent:'center' }}>
                <Image source={appImages.Done} style={styles.image}/>
                <Text style ={styles.paymenttxt}>Submission Done</Text>
                <Text style ={[styles.paymenttxt,{fontFamily:fontFamily.appTextRegular,textAlign:'center'}]}>{`You have successfully submit\n your product publishing request`}</Text>
            </View>
        </ImageBackground>
    )
}
export default ProductSubmissionDone