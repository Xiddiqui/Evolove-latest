import React from 'react'
import {
    View,
    Text,
    StatusBar,
    Image
} from 'react-native'
import { colors } from 'globalColors'
import { styles } from './style'
import { appImages } from '../../../globals/utilities/assets'
import { PinkCard } from '../../../components/feed/introBackPinkCard'
import { ArrowButton } from '../../../components/general/button'
import Intro1 from './into1'
import Intro2 from './into2'
import Intro3 from './into3'
import Swiper from 'react-native-swiper'

const IntroScreen = () => {
    return (
        <Swiper style={styles.wrapper} loop={false} showsPagination={false}>
            <View style={styles.container}>
                <Intro1 />
            </View>
            <View style={styles.container}>
                <Intro2 />
            </View>
            <View style={styles.container}>
                <Intro3 />
            </View>
        </Swiper>
    )
}
export default IntroScreen