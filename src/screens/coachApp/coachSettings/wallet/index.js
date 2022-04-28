import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    ScrollView
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../../globals/utilities/assets'
import { AppHeader, AppHeaderwithBackwithnothirdbtn, AppHeaderwithBackwiththirdtxt } from '../../../../components/general/header'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { WalletDataSource } from '../../../../services/app/getWalletHistory'
import { getCurrentUserId } from '../../../../Backend/auth'
import { getData, saveData } from '../../../../Backend/utility'
import { ListEmpty } from '../../../../components/feed/listEmpty'
import { db } from '../../../../Backend/firebaseConfig'
import moment from 'moment'

const Wallet = (props) => {
    const [totalEarnings, setTotalEarning] = useState(0)
    const [recentdata , setRecentData] = useState([])

    useEffect(() => {
        db.collection('Users').onSnapshot(()=>{
            getCoachInfo()

        })
        getCoachInfo()

    }, [])

    const getCoachInfo = async () => {
        let uid = await getCurrentUserId()
        getData('Users', uid).then((data) => {
            console.log('>>.>>>', data)
            let earnings = data.TotalEarnings
            setTotalEarning(parseInt(earnings))
            setRecentData(data.WalletRecentActivity)
        })

    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwiththirdtxt text={'Wallet'} Back={() => { props.navigation.goBack() }} onPress={() => props.navigation.navigate('Withdraw',{TotalAmount:totalEarnings})} />
                {/* <SearchInput placeholder={'Search Item'} /> */}
                <Text style={styles.toptxt}>{'This is the amount you earn from sales'}</Text>
                <View style={styles.pinkcard}>
                    <View style={styles.priceView}>
                        <Text style={styles.pricetext}>${totalEarnings}</Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={styles.flatlistheadertxt}>{'Recent Activity'}</Text>
                    <View>
                        <FlatList
                            data={recentdata}
                            showsHorizontalScrollIndicator={false}
                            ListEmptyComponent={<ListEmpty text={'No Recent Activity'}/>}
                            ListFooterComponent={<View style={{ marginRight: responsiveWidth(4) }} />}
                            renderItem={({ item }) => (
                                <View style={styles.flatlistView}>
                                    <Text style={styles.txt}>{item.name}</Text>
                                    <Text style={[styles.txt, { alignSelf: 'flex-end' }]}>{moment(item.time).format('YYYY-MM-DD HH:mm:ss') }</Text>
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
export default Wallet
