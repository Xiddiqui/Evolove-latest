import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    FlatList,
    Share
} from 'react-native'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { getCurrentUserId } from '../../../../../Backend/auth'
import { db } from '../../../../../Backend/firebaseConfig'
import { getData, removeItemfromArray } from '../../../../../Backend/utility'
import { PurchasedCoursed } from '../../../../../components/feed/coursesCard'
import { ListEmpty } from '../../../../../components/feed/listEmpty'
import { ShopScreenCard } from '../../../../../components/feed/shopscreencard'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../../components/general/header'
import MyTextInput from '../../../../../components/general/txtInput'
import { appImages } from '../../../../../globals/utilities/assets'
import { colors } from '../../../../../globals/utilities/colors'
import { fontSize } from '../../../../../globals/utilities/fonts'
import { CoursesDataSource } from '../../../../../services/app/getcourses'
import { styles } from './style'

const Fav = (props) => {

    const [courseData, setCourseData] = useState([])
    const [producsData, setProductsData] = useState([])
    const [loading, setLoading] = useState(false)
    const [Fav, setFav] = useState([])

    useEffect(() => {
        db.collection('Users').onSnapshot(() => {
            getFav()
            getUserFav()
            getUserFavProducts()
        })
        getUserFav()
        getUserFavProducts()
        getFav()
    }, [])
    const getUserFav = async () => {
        setLoading(true)
        let uid = await getCurrentUserId()
        getData('Users', uid).then((data) => {
            console.log(data.Favorities)
            let arr = [...data.Favorities]
            if (arr.length === 0) {
                setLoading(false)
            }
            else {
                let array = [...courseData]
                arr && arr.map((item) => {
                    getData('Courses', item).then((e) => {
                        console.log('data', e)
                        array.push(e)
                        setCourseData(array)
                        setLoading(false)

                        // setCourseData(e)
                    })

                })
            }
        })
    }
    const getUserFavProducts = async () => {
        setLoading(true)
        let uid = await getCurrentUserId()
        getData('Users', uid).then((data) => {
            console.log(data.FavoriteProduct)
            let arr = [...data.FavoriteProduct]
            if (arr.length === 0) {
                setLoading(false)
            }
            else {
                let array = [...producsData]
                arr && arr.map((item) => {
                    getData('Product', item).then((e) => {
                        console.log('data', e)
                        array.push(e)
                        setProductsData(array)
                        setLoading(false)

                        // setCourseData(e)
                    })

                })
            }
        })
    }
    const getFav = async () => {
        let uid = await getCurrentUserId()
        await getData('Users', uid).then((data) => {
            setFav(data.Favorities)
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
                setCourseData(arr)
            }
            await removeItemfromArray('Users', uid, 'Favorities', aa)

        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Favorites'}
                    Back={() => props.navigation.goBack()}
                />
                {
                    loading ?
                        <ActivityIndicator size={'large'} color={colors.button} /> :
                        <ScrollView>
                            <View>
                                <FlatList data={courseData}
                                    ListEmptyComponent={<ListEmpty text={'No Course'} />}
                                    numColumns={2}
                                    ListHeaderComponent={<View>
                                        {courseData.length === 0 ?
                                            null :
                                            <Text style={styles.toptxt}>Total courses {courseData.length}</Text>
                                        }
                                    </View>}
                                    renderItem={({ item }) => (
                                        <View style={styles.FlatListStyle}>
                                            <PurchasedCoursed image={{ uri: item.CoverImage }} designation={item.CoachName} name={item.Title}
                                                likeOnPress={() => likeFunction(item.id)}
                                                heartIconName={Fav.includes(item.id) ? 'heart' : 'heart-outlined'}
                                                continueBtnPress={() => { props.navigation.navigate('CourseDetails', { data: item }) }}
                                            />
                                        </View>
                                    )}
                                />
                            </View>
                            <View>
                                <FlatList data={producsData}
                                    numColumns={2}
                                    ListHeaderComponent={<View>
                                        {producsData.length === 0 ?
                                            null :
                                            <Text style={styles.toptxt}>Total products {producsData.length}</Text>

                                        }
                                    </View>}
                                    ListEmptyComponent={<ListEmpty text={'No Product'} />}
                                    renderItem={({ item }) => (
                                        <View style={styles.FlatListStyle}>
                                            <ShopScreenCard image={{ uri: item.Image }} name={item.Title} type={item.Category} price={item.Price} onPress={() => { props.navigation.navigate('ShopDetails', { data: item, purchased: 'no' }) }} />
                                        </View>
                                    )}
                                />
                            </View>
                        </ScrollView>
                }

            </View>
        </ImageBackground>
    )
}
export default Fav