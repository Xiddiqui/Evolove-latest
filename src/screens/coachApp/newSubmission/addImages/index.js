import React, { useState, useRef } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    ScrollView
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
import ImagePicker from 'react-native-image-crop-picker';
import { Image } from 'react-native-compressor';
import Video from 'react-native-video';
import { uriToBlob, downloadImage, saveData } from '../../../../Backend/utility'
import { storage } from '../../../../Backend/firebaseConfig'
import FastImage from 'react-native-fast-image'
import { ActivityIndicator } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNVideoHelper from 'react-native-video-helper';

const CourseImageSubmission = (props) => {
    const video = useRef();
    const [coverImage, setCoverImage] = useState('')
    const [coverImageError, setCoverImageError] = useState('')
    const [introVideo, setIntrovideo] = useState('')
    const [introVideoError, setIntrovideoError] = useState('')
    const [loading, setLoding] = useState(false)
    const [thumbnail, setThumbnail] = useState('')
    const [videoLoading, setVideoLoading] = useState(false)
    const { Title, Category, Discription, courseId } = props.route.params

    const validation = () => {
        if (coverImage === '') {
            setCoverImageError('Please add image')
            return false
        }
        else if (introVideo === '') {
            setIntrovideoError('Plaese add video')
            return false
        }
        else {
            return true
        }
    }
    const CoverImage = async () => {
        ImagePicker.openPicker({
            width: responsiveWidth(90),
            height: responsiveHeight(20),
            cropping: true
        }).then(image => {
            console.log(image);
            SaveImagetodb(image)
        });
    };
    const SaveImagetodb = async (res) => {
        setLoding(true)
        const BlogImageResponse = await Image.compress(res.path, {
            maxWidth: 1000,
            quality: 0.1,
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
        const uploadTask = storage.ref(`CourseCoverImage/${imagePath}`).put(file);
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
                await downloadImage('CourseCoverImage', imagePath).then(async (uri) => {
                    if (uri) {
                        console.log(uri)
                        setCoverImage(uri)
                        setLoding(false)
                    }

                });
            },
        );
    }
    const IntroVideo = async () => {
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
                .ref(`CoverThumbnail/${imagePath}`)
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
                    await downloadImage('CoverThumbnail', imagePath).then(
                        async (uri) => {
                            console.log(uri)
                            setIntrovideo(uri)
                            setVideoLoading(false)
                        }
                    )
                },
            )


    }
    const onpressDone = async () => {
        if (validation()) {
            await saveData('Courses', courseId, {
                CoverImage: coverImage,
                Video: introVideo
            }).then(() => {
                props.navigation.navigate('AddModule', {
                    Title: Title,
                    Category: Category,
                    Discription: Discription,
                    CoverImage: coverImage,
                    Video: introVideo,
                    courseId: courseId

                })
            })
        }


    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Course Submission'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>{'Upload cover image and introduction video'}</Text>
                <Text style={styles.titletext}>Cover Image</Text>

                {
                    loading ? <ActivityIndicator size={'large'} color={colors.button} /> :
                        <View>
                            {
                                coverImage ?
                                    <FastImage source={{ uri: coverImage }} style={[styles.card, { resizeMode: 'cover' }]} /> :
                                    <TouchableOpacity style={styles.card} onPress={CoverImage}>
                                        <Icon name={'camera'} type={'entypo'} color={colors.whiteText} />
                                        <Text style={styles.uploadtxt}>
                                            Upload here
                                        </Text>
                                    </TouchableOpacity>
                            }
                        </View>
                }
                {
                    coverImageError ? <Text style={styles.ERR}>{coverImageError}</Text> : null
                }
                <Text style={styles.titletext}>Introduction Video</Text>
                {videoLoading ?
                    <ActivityIndicator size={'large'} color={colors.button} /> :
                    <View>
                        {
                            introVideo ?
                                <View>
                                    <Video source={{ uri: introVideo }}   // Can be a URL or a local file.
                                        ref={video}
                                        controls={true}
                                        // paused={true}
                                        style={styles.card} />
                                </View>
                                :
                                <TouchableOpacity style={styles.card} onPress={IntroVideo}>
                                    <Icon name={'video-camera'} type={'entypo'} color={colors.whiteText} />
                                    <Text style={styles.uploadtxt}>
                                        Upload here
                                    </Text>
                                </TouchableOpacity>
                        }
                    </View>
                }
                {
                    introVideoError ? <Text style={styles.ERR}>{introVideoError}</Text> : null
                }
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Continue'} onPress={onpressDone} />
                </View>
            </View>
        </ImageBackground>
    )
}
export default CourseImageSubmission