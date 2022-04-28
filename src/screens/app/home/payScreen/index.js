import moment from 'moment'
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
import { getData, saveData, saveDataWithoutDocId } from '../../../../Backend/utility'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import HalfTextInput from '../../../../components/general/halfTxtInput'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { styles } from './style'

const HomePayScreen = (props) => {
    const { name, number, valid, cvv, data } = props.route.params
    const [Subscribe, setSubscribed] = useState([])
    const [loading, setLoading] = useState(false)
    console.log('???', data)

    const addCardNumber = async () => {
        setLoading(true)
        let uid = await getCurrentUserId()
        await getData('Users' , uid).then((u)=>{
            let Coursearr = [...u.PurchasedCourse]
            let Blogarr = [...u.PurchasedBlogs]
            let Producarr = [...u.PurchasedProducts]
            {
                if (data.Type === 'Product') {
                    Producarr.push({id:data.id})
                    saveData('Users', uid, {
                        PurchasedProducts: Producarr
                    }).then(() => {
                        saveDataWithoutDocId('Notifications', {
                            Date: moment(Date.now()).format('L'),
                            NotificationText: 'Successfuly Purchased a Product',
                            userId: uid
                        }).then(() => {
                            getData('Users', data.CoachId).then((k) => {
                                let ProductEarning = k.SoldEbooks + data.Price
                                let TotalEarnings = k.TotalEarnings + data.Price
                                saveData('Users', data.CoachId, {
                                    SoldEbooks: parseInt(ProductEarning),
                                    TotalEarnings:parseInt(TotalEarnings)
                                }).then(() => {
                                    setLoading(false)
                                    props.navigation.navigate('PaymentDone')
                                })
                            })
    
                        })
    
                    })
                }
                else if (data.Type === 'Course') {
                    console.log('????',Coursearr)
                    Coursearr.push(data.id)
                    saveData('Users', uid, {
                        PurchasedCourse: Coursearr
                    }).then(() => {
                        saveDataWithoutDocId('Notifications', {
                            Date: moment(Date.now()).format('L'),
                            NotificationText: 'Successfuly Purchased a Course',
                            userId: uid
                        }).then(() => {
                            getData('Users', data.CoachId).then((j) => {
                                let CourseEarning = j.SoldCourses + data.Price
                                let TotalEarning = j.TotalEarnings + data.Price
                                saveData('Users', data.CoachId, {
                                    SoldCourses: parseInt(CourseEarning),
                                    TotalEarnings:parseInt(TotalEarning)
                                }).then(() => {
                                    setLoading(false)
                                    props.navigation.navigate('PaymentDone')
                                })
                            })
                        })
    
                    })
                }
                else if (data.Type === 'Blog') {
                    Blogarr.push({id:data.id})
                    saveData('Users', uid, {
                        PurchasedBlogs: Blogarr
                    }).then(() => {
                        saveDataWithoutDocId('Notifications', {
                            Date: moment(Date.now()).format('L'),
                            NotificationText: 'Successfuly Purchased a Blog',
                            userId: uid
                        }).then(() => {
                            getData('Users', data.CoachId).then((i) => {
                                let earning = i.SoldEbooks + data.Price
                                let TotalEarnings = i.TotalEarnings + data.Price
                                saveData('Users', data.CoachId, {
                                    SoldArticles: parseInt(earning),
                                    TotalEarnings:parseInt(TotalEarnings)
                                }).then(() => {
                                    setLoading(false)
                                    props.navigation.navigate('PaymentDone')
                                })
                            })
    
    
                        })
    
                    })
                }
            }

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
                    <Image source={appImages.MasterCard} style={styles.MasterCard} />
                </View>
                <View style={styles.addcardview}>
                    <Text style={styles.toptxt}>{'Price'}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTxt}>{data.Price}</Text>
                </View>
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Pay Now'} onPress={addCardNumber} activity={loading} />
                </View>
            </View>
        </ImageBackground>
    )
}
export default HomePayScreen