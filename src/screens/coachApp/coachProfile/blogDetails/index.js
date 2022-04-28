import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    Image,
    ScrollView
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../../globals/utilities/assets'
import { AppHeader, AppHeaderwithBack, AppHeaderwithBackwithnothirdbtn } from '../../../../components/general/header'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../../globals/utilities/colors'

const BlogDetails = (props) => {
    const { data } = props.route.params
    console.log('assds',data)
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
                <AppHeaderwithBackwithnothirdbtn text={'Blogs'} Back={() => { props.navigation.goBack() }} />
                <Image source={{ uri: data.FeatureImage }} style={styles.image} />
                <View style={styles.nameView}>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.datetxt}>{data.date}</Text>
                </View>
                <View style={styles.userDetailsView}>
                {data.CoachImage === '' ? 
                <Image source={appImages.userIcon} style={styles.dp} />:
                <Image source={{uri:data.CoachImage}} style={styles.dp} />
                }
                    
                    <View style={{ marginLeft: responsiveWidth(3) }}>
                        <Text style={styles.userName}>{data.CoachName}</Text>
                        {data.About === '' ? 
                        <Text style={[styles.userName, { color: colors.greyText }]}>{'No About added yet'}</Text>
                        :
                        <Text style={[styles.userName, { color: colors.greyText }]}>{data.About}</Text>
                        }
                    </View>
                </View>
                <ScrollView>
                    <FlatList
                        data={data.BlogText}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    {item.image === '' ?
                                        null :
                                        <Image source={{ uri: item.image }} style={styles.image1} />
                                    }

                                    <Text style={styles.discription}>{item.text}</Text>
                                </View>
                            )
                        }}
                    />
                    {/* <Text style={styles.discription}>{data.discription}</Text> */}
                </ScrollView>
            </View>
        </ImageBackground>

    )
}
export default BlogDetails
