import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    TextInput,
    FlatList
} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/fonts'
import { styles } from './style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ActivityIndicator } from 'react-native'
import { uriToBlob, downloadImage, saveDataWithoutDocId, saveData, getData, addToArrayUpdate } from '../../../../Backend/utility'
import { storage } from '../../../../Backend/firebaseConfig'
import moment from 'moment';

const AddModulevideo = (props) => {
    const [moduleArr, setModuleArr] = useState()
    // const [videoArr, setVideoArr] = useState([])
    const [module, setModule] = useState('')
    const [videoLoading, setVideoLoading] = useState(false)
    const [duration, setDuration] = useState(0)
    const [cont , setCont] = useState(false)
    const { name, index, Title, Category, Discription, CoverImage, Video, courseId ,videoArr} = props.route.params
    console.log(videoArr)
    useEffect(() => {
        setModuleArr(videoArr)
    }, [])

    const getModules = async () => {
        await AsyncStorage.getItem('module').then((data) => {
            const moduleList = [...JSON.parse(data)]
            console.log('!!!!!', moduleList)
            setModuleArr(moduleList)
        })
    }
    const ModuleVideo = async () => {
        var options = {
            title: 'Introduction Video',
            mediaType: 'video',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, async (response) => {
            console.log(">>>>AAAAA", response)
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                if (Platform.OS === 'ios') {
                    await createThumbnail({
                        url: response.uri,
                        // timeStamp:1000,
                        // format:'png',
                        // headers:{ Authorization: item.id.toString() }
                    })
                        .then((res) => {
                            let thumbnail =
                                Platform.OS === 'android' ? res.path : 'file:///' + res.path;
                            // console.log(response)
                            // console.log(uri)
                            setThumbnail(thumbnail)
                            console.log('item thumbnail', thumbnail);
                        })
                        .catch((err) => console.log({ err }));
                } else {
                    let thumbnail = response.assets[0].uri;
                    console.log(thumbnail);
                    savevideo(response.assets[0])
                }
            }
        });
    };
    const savevideo = async (res) => {
        setVideoLoading(true)
        console.log('>>>', res)
        let VideoResponce = res
        let imagePath = res.fileName
        let uri = res.uri
        var today1 = new Date();
        var mili1 = today1.getMilliseconds();
        let kk1 = Date.parse(today1);
        kk1 = kk1 + mili1;
        const uploadTask = storage
            .ref(`moduleVideo/${imagePath}`)
            .putFile(uri);
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
                await downloadImage('moduleVideo', imagePath).then(
                    async (uri) => {
                        console.log(uri)
                        console.log('???', Math.floor(res.duration / 60) + ':' + res.duration)
                        let arr = [...moduleArr]
                        let minute = Math.floor(res.duration / 60)
                        let sec = res.duration < 10 ? "0" + res.duration : res.duration
                        let abc = sec > 60 ? JSON.stringify(sec[1]) : sec
                        let time = Math.floor(res.duration / 60) + ":" + (res.duration % 60 ? res.duration % 60 : '00')
                        console.log({ time })

                        arr.push({
                            Title: module,
                            Video: uri,
                            duration: time
                        })
                        setModuleArr(arr)
                        // setIntrovideo(uri)
                        setVideoLoading(false)
                    }
                )
            },
        )

    }
    const onPressDoneBtn = async () => {
        setCont(true)
        let obj = {
            VideoArr: moduleArr,
            id: courseId
        }
            await getData('Courses', courseId).then(async (data1) => {
                let abc = [...data1.Modules]
                abc[index].ModuleVideoArr = moduleArr
                await saveData('Courses', courseId, {
                    Modules: abc
                }).then(() => {
                    setCont(false)
                    props.navigation.navigate('AddModule', {
                        Title: Title,
                        Category: Category,
                        Discription: Discription,
                        CoverImage: CoverImage,
                        Video: Video,
                        courseId: courseId
                    })
                })
        })
    }
    const addModule = () => {
        let arr = [...moduleArr]
        arr.push({
            ModuleName: module
        })
        console.log(arr)
        setModuleArr(arr)
        setModule('')
    }
    const delModule = (index) => {
        let arr = [...moduleArr]
        arr.splice(index, 1)
        setModuleArr(arr)
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Course Submission'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>{'Create modules and complete the course curriculum'}</Text>
                <View style={{ width: responsiveWidth(90), alignSelf: 'center' }}>
                    <Text style={styles.titletext}>Module</Text>
                    <Text style={styles.circletxt}>{name}</Text>

                </View>
                <View>
                    <FlatList data={moduleArr}
                        renderItem={({ item, index }) => (
                            <View style={styles.flatlistView}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.flatListText}>{item.Title}</Text>
                                    <Text style={styles.flatListText1}>{item.duration}</Text>
                                </View>
                                <Icon name={'delete'} type={'antdesign'} color={colors.whiteText} onPress={() => delModule(index)} />
                            </View>
                        )}
                    />
                </View>
                <View style={styles.moduleInputView}>
                    <TextInput style={styles.input} onChangeText={(text) => setModule(text)} value={module} placeholder={'Video 1'} placeholderTextColor={colors.whiteText} />
                    <TouchableOpacity style={styles.addBtn} onPress={ModuleVideo}>
                        {videoLoading ?
                            <ActivityIndicator size={'small'} color={colors.whiteText} /> :
                            <View>
                                <Icon name={'video-camera'} type={'entypo'} color={colors.whiteText} size={15} />
                                <Text style={styles.btnTxt}>Upload Video</Text>
                            </View>
                        }

                    </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Continue'} onPress={onPressDoneBtn} activity={cont}/>
                </View>

            </View>
        </ImageBackground>
    )
}
export default AddModulevideo