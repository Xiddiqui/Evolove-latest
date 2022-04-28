import React, { useState , useEffect} from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    ScrollView
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../../globals/utilities/assets'
import { AppHeader, AppHeaderwithBackwithnothirdbtn } from '../../../../components/general/header'
import { ListButton, SearchBtn } from '../../../../components/general/button'
import { DataSource } from '../../../../services/app/getBlogCat'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import SearchInput from '../../../../components/general/searchInput'
import { BlogPosts } from '../../../../components/feed/blogPostscard'
import { BlogsDataSource } from '../../../../services/app/getblogPosts'
import { ShopScreenCard } from '../../../../components/feed/shopscreencard'
import { RecentDataSource } from '../../../../services/app/getShopData'
import { getAllOfCollection } from '../../../../Backend/utility'
import { db } from '../../../../Backend/firebaseConfig'
import { getCurrentUserId } from '../../../../Backend/auth'
import {ListEmpty} from '../../../../components/feed/listEmpty'

const Tickets = (props) => {
    const [dataSource , setDataSource] = useState([])

    useEffect(()=>{
        db.collection('Tickets').onSnapshot(()=>{
        getTickets()
        })
        getTickets()
    },[])

    const getTickets = async () =>{
        await getAllOfCollection('Tickets').then(async(data)=>{
            let uid = await getCurrentUserId()
            data && data.map((item)=>{
                let arr = [...item.Users]
                if(arr.includes(uid) ){
                    setDataSource(data)
                }

            })
            
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn text={'Tickets'} Back={()=>{props.navigation.goBack()}}/>
                {/* <SearchInput placeholder={'Search Item'} /> */}
                <SearchBtn onPress={() => { props.navigation.navigate('Search') }} />
                <ScrollView>
                {dataSource.length === 0 ? 
                null : 
                <Text style={styles.flatlistheadertxt}>{'New Tickets'}</Text>
                }
                <View>
                    <FlatList
                        data={dataSource}
                        numColumns={2}
                        ListEmptyComponent={<ListEmpty text={'No Tickets Available'}/>}
                        showsHorizontalScrollIndicator={false}
                        ListFooterComponent={<View style={{marginRight:responsiveWidth(4)}}/>}
                        renderItem={({ item }) => (
                            <View  style={styles.flatlistView}>
                                <ShopScreenCard image={{uri:item.Image}} name={item.Title} type={item.Category} price={item.Price} onPress={() => { props.navigation.navigate('TicketsDetails', { data: item }) }} />
                            </View>
                        )}
                    />
                </View>
                <View style={styles.footer}/>
                </ScrollView>
            </View>
        </ImageBackground>

    )
}
export default Tickets
