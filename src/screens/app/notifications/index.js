import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    ScrollView
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../globals/utilities/assets'
import { AppHeader, AppHeaderwithBackwithnothirdbtn } from '../../../components/general/header'
import { ListButton } from '../../../components/general/button'
import { DataSource } from '../../../services/app/getBlogCat'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import SearchInput from '../../../components/general/searchInput'
import { BlogPosts } from '../../../components/feed/blogPostscard'
import { BlogsDataSource } from '../../../services/app/getblogPosts'
import { ShopScreenCard } from '../../../components/feed/shopscreencard'
import { RecentDataSource } from '../../../services/app/getShopData'
import { NotificationDataSource } from '../../../services/app/getNotifications'
import { getDocByKeyValue } from '../../../Backend/utility'
import { getCurrentUserId } from '../../../Backend/auth'
import { ActivityIndicator } from 'react-native'
import { colors } from '../../../globals/utilities/colors'
import { ListEmpty } from '../../../components/feed/listEmpty'

const Notification = (props) => {

    const [notifiactionDataSource, setNotifiactionDataSource] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getNotification()
    }, [])

    const getNotification = async () => {
        setLoading(true)
        let uid = await getCurrentUserId()
        getDocByKeyValue('Notifications', 'userId', uid).then((data) => {
            setNotifiactionDataSource(data)
            setLoading(false)
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn text={'Notifications'} Back={() => { props.navigation.goBack() }} />
                {
                    loading ?
                        <ActivityIndicator size={'large'} color={colors.button} />
                        :
                        <ScrollView>
                            <View>
                                {/* <Text style={styles.toptxt}>
                                    Today
                                </Text> */}
                                <FlatList data={notifiactionDataSource}
                                    ListEmptyComponent={<ListEmpty text={'No Notification'} />}
                                    renderItem={({ item }) => (
                                        <View style={styles.card}>
                                            <Text style={styles.cardtxt}>{item.NotificationText}</Text>
                                            <Text style={[styles.cardtxt, { alignSelf: "flex-end", marginRight: responsiveWidth(1) }]}>{item.Date}</Text>
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
export default Notification
