import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/size'
import { styles } from './style'

const Terms = (props) => {
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Terms & Condition'}
                    Back={() => props.navigation.goBack()}
                />
                <ScrollView>
                <Text style={styles.toptxt}>{'Privacy Policy of evolove'}</Text>
                <Text style={[styles.toptxt, { color: colors.whiteText }]}>
                    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat eleifend odio duis faucibus tempor facilisi amet. In in lectus vitae a sit rhoncus aliquet dolor vestibulum. Nisl et dignissim duis nulla. Arcu et, aliquet aliquet ornare porttitor. Ultricies auctor morbi pellentesque dui bibendum at sollicitudin volutpat. Varius sit leo tellus nullam neque, aliquet neque libero vestibulum. Accumsan egestas sed ut elementum vulputate praesent et interdum. Praesent est, tortor congue justo, nibh ipsum in lorem ut. Euismod molestie dictum nulla egestas pulvinar. Vel tincidunt eget lacus, pellentesque ac tellus varius. Ullamcorper sit tincidunt enim sagittis sit. Gravida erat neque id blandit faucibus scelerisque. Facilisi nunc quis at vestibulum facilisis sed in ac nunc.le'}
                </Text>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}
export default Terms