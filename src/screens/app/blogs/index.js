import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../globals/utilities/assets'
import { AppHeader } from '../../../components/general/header'
import { ListButton, SearchBtn } from '../../../components/general/button'
import { DataSource } from '../../../services/app/getBlogCat'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import SearchInput from '../../../components/general/searchInput'
import { BlogPosts } from '../../../components/feed/blogPostscard'
import { BlogsDataSource } from '../../../services/app/getblogPosts'
import { colors } from '../../../globals/utilities/colors'
import { db } from '../../../Backend/firebaseConfig'
import { getData, getDocByKeyValue } from '../../../Backend/utility'
import { ListEmpty } from '../../../components/feed/listEmpty'
import { getCurrentUserId } from '../../../Backend/auth'

const Blog = (props) => {
    const [buttonDataSource, setButtonData] = useState(DataSource)
    const [categoryButton, setCategoryButton] = useState('')
    const [blogs, setBlogs] = useState([])
    const [currentTab, setCurrentTab] = useState('')
    const [psychologyblogs, setPsychologyBlogs] = useState([])
    const [spirtualityblogs, setSpirtualityBlogs] = useState([])
    const [educationblogs, setEducationBlogs] = useState([])
    const [awarnessblogs, setAwarenessBlogs] = useState([])
    const [musicblogs, setMusicBlogs] = useState([])


    useEffect(() => {
        db.collection('Blog').onSnapshot(() => {
            getBlogs()
        })
        db.collection('Users').onSnapshot(() => {
            getBlogs()
        })
        getBlogs()
    }, [])

    const getBlogs = async () => {
        await getDocByKeyValue('Blog', 'Status', 'Active').then(async (data) => {
            // setBlogs(data)
            let uid = await getCurrentUserId()
            getData('Users', uid).then((users) => {
                console.log(users.PurchasedBlogs)
                let arr = [...users.PurchasedBlogs]
                if (arr.length === 0) {
                    setBlogs(data)
                    let phychoarr = [...data]
                    let PArray = phychoarr.filter((data) => data.Category === 'Psychology')
                    setPsychologyBlogs(PArray)
                    let sprituality = [...data]
                    let spritualityArr = sprituality.filter((data) => data.Category === 'Sprirituality')
                    setSpirtualityBlogs(spritualityArr)
                    let Education = [...data]
                    let EducationArr = Education.filter((data) => data.Category === 'Education')
                    setEducationBlogs(EducationArr)
                    let Awareness = [...data]
                    let AwarenessArr = Awareness.filter((data) => data.Category === 'Awareness')
                    setAwarenessBlogs(AwarenessArr)
                    let Music = [...data]
                    let MusicArr = Music.filter((data) => data.Category === 'Music')
                    setMusicBlogs(MusicArr)
                }
                else {

                    arr && arr.map((element) => {
                        let filterProduct = data.filter((item) => item.id != element.id)
                        setBlogs(filterProduct)
                        let phychoarr = [...filterProduct]
                        let PArray = phychoarr.filter((data) => data.Category === 'Psychology')
                        setPsychologyBlogs(PArray)
                        let sprituality = [...filterProduct]
                        let spritualityArr = sprituality.filter((data) => data.Category === 'Sprirituality')
                        setSpirtualityBlogs(spritualityArr)
                        let Education = [...filterProduct]
                        let EducationArr = Education.filter((data) => data.Category === 'Education')
                        setEducationBlogs(EducationArr)
                        let Awareness = [...filterProduct]
                        let AwarenessArr = Awareness.filter((data) => data.Category === 'Awareness')
                        setAwarenessBlogs(AwarenessArr)
                        let Music = [...filterProduct]
                        let MusicArr = Music.filter((data) => data.Category === 'Music')
                        setMusicBlogs(MusicArr)
                    })
                }
            })
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeader text={'Blogs'} name={'notifications-none'}
                    type={'material'} onPress={() => { props.navigation.navigate('Notification') }} />
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
                                            console.log(element);
                                            element.flag = false
                                        });
                                        array[index].flag = true
                                        setCurrentTab(item.name)
                                        setCategoryButton(array[index])
                                        setButtonData(array)
                                    }} />
                            </View>
                        )}
                    />
                </View>
                <SearchBtn onPress={() => { props.navigation.navigate('Search') }} />
                {currentTab === '' ? 
                <FlatList
                    data={blogs}
                    ListFooterComponent={<View style={{ height: responsiveHeight(10) }} />}
                    ListHeaderComponent={<View>
                        {blogs.length === 0 ?
                            null
                            :
                            <Text style={styles.recenttxt}>Blogs</Text>

                        }
                    </View>}
                    ListEmptyComponent={<ListEmpty text={'No Blogs'} />}
                    renderItem={({ item }) => (
                        <View>
                            <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                onPress={() => {
                                    item.PriceType === 'free' ?
                                        props.navigation.navigate('BlogDetails', { data: item }) :
                                        props.navigation.navigate('HomeAddCard', { data: item })

                                }}

                            />
                        </View>
                    )}
                />
                :null
                }
                {currentTab === 'Psychology' ? 
                <FlatList
                    data={psychologyblogs}
                    ListFooterComponent={<View style={{ height: responsiveHeight(10) }} />}
                    ListHeaderComponent={<View>
                        {blogs.length === 0 ?
                            null
                            :
                            <Text style={styles.recenttxt}>Blogs</Text>

                        }
                    </View>}
                    ListEmptyComponent={<ListEmpty text={'No Blogs'} />}
                    renderItem={({ item }) => (
                        <View>
                            <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                onPress={() => {
                                    item.PriceType === 'free' ?
                                        props.navigation.navigate('BlogDetails', { data: item }) :
                                        props.navigation.navigate('HomeAddCard', { data: item })

                                }}

                            />
                        </View>
                    )}
                />
                :null
                }
                {currentTab === 'Sprirituality' ? 
                <FlatList
                    data={spirtualityblogs}
                    ListFooterComponent={<View style={{ height: responsiveHeight(10) }} />}
                    ListHeaderComponent={<View>
                        {blogs.length === 0 ?
                            null
                            :
                            <Text style={styles.recenttxt}>Blogs</Text>

                        }
                    </View>}
                    ListEmptyComponent={<ListEmpty text={'No Blogs'} />}
                    renderItem={({ item }) => (
                        <View>
                            <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                onPress={() => {
                                    item.PriceType === 'free' ?
                                        props.navigation.navigate('BlogDetails', { data: item }) :
                                        props.navigation.navigate('HomeAddCard', { data: item })

                                }}

                            />
                        </View>
                    )}
                />
                :null
                }
                {currentTab === 'Education' ? 
                <FlatList
                    data={educationblogs}
                    ListFooterComponent={<View style={{ height: responsiveHeight(10) }} />}
                    ListHeaderComponent={<View>
                        {blogs.length === 0 ?
                            null
                            :
                            <Text style={styles.recenttxt}>Blogs</Text>

                        }
                    </View>}
                    ListEmptyComponent={<ListEmpty text={'No Blogs'} />}
                    renderItem={({ item }) => (
                        <View>
                            <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                onPress={() => {
                                    item.PriceType === 'free' ?
                                        props.navigation.navigate('BlogDetails', { data: item }) :
                                        props.navigation.navigate('HomeAddCard', { data: item })

                                }}

                            />
                        </View>
                    )}
                />
                :null
                }
                {currentTab === 'Awareness' ? 
                <FlatList
                    data={awarnessblogs}
                    ListFooterComponent={<View style={{ height: responsiveHeight(10) }} />}
                    ListHeaderComponent={<View>
                        {blogs.length === 0 ?
                            null
                            :
                            <Text style={styles.recenttxt}>Blogs</Text>

                        }
                    </View>}
                    ListEmptyComponent={<ListEmpty text={'No Blogs'} />}
                    renderItem={({ item }) => (
                        <View>
                            <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                onPress={() => {
                                    item.PriceType === 'free' ?
                                        props.navigation.navigate('BlogDetails', { data: item }) :
                                        props.navigation.navigate('HomeAddCard', { data: item })

                                }}

                            />
                        </View>
                    )}
                />
                :null
                }
                {currentTab === 'Music' ? 
                <FlatList
                    data={musicblogs}
                    ListFooterComponent={<View style={{ height: responsiveHeight(10) }} />}
                    ListHeaderComponent={<View>
                        {blogs.length === 0 ?
                            null
                            :
                            <Text style={styles.recenttxt}>Blogs</Text>

                        }
                    </View>}
                    ListEmptyComponent={<ListEmpty text={'No Blogs'} />}
                    renderItem={({ item }) => (
                        <View>
                            <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                onPress={() => {
                                    item.PriceType === 'free' ?
                                        props.navigation.navigate('BlogDetails', { data: item }) :
                                        props.navigation.navigate('HomeAddCard', { data: item })

                                }}

                            />
                        </View>
                    )}
                />
                :null
                }
            </View>
        </ImageBackground>

    )
}
export default Blog
