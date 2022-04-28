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
import { getCurrentUserId } from '../../../../../Backend/auth'
import { getData, saveData } from '../../../../../Backend/utility'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../../components/general/header'
import MyTextInput from '../../../../../components/general/txtInput'
import { appImages } from '../../../../../globals/utilities/assets'
import { colors } from '../../../../../globals/utilities/colors'
import { fontSize } from '../../../../../globals/utilities/size'
import { styles } from './style'
import Toast from 'react-native-simple-toast';

const Withdraw = (props) => {
    const { TotalAmount } = props.route.params
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState(0)
    const [amountErr , setAmountErr] = useState('')

    const onPressDoneBtn = async () => {
        if(amount === 0){
            setAmountErr('Please enter amount')
        }
        else{
            if (amount < TotalAmount) {
                setLoading(true)
                let uid = await getCurrentUserId()
                getData('Users', uid).then(async(data) => {
                    await saveData('Users' , uid , {
                        TotalEarnings : TotalAmount - amount
                    })
                    let arr = [...data.WalletRecentActivity]
                    arr.push({
                        name:`You have withdrawn ${amount} $`,
                        time:Date.now()
                    })
                    saveData('Users' , uid , {
                        WalletRecentActivity:arr
                    })
                    props.navigation.navigate('Wallet')
                })
            }
            else{
                Toast.show('Amount Should be less than total earning')
            }

        }

    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Withdraw'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>{'How much you want to withdraw'}</Text>
                <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Amount'}</Text>
                <MyTextInput placeholder={'$ 59.00'} type={'numeric'} onchange={(text) => { setAmount(parseInt(text)) }} err={amountErr}/>
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Continue'} onPress={onPressDoneBtn} activity={loading}/>
                </View>
            </View>
        </ImageBackground>
    )
}
export default Withdraw