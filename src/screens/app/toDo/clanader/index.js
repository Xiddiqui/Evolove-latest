import React, { useState, useRef , useEffect} from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../../globals/utilities/assets'
import { AppHeader, AppHeaderwithBack } from '../../../../components/general/header'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import { colors } from '../../../../globals/utilities/colors'
import CalendarStrip from 'react-native-calendar-strip'
import Timeline from 'react-native-timeline-flatlist'
import { TasksDataSource } from '../../../../services/app/getTasks'
import { getAllOfCollection, getDocByKeyValue } from '../../../../Backend/utility'
import {getCurrentUserId} from '../../../../Backend/auth'
import { db } from '../../../../Backend/firebaseConfig'
import moment from 'moment'

const Calander = (props) => {
    const dateStripRef = useRef()
    const [DataSource , setDataSource]= useState([])

    useEffect(()=>{
        // getAllOfCollection('Tasks').then((data)=>{
        //     setDataSource(data)
        // })
        // db.collection('Tickets').onSnapshot(()=>{
        //     getFestivals()
        // })
        // getFestivals()
    },[])

    const getFestivals = async(MyDate) => {
        let uid = await getCurrentUserId()
        getDocByKeyValue('Tickets' , 'Status' ,'Active').then((item)=>{
           console.log(item)
           let arr = [...item]
           arr && arr.map((element)=>{
               console.log(element.Users)
               let arr1 = [...element.Users]
                if(arr1.includes(uid)){
                    console.log('done')
                let filtered = arr.filter((a)=> a.Date === MyDate)
                    setDataSource(filtered)
                }
           }) 
        })
    }
    // let arr =[item]
    // arr && arr.map((element)=>{
    //     let arr1 = [...element.Users]
    //     console.log('ddd',element.Users)
    //     if(arr1.includes(uid)){
    //         setDataSource(item)
    //         console.log(item)
    //     }
    // })
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBack text={'Calander'} Back={() => { props.navigation.goBack() }} />
                <View>
                    <CalendarStrip
                        calendarAnimation={{ type: 'sequence', duration: 30 }}
                        daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white' }}
                        style={styles.stripContainer}
                        calendarHeaderStyle={styles.stripheadertxt}
                        calendarColor={colors.iconBackGround}
                        dateNumberStyle={{ color: colors.txtInputborder }}
                        dateNameStyle={{ color: colors.greyText }}
                        highlightDateNumberStyle={{ color: 'white' }}
                        highlightDateNameStyle={{ color: 'white' }}
                        disabledDateNameStyle={{ color: 'grey' }}
                        disabledDateNumberStyle={{ color: 'grey' }}
                        onDateSelected={(date)=>{
                           let MyDate = moment(date).format('YYYY-MM-DD') 
                           getFestivals(MyDate)
                            }}
                        iconContainer={{ position: 'absolute', top: 0, left: 0, borderRadius: responsiveWidth(7 / 2) }}
                        iconRightStyle={styles.iconright}
                        iconLeftStyle={styles.iconleft}
                        iconRight={require('../../../../res/images/icons/left.png')}
                        iconLeft={require('../../../../res/images/icons/right.png')}
                    />
                </View>
                    <Timeline
                        data={DataSource}
                        onEventPress={()=>props.navigation.navigate('Shop')}
                        style={styles.list}
                        circleSize={-10}
                        titleStyle={styles.listTitle}
                        timeContainerStyle={styles.timeconatainer}
                        timeStyle={styles.timetxt}
                        rowContainerStyle={{width:responsiveWidth(90),alignSelf:"center"}}
                        descriptionStyle={styles.timetxt}
                        eventContainerStyle={styles.eventContainerStyle}
                        circleSize={0}
                        circleColor='transparent'
                        dotColor={'green'}
                        
                        
                    />
            </View>
        </ImageBackground>

    )
}
export default Calander
