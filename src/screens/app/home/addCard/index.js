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
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import HalfTextInput from '../../../../components/general/halfTxtInput'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { styles } from './style'
import MaskInput from 'react-native-mask-input';

const HomeAddCard = (props) => {
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [number, setNumer] = useState('')
    const [numberError, setnumberError] = useState('')
    const [valid, setValid] = useState('')
    const [validError, setValidError] = useState('')
    const [cvv, setCvv] = useState('')
    const [cvvError, setCvvError] = useState('')
    const [check, setCheck] = useState(false)
    const {data} = props.route.params

    console.log(data)

    const SaveBtn = () => {
        setCheck(!check)
    }
    const handleOnChangeNameText = Name => {
        !Name
            ? setNameError('')
            : name.length < 1
                ? setNameError('Min 2 characters')
                : setNameError('');
        setName(Name);
    };
    const handleOnChangeCardNumberText = CardNumber => {
        !CardNumber
            ? setnumberError('')
            : number.length < 1
                ? setnumberError('Min 2 characters')
                : setnumberError('');
                setNumer(CardNumber);
    };
    const handleOnChangeValidThruText = validThru => {
        !validThru
            ? setValidError('')
            : valid.length < 1
                ? setValidError('Min 2 characters')
                : setValidError('');
        setValid(validThru);
    };
    const handleOnChangeCvvText = cvvCode => {
        !cvvCode
            ? setCvvError('')
            : cvv.length < 1
                ? setCvvError('Min 2 characters')
                : setCvvError('');
        setCvv(cvvCode);
    };

    const validation = () => {
        if (name === '') {
            setNameError('Enter name')
            return false
        }
        else if(number === ''){
            setnumberError('Enter Number')
            return false
        }
        else if(cvv === '') {
            setCvv('enter cvv')
            return false
        }
        else {
            return true
        }
    }

    const onPressDone = () => {
        if(validation()){
            props.navigation.navigate('HomePayScreen',{
                name:name,
                number:number,
                valid:valid,
                cvv:cvv,
                data:data
            })

        }
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Add Card'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Name on Card'}</Text>
                <MyTextInput placeholder={'Write name'} onchange={(text) => { handleOnChangeNameText(text) }} err={nameError} />
                <Text style={[styles.toptxt, { color: colors.txtInputborder, marginTop: responsiveHeight(2) }]}>{'Card Number'}</Text>
                <MyTextInput multiline={true} placeholder={'Write card number'} onchange={(text) => { handleOnChangeCardNumberText(text) }} err={numberError} type={'numeric'}/>
                <View style={styles.hlftxtinputstyle}>
                    <View>
                        <Text style={[styles.toptxt, { color: colors.txtInputborder, marginTop: responsiveHeight(2), marginLeft: responsiveWidth(2) }]}>{'Valid Thru'}</Text>
                        <HalfTextInput value={valid} multiline={true} placeholder={'Valid Thru'} onchange={(text) => { handleOnChangeValidThruText(text) }} err={validError} type={'numeric'} mask={[/\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}/>
                    </View>
                    <View>
                        <Text style={[styles.toptxt, { color: colors.txtInputborder, marginTop: responsiveHeight(2), marginLeft: responsiveWidth(2) }]}>{'Cvv'}</Text>
                        <HalfTextInput value={cvv} multiline={true} placeholder={'Cvv'} onchange={(text) => { handleOnChangeCvvText(text) }} err={cvvError} type={'numeric'} mask={[/\d/, /\d/, /\d/, /\d/]}/>
                    </View>
                </View>
                <TouchableOpacity style={styles.Saveview} onPress={SaveBtn}>
                    <Icon name={check ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'} type={'ionicon'} color={colors.whiteText} />
                    <Text style={styles.savetxt}>Save for Later</Text>
                </TouchableOpacity>
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Add Card'} onPress={onPressDone} />
                </View>
            </View>
        </ImageBackground>
    )
}
export default HomeAddCard