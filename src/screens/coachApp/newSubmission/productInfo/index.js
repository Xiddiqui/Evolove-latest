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

const ProductSubmission = (props) => {
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')
    const [category, setcategory] = useState('Select Category')
    const [categoryError, setCategoryError] = useState('')
    const [dis, setDis] = useState('')
    const [disError, setDisError] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    const handleOnChangeTitleText = Title => {
        !Title
            ? setTitleError('')
            : title.length < 1
                ? setTitleError('Min 2 characters')
                : setTitleError('');
        setTitle(Title);
    };
    const handleOnChangeDiscriptionText = Dis => {
        !Dis
            ? setDisError('')
            : dis.length < 11
                ? setDisError('Min 10 characters')
                : setDisError('');
        setDis(Dis);
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
            setCategoryError('Please Select category')
            return false
        }
        else if (dis === '') {
            setDisError('Please Enter discription')
            return false;
        }
        else if (dis.length < 10) {
            setDisError('Min 11 characters')
            return false;
        }
        else {
            return true
        }
    }

    const OnButtonPress = () => {
        if (validations()) {
            props.navigation.navigate('ProductImageSubmission', {
                Title: title,
                Category: category,
                Discription: dis
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
                    text={'Product Submission'}
                    Back={() => props.navigation.goBack()}
                />
                <ScrollView>
                    <Text style={styles.toptxt}>{'Fill the information for new submission'}</Text>
                    <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Product Title'}</Text>
                    <MyTextInput placeholder={'Write Title'} onchange={(txt) => { handleOnChangeTitleText(txt) }} err={titleError} />
                    <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Product Category'}</Text>
                    <TouchableOpacity style={styles.textInput} onPress={onpressCategoryBtn}>
                        <Text style={styles.lable}>{category}</Text>
                    </TouchableOpacity>
                    {categoryError ?
                        <Text style={styles.err}>{categoryError}</Text> : null
                    }
                    <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Product Description'}</Text>
                    <MyTextInput placeholder={'Product Description'} onchange={(txt) => { handleOnChangeDiscriptionText(txt) }} err={disError} />
                    <View style={styles.buttonView}>
                        <AppButtonLarge Title={'Continue'} onPress={OnButtonPress} />
                    </View>
                </ScrollView>
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
export default ProductSubmission