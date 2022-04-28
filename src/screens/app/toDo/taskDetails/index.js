import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    Modal,
    TextInput
} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { AppButton, AppButtonLarge, ModalButton, SocialButton } from '../../../../components/general/button'
import { DateSelect, TimeSelect } from '../../../../components/general/dateTimePicker'
import { AppHeaderwithBack, AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontFamily } from '../../../../globals/utilities/fonts'
import { fontSize } from '../../../../globals/utilities/size'
import { styles } from './style'
import { deleteDoc, getData, saveData } from '../../../../Backend/utility'
import moment from 'moment'
import { ActivityIndicator } from 'react-native'

const TaskDetails = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { data } = props.route.params
    const [discription, setDiscription] = useState('')
    const [time , setTime] = useState('')
    const [descriptionFlag , setDescriptionFlag] = useState(false)
    const [loading , setLoading] = useState(false)

    useEffect(() => {
        getTasks()
        // timeDiff()
    },[])
    const getTasks = () => {
        getData('Tasks', data.id).then((a) => {
            setDiscription(a.Details)
        timeDiff()
        })
    }
    const timeDiff = () => {
        var startTime = moment(data.StartTime, 'HH:mm:ss a');
        var endTime = moment(data.EndTime, 'HH:mm:ss a');

        // calculate total duration
        var duration = moment.duration(endTime.diff(startTime));

        // duration in hours
        var hours = parseInt(duration.asHours());

        // duration in minutes
        var minutes = parseInt(duration.asMinutes()) % 60;
        setTime(hours + ' hour and ' + minutes + ' minutes.');
    }

    const onPressCompleteBtn = async() => {
        setLoading(true)
        await saveData('Tasks',data.id,{
            completed:true
        }).then(()=>{
            setLoading(false)
            props.navigation.navigate('Todo')
        })
    }
    const deleteTask = async() => {
        await deleteDoc('Tasks' , data.id).then(()=>{
            setModalVisible(false)
            props.navigation.navigate('Todo')
            
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBack
                    text={'My Tasks'}
                    Back={() => props.navigation.goBack()}
                />
                <View style={styles.taskList}>
                    <View style={styles.listinner} onPress={() => { props.navigation.navigate('TaskDetails') }}>
                        <Image source={appImages.YellowCircle} style={styles.taskIcon} />
                        <Text style={styles.taskListtxt}>{data.TaskName}</Text>
                    </View>
                </View>
                <View>
                    <TextInput style={styles.dis}
                        value={discription}
                        multiline={true}
                        editable={descriptionFlag}
                        onChangeText={(txt)=>{         
                            setDiscription(txt)
                            
                            }}
                    />
                </View>
                <View style={styles.card}>
                    <View style={styles.cardToptxt}>
                        <Text style={styles.cardtxt}>{data.Date}</Text>
                        <Text style={styles.cardtxt}>{data.StartTime + '-' + data.EndTime}</Text>
                    </View>
                    <View style={styles.durationView}>
                        <Icon name={'clock'} type={'feather'} color={colors.whiteText} size={fontSize.small} />
                        <Text style={styles.durationtxt}>{time}</Text>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.greycircle} onPress={() => { setModalVisible(true); }}>
                        <Icon name='delete' type={'antdesign'} color={colors.whiteText} size={fontSize.h4} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.greycircle} onPress={()=>{props.navigation.navigate('EditTask',{data:data})}}>
                        <Icon name='edit-3' type={'feather'} color={colors.whiteText} size={fontSize.h4} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.greycircle}>
                        <Icon name='share' type={'entypo'} color={colors.whiteText} size={fontSize.h4} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.greenbtn} onPress={onPressCompleteBtn}>
                        {loading ? 
                        <ActivityIndicator size={'small'} color={colors.whiteText}/>:
                        <Text style={styles.greenbtntxt}>Complete</Text>
                        }
                    </TouchableOpacity>
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
                            <Text style={styles.modalText}>Delete</Text>
                            <Text style={[styles.modalText, { textAlign: 'center', fontSize: fontSize.regular, fontFamily: fontFamily.appTextRegular, width: responsiveWidth(60) }]}>{'Are you sure to delete this item? you will not be able to recover it'}</Text>
                            <View style={styles.ModalbuttonView}>
                                <ModalButton backgroundColor={colors.whiteText} Title={'Cancel'} btnColor={colors.button} onPress={() => setModalVisible(false)} />
                                <ModalButton backgroundColor={colors.button} btnColor={colors.whiteText} Title={'Delete'} onPress={deleteTask} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    )
}
export default TaskDetails