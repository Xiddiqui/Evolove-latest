import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    Modal,
    FlatList
} from 'react-native'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/fonts'
import { DataSource } from '../../../../services/app/getBlogCat'
import { styles } from './style'

const BlogSubmission = (props) => {
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')
    const [category, setcategory] = useState('Select Category')
    const [categoryError, setCategoryError] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    const handleOnChangeTitleText = Title => {
        !Title
            ? setTitleError('')
            : title.length < 1
                ? setTitleError('Min 2 characters')
                : setTitleError('');
        setTitle(Title);
    };

    const validations = () => {
        if (title === '') {
            setTitleError('Enter Title');
            return false;
        }
        else if (title.length < 1) {
            setTitleError('Min 2 characters')
        }
        else if (category === 'Select Category') {
            setCategoryError('Please Select Category')
            return false
        }
        else {
            return true
        }
    }

    const onpressDonebtn = () => {
        if (validations()) {
            props.navigation.navigate('BlogImageSubmission', {
                Title: title,
                Category: category
            })
        }

    }
    const onpressCategoryBtn = () => {
        setModalVisible(true);

    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Blog Submission'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>{'Fill the information for new submission'}</Text>
                <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Blog Title'}</Text>
                <MyTextInput placeholder={'Write Title'} onchange={(txt) => { handleOnChangeTitleText(txt) }} err={titleError} />
                <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Blog Category'}</Text>
                <TouchableOpacity style={styles.textInput} onPress={onpressCategoryBtn}>
                    <Text style={styles.lable}>{category}</Text>
                </TouchableOpacity>
                {categoryError ? 
                <Text style={styles.err}>{categoryError}</Text>:null
                }
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Continue'} onPress={onpressDonebtn} />
                </View>
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
                            <Text style={styles.modalText}>Select Category</Text>
                            <FlatList
                                data={DataSource}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={styles.catitemview} onPress={() => {
                                            setcategory(item.name)
                                            setModalVisible(false)
                                        }}>
                                            <Text style={styles.catitemtxt}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    )
}
export default BlogSubmission