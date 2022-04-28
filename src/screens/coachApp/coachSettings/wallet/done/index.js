import React, { useState , useEffect} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native'
import { appImages } from '../../../../../globals/utilities/assets'
import { fontFamily } from '../../../../../globals/utilities/fonts'
import { styles } from './style'

const Done = (props) => {

    useEffect(()=>{
        setTimeout(()=>{
            props.navigation.navigate('CoachProfile')
        },1000)
    },[])
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%',alignItems:'center',justifyContent:'center' }}>
                <Image source={appImages.Done} style={styles.image}/>
                <Text style ={styles.paymenttxt}>Submission Done</Text>
                <Text style ={[styles.paymenttxt,{fontFamily:fontFamily.appTextRegular,textAlign:'center'}]}>{`You have successfully submit\n your withdraw request`}</Text>
            </View>
        </ImageBackground>
    )
}
export default Done