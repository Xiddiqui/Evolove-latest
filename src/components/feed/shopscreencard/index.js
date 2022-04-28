import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { appImages } from '../../../globals/utilities/assets'
import { styles } from './style'

export const ShopScreenCard = (props) => {
    const { image, name, type, price, onPress } = props
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={image} style={styles.cardimage} />
            <Text style={styles.cardheading}>{name}</Text>
            <View style={styles.priceView}>
                <Text style={styles.type}>{type}</Text>
                <Text style={styles.pricetxt}>{price}</Text>
            </View>
        </TouchableOpacity>
    )
}