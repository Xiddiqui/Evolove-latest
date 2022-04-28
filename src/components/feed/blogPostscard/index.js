import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { appImages } from '../../../globals/utilities/assets'
import { styles } from './style'

export const BlogPosts = (props) => {
    const { name, discription, type, image, bagebackgroundColor ,onPress} = props
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={image} style={styles.pic}/>
            <View>
                <View style={styles.headingView}>
                    <Text numberOfLines={1} style={styles.heading}>{name}</Text>
                    <View style={[styles.bage, { backgroundColor: bagebackgroundColor }]}>
                        <Text style={styles.bageTxt}>{type}</Text>
                    </View>
                </View>
                <Text style={styles.txt} numberOfLines={3}>
                    {discription}
                </Text>
            </View>
        </TouchableOpacity>
    )
}