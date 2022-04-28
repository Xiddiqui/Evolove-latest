import React,{useState} from 'react'
import { View, TouchableOpacity, Text, Image , Share } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { appImages } from '../../../globals/utilities/assets'
import { colors } from '../../../globals/utilities/colors'
import { fontSize } from '../../../globals/utilities/size'
import { CircleIconButton } from '../../general/button'
import { styles } from './style'


export const PurchasedCoursed = (props) => {
    const { image, name, type, price, onPress, designation, shareIcon, shareIcontype,likeOnPress,heartIconName ,continueBtnPress} = props
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={image} style={styles.cardimage} />
            <View style={styles.circlebtnview}>
                <TouchableOpacity style={styles.circle}>
                    <Icon name={'share-2'} type={'feather'} color={colors.greyText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={likeOnPress}>
                    <Icon name={heartIconName} type={'entypo'} color={colors.greyText} />
                </TouchableOpacity>
            </View>
            <View style={styles.txtView}>
                <Text style={styles.designationtxt}>{designation}</Text>
                <Text style={styles.cardheading}>{name}</Text>
                <TouchableOpacity style={styles.btn} onPress={continueBtnPress}>
                    <Text style={styles.btntxt}>{'Continue'}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}
export const MyCourses = (props) => {
    const { image, name, type, price, onPress, designation, shareIcon, shareIcontype ,sharePress,ContinuePress} = props
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={image} style={styles.cardimage} />
            <View style={styles.circlebtnview}>
                <TouchableOpacity style={styles.circle}>
                    <Icon name={'share-2'} type={'feather'} color={colors.greyText} onPress={sharePress}/>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.circle}>
                    <Icon name={'heart-outlined'} type={'entypo'} color={colors.greyText} />
                </TouchableOpacity> */}
            </View>
            <View style={styles.txtView}>
                <Text style={styles.designationtxt}>{designation}</Text>
                <Text style={styles.cardheading}>{name}</Text>
                <TouchableOpacity style={styles.btn} onPress={ContinuePress}>
                    <Text style={styles.btntxt}>{'Continue'}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}
export const BuynowCourses = (props) => {
    const { image, name, type, price, onPress, designation, shareIcon, shareIcontype, buynowonPress ,likeOnPress,heartIconName,btnTxt } = props
    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
            'Please install this app and stay safe , AppLink :https://drive.google.com/file/d/1f0wAaNoWECjNJTqsL7XHbzwRkfAhqnAD/view?usp=sharing',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={image} style={styles.cardimage} />
            <View style={styles.circlebtnview}>
                <TouchableOpacity style={styles.circle} onPress={onShare}>
                    <Icon name={'share-2'} type={'feather'} color={colors.greyText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={likeOnPress}>
                    <Icon name={heartIconName} type={'entypo'} color={colors.greyText} />
                </TouchableOpacity>
            </View>
            <View style={styles.txtView}>
                <Text style={styles.designationtxt}>{designation}</Text>
                <Text style={styles.cardheading}>{name}</Text>
                <View style={styles.priceView}>
                    <Text style={styles.pricetxt}>{price}</Text>
                    <TouchableOpacity style={styles.btn} onPress={buynowonPress}>
                        <Text style={styles.btntxt}>{btnTxt}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}
export const BuynowCoursesLarge = (props) => {
    const { image, name, type, price, onPress, designation, shareIcon, shareIcontype, btnTxt,onBuyNowPress,likeOnpress ,heartIconName,cardPress} = props
    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
            'Please install this app and stay safe , AppLink :https://drive.google.com/file/d/1f0wAaNoWECjNJTqsL7XHbzwRkfAhqnAD/view?usp=sharing',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
    return (
        <TouchableOpacity onPress={cardPress}>
        <View style={[styles.card, { width: responsiveWidth(90), alignSelf: 'center' }]} onPress={onPress}>
            <Image source={image} style={[styles.cardimage, { height: responsiveHeight(23) }]} />
            <View style={styles.circlebtnview}>
                <TouchableOpacity style={styles.circle} onPress={onShare}>
                    <Icon name={'share-2'} type={'feather'} color={colors.greyText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circle} onPress={likeOnpress}>
                    <Icon name={heartIconName} type={'entypo'} color={colors.greyText} />
                </TouchableOpacity>
            </View>
            <View style={styles.txtView}>
                <Text style={[styles.designationtxt, { fontSize: fontSize.large }]}>{designation}</Text>
                <Text style={[styles.cardheading, { fontSize: fontSize.h5 }]}>{name}</Text>
                <View style={styles.priceView}>
                    <Text style={[styles.pricetxt, { fontSize: fontSize.large }]}>{price}</Text>
                    <TouchableOpacity style={styles.btn} onPress={onBuyNowPress}>
                        <Text style={styles.btntxt}>{btnTxt}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    )
}
export const MyCoursesLarge = (props) => {
    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
            'Please install this app and stay safe , AppLink :https://drive.google.com/file/d/1f0wAaNoWECjNJTqsL7XHbzwRkfAhqnAD/view?usp=sharing',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
    const { image, name, type, price, onPress, designation, shareIcon, shareIcontype ,sharePress} = props
    return (
        <TouchableOpacity style={[styles.card, { width: responsiveWidth(90), alignSelf: 'center' }]} onPress={onPress}>
            <Image source={image} style={[styles.cardimage, { height: responsiveHeight(23) }]}  />
            <View style={styles.circlebtnview}>
                <TouchableOpacity style={styles.circle} onPress={onShare}>
                    <Icon name={'share-2'} type={'feather'} color={colors.greyText} onPress={sharePress}/>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.circle}>
                    <Icon name={'heart-outlined'} type={'entypo'} color={colors.greyText} />
                </TouchableOpacity> */}
            </View>
            <View style={styles.txtView}>
                <Text style={[styles.designationtxt, { fontSize: fontSize.large }]}>{designation}</Text>
                <Text style={[styles.cardheading, { fontSize: fontSize.h5 }]}>{name}</Text>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btntxt}>{'Continue'}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}
export const SubscribeCoursesLarge = (props) => {
    const { image, name, type, price, onPress, designation, shareIcon, shareIcontype, btnTxt , Subscriptionbtn } = props
    return (
        <View style={[styles.card, { width: responsiveWidth(90), alignSelf: 'center' }]} onPress={onPress}>
            <Image source={image} style={[styles.cardimage, { height: responsiveHeight(23) }]} />
            <View style={styles.circlebtnview}>
                <TouchableOpacity style={styles.circle}>
                    <Icon name={'share-2'} type={'feather'} color={colors.greyText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circle}>
                    <Icon name={'heart-outlined'} type={'entypo'} color={colors.greyText} />
                </TouchableOpacity>
            </View>
            <View style={styles.txtView}>
                <Text style={[styles.designationtxt, { fontSize: fontSize.large }]}>{designation}</Text>
                <Text style={[styles.cardheading, { fontSize: fontSize.h5 }]}>{name}</Text>
                <View style={styles.priceView}>
                    <Text style={[styles.pricetxt, { fontSize: fontSize.large }]}>{'In Subscription'}</Text>
                    <TouchableOpacity style={styles.btn} onPress={Subscriptionbtn}>
                        <Text style={styles.btntxt}>{'Subscribe'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}