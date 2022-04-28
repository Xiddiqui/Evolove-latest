import React, { useState , useEffect} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native'
import { responsiveHeight , responsiveWidth } from 'react-native-responsive-dimensions'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import { DateSelect, TimeSelect } from '../../../../components/general/dateTimePicker'
import { AppHeaderwithBack, AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/size'
import { styles } from './style'
import {getCurrentUserId} from '../../../../Backend/auth'
import {saveDataWithoutDocId , saveData} from '../../../../Backend/utility'

const EditTask = (props) => {
    const [showCalender, setShowCalender] = useState(false);
    const [showClock, setShowClock] = useState(false);
    const [Date, setDate] = useState('');
    const[dateError , setDateError] = useState('')
    const [time , setTime] = useState('')
    const [timeError , setTimeError] = useState('')
    const [endTime , setEndTime] = useState('')
    const [endTimeError , setEndTimeError] = useState('')
    const [taskName , setTastName] = useState('')
    const [taskNameError , setTaskNameError] = useState('')
    const [taskDetails , setTaskDetals] = useState('')
    const [taskDetailErr , setDetailsErr] = useState('')
    const [loading , setLoading] = useState(false)

    
    const validations = () => {
        if(Date === ''){
            setDateError('Enter Date')
            return false
        }
        else if(time === ''){
            setTimeError('Enter Start Time')
            return false
        }
        else if (endTime === ''){
            setEndTimeError('Enter End Time')
            return false
        }
        else if (taskName === ''){
            setTaskNameError('Enter Task Name')
            return false
        }
        else if(taskDetails === ''){
            setDetailsErr('Enter Task Details')
            return false
        }
        else{
            return true
        }
    }
    
    const {data} = props.route.params
    console.log('<<<<',data)
    useEffect(()=>{
        setDate(data.Date)
        setTime(data.StartTime)
        setEndTime(data.EndTime)
        setTastName(data.TaskName)
        setTaskDetals(data.Details)
    },[])

    const onPressDoneBtn = async () => {
        if(validations()){
            setLoading(true)
            let uid = await getCurrentUserId()
            let obj = {
                Date : Date,
                StartTime:time,
                EndTime:endTime,
                TaskName:taskName,
                Details:taskDetails,
                UserId:uid,
                completed:false,
                //duplicate due to timeline liberary
                name:taskName,
                title:taskName,
                time:time,
                description:taskDetails
            }
            await saveData('Tasks' ,data.id ,obj).then((data)=>{
                props.navigation.navigate('Todo')
                    setLoading(false)
            })

        }
    }
        
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBack
                    text={'Edit Task'}
                    Back={() => props.navigation.goBack()}
                />
                <ScrollView>
                <View>
                <Text style={[styles.toptxt, { color: colors.txtInputborder, marginTop: responsiveHeight(4) }]}>{'Date'}</Text>
                <DateSelect isVisible={showCalender}
                    iconStyle={{ marginLeft: responsiveWidth(52) }}
                    style={styles.calanderBtn}
                    initialDate={Date}
                    getDate={date => {
                        setDate(date);
                    }} />
                    {dateError ? <Text style={styles.errortxt}>{dateError}</Text>:null}
                </View>
                    <Text style={[styles.toptxt, { color: colors.txtInputborder, marginTop: responsiveHeight(1) }]}>{'Start Time'}</Text>
                <TimeSelect isVisible={showClock}
                    iconStyle={{ marginLeft: responsiveWidth(55) }}
                    style={styles.calanderBtn}
                    placeHolder={'Select Time'}
                    initialDate={time}
                    getDate={date => {
                        setTime(date);
                    }} />
                    {timeError ? <Text style={styles.errortxt}>{timeError}</Text>:null}
                    <Text style={[styles.toptxt, { color: colors.txtInputborder, marginTop: responsiveHeight(1) }]}>{'End Time'}</Text>
                <TimeSelect isVisible={showClock}
                    iconStyle={{ marginLeft: responsiveWidth(55) }}
                    style={styles.calanderBtn}
                    placeHolder={'Select Time'}
                    initialDate={endTime}
                    getDate={date => {
                        setEndTime(date);
                    }} />
                    {endTimeError ? <Text style={styles.errortxt}>{endTimeError}</Text>:null}
                <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Task name'}</Text>
                <MyTextInput placeholder={'Task name'} value={taskName} onchange={(txt)=>{setTastName(txt)}} err={taskNameError}/>
                <Text style={[styles.toptxt, { color: colors.txtInputborder, marginTop: responsiveHeight(4) }]}>{'Task Details'}</Text>
                <MyTextInput multiline={true} value={taskDetails} onchange={(txt)=>{setTaskDetals(txt)}} err={taskDetailErr}/>
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'save'} onPress={onPressDoneBtn} activity={loading}/>
                </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}
export default EditTask