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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style'
import { getData, saveData } from '../../../../Backend/utility'
import { db } from '../../../../Backend/firebaseConfig'
import Toast from 'react-native-simple-toast';


const AddModule = (props) => {
    const [moduleArr, setModuleArr] = useState([])
    const { Title, Category, Discription, CoverImage, Video, courseId } = props.route.params
    const [module, setModule] = useState('')
    console.log('>>>>', courseId)
    useEffect(() => {
        db.collection('Courses').onSnapshot(() => {
            getModule()
        })
        getModule()
    }, [])
    const addModule = async () => {
        if (module === '') {
            Toast.show('Please enter Name')
        }
        else {
            let arr = [...moduleArr]
            arr.push({
                ModuleName: module,
                ModuleVideoArr: ''
            })
            console.log(arr)
            setModuleArr(arr)
            await saveData('Courses', courseId, {
                Modules: arr
            }).then(() => {
                setModule('')
            })
        }



    }
    const delModule = async (index) => {
        // let arr = [...moduleArr]
        await getData('Courses', courseId).then((data) => {
            console.log('???', data.Modules)
            let arr = [...data.Modules]
            arr.splice(index, 1)
            setModuleArr(arr)
            saveData('Courses' , courseId ,{
                Modules : arr
            }).then(()=>{
                console.log('deleted')
            })
        })

    }
    const onpressDonebtn = async () => {
        moduleArr.map((item) => {
            if(item.ModuleVideoArr === ''){
                Toast.show('Please Add video')
            }
            else{

                props.navigation.navigate('CoursePricetype', {
                    Title: Title,
                    Category: Category,
                    Discription: Discription,
                    CoverImage: CoverImage,
                    Video: Video,
                    Modules: moduleArr,
                    courseId: courseId
                })
            }
        })
    }
    const getModule = async () => {
        await getData('Courses', courseId).then((data) => {
            console.log('???', data)
            setModuleArr(data.Modules)
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Course Submission'}
                    Back={() => props.navigation.goBack()}
                />
                <ScrollView>
                    <Text style={styles.toptxt}>{'Create modules and complete the course curriculum'}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: responsiveWidth(90), alignSelf: 'center', alignItems: 'center' }}>
                        <Text style={styles.titletext}>Modules</Text>
                        <View style={styles.circle}>
                            <Text style={styles.circletxt}>{moduleArr.length}</Text>
                        </View>
                    </View>
                    <View>
                        <FlatList data={moduleArr}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={styles.flatlistView} onPress={() => {
                                    props.navigation.navigate('AddModulevideo', {
                                        name: item.ModuleName,
                                        videoArr: item.ModuleVideoArr,
                                        index: index,
                                        Title: Title,
                                        Category: Category,
                                        Discription: Discription,
                                        CoverImage: CoverImage,
                                        Video: Video,
                                        Modules: moduleArr,
                                        courseId: courseId
                                    })
                                    console.log('ddd', item)
                                }}>
                                    <Text style={styles.flatListText}>{item.ModuleName}</Text>
                                    <Icon name={'delete'} type={'antdesign'} color={colors.whiteText} onPress={() => delModule(index)} />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={styles.moduleInputView}>
                        <TextInput style={styles.input} onChangeText={(text) => setModule(text)} value={module} placeholder={'Add Module'} placeholderTextColor={colors.whiteText} />
                        <TouchableOpacity style={styles.addBtn} onPress={addModule}>
                            <Icon name={'add'} type={'material'} color={colors.whiteText} />
                            <Text style={styles.btnTxt}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    {moduleArr.length === 0 ?
                        <View style={styles.buttonView}>
                            <View style={styles.Button}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </View>
                        </View>
                        :
                        <View style={styles.buttonView}>
                            <AppButtonLarge Title={'Continue'} onPress={onpressDonebtn} />
                        </View>
                    }
                </ScrollView>
            </View>
        </ImageBackground>
    )
}
export default AddModule