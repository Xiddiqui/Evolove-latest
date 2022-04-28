import React, { useEffect } from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    ImageBackground
} from 'react-native'
import { colors } from 'globalColors'
import { styles } from './style'
import { appImages } from '../../../globals/utilities/assets'
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = (props) => {

    useEffect(() => {
        checkuser()
    }, [])
    const checkuser = async() => {
        const value = await AsyncStorage.getItem('userId')
        const type = await AsyncStorage.getItem('userType')

        console.log(value)
        if (value) {
            if(type === 'Coach'){
            props.navigation.navigate("CoachApp"); 
            }
            else{
                props.navigation.navigate("App");
            }
        }
        else {
            props.navigation.navigate("IntroScreen");
        }
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'} />
                <Image source={appImages.Logo1} style={styles.logoImage} />
            </View>
        </ImageBackground>

    )
}
export default SplashScreen