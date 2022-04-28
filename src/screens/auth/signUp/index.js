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
import { SignUpFunction } from '../../../services/auth'
import { styles } from './styles'
import auth from '@react-native-firebase/auth';
import { getDocByKeyValue, saveData, saveDataWithoutDocId } from '../../../Backend/utility'
import { _storeData } from '../../../Backend/AsyncFuncs'
import { getCurrentUserId } from '../../../Backend/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import jwt_decode from "jwt-decode";
import Toast from 'react-native-simple-toast';
import moment from 'moment'
import { Platform } from 'react-native'

const SignUp = (props) => {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [number, setNumber] = useState('')
    const [numberError, setNumberError] = useState('')
    const [loader, setLoader] = useState(false)
    const [googleLoading , setgoogleLoading] = useState(false)

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
    const handleOnChangeNameText = Name => {
        !Name
            ? setNameError('')
            : name.length < 1
                ? setNameError('Min 2 characters')
                : setNameError('');
        setName(Name);
    };
    const handleOnChangeNumberText = Number => {
        !Number
            ? setNumberError('')
            : number.length < 10
                ? setNumberError('Min 11 characters')
                : setNumberError('');
        setNumber(Number);
    };
    const validations = () => {
        const re = EmailRegix
        if (name === '') {
            setNameError('Enter Name');
            return false;
        }
        else if (name.length < 1) {
            setEmailError('Min 2 characters')
        }
        else if (email === '') {
            setEmailError('Please Enter Email')
            return false
        }
        else if (!re.test(email)) {
            setEmailError('Email format is invalid')
            return false;
        }
        else if (number === '') {
            setNumberError('Please Enter Number')
            return false;
        }
        else if (number.length < 10) {
            setNumberError('Min 11 characters')
            return false;
        }
        else if (password === '') {
            setPasswordError('Please Enter Password')
            return false;
        }
        else if (password.length < 7) {
            setPasswordError('Min 8 characters')
            return false;
        }
        else {
            return true
        }
    }
    const SignUp = async () => {
        if (validations()) {
            setLoader(true)
            await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async (user) => {
                    console.log(user)
                    let uid = await getCurrentUserId()
                    if (user) {
                        let dataObj = {
                            FullName: name,
                            Email: email,
                            About:'',
                            Contact: number,
                            Coach: false,
                            ProfileImage: "",
                            PurchasedCourse: [],
                            PurchasedBlogs: [],
                            PurchasedProducts: [],
                            Favorities: [],
                            id: uid,
                            FavoriteProduct: [],
                            WalletRecentActivity: [],
                            FavoriteTickets: [],
                            SubscribedCoach: [],
                            BankDetails:[]
                        }
                        await _storeData('userId', uid)
                        await saveData('Users', uid, dataObj).then(async () => {
                            await saveDataWithoutDocId('Notifications', {
                                Date: moment(Date.now()).format('L'),
                                NotificationText: 'Welcome to Evolove',
                                userId: uid
                            })
                            Toast.show('Account Created!')
                            props.navigation.navigate('App')
                        })

                    }
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Toast.show('That email address is already in use!')
                        setLoader(false)
                    }

                    if (error.code === 'auth/invalid-email') {
                        Toast.show('That email address is invalid!');
                        setLoader(false)
                    }

                    console.error(error);
                })
        }
    }
    GoogleSignin.configure({
        webClientId: '989895439172-fep6d60suqq59j5ojri8dbh5urk517dp.apps.googleusercontent.com',
    });
    const GoogleOAuthSignUp = async () => {
        setgoogleLoading(true)
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        console.log('??googleCredential', googleCredential)
        var token = googleCredential.token;
        var decoded = jwt_decode(token);
        console.log('@@!!!', decoded)
        await auth().signInWithCredential(googleCredential).then(async () => {
            let uid = await getCurrentUserId()
            await getDocByKeyValue('Users' , 'id' , uid ).then(async(data)=>{
                if(data.length === 0){
                    let obj = {
                        FullName: decoded.name,
                        Email: decoded.email,
                        About:'',
                        Contact: '',
                        Coach: false,
                        ProfileImage: decoded.picture,
                        PurchasedCourse: [],
                        PurchasedBlogs: [],
                        PurchasedProducts: [],
                        Favorities: [],
                        id: uid,
                        FavoriteProduct: [],
                        WalletRecentActivity: [],
                        FavoriteTickets: [],
                        SubscribedCoach: [],
                        BankDetails:[],
                    }
                    await saveData('Users', uid, obj).then(async () => {
                        Toast.show('Account Created!')
                        await _storeData('userId', uid)
                        props.navigation.navigate('App')
                        setgoogleLoading(false)
                    })

                }else{
                    setgoogleLoading(false)
                    Toast.show('Already Registered')
                }
            })
        })

//     }else {
//         console.log('Users Already registered')
// }
//         })
    }
return (
    <ImageBackground style={styles.container} source={appImages.backGround}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
            <AuthHeader text={'Login'}
                name={'chevron-left'} type={'feather'}
                onPress={() => { props.navigation.navigate('Login') }}
                Back={() => props.navigation.goBack()}
            />
            <Text style={styles.heading}>{'Signup'}</Text>
            <MyTextInput placeholder={'Full Name'} onchange={(Text) => handleOnChangeNameText(Text)} err={nameError} />
            <MyTextInput placeholder={'Email ID'} onchange={(Text) => handleOnChangeEmailText(Text)} err={emailError} />
            <MyTextInput placeholder={'Phone Number'} onchange={(Text) => handleOnChangeNumberText(Text)} err={numberError} type={'numeric'} />
            <MyTextInput placeholder={'Password'} onchange={(Text) => handleOnChangePasswordText(Text)} issecure={true} err={passwordError} />
            <AppButton Title={'Signup'} onPress={SignUp} activity={loader} />
            <Text style={styles.ortxt}>
                Or With
            </Text>
            <View style={[styles.socialvIW, { justifyContent: Platform.OS === 'ios' ? null : 'center' }]}>
                <SocialButton image={appImages.GOOGLE} onPress={GoogleOAuthSignUp} activity={googleLoading}/>
                {Platform.OS === 'ios' ?
                    <SocialButton image={appImages.Apple} />
                    :
                    null
                }
            </View>
            <View style={styles.footerview}>
                <Text style={styles.footertxt}>
                    By Clicking Register or continue With You Agree To Evo Love
                    <TouchableOpacity>
                        <Text style={styles.footerTouchabletxt}>
                            Terms Of User And Privacy Policy
                        </Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </View>
    </ImageBackground>
)
}
export default SignUp