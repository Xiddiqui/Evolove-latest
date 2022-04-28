import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native'
import { AppButton, SocialButton } from '../../../../components/general/button'
import { AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/size'
import { styles } from './style'
import CodeInput from 'react-native-code-input';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const Verify = (props) => {
    const [code, setCode] = useState('')
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AuthHeader
                name={'chevron-left'} type={'feather'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.heading}>{'Verification Code'}</Text>
                <Text style={[styles.heading, { fontSize: fontSize.medium, color: colors.txtInputborder, }]}>{'Enter The Verification code Ve just Send You To Your Email Address'}</Text>
                <View>
                    <CodeInput
                        keyboardType="numeric"
                        codeLength={5}
                        borderType='border-circle'
                        autoFocus={false}
                        size={50}
                        space={20}
                        containerStyle={{ marginTop:responsiveHeight(5),marginBottom:responsiveHeight(5) }}
                        codeInputStyle={{ fontWeight: '800', borderWidth: responsiveWidth(0.3), borderColor: colors.txtInputborder, borderRadius: responsiveWidth(3) }}
                    // onFulfill={(code) => setCode(code)}
                    />
                </View>
                <AppButton Title={'Verify Code'} onPress={()=>{props.navigation.navigate('NewPassword')}}/>
                <View style={styles.footerview}>
                    <Text style={styles.footertxt}>
                        Didn't gey any code ?
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.footerTouchabletxt}>
                            {'Resend'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}
export default Verify