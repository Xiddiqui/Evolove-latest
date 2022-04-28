import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/size'
import { styles } from './style'
import StarRating from 'react-native-star-rating';
import Toast from 'react-native-simple-toast';

const Subscription = (props) => {
    const [Monthlyflag, setMonthlyFlag] = useState(false)
    const [Yearlyflag, setYearlyFlag] = useState(false)
    const [plan, setPlan] = useState('')
    const { data } = props.route.params
    console.log(data.CoachId)
    const MonthlyBtn = () => {
        setMonthlyFlag(true)
        setYearlyFlag(false)
        setPlan('Monthly Plan : $99.99')
    }
    const YearlyBtn = () => {
        setYearlyFlag(true)
        setMonthlyFlag(false)
        setPlan('Yearly Plan : $822.00')
    }
    const onPressDoneBtn = async () => {
        if (plan === '') {
            Toast.show('Please select plane')
        }
        else {
            props.navigation.navigate('AddCard', { plane: plan, CoachId: data.CoachId })
        }
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Subscription'}
                    Back={() => props.navigation.goBack()}
                />
                <View style={styles.txtBack}>
                    <Text style={styles.heading}>{'Subscribe for get access to all courses'}</Text>
                    <Text style={styles.txt}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic`}</Text>
                </View>
                <TouchableOpacity style={[styles.btn, { borderWidth: Monthlyflag ? responsiveWidth(0.3) : null, borderColor: colors.button }]} onPress={MonthlyBtn}>
                    <Text style={styles.heading}>Monthly Plan</Text>
                    <Text style={styles.heading}>$99.99/Month</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, { borderWidth: Yearlyflag ? responsiveWidth(0.3) : null, borderColor: colors.button }]} onPress={YearlyBtn}>
                    <Text style={styles.heading}>Yearly Plan</Text>
                    <Text style={styles.heading}>$99.99/Year</Text>
                </TouchableOpacity>
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Subscribe'} onPress={onPressDoneBtn} />
                </View>
            </View>
        </ImageBackground>
    )
}
export default Subscription