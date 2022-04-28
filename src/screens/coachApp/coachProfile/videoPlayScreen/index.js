import React, { useState, useRef } from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../../globals/utilities/assets'
import { AppHeader, AppHeaderwithBack, AppHeaderwithBackwithnothirdbtn } from '../../../../components/general/header'
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


const VideoPlay = (props) => {
    const { data } = props.route.params
    const [heartFlag, setHeart] = useState(false)
    const [activeSections, setActiveSections] = useState([])
    const [loading, setLoading] = useState(false)
    const [opacity, setOpacity] = useState(0);
    console.log('??>>.', data)
    const video = useRef();

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
                            <View style={styles.moduleArrstyle}>
                                <Text style={styles.collapsablecontent}>
                                    {item.Title}
                                </Text>
                                <Text style={styles.collapsablecontent}>
                                    {item.duration}
                                </Text>
                            </View>
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
                <AppHeaderwithBackwithnothirdbtn text={'Video Player'} Back={() => { props.navigation.goBack() }} />
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
            </View>
        </ImageBackground>

    )
}
export default VideoPlay
