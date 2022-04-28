import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    Alert,
    BackHandler
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../globals/utilities/assets'
import { AppHeader, AppHeaderwithBack, AppLogoHeader, AppLogoHeaderwithBack } from '../../../components/general/header'
import { ListButton, SearchBtn } from '../../../components/general/button'
import { DataSource } from '../../../services/app/getBlogCat'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import SearchInput from '../../../components/general/searchInput'
import { BlogPosts } from '../../../components/feed/blogPostscard'
import { BlogsDataSource } from '../../../services/app/getblogPosts'
import { ShopScreenCard } from '../../../components/feed/shopscreencard'
import { RecentDataSource } from '../../../services/app/getShopData'
import { CoursesDataSource } from '../../../services/app/getcourses'
import { BuynowCourses, PurchasedCoursed, BuynowCoursesLarge, SubscribeCoursesLarge, MyCourses, MyCoursesLarge } from '../../../components/feed/coursesCard'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { fontSize } from '../../../globals/utilities/size'
import { colors } from '../../../globals/utilities/colors'
import { TopCoachesDataSource } from '../../../services/app/getTopCoaches'
import { fontFamily } from '../../../globals/utilities/fonts'
import Video from 'react-native-video';
import { getCurrentUserId } from '../../../Backend/auth'
import { addToArray, getData, getDocByKeyValue, removeItemfromArray } from '../../../Backend/utility'
import { db } from '../../../Backend/firebaseConfig'
import { ActivityIndicator } from 'react-native'

