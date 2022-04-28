import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native'
import { AppButton, SocialButton } from '../../../components/general/button'
import { AuthHeader } from '../../../components/general/header'
import MyTextInput from '../../../components/general/txtInput'
import { appImages } from '../../../globals/utilities/assets'
import { EmailRegix } from '../../../globals/utilities/validations'
import { styles } from './styles'
import auth from '@react-native-firebase/auth';
import Toast from "react-native-simple-toast"

const Forgot = (props) => {
    const [email, setEmail] = useState('')
    const [emailError , setEmailError] = useState('')
    const [loading , setLoading] = useState(false)

    const handleOnChangeEmailText = Email => {
        const re = EmailRegix
        !Email
            ? setEmailError('')
            : !re.test(Email)
                ? setEmailError('Email format is invalid')
                : setEmailError('');
        setEmail(Email);
    };
    const validations = () => {
        const re = EmailRegix
        if (email === '') {
            setEmailError('Enter email')
            return false
        }
        else if (!re.test(email)) {
            setEmailError('Email format is invalid')
            return false
        }
        else{
            return true
        }
    }

    const forgotPassword = async () => {
    
        if (validations()) {
            setLoading(true)
          await auth()
            .sendPasswordResetEmail(email)
            .then(() => {
              setLoading(false)
              Toast.show('Reset Password link send to your Email.');
              props.navigation.navigate('CheckEmail')
            })
            .catch(e => {
              Toast.show(e);
            });
        }
      };
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AuthHeader name={'chevron-left'} type={'feather'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.heading}>{'Forgot Password'}</Text>
                <Text style={styles.txt}>{'Enter The Email Address Associated With your Account'}</Text>
                <MyTextInput placeholder={'Email ID'} onchange={(Text) => handleOnChangeEmailText(Text)} err={emailError}/>
                <AppButton Title={'Send'} onPress={forgotPassword} activity={loading}/>
            </View>
        </ImageBackground>
    )
}
export default Forgot