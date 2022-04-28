import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    FlatList
} from 'react-native'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { PurchasedCoursed } from '../../../../components/feed/coursesCard'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/fonts'
import { CoursesDataSource } from '../../../../services/app/getcourses'
import { styles } from './style'

const Fav = (props) => {
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Favorites'}
                    Back={() => props.navigation.goBack()}
                />
                <ScrollView>
                    <FlatList data={CoursesDataSource}
                        numColumns={2}
                        ListHeaderComponent={<View>
                            <Text style={styles.toptxt}>Total courses {CoursesDataSource.length}</Text>
                        </View>}
                        renderItem={({ item }) => (
                            <View style={styles.FlatListStyle}>
                                <PurchasedCoursed image={item.image} designation={item.AutherName} name={item.name} />
                            </View>
                        )}
                    />
                </ScrollView>
            </View>
        </ImageBackground>
    )
}
export default Fav