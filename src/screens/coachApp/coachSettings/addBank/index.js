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
import { getData, saveData } from '../../../../Backend/utility'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import HalfTextInput from '../../../../components/general/halfTxtInput'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/size'
import { styles } from './style'

const AddBank = (props) => {
    const [bankName, setBankName] = useState('')
    const [bankNameError, setBankNameError] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [accountNumberError, setAccountNumberError] = useState('')
    const [branchCode, setBranchCode] = useState('')
    const [branchCodeError, setBranchCodeError] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [zipCodeError, setZipCodeError] = useState('')
    const [check, setCheck] = useState(false)
    const [bankDetails , setBankDetails] = useState([])
    const [loading , setloading]= useState(false)

    const SaveBtn = () => {
        setCheck(!check)
    }

    const handleOnChangeNameText = Name => {
        !Name
            ? setBankNameError('')
            : bankName.length < 1
                ? setBankNameError('Min 2 characters')
                : setBankNameError('');
        setBankName(Name);
    };
    const handleOnChangeAccountNumberText = AcNumber => {
        !AcNumber
            ? setAccountNumberError('')
            : accountNumber.length < 1
                ? setAccountNumberError('Min 2 characters')
                : setAccountNumberError('');
        setAccountNumber(AcNumber);
    };
    const handleOnChangeBranchCodeText = Branchcode => {
        !Branchcode
            ? setBranchCodeError('')
            : branchCode.length < 1
                ? setBranchCodeError('Min 2 characters')
                : setBranchCodeError('');
        setBranchCode(Branchcode);
    };
    const handleOnChangeZipCodeText = ZipCode => {
        !ZipCode
            ? setZipCodeError('')
            : zipCode.length < 1
                ? setZipCodeError('Min 2 characters')
                : setZipCodeError('');
        setZipCode(ZipCode);
    };

    const Validations = () => {
        if(bankName === '') {
            setBankNameError('Enter bank Name')
            return false;
        }
        else if(bankName.length < 1){
            setBankNameError('Bank Name must be greater than 2 character')
            return false;
        }
        else if(accountNumber === ''){
            setAccountNumberError('Enter Account Number')
            return false;
        }
        else if(accountNumber.length < 1){
            setAccountNumberError('Min 2 characters')
            return false;
        }
        else if(branchCode === ''){
            setBranchCodeError('Enter branch code')
            return false
        }
        else if(branchCode.length < 1){
            setBranchCodeError('Min 2 characters')
            return false
        }
        else if(zipCode === ''){
            setBranchCodeError('Enter zip code')
            return false
        }
        else if(zipCode.length < 1){
            setBranchCodeError('Min 2 characters')
            return false
        }
        else{
            return true
        }
    }

    const AddBank = async() => {
        if(Validations()){
            setloading(true)
            let obj = {
                BankName:bankName,
                AccountNumber:accountNumber,
                Branchcode:branchCode,
                zipCode:zipCode,
                saveForLater:check
            }
           let uid = await getCurrentUserId()
           getData('Users' , uid ).then((data)=>{
               let arr = [...data.BankDetails]
               arr.push(obj)
               saveData('Users' , uid , {
                BankDetails:arr
               }).then(()=>{
                   console.log('done')
                   setloading(false)
                   props.navigation.navigate('Bank')
               })
           }) 
        }
    }

    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Add Bank'}
                    Back={() => props.navigation.goBack()}
                />
                <ScrollView>
                <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Bank Name'}</Text>
                <MyTextInput placeholder={'Write name'} onchange={(text) => { handleOnChangeNameText(text) }} err={bankNameError} />
                <Text style={[styles.toptxt, { color: colors.txtInputborder, marginTop: responsiveHeight(2) }]}>{'Account Number'}</Text>
                <MyTextInput multiline={true} placeholder={'Write account number'} onchange={(text) => { handleOnChangeAccountNumberText(text) }} err={accountNumberError} type={'numeric'}/>
                <Text style={[styles.toptxt, { color: colors.txtInputborder, marginTop: responsiveHeight(2) }]}>{'Branch Code'}</Text>
                <MyTextInput multiline={true} placeholder={'Write Branch Code'} onchange={(text) => { handleOnChangeBranchCodeText(text) }} err={branchCodeError} />
                <Text style={[styles.toptxt, { color: colors.txtInputborder, marginTop: responsiveHeight(2) }]}>{'Zip Code'}</Text>
                <MyTextInput multiline={true} placeholder={'Write zip code'} onchange={(text) => { handleOnChangeZipCodeText(text) }} err={zipCodeError} type={'numeric'}/>
                <TouchableOpacity style={styles.Saveview} onPress={SaveBtn}>
                    <Icon name={check ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'} type={'ionicon'} color={colors.whiteText} />
                    <Text style={styles.savetxt}>Save for Later Payouts</Text>
                </TouchableOpacity>
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Add Bank'} onPress={AddBank} activity={loading}/>
                </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}
export default AddBank