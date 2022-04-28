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
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { getCurrentUserId } from '../../../../Backend/auth'
import { db } from '../../../../Backend/firebaseConfig'
import { addToArray, getData, getDocByKeyValue, removeItemfromArray } from '../../../../Backend/utility'
import { BuynowCourses, BuynowCoursesLarge, MyCoursesLarge } from '../../../../components/feed/coursesCard'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/size'
import { CoursesDataSource } from '../../../../services/app/getcourses'
import { TopCoachesDataSource } from '../../../../services/app/getTopCoaches'
import { styles } from './style'

const PopularCourses = (props) => {
    const [popularCourse, setPopularCourses] = useState([])
    const [Fav, setFav] = useState([])
    const [myFiltercourses , setMyFilterdCourse] = useState([])

    useEffect(() => {
        db.collection('Courses').onSnapshot(() => {
            getCourses()
        })
        getCourses()
    }, [])

    const getCourses = async () => {
        await getDocByKeyValue('Courses', 'Status', 'Active').then(async(data) => {
            setPopularCourses(data)
            let uid = await getCurrentUserId()
            await getData('Users' , uid).then((userdATA)=>{
                setMyFilterdCourse(userdATA.PurchasedCourse)
            })
        })
    }
    const likeFunction = async (myId) => {
        console.log(myId)
        let uid = await getCurrentUserId()
        await getData('Users', uid).then(async (e) => {
            // setFav(e.Favorities)
            if (Fav.includes(myId) === false) {
                console.log('yes')
                await addToArray('Users', uid, 'Favorities', myId)
                let arr = [...Fav]
                arr.push(myId)
                setFav(arr)
                console.log(arr)
                console.log('add', Fav)
            }
            else {
                console.log('no')
                let arr = [...Fav]
                var aa = arr.indexOf(myId)
                console.log('ssss', aa)
                arr.splice(aa, 1)
                setFav([...arr])
                console.log('afterSplice', Fav)
            }
            await removeItemfromArray('Users', uid, 'Favorities', aa)

        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Popular Courses'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>Total Course {popularCourse.length}</Text>
                <FlatList
                    data={popularCourse}
                    ListFooterComponent={<View style={{ marginBottom: responsiveHeight(2) }} />}
                    renderItem={({ item }) => (
                        <View style={styles.FlatListstyle}>
                        {myFiltercourses.includes(item.id)?
                        <MyCoursesLarge image={{ uri: item.CoverImage }} designation={item.CoachName} name={item.Title} onPress={() => { props.navigation.navigate('CourseDetails', { data: item }) }} />
                        :
                            <BuynowCoursesLarge 
                            image={{ uri: item.CoverImage }} 
                            designation={item.CoachName} 
                            name={item.Title} 
                            onBuyNowPress={() => item.PriceType === 'Evolove Subscription' ? props.navigation.navigate('Subscription', { data: item }):props.navigation.navigate('HomeAddCard', { data: item })} 
                            likeOnpress={() => likeFunction(item.id)} heartIconName={Fav.includes(item.id) ? 'heart' : 'heart-outlined'} cardPress={()=>props.navigation.navigate('CourseDetails',{data:item})} price={item.PriceType==='Evolove Subscription'? 'Subscribe' : '$' + ' ' + item.Price} btnTxt={item.PriceType === 'Evolove Subscription' ? 'Subscribe' : 'Buy Now' }/>

                        }
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    )
}
export default PopularCourses