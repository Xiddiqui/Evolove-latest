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
import {getCurrentUserId} from '../../../../Backend/auth'
import {saveDataWithoutDocId , saveData} from '../../../../Backend/utility'

const Feedback = (props) => {
    const [startCount, setStarCount] = useState(0)
    const [review, setReview] = useState('')
    const [reviewErr, setReviewerr] = useState('')
    const [loading , setLoading] = useState(false)

    const handleOnChangeReviewText = Review => {
        !Review
            ? setReviewerr('')
            : review.length < 1
                ? setReviewerr('Min 2 characters')
                : setReviewerr('');
        setReview(Review);
    };
    const validation = () => {
        if (review === ''){
            setReviewerr('Enter review')
            return false
        }
        else if(review < 1){
            setReviewerr('Min 2 character')
        }
        else{
            return true
        }
    }

    const onpressDone = async () => {
        if (validation()){
            setLoading(true)
            let uid = await getCurrentUserId()
            let obj = {
                Review :review,
                Rating : startCount,
                UserId:uid
            }
            await saveDataWithoutDocId('FeedBack' , obj).then((data)=>{
                saveData('FeedBack',data._documentPath._parts[1],{
                    id:data._documentPath._parts[1]
                }).then(()=>{
                    setLoading(false)
                    props.navigation.navigate('Home')
                })
                
            })
        }
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Feedback'}
                    Back={() => props.navigation.goBack()}
                />
                <ScrollView>
                <Text style={styles.toptxt}>{'Send Feedback for evolove'}</Text>
                <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Rate in stars'}</Text>
                <View style={styles.startsBackground}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        starSize={25}
                        fullStarColor={colors.starYellow}
                        containerStyle={{ width: responsiveWidth(55) }}
                        rating={startCount}
                        selectedStar={(rating) => setStarCount(rating)}
                    />
                </View>
                <Text style={[styles.toptxt, { color: colors.txtInputborder, marginTop: responsiveHeight(4) }]}>{'Messages'}</Text>
                <MyTextInput multiline={true} placeholder={'Write a Review'} onchange={(txt)=>{handleOnChangeReviewText(txt)}} err={reviewErr}/>
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Send'} onPress={onpressDone} activity={loading}/>
                </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}
export default Feedback