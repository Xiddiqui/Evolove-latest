import React,{useState , useEffect} from 'react'
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    Image,
    ScrollView,
    Linking,
    TouchableOpacity
} from 'react-native'
import { styles } from './style'
import { appImages } from '../../../../globals/utilities/assets'
import { AppHeader, AppHeaderwithBack, AppHeaderwithBackwithnothirdbtn } from '../../../../components/general/header'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors } from '../../../../globals/utilities/colors'
import { getData } from '../../../../Backend/utility'
import { ListEmpty } from '../../../../components/feed/listEmpty'

const Details = (props) => {
    const { data, obj } = props.route.params
    const [FeatureImage , setFeatureImage] = useState('')
    const [loading , setLoading] = useState(false)
    const [coachName , setCoachName] = useState('')
    const [coachImage , setCoachImage] = useState('')
    const [tilte , setTitle] = useState('')
    const [dataSource , setDataSource] = useState([])
    console.log('??',obj)

    useEffect(()=>{
        getBog()
    },[])
    
    const getBog = async () => {
        obj && obj.map((item)=>{
            setLoading(true)
            getData('Blog' , item.blogId).then((blogData)=>{
                console.log('myBlog' , blogData)
                setFeatureImage(blogData.FeatureImage)
                setCoachName(blogData.CoachName)
                setCoachImage(blogData.CoachImage)
                setDataSource(blogData.BlogText)
                setTitle(blogData.Title)
                
            })
            setLoading(false)
        })
    }
    return (
        <ImageBackground style={styles.container} source={appImages.backGround}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', height: '100%', width: '100%' }}>
            <AppHeaderwithBack text={'Blogs'} Back={()=>{props.navigation.goBack()}}/>
            {obj.length === 0 ? 
            <View>
                <ListEmpty text={'No Blog added on this date'}/>
            </View>:
            <View>
            <Image source={{ uri: FeatureImage }} style={styles.image} />
            <View style={styles.nameView}>
                <Text style={styles.name}>{tilte}</Text>
                <Text style={styles.datetxt}>{data.date}</Text>
            </View>
            <View style={styles.userDetailsView}>
            {coachImage === '' ? 
            <Image source={appImages.userIcon} style={styles.dp}/>
            :
                <Image source={{uri:coachImage}} style={styles.dp}/>
            }
                <View style={{marginLeft:responsiveWidth(3)}}>
                    <Text style={styles.userName}>{coachName}</Text>
                    <Text style={[styles.userName,{color:colors.greyText}]}>{'Meditation Speacialist'}</Text>
                </View>
            </View>
            <ScrollView>
                {/* <Text style={styles.discription}>{data.discription}</Text> */}
                <FlatList
                    data={dataSource}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                {item.image === '' ?
                                <Image source={appImages.userIcon} style={styles.image1} /> :
                                    <Image source={{ uri: item.image }} style={styles.image1} />
                                }

                                <Text style={styles.discription}>{item.text}</Text>
                            </View>
                        )
                    }}
                />
            </ScrollView>

            </View>
            }
        </View> 
    </ImageBackground>

    )
}
export default Details
