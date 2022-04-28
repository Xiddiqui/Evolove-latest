import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    TextInput,
    FlatList,
    ActivityIndicator,
    ToastAndroid
} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontFamily, fontSize } from '../../../../globals/utilities/fonts'
import { styles } from './style'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import ImagePicker from 'react-native-image-crop-picker';
import { Image } from 'react-native-compressor';
import { uriToBlob, downloadImage } from '../../../../Backend/utility'
import { storage } from '../../../../Backend/firebaseConfig'
import FastImage from 'react-native-fast-image'

const WriteBlog = (props) => {

    const [blogtxt, setBlogTxt] = useState('')
    const { Title, Category, FeatureImage } = props.route.params
    const [loading, setLoding] = useState(false)
    const [discription, setDiscription] = useState('')
    const [blogData, setBlogData] = useState([
        {
            text: '',
            imageflag: false,
            image: '',
            loading: false
        }

    ])
    const [blogError , setBlogError] = useState('')

    const onpressAddImageBtn = () => {
        let arr = [...blogData]
        arr.push({
            text: '',
            imageflag: true,
            image: '',
            loading: false
        })
        setBlogData(arr)
    }

    const uploadImage = (index) => {
        ImagePicker.openPicker({
            width: responsiveWidth(90),
            height: responsiveHeight(20),
            cropping: true
        }).then(image => {
            console.log(image);
            SaveImagetodb(image, index)
        });
    }
    const SaveImagetodb = async (res, index) => {
        let arr = [...blogData]
        arr[index].loading = true
        setBlogData(blogData)
        console.log(blogData[index])
        const BlogImageResponse = await Image.compress(res.path, {
            maxWidth: 1000,
            quality: 0.1,
        });
        console.log('helooo', index)
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
                        let arr = [...blogData]
                        arr[index].image = uri
                        arr[index].loading = false
                        setBlogData(arr)
                        setLoding(false)
                    }

                });
            },
        );
    }
    const onPressDoneBtn = () => {
        blogData.map((item)=>{
            if(item.text === '') {
                setBlogError('Please write blog')
            }
            else{
                props.navigation.navigate('BlogPricetype', {
                    FeatureImage: FeatureImage,
                    Title: Title,
                    Category: Category,
                    BlogText: blogData,
                    Discription: discription
                })
    
            }
            
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Blog Submission'}
                    Back={() => props.navigation.goBack()}
                />
                <ScrollView>
                    <Text style={styles.toptxt}>{'Write your blog here'}</Text>
                    <View style={styles.writeblogview}>
                        <Text style={[styles.toptxt, { color: colors.txtInputborder, marginTop: 0 }]}>{'Write Blog here'}</Text>
                        <TouchableOpacity onPress={onpressAddImageBtn}>
                            <Text style={styles.addImagebtn}>
                                Add image
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.txtinput}>
                        <FlatList
                            data={blogData}
                            renderItem={({ item, index }) => {
                                return (
                                    <View>
                                        {item.imageflag ?
                                            null :
                                            <TextInput style={styles.innertxtinput} multiline onChangeText={(txt) => {
                                                let arr = [...blogData]
                                                arr[index].text = txt
                                                setBlogData(arr)
                                                setDiscription(txt)
                                            }}
                                                placeholder={'Write Text Here'}
                                                placeholderTextColor={colors.whiteText}
                                            />
                                        }

                                        {item.imageflag ?
                                            <View>

                                                <View>
                                                    {
                                                        item.image ?
                                                            <FastImage source={{ uri: item.image }} style={styles.addimagecard} />
                                                            :
                                                            <View>
                                                                {
                                                                    item.loading ?
                                                                        <ActivityIndicator size={'small'} color={colors.button} /> :
                                                                        <TouchableOpacity style={styles.addimagecard} onPress={() => { uploadImage(index) }}>
                                                                            <View>
                                                                                <Icon name={'camera'} type={'entypo'} color={colors.whiteText} />
                                                                                <Text style={styles.uploadtxt}>
                                                                                    Upload here
                                                                                </Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                }
                                                                    </View>

                                                    }
                                                </View>
                                                <TextInput style={styles.innertxtinput} multiline onChangeText={(txt) => {
                                                    let arr = [...blogData]
                                                    arr[index].text = txt
                                                    setBlogData(arr)
                                                    setDiscription(txt)
                                                }}
                                                    placeholder={'Write Text Here'}
                                                    placeholderTextColor={colors.whiteText}
                                                />
                                            </View>
                                            : null
                                        }

                                    </View>
                                )
                            }}
                        />
                    </View>
                    {blogError ? 
                    <Text style={{color:'red',marginLeft:responsiveWidth(5),marginTop:responsiveHeight(1),fontFamily:fontFamily.appTextRegular}}>{blogError}</Text>
                    :null
                    }
                    <View style={styles.buttonView}>
                        <AppButtonLarge Title={'Continue'} onPress={onPressDoneBtn} />
                    </View>
                    <View style={styles.footer} />
                </ScrollView>
            </View>
        </ImageBackground>
    )
}
export default WriteBlog