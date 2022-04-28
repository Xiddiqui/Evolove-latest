import React, { useState } from 'react'
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
import { AppHeader, AppHeaderwithBack , AppHeaderwithBackwithnothirdbtn } from '../../../../components/general/header'
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

const ProductDetails = (props) => {
    const { data } = props.route.params
    console.log(data)
    const [heartFlag, setHeart] = useState(false)
    const [activeSections, setActiveSections] = useState([])

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

                <Text style={styles.Headertxt}>{section.title}</Text>
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
            >{
                    section.flag ? (
                        <View style={styles.userDetailsView}>
                            <Image source={{uri:section.publisherImage}} style={styles.dp} />
                            <View style={{ marginLeft: responsiveWidth(3) }}>
                                <Text style={styles.userName}>{section.publisherName}</Text>
                                <Text style={[styles.userName, { color: colors.greyText }]}>{section.designation}</Text>
                            </View>
                        </View>
                    ) :
                        null
                }
                {section.reviewFlag ? 
                <View>
                {section.reviews && section.reviews.map((item)=>{
                    return(
                        <View>
                    <View style={styles.userDetailsView}>
                            <Image source={item.image} style={styles.dp} />
                            <View style={{ marginLeft: responsiveWidth(3) }}>
                                <Text style={styles.userName}>{item.name}</Text>
                            </View>
                        </View>
                        <Text style={[styles.userName, { color: colors.greyText }]}>{item.text}</Text>
                        </View>
                )})} 
                </View>
                :
                <Text style={styles.collapsablecontent}>{section.content}</Text>
                }
                
            </View>
        );
    };
    const _updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn text={'Products'} Back={() => { props.navigation.goBack() }} />
                <Image source={{ uri: data.Image}} style={styles.image} />
                <View style={styles.publishView}>
                    <Text style={styles.publishtxt}>Publisher :
                        <Text style={styles.publishername}>
                            {data.CoachName}
                        </Text>
                    </Text>
                    <View style={styles.bage}>
                        <Text style={styles.bageTxt}>{data.Category}</Text>
                    </View>
                </View>
                <View style={styles.nameView}>
                    <Text style={styles.name}>{data.Title}</Text>
                </View>
                <View style={styles.circlebtnview}>
                    <CircleIconButton name={'share'} type={'entypo'} />
                    {/* <CircleIconButton name={heartFlag ? 'heart' : 'heart-outlined'} type={'entypo'} onPress={() => { setHeart(!heartFlag) }} /> */}
                </View>
                {/* <PriceBottomCard /> */}
                <ScrollView>
                    <Accordion
                        sections={data.Details}
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
export default ProductDetails
