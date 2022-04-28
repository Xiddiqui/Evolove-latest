import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    FlatList
} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { getDocByKeyValue } from '../../../../Backend/utility'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/size'
import { TopCoachesDataSource } from '../../../../services/app/getTopCoaches'
import { styles } from './style'

const TopCoaches = (props) => {
    const [topcoaches, setTopCoaches] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCoaches()
    }, [])

    const getCoaches = async () => {
        setLoading(true)
        await getDocByKeyValue('Users', 'Coach', true).then((data) => {
            setTopCoaches(data)
            setLoading(false)
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Top Coaches'}
                    Back={() => props.navigation.goBack()}
                />
                {loading ?
                    <ActivityIndicator size={'large'} color={colors.button} />
                    :
                    <ScrollView>
                        <Text style={styles.toptxt}>Total Coaches {topcoaches.length}</Text>
                        <FlatList
                            data={topcoaches}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.userDetailsView} onPress={() => { props.navigation.navigate('ShowCoachProfile', { Coachdata: item }) }}>
                                    {item.ProfileImage === '' ? 
                                    <Image source={appImages.userIcon} style={styles.dp} />
                                    :
                                    <Image source={{ uri: item.ProfileImage }} style={styles.dp} />
                                    }
                                    <View style={{ marginLeft: responsiveWidth(3) }}>
                                        <Text style={styles.userName}>{item.FullName}</Text>
                                        <Text style={[styles.userName, { color: colors.greyText }]}>{item.About}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>
                }

            </View>
        </ImageBackground>
    )
}
export default TopCoaches