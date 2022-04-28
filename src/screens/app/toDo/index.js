import React, { useState, useRef, useEffect } from 'react'
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
import { appImages } from '../../../globals/utilities/assets'
import { AppHeader } from '../../../components/general/header'
import { ListButton } from '../../../components/general/button'
import { DataSource } from '../../../services/app/getBlogCat'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import SearchInput from '../../../components/general/searchInput'
import { BlogPosts } from '../../../components/feed/blogPostscard'
import { BlogsDataSource } from '../../../services/app/getblogPosts'
import { ShopScreenCard } from '../../../components/feed/shopscreencard'
import { RecentDataSource } from '../../../services/app/getShopData'
import { colors } from '../../../globals/utilities/colors'
import CalendarStrip from 'react-native-calendar-strip'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { TasksDataSource } from '../../../services/app/getTasks'
import { getAllOfCollection, getDocByKeyValue } from '../../../Backend/utility'
import { db } from '../../../Backend/firebaseConfig'
import { getCurrentUserId } from '../../../Backend/auth'
import { ListEmpty } from '../../../components/feed/listEmpty'

const TODO = (props) => {
    const dateStripRef = useRef()
    const [tasksArrsy, setTasksArray] = useState([])

    useEffect(() => {
        db.collection('Tasks').onSnapshot(() => {
            getTasks()
        })
        getTasks()
    }, [])

    const getTasks = async () => {
        let uid = await getCurrentUserId()
        getDocByKeyValue('Tasks', 'UserId', uid).then((data) => {
            let fiterdArr = data && data.filter((item)=>item.completed === false)
            setTasksArray(fiterdArr)
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeader text={'Task'} name={'notifications-none'}
                    type={'material'} onPress={() => { props.navigation.navigate('Notification') }} />
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
                        iconContainer={{ position: 'absolute', top: 0, left: 0, borderRadius: responsiveWidth(7 / 2) }}
                        iconRightStyle={styles.iconright}
                        iconLeftStyle={styles.iconleft}
                        iconRight={require('../../../res/images/icons/left.png')}
                        iconLeft={require('../../../res/images/icons/right.png')}
                    />
                </View>
                <View style={styles.flatlistView}>
                    <FlatList
                        data={tasksArrsy}
                        ListEmptyComponent={<ListEmpty text={'No Task found'}/>}
                        renderItem={({ item }) => (
                            <View style={styles.taskList}>
                                <TouchableOpacity style={styles.listinner} onPress={() => { props.navigation.navigate('TaskDetails', { data: item }) }}>
                                    <Image source={appImages.YellowCircle} style={styles.taskIcon} />
                                    <Text style={styles.taskListtxt}>{item.TaskName}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                </View>
                <View style={styles.iconsView}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('AddTask')}>
                        <Image source={appImages.addIcon} style={styles.CircleBtn} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Calander')}>
                        <Image source={appImages.Calander} style={styles.CircleBtn} />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>

    )
}
export default TODO
