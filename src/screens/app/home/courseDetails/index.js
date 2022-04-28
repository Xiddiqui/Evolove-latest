import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
    Share
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../../globals/utilities/assets'
import { AppHeader, AppHeaderwithBack } from '../../../../components/general/header'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../../globals/utilities/colors'
import { PriceBottomCard } from '../../../../components/feed/priceCard'
import { ListItem } from 'react-native-elements/dist/list/ListItem'
import { CircleIconButton } from '../../../../components/general/button'
import Collapsible from "react-native-collapsible";
import Accordion from "react-native-collapsible/Accordion";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SECTIONS } from '../../../../services/app/getItemDetails'
import { fontSize } from '../../../../globals/utilities/size'
import Video from 'react-native-video';
import { addToArray, getData, removeItemfromArray, removeItemfromArrayValue } from '../../../../Backend/utility'
import { getCurrentUserId } from '../../../../Backend/auth'


const CourseDetails = (props) => {
    const { data , purchased} = props.route.params
    console.log('?????......', data)
    const [heartFlag, setHeart] = useState(false)
    const [activeSections, setActiveSections] = useState([])
    const [loading, setLoading] = useState(false)
    const [opacity, setOpacity] = useState(0);
    const [moduleArr, setModuleArr] = useState([])
    const [Fav, setFav] = useState([])

    const video = useRef();

    useEffect(() => {
        // getModulesArr()
        getFav()
    }, [])

    const getModulesArr = async () => {
        await getData('Courses', data.id).then((data) => {
            console.log(data)
            setModuleArr(data.Modules)
        })
    }

    const getFav = async () => {
        let uid = await getCurrentUserId()
        await getData('Users', uid).then((data) => {
            setFav(data.Favorities)
        })
    }
    const favClick = async () => {
        console.log(data.CoachId)
        let uid = await getCurrentUserId()
        await getData('Users', uid).then(async (e) => {
            // setFav(e.Favorities)
            if (Fav.includes(data.id) === false) {
                console.log('yes')
                await addToArray('Users', uid, 'Favorities', data.id)
                let arr = [...Fav]
                arr.push(data.id)
                setFav(arr)
                console.log(arr)
                console.log('add', Fav)
            }
            else {
                console.log('no')
                let arr = [...Fav]
                var aa = arr.indexOf(data.id)
                console.log('ssss', aa)
                arr.splice(aa, 1)
                setFav([...arr])
                console.log('afterSplice', Fav)
            }
            await removeItemfromArray('Users', uid, 'Favorities', aa)

        })
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Please install this app and stay safe , AppLink :https://drive.google.com/file/d/1f0wAaNoWECjNJTqsL7XHbzwRkfAhqnAD/view?usp=sharing',
                    url:'https://drive.google.com/file/d/1f0wAaNoWECjNJTqsL7XHbzwRkfAhqnAD/view?usp=sharing',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const _renderHeader = (section, _, isActive) => {
        return (
            <View
                style={[
                    styles.btn1,
                    isActive
                        ? null
                        : {
                            borderBottomEndRadius: responsiveWidth(4),
                            borderBottomStartRadius: responsiveWidth(4),
                        },
                ]}
            >

                <Text style={styles.Headertxt}>{section.ModuleName}</Text>
                <View style={styles.icon}>
                    <FontAwesome
                        name={isActive ? "angle-up" : "angle-down"}
                        size={fontSize.h3}
                        color={colors.whiteText}
                    />
                </View>
            </View>
        );
    };
    const _renderContent = (section, _, isActive) => {
        return (
            <View
                style={[
                    styles.openbtn,
                    isActive
                        ? null
                        : {
                            borderTopEndRadius: responsiveWidth(3),
                            borderTopStartRadius: responsiveWidth(3),
                        },
                ]}
            >
                <FlatList
                    data={section.ModuleVideoArr}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={()=>{
                                purchased === 'yes' ? 
                                props.navigation.navigate('VideoPlay',{data:item})
                                :
                                alert('Please Purchase to see video')
                                }}>
                                <View style={styles.moduleArrstyle}>
                                    <Text style={styles.collapsablecontent}>
                                        {item.Title}
                                    </Text>
                                    <Text style={styles.collapsablecontent}>
                                        {item.duration}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />

            </View>
        );
    };
    const _updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBack text={'Course'} Back={() => { props.navigation.goBack() }} />
                <View>
                    <Video source={{ uri: data.Video }}
                        ref={video}
                        repeat={false}
                        resizeMode="cover"
                        fullscreen={true}
                        controls={true}
                        paused={false}
                        style={styles.image}

                    />
                </View>
                <View style={styles.publishView}>
                    <Text style={styles.publishername}>
                        {data.CoachName}
                    </Text>
                </View>
                <View style={styles.nameView}>
                    <Text style={styles.name}>{data.Title}</Text>
                </View>
                <View style={styles.circlebtnview}>
                    <CircleIconButton name={'share'} type={'entypo'} onPress={onShare} />
                    {purchased === 'yes' ? 
                    null
                    :
                    <CircleIconButton name={Fav.includes(data.id) ? 'heart' : 'heart-outlined'} type={'entypo'} onPress={favClick} />
                    }
                </View>
                <View>
                    <Text style={styles.descriptiontxt}>
                        Description
                    </Text>
                    <Text style={styles.dis}>
                        {data.Discription}
                    </Text>
                </View>
                {purchased === 'yes' ?
                null: 
                <PriceBottomCard price={data.PriceType === 'Evolove Subscription' ? 'Subscription Required' : '$' + data.Price} onPress={() => data.PriceType === 'Evolove Subscription' ? props.navigation.navigate('Subscription', { data: data }) : props.navigation.navigate('HomeAddCard', { data: data })} />
                }
                <ScrollView>
                    <View style={styles.curriculum}>
                        <Text style={styles.curriculumtxt}>Curriculum</Text>
                    </View>
                    <Accordion
                        sections={data.Modules}
                        activeSections={activeSections}
                        // renderSectionTitle={_renderSectionTitle}
                        renderHeader={_renderHeader}
                        renderContent={_renderContent}
                        onChange={_updateSections}
                        sectionContainerStyle={styles.sectionContainerStyle}
                        containerStyle={styles.maincontainerstyle}
                        underlayColor={colors.iconBackGround}
                        duration={2}
                    />
                </ScrollView>
            </View>
        </ImageBackground>

    )
}
export default CourseDetails
