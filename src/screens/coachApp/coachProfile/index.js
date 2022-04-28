import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    BackHandler,
    Alert,
    Share
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../globals/utilities/assets'
import { AppHeader, AuthHeader, CoachHeader } from '../../../components/general/header'
import { AppButton, ChangetoCoachBtn, ListButton } from '../../../components/general/button'
import { DataSource } from '../../../services/app/getBlogCat'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import SearchInput from '../../../components/general/searchInput'
import { BlogPosts } from '../../../components/feed/blogPostscard'
// import { BlogsDataSource } from '../../../services/app/getblogPosts'
import { colors } from '../../../globals/utilities/colors'
import { RecentDataSource } from '../../../services/app/getShopData'
import { ShopScreenCard } from '../../../components/feed/shopscreencard'
import { MyCourses, PurchasedCoursed } from '../../../components/feed/coursesCard'
import { CoursesDataSource } from '../../../services/app/getcourses'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { fontSize } from '../../../globals/utilities/size'
import { getCurrentUserId } from '../../../Backend/auth'
import { getData, getDocByKeyValue } from '../../../Backend/utility'
import { db } from '../../../Backend/firebaseConfig'

const CoachProfile = (props) => {
    const [ActiveFlag, setActiveFlag] = useState(true)
    const [submittedFlag, setSubmittedFlag] = useState(false)
    const [coachName, setCoachName] = useState('')
    const [BlogsDataSource, setBlogsDataSource] = useState([])
    const [submitBlg, setSubmitblog] = useState([])
    const [ActiveBlg, setActiveBlog] = useState([])
    const [ActiveProduct, setActiveProduct] = useState([])
    const [submitProduct, setSubmitProduct] = useState([])
    const [profileImage, setProfleImage] = useState('')
    const [Activecourse, setActiveCourse] = useState([])
    const [SubmittedCourse, setSubmittedCourse] = useState([])

    useEffect(() => {
        db.collection('Users').onSnapshot(() => {
            getCoach()
        })
        db.collection('Blog').onSnapshot(() => {
            getBlog()
        })
        db.collection('Product').onSnapshot(() => {
            getProduct()
        })
        db.collection('Courses').onSnapshot(() => {
            getCourses()
        })
        getCoach()
        getBlog()
        getProduct()
        getCourses()
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [])
    const getCoach = async () => {
        let uid = await getCurrentUserId()
        getData('Users', uid).then((data) => {
            console.log('user', data.FullName)
            setCoachName(data.FullName)
            setProfleImage(data.ProfileImage)
        })
    }
    const getBlog = async () => {
        let uid = await getCurrentUserId()
        await getDocByKeyValue('Blog', 'CoachId', uid).then((data) => {
            console.log('blogs', data)
            let Submitted = data.filter((item) => item.Status === 'Submitted')
            let Active = data.filter((item) => item.Status === 'Active')
            setActiveBlog(Active)
            setSubmitblog(Submitted)
        })
    }
    const getProduct = async () => {
        let uid = await getCurrentUserId()
        await getDocByKeyValue('Product', 'CoachId', uid).then((data) => {
            console.log('Product', data)
            let Submitted = data.filter((item) => item.Status === 'Submitted')
            let Active = data.filter((item) => item.Status === 'Active')
            setActiveProduct(Active)
            setSubmitProduct(Submitted)
        })
    }
    const getCourses = async () => {
        let uid = await getCurrentUserId()
        await getDocByKeyValue('Courses', 'CoachId', uid).then((data) => {
            console.log('Courses', data)
            let Submitted = data.filter((item) => item.Status === 'Submitted')
            let Active = data.filter((item) => item.Status === 'Active')
            setActiveCourse(Active)
            setSubmittedCourse(Submitted)
        })
    }
    const ActiveBtn = () => {
        setActiveFlag(true)
        setSubmittedFlag(false)
    }
    const SubmittedBtn = () => {
        setActiveFlag(false)
        setSubmittedFlag(true)
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
    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'Course Sharing ........',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <CoachHeader text={'Coach Profile'} name={'settings'} type={'feather'} name1={'chevron-left'} type1={'feather'} onPress={() => props.navigation.navigate('CoachSettings', { coachName: coachName, profilePic: profileImage })} />
                {profileImage === '' ?
                    <Image source={appImages.userIcon} style={styles.image} />
                    :
                    <Image source={{ uri: profileImage }} style={styles.image} />
                }
                <Text style={styles.name}>{coachName}</Text>
                <ChangetoCoachBtn Title={'Sales Board'} onPress={() => { props.navigation.navigate('SaleBoard') }} />
                <View style={styles.whiteBar}>
                    <View style={styles.whiteBarinner}>
                        <TouchableOpacity
                            onPress={ActiveBtn}
                        >
                            <Text style={[styles.whiteBartxt, { color: ActiveFlag ? colors.button : colors.greyText }]}>
                                Active
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={SubmittedBtn}>
                            <Text style={[styles.whiteBartxt, { color: submittedFlag ? colors.button : colors.greyText }]}>
                                Submited
                            </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={ProductBtn}>
                            <Text style={[styles.whiteBartxt, { color: ProductFlag ? colors.button : colors.greyText }]}>
                                Product
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={() => { props.navigation.navigate('NewSubmission') }}>
                    <Icon name={'add'} type={'material'} color={colors.whiteText} size={fontSize.h1} />
                </TouchableOpacity>
                <ScrollView>
                    {ActiveFlag && (
                        <View>
                            <FlatList data={Activecourse}
                                numColumns={2}
                                ListHeaderComponent={<View>
                                    {Activecourse.length > 0 ? (
                                        <Text style={styles.topTxt}>Total courses {Activecourse.length}</Text>
                                    ) : null
                                    }

                                </View>}
                                renderItem={({ item }) => (
                                    <View style={styles.FlatListStyle}>
                                        <MyCourses image={{ uri: item.CoverImage }} designation={item.CoachName} name={item.Title} onPress={() => { props.navigation.navigate('CourseDetails', { data: item }) }} sharePress={onShare}/>
                                    </View>
                                )}
                            />
                            <View>
                                <FlatList
                                    data={ActiveBlg}
                                    ListHeaderComponent={<View>
                                        {ActiveBlg.length > 0 ? (
                                            <Text style={styles.topTxt}>Total Blogs {ActiveBlg.length}</Text>

                                        ) : null
                                        }

                                    </View>}
                                    renderItem={({ item }) => (
                                        <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                            onPress={() => { props.navigation.navigate('BlogDetails', { data: item }) }}

                                        />
                                    )}
                                />
                            </View>


                        </View>
                    )}
                    {submittedFlag && (
                        <View>
                            <FlatList
                                data={submitBlg}
                                ListHeaderComponent={<View>
                                    {submitBlg.length > 0 ? (
                                        <Text style={styles.topTxt}>Submitted Blogs {submitBlg.length}</Text>
                                    ) : null}
                                </View>}
                                renderItem={({ item }) => (
                                    <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                        onPress={() => { props.navigation.navigate('BlogDetails', { data: item }) }}

                                    />
                                )}
                            />
                            <FlatList
                                data={submitProduct}
                                ListHeaderComponent={<View>
                                    {submitProduct.length > 0 ? (
                                        <Text style={styles.topTxt}>Submitted Products {submitProduct.length}</Text>
                                    ) : null}
                                </View>}
                                renderItem={({ item }) => (
                                    <View style={styles.FlatListStyle}>
                                        {/* <PurchasedCoursed image={{ uri: item.Image }} designation={item.AutherName} name={item.Title} /> */}
                                        <ShopScreenCard image={{ uri: item.Image }} name={item.Title} type={item.Category} price={item.Price} onPress={() => { props.navigation.navigate('ProductDetails', { data: item }) }} />
                                    </View>
                                )}
                            />
                            <FlatList
                                data={SubmittedCourse}
                                numColumns={2}
                                ListHeaderComponent={<View>
                                    {SubmittedCourse.length > 0 ? (
                                        <Text style={styles.topTxt}>Submitted Courses {SubmittedCourse.length}</Text>
                                    ) : null}
                                </View>}
                                renderItem={({ item }) => (
                                    <View style={styles.FlatListStyle}>
                                        <MyCourses image={{ uri: item.CoverImage }} designation={item.CoachName} name={item.Title} onPress={() => { props.navigation.navigate('CourseDetails', { data: item }) }} sharePress={onShare} />
                                    </View>
                                )}
                            />
                        </View>

                    )}
                    <View style={styles.footer} />
                </ScrollView>
            </View>
        </ImageBackground>

    )
}
export default CoachProfile
