import React from 'react'
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
import { ListButton, SearchBtn } from '../../../../components/general/button'
import { DataSource } from '../../../../services/app/getBlogCat'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import SearchInput from '../../../../components/general/searchInput'
import { BlogPosts } from '../../../../components/feed/blogPostscard'
import { BlogsDataSource } from '../../../../services/app/getblogPosts'
import { ShopScreenCard } from '../../../../components/feed/shopscreencard'
import { RecentDataSource } from '../../../../services/app/getShopData'
import { WalletDataSource } from '../../../../services/app/getWalletHistory'

const Wallet = (props) => {
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwiththirdtxt text={'Wallet'} Back={()=>{props.navigation.goBack()}} onPress={()=>props.navigation.navigate('Withdraw')}/>
                {/* <SearchInput placeholder={'Search Item'} /> */}
                <Text style={styles.toptxt}>{'This is the amount you earn from sales'}</Text>
                <View style={styles.pinkcard}>
                    <View style={styles.priceView}>
                        <Text style={styles.pricetext}>$200.00</Text>
                    </View>
                </View>
                <ScrollView>
                <Text style={styles.flatlistheadertxt}>{'Recent Activity'}</Text>
                <View>
                    <FlatList
                        data={WalletDataSource}
                        showsHorizontalScrollIndicator={false}
                        ListFooterComponent={<View style={{marginRight:responsiveWidth(4)}}/>}
                        renderItem={({ item }) => (
                            <View  style={styles.flatlistView}>
                                <Text style={styles.txt}>{item.name}</Text>
                                <Text style={[styles.txt,{alignSelf:'flex-end'}]}>{item.time}</Text>
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
export default Wallet
