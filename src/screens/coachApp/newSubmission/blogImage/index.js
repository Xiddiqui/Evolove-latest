import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    ActivityIndicator
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
import {uriToBlob , downloadImage} from '../../../../Backend/utility'
import {storage} from '../../../../Backend/firebaseConfig'
import FastImage from 'react-native-fast-image'

const BlogImageSubmission = (props) => {
    const { Title, Category} = props.route.params
    const [coverImage, setCoverImage] = useState('')
    const [coverImageError, setCoverImageError] = useState('')
    const [loading, setLoding] = useState(false)

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
            quality: 0.8,
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
        const uploadTask = storage.ref(`blogImage/${imagePath}`).put(file);
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
                await downloadImage('blogImage', imagePath).then(async (uri) => {
                    if (uri) {
                        console.log(uri)
                        setCoverImage(uri)
                        setLoding(false)
                    }

                });
            },
        );
    }
    const onpressDonebtn = () => {
        if(coverImage === ''){
            setCoverImageError('Please add featureImage')
        }
        else{
            props.navigation.navigate('WriteBlog',{
                FeatureImage:coverImage,
                Title:Title,
                Category:Category
            })
        }
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Blog Submission'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>{'Upload feature image of the blog'}</Text>
                <Text style={styles.titletext}>Feature Image</Text>
                {loading ? 
                <ActivityIndicator color={colors.button} size={'large'}/>
                :
                <View>
                {
                    coverImage ?
                        <FastImage source={{ uri: coverImage }} style={[styles.card]} /> :
                        <TouchableOpacity style={styles.card} onPress={CoverImage}>
                            <Icon name={'camera'} type={'entypo'} color={colors.whiteText} />
                            <Text style={styles.uploadtxt}>
                                Upload here
                            </Text>
                        </TouchableOpacity>
                }
                </View>
                }
                <Text style={{ color: 'red', marginLeft: responsiveWidth(5), marginTop: responsiveHeight(2) }}>{coverImageError}</Text>
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Continue'} onPress={onpressDonebtn} />
                </View>
            </View>
        </ImageBackground>
    )
}
export default BlogImageSubmission