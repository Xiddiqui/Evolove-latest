import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Platform
} from 'react-native'
import { AppButton, SocialButton } from '../../../components/general/button'
import { AuthHeader } from '../../../components/general/header'
import MyTextInput from '../../../components/general/txtInput'
import { appImages } from '../../../globals/utilities/assets'
import { EmailRegix } from '../../../globals/utilities/validations'
import { styles } from './styles'
import { getCurrentUserId, signInWithEmail,getCurrentUser } from '../../../Backend/auth'
import { _storeData } from '../../../Backend/AsyncFuncs'
import { getData, getDocByKeyValue } from '../../../Backend/utility'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import jwt_decode from "jwt-decode";
import Toast from 'react-native-simple-toast';
import { responsiveWidth } from 'react-native-responsive-dimensions'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)

    const handleOnChangeEmailText = Email => {
        const re = EmailRegix
        !Email
            ? setEmailError('')
            : !re.test(Email)
                ? setEmailError('Email format is invalid')
                : setEmailError('');
        setEmail(Email);
    };
    const handleOnChangePasswordText = Password => {
        !Password
            ? setPasswordError('')
            : password.length < 7
                ? setPasswordError('Min 8 characters')
                : setPasswordError('');
        setPassword(Password);
    };
    const validations = () => {
        const re = EmailRegix
        if (email === '') {
            setEmailError('Enter Email Error')
            return false;
        }
        else if (!re.test(email)) {
            setEmailError('Email format is invalid')
            return false
        }
        else if (password === '') {
            setPasswordError('Enter Password')
            return false
        }
        else if (password.length < 7) {
            setPasswordError('Min 8 characters')
            return false
        }
        else {
            return true
        }
    }
    const LogIn = async () => {
        if (validations()) {
            setIsLoading(true)
            try {
                await signInWithEmail(email, password)
                    .then(async (user) => {
                        if (user) {
                            let uid = await getCurrentUserId()
                            getData('Users', uid).then(async (data) => {
                                if (data.Coach === true) {
                                    await _storeData('userId', uid)
                                    await _storeData('userType', 'Coach')
                                    props.navigation.navigate('CoachApp')
                                    setIsLoading(false)
                                }
                                else {
                                    await _storeData('userId', uid)
                                    props.navigation.navigate('App')
                                    setIsLoading(false)
                                }

                            })
                        }
                        else {
                            setIsLoading(false)
                        }
                    })
                    .catch((error) => { });
            } catch (error) { }

        }
    }
    GoogleSignin.configure({
        webClientId: '989895439172-fep6d60suqq59j5ojri8dbh5urk517dp.apps.googleusercontent.com',
    });
    const googleOAuth = async () => {
        // let newUser = await getCurrentUser()
        // console.log(newUser);
        setGoogleLoading(true)
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        console.log('??googleCredential', googleCredential)
        var token = googleCredential.token;
        var decoded = jwt_decode(token);
        await auth().signInWithCredential(googleCredential).then(async () => {
            let uid = await getCurrentUserId()
            console.log({uid})
            await getData('Users' , uid).then(async(data)=>{
                if(data === false){
                    Toast.show('no account found')
                    setGoogleLoading(false) 
                }else{
                    if(data.Coach === true){
                        await _storeData('userId', uid)
                        await _storeData('userType', 'Coach')
                        props.navigation.navigate('CoachApp')
                        setGoogleLoading(false) 
                    }
                    else{
                        await _storeData('userId', uid)
                        props.navigation.navigate('App')
                        setGoogleLoading(false) 
                    }
                }
            })
            // await 'getDocByKeyValue('Users', 'id', uid).then(async (data) => {
            //     if (data.length === 0) {
            //         Toast.show('no users found')
            //         setGoogleLoading(false)
            //     } else {
            //         await _storeData('userId', token)
            //         setGoogleLoading(false)
            //         props.navigation.navigate('App')

            //     }
            // })
        })

        // return auth().signInWithCredential(googleCredential);
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AuthHeader name={'chevron-left'} type={'feather'} />
                <Text style={styles.heading}>Login</Text>
                <MyTextInput placeholder={'Email ID'} onchange={(Text) => handleOnChangeEmailText(Text)} err={emailError} />
                <MyTextInput placeholder={'Password'} onchange={(Text) => handleOnChangePasswordText(Text)} issecure={true} err={passwordError} />
                <TouchableOpacity style={styles.forgotbtn} onPress={() => { props.navigation.navigate('Forgot') }}>
                    <Text style={styles.forgotbtntxt}>
                        Forgot Password ?
                    </Text>
                </TouchableOpacity>
                <AppButton Title={'Login'} onPress={LogIn} activity={isLoading} />
                <Text style={styles.ortxt}>
                    Or With
                </Text>
                <View style={[styles.socialvIW, { justifyContent: Platform.OS === 'ios' ? null : 'center' }]}>
                    <SocialButton image={appImages.GOOGLE} onPress={googleOAuth} activity={googleLoading}/>
                    {Platform.OS === 'ios' ?
                    <View style={{marginLeft:responsiveWidth(3)}}>
                        <SocialButton image={appImages.Apple} />
                        </View>
                        :
                        null
                    }
                </View>
                <View style={styles.footerview}>
                    <Text style={styles.footertxt}>
                        New To Evo Love ?
                    </Text>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('SignUp') }} >
                        <Text style={styles.footerTouchabletxt}>
                            Register Here
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}
export default Login