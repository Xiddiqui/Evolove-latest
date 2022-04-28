import React, { useState } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../globals/utilities/assets'
import { Icon } from 'react-native-elements'
import { colors } from '../../../globals/utilities/colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { AppHeader, AppHeaderwithBackwithnothirdbtn } from '../../../components/general/header'
import { AccountSettingbtn, ModalButton } from '../../../components/general/button'
import { fontSize } from '../../../globals/utilities/size'
import { fontFamily } from '../../../globals/utilities/fonts'
import { logout } from '../../../Backend/auth'
import { _removeItem } from '../../../Backend/AsyncFuncs'

const CoachSettings = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { coachName, profilePic } = props.route.params

    const logOutbtn = () => {
        setModalVisible(true)
    }

    const logOut = async () => {
        logout().then(async () => {
            await _removeItem('userId')
            await _removeItem('userType')
            setModalVisible(false)
            props.navigation.navigate('Auth', { screen: 'Login' })
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn text={'Settings'} Back={() => props.navigation.goBack()} />
                {profilePic === '' ?
                    <Image source={appImages.userIcon} style={styles.image} />
                    :
                    <Image source={{ uri: profilePic }} style={styles.image} />
                }
                <Text style={styles.name}>{coachName}</Text>
                <ScrollView>
                    <Text style={styles.topTxt}>{'Account Setting'}</Text>
                    <AccountSettingbtn Title={'Edit Profile'} name={'user-alt'} type={'font-awesome-5'} onPress={() => { props.navigation.navigate('EditCoachProfile') }} />
                    <AccountSettingbtn Title={'Change Password'} name={'shield-checkmark'} type={'ionicon'} onPress={() => { props.navigation.navigate('ChangePassword') }} />
                    <AccountSettingbtn Title={'Bank Account'} name={'bank'} type={'font-awesome'} onPress={() => { props.navigation.navigate('Bank') }} />
                    <Text style={styles.topTxt}>{'Prefrences'}</Text>
                    <AccountSettingbtn Title={'Wallet'} name={'wallet'} type={'entypo'} onPress={() => { props.navigation.navigate('Wallet') }} />
                    <TouchableOpacity style={styles.settingsbtn} onPress={() => { logOutbtn() }}>
                        <View style={styles.circle}>
                            <Icon
                                name={'power'}
                                type={'feather'}
                                size={fontSize.large}
                                color={colors.button} />
                        </View>
                        <Text style={styles.settingsbtntxt}>{'Log out'}</Text>
                        <Icon
                            name={'chevron-right'}
                            type={'feather'}
                            color={colors.whiteText} />
                    </TouchableOpacity>
                    <View style={styles.footer} />
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
                                    <ModalButton backgroundColor={colors.whiteText} Title={'Cancel'} btnColor={colors.button} onPress={() => setModalVisible(false)} />
                                    <ModalButton backgroundColor={colors.button} btnColor={colors.whiteText} Title={'Logout'} onPress={logOut} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>
        </ImageBackground>

    )
}
export default CoachSettings
