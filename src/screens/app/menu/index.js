import React, { useState } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Modal
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../globals/utilities/assets'
import { AppHeader, AuthHeader } from '../../../components/general/header'
import { AppButton, CircleIconButton, ListButton, ModalButton } from '../../../components/general/button'
import { DataSource } from '../../../services/app/getBlogCat'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import SearchInput from '../../../components/general/searchInput'
import { BlogPosts } from '../../../components/feed/blogPostscard'
import { BlogsDataSource } from '../../../services/app/getblogPosts'
import { ShopScreenCard } from '../../../components/feed/shopscreencard'
import { RecentDataSource } from '../../../services/app/getShopData'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'
import { saveData } from '../../../Backend/utility'
import { _storeData } from '../../../Backend/AsyncFuncs'
import { getCurrentUserId , logout } from '../../../Backend/auth'
import {_removeItem} from '../../../Backend/AsyncFuncs'

const Menu = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const Becomecoach = async () => {
        let uid = await getCurrentUserId()
        await saveData('Users', uid, {
            Coach: true,
            SoldCourses: 0,
            CourseEarning: 0,
            SoldEbooks: 0,
            EbooksEarnings: 0,
            SoldArticles: 0,
            ArticlesEarnings: 0,
            TotalEarnings:0

        }).then(async () => {
            await _storeData('userType', 'Coach')
        }).then(() => {
            props.navigation.navigate('CoachApp')
        })

    }
    const logOut = async () => {
        logout().then(async () => {
            await _removeItem('userId')
            // await _removeItem('userType')
            setModalVisible(false)
            props.navigation.navigate('Auth', { screen: 'Login' })
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AuthHeader Back={() => props.navigation.goBack()} name={'cross'} type={'entypo'} />
                <View style={styles.mainView}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Profile') }}>
                        <Text style={styles.txt}>
                            Profile
                        </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => { props.navigation.navigate('Wallet') }}>
                        <Text style={styles.txt}>
                            Wallet
                        </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Tickets') }}> 
                        <Text style={styles.txt}>
                            Tickets
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('MoonCalander') }}>       
                        <Text style={styles.txt}>
                            Moon Calender
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={Becomecoach}>
                        <Text style={styles.txt}>
                            Become Coach
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Contact') }}>
                        <Text style={styles.txt}>
                            Contact
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => { props.navigation.navigate('Feedback') }}>
                        <Text style={styles.txt}>
                            Feedback
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { props.navigation.navigate('Privacy') }}>
                        <Text style={styles.txt}>
                            Privacy Policy
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Terms') }}>

                        <Text style={styles.txt}>
                            Terms & Conditions
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={[styles.txt, { color: colors.button }]}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* Logout Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Logout</Text>
                            <Text style={[styles.modalText, { textAlign: 'center', fontSize: fontSize.regular, fontFamily: fontFamily.appTextRegular, width: responsiveWidth(60) }]}>{'Are you sure to logout your account from evolove?'}</Text>
                            <View style={styles.buttonView}>
                            <ModalButton backgroundColor = {colors.whiteText} Title={'Cancel'} btnColor={colors.button} onPress={()=>setModalVisible(false)}/>
                            <ModalButton backgroundColor = {colors.button} btnColor={colors.whiteText} Title={'Logout'} onPress={logOut}/>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>

    )
}
export default Menu
