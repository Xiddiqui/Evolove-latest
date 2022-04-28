import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    TextInput
} from 'react-native'
import { Icon } from 'react-native-elements'
import { responsiveWidth , responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import { appImages } from '../../../globals/utilities/assets'
import { colors } from '../../../globals/utilities/colors'
import { fontFamily } from '../../../globals/utilities/fonts'
import { fontSize } from '../../../globals/utilities/size'
import { styles } from './styles'
import {useNavigation} from '@react-navigation/native';

export const ArrowButton = (props) => {
    const navigation = useNavigation();
    const { Title, onPress, activity = false, disabled = false } = props
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={()=>{navigation.navigate('Login')}}
            style={[styles.Button, {
                flexDirection: 'row',
                width: responsiveWidth(60)
            }]}
        >
            {activity ? (
                <ActivityIndicator size={'small'} color={'white'} />
            ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.buttonText}>
                        {Title}
                    </Text>
                    <Icon name={'arrowright'} type={'antdesign'} color={colors.whiteText} size={fontSize.h4} style={{ marginLeft: responsiveWidth(2) }} />
                </View>
            )
            }
        </TouchableOpacity>
    )
}
export const LeftArrowButton = (props) => {
    const { Title, onPress, activity = false, disabled = false } = props
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[styles.Button, {
                flexDirection: 'row',
                width: responsiveWidth(65)
            }]}
        >
            {activity ? (
                <ActivityIndicator size={'small'} color={'white'} />
            ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name={'arrowleft'} type={'antdesign'} color={colors.whiteText} size={fontSize.h4} style={{ marginLeft: responsiveWidth(2) }} />
                    <Text style={styles.buttonText}>
                        {Title}
                    </Text>
                </View>
            )
            }
        </TouchableOpacity>
    )
}
export const AppButton = (props) => {
    const { Title, onPress, activity = false, disabled = false } = props
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[styles.Button,{
                marginTop:responsiveHeight(7)
            }]}
        >
            {activity ? (
                <ActivityIndicator size={'small'} color={'white'} />
            ) : (
                <View>
                    <Text style={styles.buttonText}>
                        {Title}
                    </Text>
                </View>

            )

            }


        </TouchableOpacity>
    )
}
export const AppButtonLarge = (props) => {
    const { Title, onPress, activity = false, disabled = false } = props
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[styles.Button,{
                marginTop:responsiveHeight(7),
                width:responsiveWidth(90)
            }]}
        >
            {activity ? (
                <ActivityIndicator size={'small'} color={'white'} />
            ) : (
                <View>
                    <Text style={styles.buttonText}>
                        {Title}
                    </Text>
                </View>

            )

            }


        </TouchableOpacity>
    )
}
export const SocialButton = (props) => {
    const { Title, onPress, activity = false, disabled = false ,image} = props
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={styles.Button1}
        >
            {activity ? (
                <ActivityIndicator size={'small'} color={'white'} />
            ) : (
                <View>
                        <Image source={image} style={styles.icon}/>
                </View>

            )

            }


        </TouchableOpacity>
    )
}
export const ListButton = (props) => {
    const { Title, onPress, activity = false, disabled = false ,backgroundColor } = props
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[styles.Button2,{backgroundColor:backgroundColor}]}
        >
            {activity ? (
                <ActivityIndicator size={'small'} color={'white'} />
            ) : (
                <View>
                    <Text style={styles.buttonText2}>
                        {Title}
                    </Text>
                </View>

            )

            }


        </TouchableOpacity>
    )
}
export const FitlterBtn = (props) => {
    const { Title, onPress, activity = false, disabled = false ,backgroundColor , borderColor ,borderWidth , color} = props
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[styles.Button5,{backgroundColor:backgroundColor,borderWidth:borderWidth,borderColor:borderColor}]}
        >
            {activity ? (
                <ActivityIndicator size={'small'} color={'white'} />
            ) : (
                <View>
                    <Text style={[styles.buttonText2,{color:color}]}>
                        {Title}
                    </Text>
                </View>

            )

            }


        </TouchableOpacity>
    )
}
export const CircleIconButton = (props) => {
    const { Title, onPress, activity = false, disabled = false, name , type} = props
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[styles.Button3]}
        >
            {activity ? (
                <ActivityIndicator size={'small'} color={'white'} />
            ) : (
                <View>
                    <Icon name={name} type={type} color={colors.txtInputborder} size={fontSize.h3}/>
                </View>

            )

            }


        </TouchableOpacity>
    )
}
export const ModalButton = (props) => {
    const { Title, onPress, activity = false, disabled = false , backgroundColor , btnColor } = props
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[styles.Button,{
                marginTop:responsiveHeight(3),
                width:responsiveWidth(35),
                marginBottom:responsiveHeight(3),
                backgroundColor:backgroundColor
            }]}
        >
            {activity ? (
                <ActivityIndicator size={'small'} color={'white'} />
            ) : (
                <View>
                    <Text style={[styles.buttonText,{color:btnColor,fontSize:fontSize.regular}]}>
                        {Title}
                    </Text>
                </View>

            )

            }

        </TouchableOpacity>
    )
}
export const ChangetoCoachBtn = (props) => {
    const { Title, onPress, activity = false, disabled = false } = props
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[styles.Button,{
                marginTop:responsiveHeight(1),
                width:responsiveWidth(40),
                height:responsiveHeight(5)
            }]}
        >
            {activity ? (
                <ActivityIndicator size={'small'} color={'white'} />
            ) : (
                <View>
                    <Text style={[styles.buttonText,{
                        fontSize:fontSize.medium,
                        fontFamily:fontFamily.appTextRegular
                    }]}>
                        {Title}
                    </Text>
                </View>

            )

            }


        </TouchableOpacity>
    )
}
export const AccountSettingbtn = (props) => {
    const { Title, onPress, activity = false, disabled = false , name ,type } = props
    return (
        <TouchableOpacity style={styles.settingsbtn} onPress={onPress}>
        <View style={styles.circle}>
        <Icon
            name={name}
            type={type}
            size={fontSize.large}
            color={colors.whiteText} />
        </View>
        <Text style={styles.settingsbtntxt}>{Title}</Text>
        <Icon
            name={'chevron-right'}
            type={'feather'}
            color={colors.whiteText} />
    </TouchableOpacity>
    )
}
export const SearchBtn = (props) => {
    const { Title, onPress, activity = false, disabled = false , name ,type } = props
    return (
        <TouchableOpacity style={[styles.textInput]} onPress={onPress}>
        <Icon type={'font-awesome'} name={'search'} color={colors.txtInputborder}/>
            <Text style={styles.textInputinner}>{'Search Item'}</Text>

        </TouchableOpacity>
    )
}
export const CategoryButton = (props) => {
    const { Title, onPress, activity = false, disabled = false } = props
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={styles.catbtn}
        >
            {activity ? (
                <ActivityIndicator size={'small'} color={'white'} />
            ) : (
                <View>
                    <Text style={styles.buttonText}>
                        {Title}
                    </Text>
                </View>

            )

            }


        </TouchableOpacity>
    )
}