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
import { styles } from './styles'
import { appImages } from '../../../globals/utilities/assets'
import { AppHeader } from '../../../components/general/header'
import { AppButton, ChangetoCoachBtn, ListButton } from '../../../components/general/button'
import { DataSource } from '../../../services/app/getBlogCat'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import SearchInput from '../../../components/general/searchInput'
import { BlogPosts } from '../../../components/feed/blogPostscard'
import { BlogsDataSource } from '../../../services/app/getblogPosts'
import { colors } from '../../../globals/utilities/colors'
import { RecentDataSource } from '../../../services/app/getShopData'
import { ShopScreenCard } from '../../../components/feed/shopscreencard'
import { MyCourses, PurchasedCoursed } from '../../../components/feed/coursesCard'
import { CoursesDataSource } from '../../../services/app/getcourses'
import { getData, getDocByKeyValue, saveData } from '../../../Backend/utility'
import { getCurrentUserId } from '../../../Backend/auth'
import { _storeData } from '../../../Backend/AsyncFuncs'
import { db } from '../../../Backend/firebaseConfig'
import { ListEmpty } from '../../../components/feed/listEmpty'

const Profile = (props) => {
    const [CourseFlag, setCourseFlag] = useState(true)
    const [blogFlag, setBlogFlag] = useState(false)
    const [ProductFlag, setProductFlag] = useState(false)
    const [name, setName] = useState('')
    const [profileImage, setprofileImage] = useState('')
    const [courses, setCourses] = useState([])
    const [Purchasedblogs, setPurchasedBlogs] = useState([])
    const [purchasedProduct, setPurchasedProduct] = useState([])
    const [loading , setLoading] = useState(false)
    

    useEffect(() => {
        db.collection('Users').onSnapshot(() => {
            getCurrentUser()
        })
        getCurrentUser()
    }, [])

    const getCurrentUser = async () => {
        let uid = await getCurrentUserId()
        await getData('Users', uid).then((data) => {
            setName(data.FullName)
            setprofileImage(data.ProfileImage)
            let purBlogs = [...Purchasedblogs]
            let BlogArr = [...data.PurchasedBlogs]
            BlogArr && BlogArr.map((item)=>{
                getDocByKeyValue('Blog','id',item.id).then((data)=>{
                    data && data.map((element)=>{
                        purBlogs.push(element)
                    })
                })
            })
            setPurchasedBlogs(purBlogs)
            let CA = [...courses]
            let coursesArr = [...data.PurchasedCourse]
            console.log('><<<><',data.SubscribedCoach)
            let subscribedArr = [...data.SubscribedCoach]
            coursesArr && coursesArr.map((item)=>{
                getDocByKeyValue('Courses' , 'id' , item).then((data)=>{
                    data && data.map((element)=>{
                        CA.push(element)
                    })
                })
            })
            setCourses(CA)
            // subscribedArr && subscribedArr.map((j)=>{
            //     getDocByKeyValue('')
            // })
            let PP = [...purchasedProduct]
            let PurchasedProductArr = [...data.PurchasedProducts]
            PurchasedProductArr && PurchasedProductArr.map((item) => {
                getDocByKeyValue('Product' , 'id' , item.id).then((data)=>{
                    data && data.map((element)=>{
                        PP.push(element)
                    })
                })
            })
            // setPurchasedBlogs(data.PurchasedBlogs)
            setPurchasedProduct(PP)
        })
    }

    const courseBtn = () => {
        setCourseFlag(true)
        setBlogFlag(false)
        setProductFlag(false)
    }
    const blogBtn = () => {
        setCourseFlag(false)
        setBlogFlag(true)
        setProductFlag(false)
    }
    const ProductBtn = () => {
        setCourseFlag(false)
        setBlogFlag(false)
        setProductFlag(true)
    }
    const Becomecoach = async () => {
        setLoading(true)
        let uid = await getCurrentUserId()
        await saveData('Users', uid, {
            Coach: true,
            SoldCourses: 0,
            CourseEarning: 0,
            SoldEbooks: 0,
            EbooksEarnings: 0,
            SoldArticles: 0,
            ArticlesEarnings: 0,
            TotalEarnings:0,

        }).then(async () => {
            await _storeData('userType', 'Coach')
        }).then(() => {
            setLoading(false)
            props.navigation.navigate('CoachApp')
        })

    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeader text={'Profile'} name={'settings'} type={'feather'} onPress={() => props.navigation.navigate('Settings', { name: name, profilePic: profileImage })} />
                {profileImage === "" ?
                    <Image source={appImages.userIcon} style={styles.image} />
                    :
                    <Image source={{ uri: profileImage }} style={styles.image} />
                }
                <Text style={styles.name}>{name}</Text>
                <ChangetoCoachBtn Title={'Become a coach'} onPress={Becomecoach} activity={loading}/>
                <View style={styles.whiteBar}>
                    <View style={styles.whiteBarinner}>
                        <TouchableOpacity
                            onPress={courseBtn}
                        >
                            <Text style={[styles.whiteBartxt, { color: CourseFlag ? colors.button : colors.greyText }]}>
                                Courses
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={blogBtn}>
                            <Text style={[styles.whiteBartxt, { color: blogFlag ? colors.button : colors.greyText }]}>
                                Blogs
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ProductBtn}>
                            <Text style={[styles.whiteBartxt, { color: ProductFlag ? colors.button : colors.greyText }]}>
                                Product
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    {CourseFlag && (
                        <View>
                            <FlatList data={courses}
                                numColumns={2}
                                ListEmptyComponent={<ListEmpty text={'No Courses'}/>}
                                ListHeaderComponent={<View>
                                    {courses.length > 0 ?
                                        <Text style={styles.topTxt}>Total courses {courses.length}</Text>
                                        : null
                                    }
                                </View>}
                                renderItem={({ item }) => (
                                    <View style={styles.FlatListStyle}>
                                        {/* <MyCourses image={{uri:item.CoverImage}} designation={item.CoachName} name={item.Title} /> */}
                                        <MyCourses
                                             image={{ uri: item.CoverImage }} 
                                             designation={item.CoachName} 
                                             name={item.Title} 
                                             onPress={() => { props.navigation.navigate('CourseDetails', { data: item ,purchased:'yes' }) }} 
                                             ContinuePress={()=>{props.navigation.navigate('CourseDetails', { data: item , purchased:'yes' }) }}/> 
                                    </View>
                                )}
                            />
                        </View>
                    )}
                    {blogFlag && (
                        <View>
                            <FlatList
                                data={Purchasedblogs}
                                ListEmptyComponent={<ListEmpty text={'No Blogs'}/>}
                                renderItem={({ item }) => (
                                    <BlogPosts name={item.Title} image={{uri:item.FeatureImage}} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                        onPress={() => { props.navigation.navigate('BlogDetails', { data: item }) }}

                                    />
                                )}
                            />
                        </View>
                    )}
                    {ProductFlag && (
                        <View>
                            <FlatList
                                data={purchasedProduct}
                                numColumns={2}
                                ListEmptyComponent={<ListEmpty text={'No Products'}/>}
                                renderItem={({ item }) => (
                                    <View style={styles.FlatListStyle}>
                                        <ShopScreenCard image={{uri:item.Image}} name={item.Title} type={item.Category} price={item.status} onPress={() => { props.navigation.navigate('ShopDetails', { data: item , purchased:'yes'}) }} />
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
export default Profile
