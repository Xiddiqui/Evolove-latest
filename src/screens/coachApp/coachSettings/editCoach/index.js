import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../../globals/utilities/assets'
import { Icon } from 'react-native-elements'
import { colors } from '../../../../globals/utilities/colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { AppHeader, AppHeaderwithBackwithnothirdbtn } from '../../../../components/general/header'
import { AccountSettingbtn, ModalButton, AppButtonLarge } from '../../../../components/general/button'
import { fontSize } from '../../../../globals/utilities/size'
import { fontFamily } from '../../../../globals/utilities/fonts'
import MyTextInput from '../../../../components/general/txtInput'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uriToBlob, downloadImage, getData, saveData } from '../../../../Backend/utility'
import { storage, db } from '../../../../Backend/firebaseConfig'
import { getCurrentUser, getCurrentUserId } from '../../../../Backend/auth'
import { Image } from 'react-native-compressor';
import ImagePicker from 'react-native-image-crop-picker';
import { ActivityIndicator } from 'react-native'

const EditCoachProfile = (props) => {

    useEffect(() => {
        getUser()
    }, [])
    const [modalVisible, setModalVisible] = useState(false);
    const [profileImage, setProfileimage] = useState('')
    const [loading, setLoding] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [about, setAbout] = useState('')
    const [profileImageLoader, setProfileImageLoader] = useState(false)

    const savebtn = () => {
        setModalVisible(true)
    }
    const getUser = async () => {
        let uid = await getCurrentUserId()
        getData('Users', uid).then((data) => {
            console.log(data)
            setName(data.FullName)
            setEmail(data.Email)
            setProfileimage(data.ProfileImage)
            setAbout(data.About)
        })
    }

    const AddImage = async () => {
        ImagePicker.openPicker({
            width: responsiveWidth(15),
            height: responsiveWidth(15),
            borderRadius: responsiveWidth(15 / 2),
            cropping: true
        }).then(image => {
            console.log(image);
            SaveImagetodb(image)
        });
    };
    const SaveImagetodb = async (res) => {
        setProfileImageLoader(true)
        const BlogImageResponse = await Image.compress(res.path, {
            maxWidth: 1000,
            quality: 0.9,
        });
        console.log('helooo', res)
        let postObj = new Object;
        var today = new Date();
        var mili = today.getMilliseconds();
        let kk = Date.parse(today);
        kk = kk + mili;
        let response = BlogImageResponse;
        let image = response;
        let imagePath = kk;
        let file = await uriToBlob(image);
        console.log('>>>>>>>>>.', response)

        console.log('>>>>>>>>>.', file)
        const uploadTask = storage.ref(`CoachProfileImage/${imagePath}`).put(file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                );
                if (progress == 100) {
                }
            },
            (error) => {
                console.log('error 1', error);
            },
            async () => {
                await downloadImage('CoachProfileImage', imagePath).then(async (uri) => {
                    if (uri) {
                        console.log(uri)
                        setProfileimage(uri)
                        setProfileImageLoader(false)
                    }

                });
            },
        );
    }
    const onPressSavebtn = async () => {
        setLoding(true)
        let uid = await getCurrentUserId()
        let obj = {
            FullName: name,
            ProfileImage: profileImage,
            About: about,
        }
        saveData('Users', uid, obj).then(() => {
            setModalVisible(false)
            setLoding(false)
            props.navigation.navigate('CoachProfile')
        })


    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn text={'Edit Profile'} Back={() => props.navigation.goBack()} />
                <ScrollView>
                <TouchableOpacity onPress={AddImage}>
                    {profileImageLoader ?
                        <ActivityIndicator size={'small'} color={colors.button}/>
                    :
                        <View>
                            {profileImage === '' ?
                                <ImageBackground source={appImages.userIcon} style={styles.image} imageStyle={{ borderRadius: responsiveWidth(20 / 2) }}>
                                    <View style={styles.camerabtn}>
                                        <Icon name={'camera'} type={'feather'} color={colors.whiteText} size={fontSize.small} />
                                    </View>
                                </ImageBackground>
                                :
                                <ImageBackground source={{ uri: profileImage }} style={styles.image} imageStyle={{ borderRadius: responsiveWidth(20 / 2) }}>
                                    <View style={styles.camerabtn}>
                                        <Icon name={'camera'} type={'feather'} color={colors.whiteText} size={fontSize.small} />
                                    </View>
                                </ImageBackground>
                            }
                        </View>
                        
                }


                </TouchableOpacity>
                <View>
                    <Text style={styles.topTxt}>{'Personal Information'}</Text>
                    <Text style={[styles.topTxt, { color: colors.txtInputborder, marginTop: responsiveHeight(4) }]}>{'Name'}</Text>
                    <MyTextInput placeholder={'name'} value={name} onchange={(txt) => { setName(txt) }} />
                    <Text style={[styles.topTxt, { color: colors.txtInputborder, marginTop: responsiveHeight(4) }]}>{'Email'}</Text>
                    <MyTextInput placeholder={'Email'} onchange={(txt) => { setEmail(txt) }} value={email} editable={false} />
                    <Text style={[styles.topTxt, { color: colors.txtInputborder, marginTop: responsiveHeight(4) }]}>{'About Yourself'}</Text>
                    <MyTextInput placeholder={'Write some thing about yourself'} onchange={(txt) => { setAbout(txt) }} value={about} />
                </View>
                <View style={styles.buttonView1}>
                    <AppButtonLarge Title={'Save Changes'} onPress={() => { savebtn() }} />
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
                            <Text style={styles.modalText}>Save Changes</Text>
                            <Text style={[styles.modalText, { textAlign: 'center', fontSize: fontSize.regular, fontFamily: fontFamily.appTextRegular, width: responsiveWidth(60) }]}>{'Are you sure to save the profile changes?'}</Text>
                            <View style={styles.buttonView}>
                                <ModalButton backgroundColor={colors.whiteText} Title={'Cancel'} btnColor={colors.button} onPress={() => setModalVisible(false)} />
                                <ModalButton backgroundColor={colors.button} btnColor={colors.whiteText} Title={'Save'} onPress={() => {
                                    onPressSavebtn()
                                }} activity={loading}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                </ScrollView>
            </View>
        </ImageBackground>

    )
}
export default EditCoachProfile
