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
import { fontSize } from '../../../../globals/utilities/fonts'
import { styles } from './style'
import { getCurrentUserId } from '../../../../Backend/auth'
import { getData, saveData, saveDataWithoutDocId } from '../../../../Backend/utility'

const CoursePrice = (props) => {
    const { Title, Category, Discription, CoverImage, Video, Modules, courseId } = props.route.params
    const [price, setPrice] = useState(0)
    const [priceErr , setPriceErr] = useState('')
    const [loading, setLoading] = useState(false)

    const onPressDoneBtn = async () => {
        if(price === 0){
            setPriceErr('Enter Price')
        }
        else{
            let uid = await getCurrentUserId()
            setLoading(true)
            getData('Users', uid).then(async (data) => {
                let obj = {
                    CoachId: uid,
                    Status: 'Submitted',
                    PriceType: 'Fixed Price',
                    Price: price,
                    CoachName: data.FullName,
                    CoachImage: data.ProfileImage,
                    Type:'Course'
                }
                await saveData('Courses', courseId, obj).then(() => {
                    props.navigation.navigate('CourseSubmissionDone')
                    setLoading(false)
                })
            })

        }

    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Course Submission'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>{'How much your product cost'}</Text>
                <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Course Price'}</Text>
                <MyTextInput placeholder={'$ 59.00'} type={'numeric'} onchange={(txt) => { setPrice(parseInt(txt)) }} err={priceErr} />
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Submit'} onPress={onPressDoneBtn} activity={loading} />
                </View>
            </View>
        </ImageBackground>
    )
}
export default CoursePrice