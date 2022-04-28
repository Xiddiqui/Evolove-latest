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
import { getData, saveData, saveDataWithoutDocId } from '../../../../Backend/utility'
import {getCurrentUserId} from '../../../../Backend/auth'
import { AppButton, AppButtonLarge, CategoryButton, SocialButton } from '../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontSize } from '../../../../globals/utilities/size'
import { styles } from './style'

const BlogPricetype = (props) => {
    const {FeatureImage , Title , Category , BlogText,Discription} = props.route.params 
    const [loading , setLoading] = useState(false)

    const onpressFreeBtn = async() => {
        setLoading(true)
        let uid = await getCurrentUserId()
        getData('Users',uid).then(async(data)=>{
            await saveDataWithoutDocId('Blog',{
                FeatureImage:FeatureImage,
                Title:Title,
                Category:Category,
                BlogText:BlogText,
                PriceType:'free',
                CoachId:uid,
                Status:'Submitted',
                Discription:Discription,
                CoachName :data.FullName,
                CoachImage:data.ProfileImage
            }).then((data)=>{
                saveData('Blog',data._documentPath._parts[1],{
                    id:data._documentPath._parts[1]
                }).then(()=>{
                    setLoading(false)
                    props.navigation.navigate('BlogSubmissionDone')
                })
            })
        })
    }
    const onPressFixedPrice = () => {
        props.navigation.navigate('BlogPrice',{
            FeatureImage:FeatureImage,
            Title:Title,
            Category:Category,
            BlogText:BlogText,
            Discription:Discription
        })
    }

    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Blog Submission'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>{'Choose your Pricing Type'}</Text>
                <CategoryButton Title={'Fixed Price'} onPress={onPressFixedPrice}/>
                <CategoryButton Title={'Free'} onPress={onpressFreeBtn} activity={loading}/>
            </View>
        </ImageBackground>
    )
}
export default BlogPricetype