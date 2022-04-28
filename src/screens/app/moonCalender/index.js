import React, { useState } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../globals/utilities/assets'
import { AppHeader, AppHeaderwithBack, AppHeaderwithBackwithnothirdbtn, AppLogoHeader, AppLogoHeaderwithBack } from '../../../components/general/header'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { Icon } from 'react-native-elements'
import moment from 'moment'
import Toast from 'react-native-simple-toast';
import { getAllOfCollection, getData } from '../../../Backend/utility'
// import { moonData } from '../../../services/app/moonDataSet'

const MoonCalander = (props) => {
    const [moondetails, setMoondetail] = useState([])
    const [selectedDate, setSelectedDate] = useState('')
    const [dataSource, setDataSource] = useState(null)
    const [markedDates, setMarkedDates] = useState(null)

    const _renderArrow = (direction) => {
        if (direction === 'left') {
            return (
                <View style={[styles.calanderbtn, { marginLeft: responsiveWidth(15) }]}>
                    <Icon name={'chevron-small-left'} type={'entypo'} color={colors.whiteText} />
                </View>
            )
        } else {
            return (
                <View style={[styles.calanderbtn, { marginRight: responsiveWidth(15) }]}>
                    <Icon name={'chevron-small-right'} type={'entypo'} color={colors.whiteText} />
                </View>
            )
        }
    }

    const moonDetails = async (day) => {
        // let date = moment(day.dateString).format('yyyyMMDD')
        // var requestOptions = {
        //     method: 'GET',
        //     redirect: 'follow'
        // };

        // fetch(`https://devapi.qweather.com/v7/astronomy/moon?location=1E98E&date=${date}&lang=en&key=29fe397cc6be4f349be6e3034fb9bdd0`, requestOptions)
        //     .then(response => response.json())
        //     .then(result => {

        //         setMoondetail(result.moonPhase)
        //         console.log(result)
        //         setDataSource(result)
        //     })
        //     .catch(error => {
        //         console.log('error', error)
        //         Toast.show('Please try again')
        //     })
        await getAllOfCollection('MoonCalander').then((moonData)=>{
            console.log('moon', moonData)
            let filteredMoon = moonData.filter((item) => item.month === day.month)
            console.log('filterd', filteredMoon)
            filteredMoon.map((element) => {
                let arr = [...element.fullMoondate]
                let fullMoon = arr.includes(day.day)
                if (fullMoon === true) {
                    let arr1 = [...element.Blog]
                    let filterBlog = arr1.filter((item) => item.Date === day.dateString)
                    console.log('>><<',filterBlog)
                    setMoondetail(filterBlog)
                    let arr = [{
                        name: 'Full Moon',
                        image: appImages.Fullmoon,
                        blog: element.Blog
                    }]
                    setDataSource(arr)
                }
                else {
                    let arr2 = [...element.Blog]
                    let filterBlog = arr2.filter((item) => item.Date === day.dateString)
                    console.log('>><<',filterBlog)
                    setMoondetail(filterBlog)
                    let arr = [{
                        name: 'Half Moon',
                        image: appImages.halfMoon,
                        blog: element.Blog
                    }]
                    setDataSource(arr)
                }
            })

        })

    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn text={'Moon Calender'} Back={() => props.navigation.navigate('Home')} />
                <Calendar
                    style={styles.Calendarcontainer}
                    monthFormat={'MMM yyyy'}
                    renderArrow={_renderArrow}

                    // hideExtraDays
                    markingType={'custom'}
                    onDayPress={day => {
                        moonDetails(day)
                        console.log('selected day', day);
                        let markedDates = {};
                        markedDates[day.dateString] = { selected: true, color: '#00B0BF', textColor: '#FFFFFF' };
                        setMarkedDates(markedDates)

                        // setSelectedDate(date)

                    }}

                    markedDates={markedDates
                        // '2022-01-29': {
                        //     customStyles: {
                        //         container: {
                        //             borderWidth: responsiveWidth(0.5),
                        //             borderColor: colors.greenTxt
                        //         },
                        //         // text: {
                        //         //     color: 'black',
                        //         //     fontWeight: 'bold'
                        //         // }
                        //     }
                        // },
                        // '2022-01-14': {
                        //     customStyles: {
                        //         container: {
                        //             borderWidth: responsiveWidth(0.5),
                        //             borderColor: colors.yellow
                        //         },
                        //         // text: {
                        //         //     color: 'blue'
                        //         // }
                        //     }
                        // }
                    }
                    theme={{
                        backgroundColor: colors.iconBackGround,
                        calendarBackground: colors.iconBackGround,
                        textSectionTitleColor: '#b6c1cd',
                        textSectionTitleDisabledColor: '#d9e1e8',
                        selectedDayBackgroundColor: 'red',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: colors.whiteText,
                        textDisabledColor: colors.greyText,
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: colors.whiteText,
                        indicatorColor: 'blue',
                        textDayFontFamily: fontFamily.appTextRegular,
                        textMonthFontFamily: fontFamily.appTextRegular,
                        textDayHeaderFontFamily: fontFamily.appTextRegular,
                        textDayFontWeight: '300',
                        // textMonthFontWeight: 'bold',
                        // textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }}
                />
                {/* <TouchableOpacity style={styles.ringview} onPress={() => props.navigation.navigate('Details', { data: { name: 'Full Moon' } })}>
                    <View style={styles.ring} />
                    <Image source={appImages.Fullmoon} style={styles.moonImage} />
                    <Text style={styles.moontxt}>Full Moon</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ringview} onPress={() => props.navigation.navigate('Details', { data: { name: 'Half Moon' } })}>
                    <View style={[styles.ring, { borderColor: colors.greenTxt }]} />
                    <Image source={appImages.halfMoon} style={styles.moonImage} />
                    <Text style={styles.moontxt}>{'Half Moon'}</Text>
                </TouchableOpacity> */}
                <View>
                    <FlatList
                        data={dataSource}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <TouchableOpacity style={styles.ringview} onPress={() => props.navigation.navigate('Details', { data: item, obj: moondetails })}>
                                        <View style={[styles.ring, { borderColor: colors.greenTxt }]} />
                                        <Image source={item.image} style={styles.moonImage} />
                                        <Text style={styles.moontxt}>{item.name}</Text>
                                    </TouchableOpacity>

                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        </ImageBackground>

    )
}
export default MoonCalander
