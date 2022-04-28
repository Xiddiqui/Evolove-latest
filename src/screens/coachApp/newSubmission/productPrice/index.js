import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
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
import { saveDataWithoutDocId, saveData, getData } from '../../../../Backend/utility'

const ProductPrice = (props) => {
    const { Title, Discription, image, Category } = props.route.params
    console.log(Title)
    console.log(Discription)
    console.log(image)
    console.log(Category)


    const [price, setPrice] = useState(0)
    const [priceError, setPriceError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleOnChangePriceText = Price => {
        setPrice(parseInt(Price));
    };

    const validations = () => {
        if (price === 0) {
            setPriceError('Enter price');
            return false;
        }
        else {
            return true
        }
    }

    const SavingProduct = async () => {
        if (price === 0) {
            setPriceError('Enter price');
        }
        else{
            setLoading(true)
            let uid = await getCurrentUserId()
            getData('Users', uid).then(async(data) => {
                console.log(data)
                console.log(price)
                let obj = {
                    Title: Title,
                    Discription: Discription,
                    Image: image,
                    Category: Category,
                    Price: price,
                    CoachId: uid,
                    CoachName: data.FullName,
                    CoachImage:data.ProfileImage,
                    Status: 'Submitted',
                    Type:'Product',
                    Details: [
                        {
                            title: "Description",
                            content: Discription,
                            flag: false,
                            icon: "newsletter",
                            reviewFlag: false
                        },
                        {
                            title: "About Publisher",
                            content: Discription,
                            flag: true,
                            icon: "hair-cross",
                            publisherImage: data.ProfileImage,
                            publisherName: data.FullName,
                            designation: data.About,
                            reviewFlag: false
                        },
                        // {
                        //     title: "Reviews",
                        //     content: Discription,
                        //     flag: false,
                        //     icon: "bookmark",
                        //     reviewFlag: true,
                        //     reviews: [{
                        //         image: appImages.user2,
                        //         name: 'guy Hawkins',
                        //         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis neque molestie elementum,'
                        //     }]
                        // },
                    ]
                }
                await saveDataWithoutDocId('Product', obj).then((data) => {
                    saveData('Product', data._documentPath._parts[1], {
                        id: data._documentPath._parts[1]
                    }).then(() => {
                        setLoading(false)
                        props.navigation.navigate('ProductSubmissionDone')
                    })

                })
            })

        }


    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn
                    text={'Product Submission'}
                    Back={() => props.navigation.goBack()}
                />
                <Text style={styles.toptxt}>{'How much your product cost'}</Text>
                <Text style={[styles.toptxt, { color: colors.txtInputborder }]}>{'Product Price'}</Text>
                <MyTextInput placeholder={'$ 59.00'} type={'numeric'} onchange={(txt) => { handleOnChangePriceText(txt) }} err={priceError} />
                <View style={styles.buttonView}>
                    <AppButtonLarge Title={'Submit'} onPress={SavingProduct} activity={loading} />
                </View>
            </View>
        </ImageBackground>
    )
}
export default ProductPrice