const Home = (props) => {
    const video = useRef();

    const [buttonDataSource, setButtonData] = useState(DataSource)
    const [categoryButton, setCategoryButton] = useState('')
    const [currentTab, setCurrentTab] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [topCoaches, settopCoaches] = useState([])
    const [popularCourses, setPopularCourses] = useState([])
    const [phychology, setphychology] = useState([])
    const [Sprirituality, setSprirituality] = useState([])
    const [Education, setEducation] = useState([])
    const [Awareness, setAwareness] = useState([])
    const [Music, setMusic] = useState([])
    const [loading, setLoading] = useState(false)
    const [Fav, setFav] = useState([])
    const [myFilterCourses, setMyFilterCourse] = useState([])
    const [mysubscribeCourses , setMySuscribedCourses] = useState([])

    const backFunction = () => {
        setCurrentTab('')
        buttonDataSource && buttonDataSource.map((item) => {
            item.flag = false
        })
    }

    useEffect(() => {
        db.collection('Users').onSnapshot(() => {
            getCoaches()
            getFav()
        })
        db.collection('Courses').onSnapshot(() => {
            getCourses()
        })
        db.collection('Users').onSnapshot(() => {
            getCourses()
        })
        getCoaches()
        getCourses()
        getFav()
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [])

    const getFav = async () => {
        let uid = await getCurrentUserId()
        await getData('Users', uid).then((data) => {
            setFav(data.Favorities)
        })
    }
    const backAction = () => {
        Alert.alert("Exit App!", "Do you want to exit?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;

    };
    const getCoaches = async () => {
        setLoading(true)
        await getDocByKeyValue('Users', 'Coach', true).then((data) => {
            // console.log('fff', data)
            settopCoaches(data)
        })
        setLoading(false)

    }
    const getCourses = async () => {
        setLoading(true)
        await getDocByKeyValue('Courses', 'Status', 'Active').then(async (data) => {
            console.log(data)
            let uid = await getCurrentUserId()
            getData('Users', uid).then((userdATA) => {
                console.log('///',userdATA.PurchasedCourse)
                // setMyFilterCourse(userdATA.PurchasedCourse)
                let arr = [...userdATA.PurchasedCourse]
                    setMyFilterCourse(arr)
                let arr1 = [...userdATA.SubscribedCoach]
                arr1.map((e)=>{
                    getDocByKeyValue('Courses','CoachId',e.CoachId).then((a)=>{
                        console.log('????/////',a)
                        let subscribeUser = a.filter((t)=>t.PriceType === 'Evolove Subscription')
                        console.log('LLL>>>>>>>',subscribeUser)
                            let subscribeCouseid = [...userdATA.PurchasedCourse]
                            console.log('subscribed',subscribeCouseid)
                        subscribeUser && subscribeUser.map((l)=>{
                            subscribeCouseid.push(l.id)
                        })
                        console.log('??',subscribeCouseid)
                        setMyFilterCourse(subscribeCouseid)
                    })

                })
                // arr && arr.map((item)=>{
                //   let filterdCourses = data.filter((element)=> element.id === item.id)
                //   console.log('filterdCourses',filterdCourses)
                //   setMyFilterCourse(filterdCourses)
                // })
                setPopularCourses(data)
                let phychoarr = [...data]
                let PArray = phychoarr.filter((data) => data.Category === 'Psychology')
                setphychology(PArray)
                let sprituality = [...data]
                let spritualityArr = sprituality.filter((data) => data.Category === 'Sprirituality')
                setSprirituality(spritualityArr)
                let Education = [...data]
                let EducationArr = Education.filter((data) => data.Category === 'Education')
                setEducation(EducationArr)
                let Awareness = [...data]
                let AwarenessArr = Awareness.filter((data) => data.Category === 'Awareness')
                setAwareness(AwarenessArr)
                let Music = [...data]
                let MusicArr = Music.filter((data) => data.Category === 'Music')
                setMusic(MusicArr)
                // data && data.map((i) => {
                //     if (i.PriceType === 'Fixed Price') {
                //         console.log('>>>>', userdATA.PurchasedCourse)
                //         let maindata = [...data]
                //         let purchasedarr = [...userdATA.PurchasedCourse]
                //         // let subscribedArr = [...userdATA.SubscribedCoach]
                //         if (purchasedarr.length === 0) {
                //             setPopularCourses(data)
                //         } else {
                //             purchasedarr && purchasedarr.map((element) => {
                //                 let filteredArr = maindata.filter(function (item) {
                //                     item.id != element.id


                //                 })
                //                 console.log('filtered', filteredArr)
                //                 setPopularCourses(filteredArr)

                //             })
                //         }
                //     }
                //     else {
                //         let maindata = [...data]
                //         let subscribedArr = [...userdATA.SubscribedCoach]
                //         if (subscribedArr.length === 0) {
                //             setPopularCourses(data)
                //             let phychoarr = [...data]
                //             let PArray = phychoarr.filter((data) => data.Category === 'Psychology')
                //             setphychology(PArray)
                //             let sprituality = [...data]
                //             let spritualityArr = sprituality.filter((data) => data.Category === 'Sprirituality')
                //             setSprirituality(spritualityArr)
                //             let Education = [...data]
                //             let EducationArr = Education.filter((data) => data.Category === 'Education')
                //             setEducation(EducationArr)
                //             let Awareness = [...data]
                //             let AwarenessArr = Awareness.filter((data) => data.Category === 'Awareness')
                //             setAwareness(AwarenessArr)
                //             let Music = [...data]
                //             let MusicArr = Music.filter((data) => data.Category === 'Music')
                //             setMusic(MusicArr)
                //         } else {
                //             subscribedArr && subscribedArr.map((z) => {
                //                 getDocByKeyValue('Users', 'id', i.CoachId).then((a) => {
                //                     let fitlterddd = a.filter((n) => n.id !== z.CoachId)
                //                     setPopularCourses(fitlterddd)
                //                     let phychoarr = [...fitlterddd]
                //                     let PArray = phychoarr.filter((data) => data.Category === 'Psychology')
                //                     setphychology(PArray)
                //                     let sprituality = [...fitlterddd]
                //                     let spritualityArr = sprituality.filter((data) => data.Category === 'Sprirituality')
                //                     setSprirituality(spritualityArr)
                //                     let Education = [...fitlterddd]
                //                     let EducationArr = Education.filter((data) => data.Category === 'Education')
                //                     setEducation(EducationArr)
                //                     let Awareness = [...fitlterddd]
                //                     let AwarenessArr = Awareness.filter((data) => data.Category === 'Awareness')
                //                     setAwareness(AwarenessArr)
                //                     let Music = [...fitlterddd]
                //                     let MusicArr = Music.filter((data) => data.Category === 'Music')
                //                     setMusic(MusicArr)
                //                 })

                //             })

                //         }

                //     }
            })


        })


        // setPopularCourses(data)


        // let uid = await getCurrentUserId()
        // await getData('Users' , uid).then((data1)=>{
        //   let abc = data1.f
        // })
        // })
        setLoading(false)
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
                {currentTab === '' ?
                    <AppLogoHeader text={'Home'} name={'notifications-none'}
                        type={'material'} onPress={() => { props.navigation.navigate('Notification') }} /> :
                    <AppLogoHeaderwithBack text={'Home'} name={'notifications-none'}
                        type={'material'} onPress={() => { props.navigation.navigate('Notification') }} Back={backFunction} />
                }
                <View>
                    <FlatList
                        data={buttonDataSource}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ListFooterComponent={<View style={{ marginRight: responsiveWidth(4) }} />}
                        renderItem={({ item, index }) => (
                            <View style={{ marginLeft: responsiveWidth(4) }}>
                                <ListButton Title={item.name}
                                    backgroundColor={item.flag ? colors.button : colors.iconBackGround}
                                    onPress={() => {
                                        let array = [...buttonDataSource]
                                        array.forEach(element => {
                                            element.flag = false
                                        });
                                        array[index].flag = true
                                        setCategoryButton(array[index])
                                        setCurrentTab(item.name)
                                        setButtonData(array)
                                    }} />
                            </View>
                        )}
                    />
                </View>
                <SearchBtn onPress={() => { props.navigation.navigate('Search') }} />
                {/* {loading ?
                    <ActivityIndicator size={'large'} color={colors.button} /> :
                    <View> */}
                {currentTab === '' ? (
                    <ScrollView>
                        <ImageBackground source={appImages.banner} style={styles.banner} imageStyle={{ borderRadius: responsiveWidth(5) }}>
                            <Text style={styles.bannertxt}>
                                {'Get you mental health solution with evolove'}
                            </Text>
                            <TouchableOpacity style={styles.learnmoreView} onPress={() => { setModalVisible(true) }}>
                                <View style={styles.whitecircle}>
                                    <Icon name={'play'} type={'font-awesome-5'} size={fontSize.small} />
                                </View>
                                <Text style={styles.learnmoretxt}>
                                    Learn more
                                </Text>
                            </TouchableOpacity>
                        </ImageBackground>
                        {popularCourses.length === 0 ?
                            null
                            :
                            <View style={styles.seeallTab}>
                                <Text style={styles.seeallTabheadingtxt}>
                                    {'Popular Courses'}
                                </Text>
                                <TouchableOpacity onPress={() => { props.navigation.navigate('PopularCourses') }}>

                                    <Text style={styles.seealltxt}>See All</Text>
                                </TouchableOpacity>
                            </View>

                        }
                        <View>
                            <FlatList data={popularCourses}
                                ListFooterComponent={<View style={{ marginRight: responsiveWidth(3) }} />}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <View style={[styles.flatlistView, { marginTop: responsiveHeight(1) }]}>
                                        {myFilterCourses.includes(item.id)  ?
                                            <MyCourses
                                             image={{ uri: item.CoverImage }} 
                                             designation={item.CoachName} 
                                             name={item.Title} 
                                             onPress={() => { props.navigation.navigate('CourseDetails', { data: item ,purchased:'yes' }) }} 
                                             ContinuePress={()=>{props.navigation.navigate('CourseDetails', { data: item , purchased:'yes' }) }}/> :
                                            <BuynowCourses image={{ uri: item.CoverImage }} designation={item.CoachName} name={item.Title} price={item.PriceType === 'Evolove Subscription' ? 'subscribe' : '$' + ' ' + item.Price}
                                                buynowonPress={() => { item.PriceType === 'Evolove Subscription' ? props.navigation.navigate('Subscription', { data: item }) : props.navigation.navigate('HomeAddCard', { data: item }) }}
                                                onPress={() => { props.navigation.navigate('CourseDetails', { data: item,purchased:'no'  }) }}
                                                likeOnPress={() => likeFunction(item.id)}
                                                btnTxt={item.PriceType === 'Evolove Subscription' ? 'Subscribe' : 'Buy Now'}
                                                // btnTxt={myFilterCourses.includes(item.id)?'Continue':'BuyNow'}
                                                heartIconName={Fav.includes(item.id) ? 'heart' : 'heart-outlined'}
                                                
                                            />
                                        }
                                    </View>
                                )}
                            />
                        </View>
                        {topCoaches.length === 0 ?
                            null
                            :
                            <View style={styles.seeallTab}>
                                <Text style={styles.seeallTabheadingtxt}>
                                    {'Top Coaches'}
                                </Text>
                                <TouchableOpacity onPress={() => { props.navigation.navigate('TopCoaches') }}>
                                    <Text style={styles.seealltxt}>See All</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        <View>
                            <FlatList
                                data={topCoaches}
                                // horizontal
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.userDetailsView} onPress={() => { props.navigation.navigate('ShowCoachProfile', { Coachdata: item }) }}>
                                        {item.ProfileImage === '' ?
                                            <Image source={appImages.userIcon} style={styles.dp} />
                                            :
                                            <Image source={{ uri: item.ProfileImage }} style={styles.dp} />
                                        }
                                        <View style={{ marginLeft: responsiveWidth(3), width: responsiveWidth(30),justifyContent:'center' }}>
                                            <Text style={styles.userName}>{item.FullName}</Text>
                                            <Text style={[styles.userName, { color: colors.greyText }]}>{item.About}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}

                            />
                        </View>
                        <View style={styles.footer} />
                    </ScrollView>
                ) : null}
                {currentTab === 'Psychology' ? (
                    <View>
                        <Text style={styles.toptxt}>Total Course {phychology.length}</Text>
                        <FlatList
                            data={phychology}
                            ListFooterComponent={<View style={{ marginBottom: responsiveHeight(55) }} />}
                            renderItem={({ item }) => (
                                <View style={styles.FlatListstyle}>
                                    {myFilterCourses.includes(item.id) ?
                                        <MyCoursesLarge 
                                        image={{ uri: item.CoverImage }} 
                                        designation={item.CoachName} 
                                        name={item.Title} 
                                        onPress={() => { props.navigation.navigate('CourseDetails', { data: item ,purchased:'yes'}) }} />
                                        :
                                        <BuynowCoursesLarge
                                            image={{ uri: item.CoverImage }}
                                            designation={item.CoachName}
                                            name={item.Title}
                                            onBuyNowPress={() => item.PriceType === 'Evolove Subscription' ? props.navigation.navigate('Subscription', { data: item }) : props.navigation.navigate('HomeAddCard', { data: item })}
                                            likeOnpress={() => likeFunction(item.id)} heartIconName={Fav.includes(item.id) ? 'heart' : 'heart-outlined'} 
                                            cardPress={() => props.navigation.navigate('CourseDetails', { data: item , purchased:'no'})} 
                                            price={item.PriceType === 'Evolove Subscription' ? 'Subscribe' : '$' + ' ' + item.Price} 
                                            btnTxt={item.PriceType === 'Evolove Subscription' ? 'Subscribe' : 'Buy Now'} />

                                    }
                                </View>
                            )}
                        />
                    </View>
                ) : null}
                {currentTab === 'Sprirituality' ? (
                    <View>
                        <Text style={styles.toptxt}>Total Course {Sprirituality.length}</Text>
                        <FlatList
                            data={Sprirituality}
                            ListFooterComponent={<View style={{ marginBottom: responsiveHeight(55) }} />}
                            renderItem={({ item }) => (
                                <View style={styles.FlatListstyle}>
                                    {myFilterCourses.includes(item.id) ?
                                        <MyCoursesLarge 
                                        image={{ uri: item.CoverImage }} 
                                        designation={item.CoachName} 
                                        name={item.Title} 
                                        onPress={() => { props.navigation.navigate('CourseDetails', { data: item,purchased:'yes' }) }} />
                                        :
                                        <BuynowCoursesLarge
                                            image={{ uri: item.CoverImage }}
                                            designation={item.CoachName}
                                            name={item.Title}
                                            onBuyNowPress={() => item.PriceType === 'Evolove Subscription' ? props.navigation.navigate('Subscription', { data: item }) : props.navigation.navigate('HomeAddCard', { data: item })}
                                            likeOnpress={() => likeFunction(item.id)} heartIconName={Fav.includes(item.id) ? 'heart' : 'heart-outlined'} 
                                            cardPress={() => props.navigation.navigate('CourseDetails', { data: item , purchased:'no'})} 
                                            price={item.PriceType === 'Evolove Subscription' ? 'Subscribe' : '$' + ' ' + item.Price} 
                                            btnTxt={item.PriceType === 'Evolove Subscription' ? 'Subscribe' : 'Buy Now'} />

                                    }
                                </View>
                            )}
                        />
                    </View>
                ) : null}
                {currentTab === 'Education' ? (
                    <View>
                        <Text style={styles.toptxt}>Total Course {Education.length}</Text>
                        <FlatList
                            data={Education}
                            ListFooterComponent={<View style={{ marginBottom: responsiveHeight(55) }} />}
                            renderItem={({ item }) => (
                                <View style={styles.FlatListstyle}>
                                    {myFilterCourses.includes(item.id) ?
                                        <MyCoursesLarge 
                                        image={{ uri: item.CoverImage }} 
                                        designation={item.CoachName} 
                                        name={item.Title} 
                                        onPress={() => { props.navigation.navigate('CourseDetails', { data: item , purchased:'yes'}) }} />
                                        :
                                        <BuynowCoursesLarge
                                            image={{ uri: item.CoverImage }}
                                            designation={item.CoachName}
                                            name={item.Title}
                                            onBuyNowPress={() => item.PriceType === 'Evolove Subscription' ? props.navigation.navigate('Subscription', { data: item }) : props.navigation.navigate('HomeAddCard', { data: item })}
                                            likeOnpress={() => likeFunction(item.id)} heartIconName={Fav.includes(item.id) ? 'heart' : 'heart-outlined'} 
                                            cardPress={() => props.navigation.navigate('CourseDetails', { data: item , purchased:'no' })} 
                                            price={item.PriceType === 'Evolove Subscription' ? 'Subscribe' : '$' + ' ' + item.Price} 
                                            btnTxt={item.PriceType === 'Evolove Subscription' ? 'Subscribe' : 'Buy Now'} />

                                    }
                                </View>
                            )}
                        />
                    </View>
                ) : null}
                {currentTab === 'Awareness' ? (
                    <View>
                        <Text style={styles.toptxt}>Total Course {Awareness.length}</Text>
                        <FlatList
                            data={Awareness}
                            ListFooterComponent={<View style={{ marginBottom: responsiveHeight(55) }} />}
                            renderItem={({ item }) => (
                                <View style={styles.FlatListstyle}>
                                    {myFilterCourses.includes(item.id) ?
                                        <MyCoursesLarge 
                                        image={{ uri: item.CoverImage }} 
                                        designation={item.CoachName} 
                                        name={item.Title} 
                                        onPress={() => { props.navigation.navigate('CourseDetails', { data: item , purchased:'yes' }) }} />
                                        :
                                        <BuynowCoursesLarge
                                            image={{ uri: item.CoverImage }}
                                            designation={item.CoachName}
                                            name={item.Title}
                                            onBuyNowPress={() => item.PriceType === 'Evolove Subscription' ? props.navigation.navigate('Subscription', { data: item }) : props.navigation.navigate('HomeAddCard', { data: item })}
                                            likeOnpress={() => likeFunction(item.id)} heartIconName={Fav.includes(item.id) ? 'heart' : 'heart-outlined'} 
                                            cardPress={() => props.navigation.navigate('CourseDetails', { data: item , purchased:'no'})} 
                                            price={item.PriceType === 'Evolove Subscription' ? 'Subscribe' : '$' + ' ' + item.Price} 
                                            btnTxt={item.PriceType === 'Evolove Subscription' ? 'Subscribe' : 'Buy Now'} />

                                    }
                                </View>
                            )}
                        />
                    </View>
                ) : null}
                {currentTab === 'Music' ? (
                    <View>
                        <Text style={styles.toptxt}>Total Course {Music.length}</Text>
                        <FlatList
                            data={Music}
                            ListFooterComponent={<View style={{ marginBottom: responsiveHeight(55) }} />}
                            renderItem={({ item }) => (
                                <View style={styles.FlatListstyle}>
                                   {myFilterCourses.includes(item.id) ?
                                        <MyCoursesLarge 
                                        image={{ uri: item.CoverImage }} 
                                        designation={item.CoachName} 
                                        name={item.Title} 
                                        onPress={() => { props.navigation.navigate('CourseDetails', { data: item  , purchased:"yes"}) }} />
                                        :
                                        <BuynowCoursesLarge
                                            image={{ uri: item.CoverImage }}
                                            designation={item.CoachName}
                                            name={item.Title}
                                            onBuyNowPress={() => item.PriceType === 'Evolove Subscription' ? props.navigation.navigate('Subscription', { data: item }) : props.navigation.navigate('HomeAddCard', { data: item })}
                                            likeOnpress={() => likeFunction(item.id)} heartIconName={Fav.includes(item.id) ? 'heart' : 'heart-outlined'} 
                                            cardPress={() => props.navigation.navigate('CourseDetails', { data: item , purchased:'no' })} 
                                            price={item.PriceType === 'Evolove Subscription' ? 'Subscribe' : '$' + ' ' + item.Price} 
                                            btnTxt={item.PriceType === 'Evolove Subscription' ? 'Subscribe' : 'Buy Now'} />

                                    }
                                </View>
                            )}
                        />
                    </View>
                ) : null}
                {/* </View>
                } */}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <TouchableOpacity style={styles.centeredView}
                        onPress={() => { setModalVisible(false) }}
                    >
                        <View style={styles.modalView}>
                            <View style={{ alignSelf: 'flex-end', marginRight: responsiveWidth(3), marginTop: responsiveHeight(1) }}>
                                <Icon name='cross' type={'entypo'} color={colors.whiteText}
                                    onPress={() => { setModalVisible(false) }} />
                            </View>


                            <Text style={styles.modalText}>{'Get you mental health solution with evolove'}</Text>
                            <Video source={require('../../../res/video/courseVideo.mp4')}
                                ref={video}
                                repeat={false}
                                resizeMode="cover"
                                fullscreen={true}
                                controls={true}
                                paused={false}
                                style={styles.video}

                            />
                            <Text style={[styles.modalText, { top: responsiveHeight(22) }]}>{'How Evolove going to change your life'}</Text>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        </ImageBackground>

    )
}
export default Home
