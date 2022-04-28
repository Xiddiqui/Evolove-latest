import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    FlatList
} from 'react-native'
import { Icon } from 'react-native-elements'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { getCurrentUserId } from '../../../../Backend/auth'
import { db } from '../../../../Backend/firebaseConfig'
import { getData } from '../../../../Backend/utility'
import { ListEmpty } from '../../../../components/feed/listEmpty'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import HalfTextInput from '../../../../components/general/halfTxtInput'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/size'
import { styles } from './style'

const Bank = (props) => {
    const [banks, setBanks] = useState([])
    useEffect(() => {
        db.collection('Users').onSnapshot(()=>{
            getBanks()
        })
        getBanks()
    }, [])

    const getBanks = async () => {
        let uid = await getCurrentUserId()
        getData('Users', uid).then((data) => {
            console.log(data.BankDetails)
            setBanks(data.BankDetails)
            console.log('?????',banks)
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Bank Accounts'}
                    Back={() => props.navigation.goBack()}
                />
                {/* {banks.length === 0 ? 
                null
                :
                <View style={styles.addcardview}>
                    <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Added Bank'}</Text>
                    <TouchableOpacity>
                        <Text style={styles.changetxt}>Edit Details</Text>
                    </TouchableOpacity>
                </View>
                
                } */}
                <FlatList
                    data={banks}
                    ListEmptyComponent={<ListEmpty text={'No Bank Found'}/>}
                    renderItem={({item , index}) => {
                        return(
                        <TouchableOpacity style={styles.card} onPress={()=>props.navigation.navigate('EditBank',{data:item , index:index})}>
                            <Text style={styles.cardTxt}>Account Number : {item.AccountNumber}</Text>
                            <Image source={appImages.Bank} style={styles.MasterCard} />
                        </TouchableOpacity>
                        )
                    }}
                />

                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Add New'} onPress={() => { props.navigation.navigate('AddBank') }} />
                </View>
            </View>
        </ImageBackground>
    )
}
export default Bank