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
import { AppButton, AppButtonLarge, CategoryButton, SocialButton } from '../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/size'
import { styles } from './style'
import {getCurrentUserId} from '../../../../Backend/auth'
import {getData, saveData,saveDataWithoutDocId} from '../../../../Backend/utility'

const CoursePricetype = (props) => {
    const {Title,Category,Discription,CoverImage,Video,Modules,courseId} = props.route.params
    const [loading , setLoading] = useState(false)

    const onPressEvoloveSubscriptionbtn = async () => {
        setLoading(true)
        let uid = await getCurrentUserId()
        getData('Users' , uid ).then( async (data)=>{
            let obj = {
                CoachId:uid,
                Status:'Submitted',
                PriceType:'Evolove Subscription',
                CoachName:data.FullName,
                CoachImage:data.ProfileImage,
                Type:'Course',
                Price:0

            }
                saveData('Courses',courseId, obj).then(()=>{
                    props.navigation.navigate('CourseSubmissionDone')
                    setLoading(false)
                })
            })
        
    }
    const onPressFixedPriceBtn = async () => {
        props.navigation.navigate('CoursePrice',{
            Title:Title,
            Category:Category,
            Discription:Discription,
            CoverImage:CoverImage,
            Video:Video,
            Modules:Modules,
            courseId:courseId
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Course Submission'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>{'Choose your Pricing Type'}</Text>
                <CategoryButton Title={'Fixed Price'} onPress={onPressFixedPriceBtn} />
                <CategoryButton Title={'Evolove Subscription'} onPress={onPressEvoloveSubscriptionbtn} activity={loading}/>
            </View>
        </ImageBackground>
    )
}
export default CoursePricetype