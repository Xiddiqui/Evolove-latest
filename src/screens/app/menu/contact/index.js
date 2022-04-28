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
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/size'
import { styles } from './style'
import { getCurrentUserId } from '../../../../Backend/auth'
import { saveData, saveDataWithoutDocId } from '../../../../Backend/utility'

const Contact = (props) => {
    const [title, setTitle] = useState('')
    const [titleErr, setTitleErr] = useState('')
    const [message, setMessage] = useState('')
    const [messageErr, setMessageErr] = useState('')
    const [loading , setLoading] = useState(false)

    const handleOnChangeTitleText = Title => {
        !Title
            ? setTitleErr('')
            : title.length < 1
                ? setTitleErr('Min 2 characters')
                : setTitleErr('');
        setTitle(Title);
    };
    const handleOnChangeMessageText = Message => {
        !Message
            ? setMessageErr('')
            : message.length < 1
                ? setMessageErr('Min 2 characters')
                : setMessageErr('');
        setMessage(Message);
    };
    const validation = () => {
        if (title === '') {
            setTitleErr('Enter Title')
            return false
        }
        else if (title < 1) {
            setTitleErr('Min 2 character')
            return false
        }
        else if (message === '') {
            setMessageErr('Enter Message')
            return false
        }
        else if (message < 1) {
            setMessageErr('min 2 character')
        }
        else {
            return true
        }
    }

    const onPressSubmit = async () => {
        if (validation()) {
            setLoading(true)
            let uid = await getCurrentUserId()
            let obj = {
                Title: title,
                Message: message,
                UserId:uid,
            }
            await saveDataWithoutDocId('Contact' , obj).then((data)=>{
                saveData('Contact',data._documentPath._parts[1],{
                   id: data._documentPath._parts[1]
                }).then(()=>{
                    setLoading(false)
                    props.navigation.navigate('Home')
                })
            })
        }
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Contact'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>{'Contact with admin'}</Text>
                <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Title'}</Text>
                <MyTextInput placeholder={'Write Title'} onchange={(txt) => { handleOnChangeTitleText(txt) }} err={titleErr} />
                <Text style={[styles.toptxt, { color: colors.txtInputborder, marginTop: responsiveHeight(2) }]}>{'Messages'}</Text>
                <MyTextInput multiline={true} placeholder={'Write a Message'} onchange={(txt) => { handleOnChangeMessageText(txt) }} err={messageErr} />
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Send'} onPress={onPressSubmit} activity={loading}/>
                </View>
            </View>
        </ImageBackground>
    )
}
export default Contact