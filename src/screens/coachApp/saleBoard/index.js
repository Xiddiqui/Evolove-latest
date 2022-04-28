import React, { useState , useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { getCurrentUserId } from '../../../Backend/auth'
import { db } from '../../../Backend/firebaseConfig'
import { getData } from '../../../Backend/utility'
import { AppButton, AppButtonLarge, SocialButton } from '../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../components/general/header'
import MyTextInput from '../../../components/general/txtInput'
import { appImages } from '../../../globals/utilities/assets'
import { colors } from '../../../globals/utilities/colors'
import { fontSize } from '../../../globals/utilities/size'
import { styles } from './style'

const saleBoard = (props) => {
    useEffect(()=>{
        db.collection('Users').onSnapshot(()=>{
            getSalesInfo()
        })
        getSalesInfo()
    },[])

    const [CourseEarning , setCourseEarning] = useState(0)
    const [SoldCourses , setSoldCourses] = useState(0)
    const [EbooksEarnings , setEbooksEarnings] = useState(0)
    const [SoldEbooks , setSoldEbooks] = useState(0)
    const [SoldArticles , setSoldArticles] = useState(0)
    const [ArticlesEarnings , setArticlesEarnings] = useState(0)

    const getSalesInfo = async () => {
        let uid = await getCurrentUserId()
        getData('Users' , uid).then((data)=>{
            console.log(data)
            setCourseEarning(data.CourseEarning)
            setSoldCourses(data.SoldCourses)
            setEbooksEarnings(data.EbooksEarnings)
            setSoldEbooks(data.SoldEbooks)
            setSoldArticles(data.SoldArticles)
            setArticlesEarnings(data.ArticlesEarnings)
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Sales Board'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>{'Your Total Sales'}</Text>
                <View style={styles.cardview}>
                    <View>
                        <Text style={styles.heading}>Course</Text>
                        <View style={styles.card}>
                            <Text style={styles.cardtxt}>{SoldCourses}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.heading}>Earnings</Text>
                        <View style={styles.card}>
                            <Text style={styles.cardtxt}>${CourseEarning}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cardview}>
                    <View>
                        <Text style={styles.heading}>Ebooks</Text>
                        <View style={styles.card}>
                            <Text style={styles.cardtxt}>{EbooksEarnings}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.heading}>Earnings</Text>
                        <View style={styles.card}>
                            <Text style={styles.cardtxt}>${SoldEbooks}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cardview}>
                    <View>
                        <Text style={styles.heading}>Articles</Text>
                        <View style={styles.card}>
                            <Text style={styles.cardtxt}>{SoldArticles}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.heading}>Earnings</Text>
                        <View style={styles.card}>
                            <Text style={styles.cardtxt}>${ArticlesEarnings}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}
export default saleBoard