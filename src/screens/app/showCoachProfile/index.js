import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../globals/utilities/assets'
import { AppHeader, AppHeaderwithBackwithnothirdbtn, AuthHeader, CoachHeader } from '../../../components/general/header'
import { BlogPosts } from '../../../components/feed/blogPostscard'
import { PurchasedCoursed } from '../../../components/feed/coursesCard'
import { getData, getDocByKeyValue } from '../../../Backend/utility'
import { db } from '../../../Backend/firebaseConfig'
import { ListEmpty } from '../../../components/feed/listEmpty'
import { ShopScreenCard } from '../../../components/feed/shopscreencard'

const ShowCoachProfile = (props) => {
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
    const { Coachdata } = props.route.params
    useEffect(() => {
        db.collection('Blog').onSnapshot(() => {
            getBlog()
        })
        db.collection('Product').onSnapshot(() => {
            getProduct()
        })
        db.collection('Courses').onSnapshot(() => {
            getCourses()
        })
        getBlog()
        getProduct()
        getCourses()
    }, [])
    const getBlog = async () => {
        await getDocByKeyValue('Blog', 'CoachId', Coachdata.id).then((data) => {
            let Active = data.filter((item) => item.Status === 'Active')
            setActiveBlog(Active)
        })
    }
    const getProduct = async () => {
        await getDocByKeyValue('Product', 'CoachId', Coachdata.id).then((data) => {
            console.log('Product', data)
            let Active = data.filter((item) => item.Status === 'Active')
            setActiveProduct(Active)
        })
    }
    const getCourses = async () => {
        await getDocByKeyValue('Courses', 'CoachId', Coachdata.id).then((data) => {
            console.log('Courses', data)
            let Active = data.filter((item) => item.Status === 'Active')
            setActiveCourse(Active)
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn text={'Coach Profile'} name={'settings'} type={'feather'} name1={'chevron-left'} type1={'feather'} onPress={() => props.navigation.navigate('CoachSettings', { coachName: coachName, profilePic: profileImage })} Back={() => { props.navigation.goBack() }} />
                {Coachdata.ProfileImage === '' ?
                    <Image source={appImages.userIcon} style={styles.image} />
                    :
                    <Image source={{ uri: Coachdata.ProfileImage }} style={styles.image} />
                }
                <Text style={styles.name}>{Coachdata.FullName}</Text>
                {/* <ChangetoCoachBtn Title={'Sales Board'} onPress={() => { props.navigation.navigate('SaleBoard') }} /> */}
                {/* <View style={styles.whiteBar}>
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
                    </View>
                </View> */}
                <ScrollView>
                    <View>
                        <FlatList data={Activecourse}
                            ListEmptyComponent={<ListEmpty text={'No courses'} />}
                            numColumns={2}
                            ListHeaderComponent={<View>
                                {Activecourse.length > 0 ? (
                                    <Text style={styles.topTxt}>Total courses {Activecourse.length}</Text>
                                ) : null
                                }

                            </View>}
                            renderItem={({ item }) => (
                                <View style={styles.FlatListStyle}>
                                    <PurchasedCoursed image={{ uri: item.CoverImage }} designation={item.CoachName} name={item.Title} onPress={() => { props.navigation.navigate('CourseDetails', { data: item }) }} />
                                </View>
                            )}
                        />
                        <View>
                            <FlatList
                                data={ActiveBlg}
                                ListEmptyComponent={<ListEmpty text={'No Blogs'} />}
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
                        <View>
                        <View>
                            <FlatList
                                data={ActiveProduct}
                                numColumns={2}
                                ListEmptyComponent={<ListEmpty text={'No Products'}/>}
                                renderItem={({ item }) => (
                                    <View style={styles.FlatListStyle}>
                                        <ShopScreenCard image={{uri:item.Image}} name={item.Title} type={item.Category} price={item.status} onPress={() => { props.navigation.navigate('ShopDetails', { data: item , purchased:'yes'}) }} />
                                    </View>
                                )}
                            />
                        </View>
                        </View>


                    </View>

                    <View style={styles.footer} />
                </ScrollView>
            </View>
        </ImageBackground>

    )
}
export default ShowCoachProfile
