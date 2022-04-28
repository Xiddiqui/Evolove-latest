import React from 'react'
import auth from '@react-native-firebase/auth';
import Toast from "react-native-simple-toast"

export const SignUpFunction = async(props) => {
    const {name , email , number , password } = props
    await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (user) => {
            console.log(user)
            let uid = await getCurrentUserId()
            if (user) {
                let dataObj = {
                    FullName: name,
                    Email: email,
                    Contact: number,
                }
                console.log('Registration Done')
                console.log('got UID', uid)
                await _storeData('userId', uid)
                await saveData('Users', uid, dataObj).then(async () => {
                    // this.setState({loading: false});
                    Toast.show('Account Created!')
                    props.navigation.navigate('App')
                })

            }
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                Toast.show('That email address is already in use!')
                setLoader(false)
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                setLoader(false)
            }

            console.error(error);
        })
}