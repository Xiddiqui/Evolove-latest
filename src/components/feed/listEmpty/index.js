import React from 'react'
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native'
import {styles} from './style'

export const ListEmpty = (props) => {
    const {text} = props
    return(
        <View>
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    )
}