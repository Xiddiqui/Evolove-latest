import React from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { AppButton } from '../../general/button'
import {styles} from './style'

export const PriceBottomCard = (props) => {
    const {price , onPress} = props
    return(
        <View style={styles.card}>
            <Text style={styles.priceTxt}>{price}</Text>
            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Text style={styles.btnTxt}>
                    Buy Now
                </Text>
            </TouchableOpacity>
        </View>
    )
}