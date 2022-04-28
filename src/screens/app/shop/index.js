import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    ScrollView
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
import { ShopScreenCard } from '../../../components/feed/shopscreencard'
import { RecentDataSource } from '../../../services/app/getShopData'
import { colors } from '../../../globals/utilities/colors'
import { getData, getDocByKeyValue, getDocByKeyValueOR } from '../../../Backend/utility'
import { db } from '../../../Backend/firebaseConfig'
import { getCurrentUserId } from '../../../Backend/auth'

const Shop = (props) => {
    const [buttonDataSource, setButtonData] = useState(DataSource)
    const [categoryButton, setCategoryButton] = useState('')
    const [productsArray, setProducsArray] = useState([])
    const [ticketsArray, setTicketsArray] = useState([])

    useEffect(() => {
        db.collection('Tickets').onSnapshot(() => {
            getTickets()
        })
        db.collection('Product').onSnapshot(() => {
            getProducts() 
        })
        db.collection('Users').onSnapshot(() => {
            getProducts() 
        })
        getProducts()
        getTickets()
    }, [])
    const getProducts = async () => {
        await getDocByKeyValue('Product', 'Status', 'Active').then(async (data) => {
            let uid = await getCurrentUserId()
            getData('Users', uid).then((users) => {
                console.log(users.PurchasedProducts)
                let arr = [...users.PurchasedProducts]
                if (arr.length === 0) {
                    setProducsArray(data)
                }
                else {

                    arr && arr.map((element) => {
                        let filterProduct = data.filter((item) => item.id != element.id)
                        setProducsArray(filterProduct)
                    })
                }
            })

        })
    }
    const getTickets = async () => {
        await getDocByKeyValue('Tickets', 'Status', 'Active').then(async(data) => {
            let uid = await getCurrentUserId()
            data && data.map((item)=>{
                let arr = [...item.Users]
                if(arr.includes(uid) ){
                    setTicketsArray(data)
                }

            })
            
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeader text={'Shop'} name={'notifications-none'}
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
                                        setCategoryButton(array[index])
                                        setButtonData(array)
                                    }} />
                            </View>
                        )}
                    />
                </View>
                <SearchBtn onPress={() => { props.navigation.navigate('Search') }} />
                <ScrollView>
                    {productsArray.length === 0 ?
                        null :
                        <Text style={styles.flatlistheadertxt}>{'Recent Viewed Product'}</Text>
                    }
                    <View>
                        <FlatList
                            data={productsArray}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ListFooterComponent={<View style={{ marginRight: responsiveWidth(4) }} />}
                            renderItem={({ item }) => (
                                <View style={styles.flatlistView}>
                                    <ShopScreenCard image={{ uri: item.Image }} name={item.Title} type={item.Category} price={item.Price} onPress={() => { props.navigation.navigate('ShopDetails', { data: item, purchased: 'no' }) }} />
                                </View>
                            )}
                        />
                    </View>
                    {
                        ticketsArray.length === 0 ?
                            null :
                            <Text style={styles.flatlistheadertxt}>{'Tickets'}</Text>
                    }
                    <View>
                        <FlatList
                            data={ticketsArray}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ListFooterComponent={<View style={{ marginRight: responsiveWidth(4) }} />}
                            renderItem={({ item }) => (
                                <View style={styles.flatlistView}>
                                    <ShopScreenCard image={{ uri: item.Image }} name={item.Title} type={item.Category} price={item.Price} onPress={() => { props.navigation.navigate('TicketsDetails', { data: item }) }} />
                                </View>
                            )}
                        />
                    </View>
                    {
                        productsArray.length === 0 ?
                            null :
                            <Text style={styles.flatlistheadertxt}>{'New Products'}</Text>

                    }
                    <View>
                        <FlatList
                            data={productsArray}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ListFooterComponent={<View style={{ marginRight: responsiveWidth(4) }} />}
                            renderItem={({ item }) => (
                                <View style={styles.flatlistView}>
                                    <ShopScreenCard image={{ uri: item.Image }} name={item.Title} type={item.Category} price={item.Price} onPress={() => { props.navigation.navigate('ShopDetails', { data: item }) }} />
                                </View>
                            )}
                        />
                    </View>
                    <View style={styles.footer} />
                </ScrollView>
            </View>
        </ImageBackground>

    )
}
export default Shop
