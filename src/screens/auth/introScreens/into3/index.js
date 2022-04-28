import React from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    ImageBackground
} from 'react-native'
import { colors } from 'globalColors'
import { styles } from './style'
import { appImages } from '../../../../globals/utilities/assets'
import { PinkCard } from '../../../../components/feed/introBackPinkCard'
import { ArrowButton } from '../../../../components/general/button'

const Intro3 = () => {
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'} />
                <PinkCard Cardimage={appImages.Intro3} />
                <View style={styles.headingTextView}>
                    <Text style={styles.headingText}>Get Training Of Your Favorite Coach</Text>
                    <Text style={styles.txt}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                    </Text>
                </View>
                <View style={styles.bottomView}>
                    <Image source={appImages.Slider1} style={styles.sliderImage} />
                    <ArrowButton Title={'Continue'} />
                </View>
            </View>
        </ImageBackground>
    )
}
export default Intro3