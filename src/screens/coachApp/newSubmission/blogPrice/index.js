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
import { getCurrentUserId } from '../../../../Backend/auth'
import { getData, saveData, saveDataWithoutDocId } from '../../../../Backend/utility'
import { AppButton, AppButtonLarge, SocialButton } from '../../../../components/general/button'
import { AppHeaderwithBackwithnothirdbtn, AuthHeader } from '../../../../components/general/header'
import MyTextInput from '../../../../components/general/txtInput'
import { appImages } from '../../../../globals/utilities/assets'
import { colors } from '../../../../globals/utilities/colors'
import { fontFamily, fontSize } from '../../../../globals/utilities/fonts'
import { styles } from './style'

const BlogPrice = (props) => {
    const {FeatureImage , Title , Category , BlogText,Discription} = props.route.params 
    const [price , setPrice] = useState(0)
    const [priceError , setPriceError] = useState('')
    const [loading , setLoading] = useState(false)

    const onpressDoneBtn = async() => {
        if (price === 0) {
            setPriceError('Please enter price')
        }
        else{
            setLoading(true)
            let uid = await getCurrentUserId()
            getData('Users' , uid).then(async(data)=>{
                await saveDataWithoutDocId('Blog',{
                    FeatureImage:FeatureImage,
                    Title:Title,
                    Category:Category,
                    BlogText:BlogText,
                    PriceType:'Paid',
                    Price:price,
                    CoachId:uid,
                    Discription:Discription,
                    Status:'Submitted',
                    CoachName:data.FullName,
                    CoachImage:data.ProfileImage,
                    Type:'Blog'
    
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
       
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Blog Submission'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>{'How much your product cost'}</Text>
                <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Product Price'}</Text>
                <MyTextInput placeholder={'$ 59.00'} type={'numeric'} onchange={(txt)=>{
                    setPrice(parseInt(txt))
                }}/>
                {priceError ? 
                    <Text style={{color:'red',marginLeft:responsiveWidth(5),marginTop:responsiveHeight(1),fontFamily:fontFamily.appTextRegular}}>{priceError}</Text>
                    :null
                    }
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Submit'} onPress={onpressDoneBtn} activity={loading}/>
                </View>
            </View>
        </ImageBackground>
    )
}
export default BlogPrice