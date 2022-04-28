import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native'
import { AppButton, SocialButton } from '../../../../components/general/button'
import { AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { styles } from './style'

const NewPassword = (props) => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AuthHeader
                name={'chevron-left'} type={'feather'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.heading}>{'New Password'}</Text>
                <MyTextInput placeholder={'New Password'} onchange={(Text) => setNewPassword(Text)} issecure={true} />
                <MyTextInput placeholder={'confirm New password'} onchange={(Text) => setConfirmPassword(Text)} issecure={true} />
                <AppButton Title={'Update'} onPress={()=>{props.navigation.navigate('RestSuccess')}}/>
            </View>
        </ImageBackground>
    )
}
export default NewPassword