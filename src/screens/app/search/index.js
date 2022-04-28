import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    ScrollView
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../globals/utilities/assets'
import { AppHeader, SearchHeader } from '../../../components/general/header'
import { AppButtonLarge, FitlterBtn, ListButton } from '../../../components/general/button'
import { DataSource } from '../../../services/app/getBlogCat'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import SearchInput from '../../../components/general/searchInput'
import { BlogPosts } from '../../../components/feed/blogPostscard'
import { BlogsDataSource } from '../../../services/app/getblogPosts'
import { ShopScreenCard } from '../../../components/feed/shopscreencard'
import { RecentDataSource } from '../../../services/app/getShopData'
import { colors } from '../../../globals/utilities/colors'
import RBSheet from "react-native-raw-bottom-sheet";
import { ItemType, Status, SortedBy } from '../../../services/app/getfilterArrays'
import { getAllOfCollection, getDocByKeyValue } from '../../../Backend/utility'
import { BuynowCoursesLarge } from '../../../components/feed/coursesCard'
import { ListEmpty } from '../../../components/feed/listEmpty'

const Search = (props) => {
    const filter = useRef()
    const [buttonDataSource, setButtonData] = useState(DataSource)
    const [type, setType] = useState(ItemType)
    const [statusArray, setStatusArray] = useState(Status)
    const [Sorted, setSorted] = useState(SortedBy)
    const [categoryButton, setCategoryButton] = useState('')
    const [currentTab, setCurrentTab] = useState('')
    const [dataSource, setDataSource] = useState([])
    const [duplicateDataSource, setDuplicateDataSource] = useState([])
    const [courseDataSource, setCourseDataSource] = useState([])
    const [blogDataSource, setBlogDataSource] = useState([])
    const [productDataSoucr, setProductDataSource] = useState([])
    const [PsychologyCourse, setPsychologyCourse] = useState([])
    const [sprituality, setSprituality] = useState([])
    const [education, setEducation] = useState([])
    const [awarness, setAwarness] = useState([])
    const [music, setMusic] = useState([])
    const [psycoBlog, setPsychoBlog] = useState([])
    const [sprotualityBlog, setSpritualityBlog] = useState([])
    const [educationBlog, setEducationBlog] = useState([])
    const [awarnessBlog, setAwarnessBlog] = useState([])
    const [musicBlog, setMusicBlog] = useState([])
    const [psycoProduct, setPsycoProduct] = useState([])
    const [spirtualProduct, setSpirtuaproduct] = useState([])
    const [educationProduct, seteducationProduct] = useState([])
    const [awarnessPrduct, setAwarnessProduct] = useState([])
    const [musicProduct, setMusicProduct] = useState([])
    const [typeFilter, setTypeFilter] = useState('')

    useEffect(() => {
        gettingData()
    }, [])

    const gettingData = async () => {
        await getDocByKeyValue('Courses', 'Status', 'Active').then(async (data) => {
            setCourseDataSource(data)
            let phychoarr = [...data]
            let PArray = phychoarr.filter((data) => data.Category === 'Psychology')
            setPsychologyCourse(PArray)
            let sprituality = [...data]
            let spritualityArr = sprituality.filter((data) => data.Category === 'Sprirituality')
            setSprituality(spritualityArr)
            let Education = [...data]
            let EducationArr = Education.filter((data) => data.Category === 'Education')
            setEducation(EducationArr)
            let Awareness = [...data]
            let AwarenessArr = Awareness.filter((data) => data.Category === 'Awareness')
            setAwarness(AwarenessArr)
            let Music = [...data]
            let MusicArr = Music.filter((data) => data.Category === 'Music')
            setMusic(MusicArr)
            await getDocByKeyValue('Blog', 'Status', 'Active').then(async (data1) => {
                setBlogDataSource(data1)
                let phychoarr = [...data1]
                let PArray = phychoarr.filter((data) => data.Category === 'Psychology')
                setPsychoBlog(PArray)
                let sprituality = [...data1]
                let spritualityArr = sprituality.filter((data) => data.Category === 'Sprirituality')
                setSpritualityBlog(spritualityArr)
                let Education = [...data1]
                let EducationArr = Education.filter((data) => data.Category === 'Education')
                setEducationBlog(EducationArr)
                let Awareness = [...data1]
                let AwarenessArr = Awareness.filter((data) => data.Category === 'Awareness')
                setAwarnessBlog(AwarenessArr)
                let Music = [...data1]
                let MusicArr = Music.filter((data) => data.Category === 'Music')
                setMusicBlog(MusicArr)
                await getDocByKeyValue('Product', 'Status', 'Active').then((data2) => {
                    setProductDataSource(data2)
                    let phychoarr = [...data2]
                    let PArray = phychoarr.filter((data) => data.Category === 'Psychology')
                    setPsycoProduct(PArray)
                    let sprituality = [...data2]
                    let spritualityArr = sprituality.filter((data) => data.Category === 'Sprirituality')
                    setSpirtuaproduct(spritualityArr)
                    let Education = [...data2]
                    let EducationArr = Education.filter((data) => data.Category === 'Education')
                    seteducationProduct(EducationArr)
                    let Awareness = [...data2]
                    let AwarenessArr = Awareness.filter((data) => data.Category === 'Awareness')
                    setAwarnessProduct(AwarenessArr)
                    let Music = [...data2]
                    let MusicArr = Music.filter((data) => data.Category === 'Music')
                    setMusicProduct(MusicArr)
                })
            })
        })
    }
    const CourseSearch = (query) => {
        // setSearchQuery(query)
        // setSearch(query)
        if (query === '') {
            setDataSource(duplicateDataSource)
        } else {
            const result = dataSource.filter(
                words => words.Title.toLowerCase().includes(query)

            )
            setDataSource(result)
            console.log('Final', result)
        }
    }

    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <SearchHeader text={'Search'} onPress={() => { filter.current.open() }} Back={() => { props.navigation.goBack() }} />
                <SearchInput placeholder={'Search Item'} onchange={(query) => CourseSearch(query)} />
                <View>
                    <FlatList
                        data={buttonDataSource}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ListFooterComponent={<View style={{ marginRight: responsiveWidth(4) }} />}
                        renderItem={({ item, index }) => (
                            <View style={{ marginLeft: responsiveWidth(4), marginBottom: responsiveHeight(1) }}>
                                <ListButton Title={item.name}
                                    backgroundColor={item.flag ? colors.button : colors.iconBackGround}
                                    onPress={() => {
                                        let array = [...buttonDataSource]
                                        array.forEach(element => {
                                            console.log(element);
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
                <ScrollView>
                    {currentTab === '' ?
                        <View>
                            {typeFilter === '' ?
                                <View>
                                    <View style={{ marginTop: responsiveHeight(2) }}>
                                        <FlatList
                                            data={courseDataSource}
                                            renderItem={({ item }) => {
                                                return (
                                                    <View style={{ marginTop: responsiveHeight(2) }}>
                                                        <BuynowCoursesLarge image={{ uri: item.CoverImage }} designation={item.CoachName} name={item.Title} price={'$' + ' ' + item.Price} />
                                                    </View>
                                                )
                                            }}
                                        />
                                    </View>
                                    <View style={{ marginTop: responsiveHeight(2) }}>
                                        <FlatList
                                            data={blogDataSource}
                                            renderItem={({ item }) => {
                                                return (
                                                    <View style={{ marginTop: responsiveHeight(2) }}>
                                                        <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                                            onPress={() => {
                                                                item.PriceType === 'free' ?
                                                                    props.navigation.navigate('BlogDetails', { data: item }) :
                                                                    props.navigation.navigate('HomeAddCard', { data: item })

                                                            }}

                                                        />
                                                    </View>
                                                )
                                            }}
                                        />
                                    </View>
                                    <View style={{ marginTop: responsiveHeight(2) }}>
                                        <FlatList
                                            data={productDataSoucr}
                                            renderItem={({ item }) => {
                                                return (
                                                    <View style={{ marginTop: responsiveHeight(2) }}>
                                                        <ShopScreenCard image={{ uri: item.Image }} name={item.Title} type={item.Category} price={item.Price} onPress={() => { props.navigation.navigate('ShopDetails', { data: item, purchased: 'no' }) }} />
                                                    </View>
                                                )
                                            }}
                                        />
                                    </View>

                                </View> : null
                            }
                            {typeFilter === 'Course' ?
                                <View>
                                    <View style={{ marginTop: responsiveHeight(2) }}>
                                        <FlatList
                                            data={courseDataSource}
                                            renderItem={({ item }) => {
                                                return (
                                                    <View style={{ marginTop: responsiveHeight(2) }}>
                                                        <BuynowCoursesLarge image={{ uri: item.CoverImage }} designation={item.CoachName} name={item.Title} price={'$' + ' ' + item.Price} />
                                                    </View>
                                                )
                                            }}
                                        />
                                    </View>
                                </View>
                                : null
                            }
                            {typeFilter === 'Article' ?
                                <View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                        <FlatList
                                            data={blogDataSource}
                                            renderItem={({ item }) => {
                                                return (
                                                    <View style={{ marginTop: responsiveHeight(2) }}>
                                                        <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                                            onPress={() => {
                                                                item.PriceType === 'free' ?
                                                                    props.navigation.navigate('BlogDetails', { data: item }) :
                                                                    props.navigation.navigate('HomeAddCard', { data: item })

                                                            }}

                                                        />
                                                    </View>
                                                )
                                            }}
                                        />
                                    </View>
                                </View>
                                : null
                            }
                            {typeFilter === 'Ebooks' ?
                            <View style={{ marginTop: responsiveHeight(2) }}>
                                        <FlatList
                                            data={productDataSoucr}
                                            renderItem={({ item }) => {
                                                return (
                                                    <View style={{ marginTop: responsiveHeight(2) }}>
                                                        <ShopScreenCard image={{ uri: item.Image }} name={item.Title} type={item.Category} price={item.Price} onPress={() => { props.navigation.navigate('ShopDetails', { data: item, purchased: 'no' }) }} />
                                                    </View>
                                                )
                                            }}
                                        />
                                    </View>:null
                            }
                        </View>
                        : null
                    }
                    {
                        currentTab === 'Psychology' ?
                            <View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={PsychologyCourse}
                                        ListEmptyComponent={<ListEmpty text={'No Courses'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <BuynowCoursesLarge image={{ uri: item.CoverImage }} designation={item.CoachName} name={item.Title} price={'$' + ' ' + item.Price} />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={psycoBlog}
                                        ListEmptyComponent={<ListEmpty text={'No Blog'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                                        onPress={() => {
                                                            item.PriceType === 'free' ?
                                                                props.navigation.navigate('BlogDetails', { data: item }) :
                                                                props.navigation.navigate('HomeAddCard', { data: item })

                                                        }}

                                                    />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={psycoProduct}
                                        ListEmptyComponent={<ListEmpty text={'No Product'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <ShopScreenCard image={{ uri: item.Image }} name={item.Title} type={item.Category} price={item.Price} onPress={() => { props.navigation.navigate('ShopDetails', { data: item, purchased: 'no' }) }} />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>

                            </View>
                            : null
                    }
                    {
                        currentTab === 'Sprirituality' ?
                            <View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={sprituality}
                                        ListEmptyComponent={<ListEmpty text={'No Courses'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <BuynowCoursesLarge image={{ uri: item.CoverImage }} designation={item.CoachName} name={item.Title} price={'$' + ' ' + item.Price} />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={sprotualityBlog}
                                        ListEmptyComponent={<ListEmpty text={'No Blog'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                                        onPress={() => {
                                                            item.PriceType === 'free' ?
                                                                props.navigation.navigate('BlogDetails', { data: item }) :
                                                                props.navigation.navigate('HomeAddCard', { data: item })

                                                        }}

                                                    />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={spirtualProduct}
                                        ListEmptyComponent={<ListEmpty text={'No Product'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <ShopScreenCard image={{ uri: item.Image }} name={item.Title} type={item.Category} price={item.Price} onPress={() => { props.navigation.navigate('ShopDetails', { data: item, purchased: 'no' }) }} />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>

                            </View>
                            : null
                    }
                    {
                        currentTab === 'Education' ?
                            <View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={education}
                                        ListEmptyComponent={<ListEmpty text={'No Course'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <BuynowCoursesLarge image={{ uri: item.CoverImage }} designation={item.CoachName} name={item.Title} price={'$' + ' ' + item.Price} />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={educationBlog}
                                        ListEmptyComponent={<ListEmpty text={'No Blog'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                                        onPress={() => {
                                                            item.PriceType === 'free' ?
                                                                props.navigation.navigate('BlogDetails', { data: item }) :
                                                                props.navigation.navigate('HomeAddCard', { data: item })

                                                        }}

                                                    />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={educationProduct}
                                        ListEmptyComponent={<ListEmpty text={'No Product'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <ShopScreenCard image={{ uri: item.Image }} name={item.Title} type={item.Category} price={item.Price} onPress={() => { props.navigation.navigate('ShopDetails', { data: item, purchased: 'no' }) }} />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>

                            </View>
                            : null
                    }
                    {
                        currentTab === 'Awareness' ?
                            <View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={awarness}
                                        ListEmptyComponent={<ListEmpty text={'No Course'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <BuynowCoursesLarge image={{ uri: item.CoverImage }} designation={item.CoachName} name={item.Title} price={'$' + ' ' + item.Price} />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={awarnessBlog}
                                        ListEmptyComponent={<ListEmpty text={'No Blog'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                                        onPress={() => {
                                                            item.PriceType === 'free' ?
                                                                props.navigation.navigate('BlogDetails', { data: item }) :
                                                                props.navigation.navigate('HomeAddCard', { data: item })

                                                        }}

                                                    />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={awarnessPrduct}
                                        ListEmptyComponent={<ListEmpty text={'No Product'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <ShopScreenCard image={{ uri: item.Image }} name={item.Title} type={item.Category} price={item.Price} onPress={() => { props.navigation.navigate('ShopDetails', { data: item, purchased: 'no' }) }} />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>

                            </View>
                            : null
                    }
                    {
                        currentTab === 'Music' ?
                            <View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={music}
                                        ListEmptyComponent={<ListEmpty text={'No Course'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <BuynowCoursesLarge image={{ uri: item.CoverImage }} designation={item.CoachName} name={item.Title} price={'$' + ' ' + item.Price} />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={musicBlog}
                                        ListEmptyComponent={<ListEmpty text={'No Blog'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <BlogPosts name={item.Title} image={{ uri: item.FeatureImage }} discription={item.Discription} type={item.PriceType} bagebackgroundColor={item.PriceType === 'free' ? 'green' : 'red'}
                                                        onPress={() => {
                                                            item.PriceType === 'free' ?
                                                                props.navigation.navigate('BlogDetails', { data: item }) :
                                                                props.navigation.navigate('HomeAddCard', { data: item })

                                                        }}

                                                    />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: responsiveHeight(2) }}>
                                    <FlatList
                                        data={musicProduct}
                                        ListEmptyComponent={<ListEmpty text={'No Product'} />}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ marginTop: responsiveHeight(2) }}>
                                                    <ShopScreenCard image={{ uri: item.Image }} name={item.Title} type={item.Category} price={item.Price} onPress={() => { props.navigation.navigate('ShopDetails', { data: item, purchased: 'no' }) }} />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>

                            </View>
                            : null
                    }
                    <View style={{ height: responsiveHeight(7) }} />
                </ScrollView>
                <RBSheet
                    ref={filter}
                    draggeableIcon={false}
                    closeOnPressBack={false}
                    height={responsiveHeight(80)}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'rgba(0,0,0,0.7)',
                        },
                        container: {
                            borderTopRightRadius: responsiveWidth(7),
                            borderTopLeftRadius: responsiveWidth(7),
                            elevation: 2,
                            backgroundColor: colors.iconBackGround,
                        },
                    }}>
                    <View style={styles.rb}>
                        <View>
                            <Text style={styles.header}>Filter</Text>
                        </View>
                        <View>
                            <FlatList
                                data={type}
                                numColumns={3}
                                ListHeaderComponent={
                                    <View>
                                        <Text style={styles.headertxt}>Item Type</Text>
                                    </View>
                                }
                                ListFooterComponent={<View style={{ marginBottom: responsiveHeight(2) }} />}
                                renderItem={({ item, index }) => (
                                    <View style={{ flex: 0.5 }}>
                                        <View style={{ flex: 1, marginHorizontal: responsiveWidth(2), marginTop: responsiveHeight(1) }}>
                                            <FitlterBtn Title={item.name}
                                                color={item.flag ? 'black' : colors.whiteText}
                                                backgroundColor={item.flag ? colors.whiteText : colors.iconBackGround}
                                                borderWidth={item.flag ? null : responsiveWidth(0.3)}
                                                borderColor={item.flag ? null : colors.txtInputborder}
                                                onPress={() => {
                                                    let array = [...type]
                                                    setTypeFilter(item.name)
                                                    array.forEach(element => {
                                                        console.log(element);
                                                        element.flag = false
                                                    });
                                                    array[index].flag = true
                                                    setType(array)
                                                }} />
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                        <View>
                            <FlatList
                                data={statusArray}
                                numColumns={3}
                                ListHeaderComponent={
                                    <View>
                                        <Text style={styles.headertxt}>Status</Text>
                                    </View>
                                }
                                ListFooterComponent={<View style={{ marginBottom: responsiveHeight(2) }} />}
                                renderItem={({ item, index }) => (
                                    <View style={{ flex: 0.5 }}>
                                        <View style={{ flex: 1, marginHorizontal: responsiveWidth(2), marginTop: responsiveHeight(1) }}>
                                            <FitlterBtn Title={item.name}
                                                color={item.flag ? 'black' : colors.whiteText}
                                                backgroundColor={item.flag ? colors.whiteText : colors.iconBackGround}
                                                borderWidth={item.flag ? null : responsiveWidth(0.3)}
                                                borderColor={item.flag ? null : colors.txtInputborder}
                                                onPress={() => {
                                                    let array = [...statusArray]
                                                    array.forEach(element => {
                                                        console.log(element);
                                                        element.flag = false
                                                    });
                                                    array[index].flag = true
                                                    setStatusArray(array)
                                                }} />
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                        <View>
                            <FlatList
                                data={Sorted}
                                numColumns={3}
                                ListHeaderComponent={
                                    <View>
                                        <Text style={styles.headertxt}>Sort By</Text>
                                    </View>
                                }
                                ListFooterComponent={<View style={{ marginBottom: responsiveHeight(2) }} />}
                                renderItem={({ item, index }) => (
                                    <View style={{ flex: 0.5 }}>
                                        <View style={{ flex: 1, marginHorizontal: responsiveWidth(2), marginTop: responsiveHeight(1) }}>
                                            <FitlterBtn Title={item.name}
                                                color={item.flag ? 'black' : colors.whiteText}
                                                backgroundColor={item.flag ? colors.whiteText : colors.iconBackGround}
                                                borderWidth={item.flag ? null : responsiveWidth(0.3)}
                                                borderColor={item.flag ? null : colors.txtInputborder}
                                                onPress={() => {
                                                    let array = [...Sorted]
                                                    array.forEach(element => {
                                                        console.log(element);
                                                        element.flag = false
                                                    });
                                                    array[index].flag = true
                                                    setSorted(array)
                                                }} />
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                        <AppButtonLarge Title={'Apply'} onPress={() => { filter.current.close() }} />
                    </View>
                </RBSheet>
            </View>
        </ImageBackground>

    )
}
export default Search
