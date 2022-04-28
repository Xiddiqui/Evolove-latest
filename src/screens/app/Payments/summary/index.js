import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native'
import { Icon } from 'react-native-elements'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { getCurrentUserId } from '../../../../Backend/auth'
import { saveData } from '../../../../Backend/utility'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import HalfTextInput from '../../../../components/general/halfTxtInput'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/size'
import { styles } from './style'

const Summary = (props) => {
    const { plane , CoachId, name,number,valid,cvv} = props.route.params
    const [Subscribe , setSubscribed] = useState([])
    const [loading , setLoading] = useState(false)

    const addCardNumber = async () => {
        setLoading(true)
        let uid = await getCurrentUserId()
        let arr = [...Subscribe]
        let obj = {
            plane:plane,
            CoachId:CoachId,
            name:name,
            number:number,
            valid:valid,
            cvv:cvv
        }
        arr.push(obj)
        console.log(arr)
        setSubscribed(arr)
        saveData('Users' , uid ,{
            SubscribedCoach : arr
        }).then(()=>{
        setLoading(false)
            props.navigation.navigate('PaymentDone')
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Summary'}
                    Back={() => props.navigation.goBack()}
                />
                <View style={styles.addcardview}>
                <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Added Card'}</Text>
                <TouchableOpacity>
                    <Text style={styles.changetxt}>Change/Add New</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTxt}>Card Number : {number}</Text>
                    <Image source={appImages.MasterCard} style={styles.MasterCard}/>
                </View>
                <View style={styles.addcardview}>
                <Text style={styles.toptxt}>{'Subscription Plan'}</Text>
                </View>        
                <View style={styles.card}>
                    <Text style={styles.cardTxt}>{plane}</Text>
                </View>
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Pay Now'} onPress={addCardNumber} activity={loading}/>
                </View>
            </View>
        </ImageBackground>
    )
}
export default Summary