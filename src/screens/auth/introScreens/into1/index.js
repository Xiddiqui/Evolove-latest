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

const Intro1 = (props) => {
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'} />
         <View style={{ backgroundColor: 'rgba(0,0,0,0.9)',height:'100%',width:'100%'}}>           
            <PinkCard Cardimage={appImages.Intro1} />
            <View style={styles.headingTextView}>
                <Text style={styles.headingText}>Keep Your Mental Health in Place</Text>
                <Text style={styles.txt}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                </Text>
            </View>
            <View style={styles.bottomView}>
                <Image source={appImages.Slider3} style={styles.sliderImage}/>
                <ArrowButton Title={'Getting Started'} 
                // onPress={()=>{props.navigation.navigate('Login')}}

                />
            </View>
</View>
        </ImageBackground>
    )
}
export default Intro1