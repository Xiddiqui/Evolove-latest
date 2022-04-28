import {
  Home,
  TODO,
  Shop,
  Profile,
  Blog,
  BlogDetails,
  ShopDetails,
  Menu,
  Contact,
  Privacy,
  Feedback,
  Settings,
  EditProfile,
  Notification,
  TopCoaches,
  PopularCourses,
  CourseDetails,
  Tickets,
  TicketsDetails,
  Subscription,
  AddCard,
  Summary,
  PaymentDone,
  MoonCalander,
  Details,
  Search,
  AddTask,
  Calander,
  TaskDetails,
  Wallet,
  Withdraw,
  Bank,
  Done,
  Fav,
  ChangePassword,
  CheckEmail,
  HomeAddCard,
  HomePayScreen,
  EditTask
} from '../../screens/app';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import {Icon} from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { Text, Keyboard, Platform } from 'react-native';
import { View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Heart from 'react-native-vector-icons/Foundation';
import { colors } from '../../globals/utilities/colors'
import { appImages } from '../../globals/utilities/assets';
import { fontFamily } from '../../globals/utilities/fonts';
import { fontSize } from '../../globals/utilities/size';
import Terms from '../../screens/app/menu/terms';
import { ShowCoachProfile, VideoPlay } from '../../screens/coachApp';

const tabBarHeight = responsiveHeight(11);
const HomeStack = createStackNavigator(); // Home Screens
const TODOStack = createStackNavigator(); //TodoScreens
const ShopStack = createStackNavigator(); //shop Screens
const ProfileStack = createStackNavigator();
const BlogStack = createStackNavigator();


const MainTab = createBottomTabNavigator();

const MainApp = createStackNavigator();

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      showLabel={false}
      initialRouteName={'Home'}>
      <HomeStack.Screen name={'Home'} component={Home} />
    </HomeStack.Navigator>
  );
};

const BlogStackScreens = () => {
  return (
    <BlogStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <BlogStack.Screen name={'Blog'} component={Blog} />
    </BlogStack.Navigator>
  );
};

const ShopStackScreens = () => {
  return (
    <ShopStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <ShopStack.Screen name={'Shop'} component={Shop} />
    </ShopStack.Navigator>
  );
};
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <ProfileStack.Screen name={'Profile'} component={Profile} />
    </ProfileStack.Navigator>
  );
}
const TodoStackScreen = () => {
  return (
    <TODOStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <TODOStack.Screen name={'TODO'} component={TODO} />
    </TODOStack.Navigator>
  );
}
const MainTabScreens = props => {
  const [badge, setBadge] = useState(10);
  const [isVisible, setIsVisible] = useState(true);
  const [notificon, setnotificon] = useState(false);

  const keyboardWillShow = event => {
    setIsVisible(false);
  };

  const keyboardWillHide = event => {
    setIsVisible(true);
  };
  return (
    <MainTab.Navigator
      barStyle={{ backgroundColor: 'white' }}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        allowFontScaling: true,
        tabBarShowLabel: false,
        gestureEnabled: false,
        tabBarStyle: {
          backgroundColor: colors.iconBackGround,
          display: 'flex',
          width: responsiveWidth(90),
          marginBottom: responsiveHeight(2),
          alignSelf: 'center',
          height: tabBarHeight,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          borderTopWidth: responsiveWidth(0),
          elevation: 5,
          borderRadius: responsiveWidth(6),
          left: responsiveWidth(5),
          position: 'absolute',
        },
      }}
      initialRouteName={'Home'}>
      <MainTab.Screen
        name={'Home'}
        component={HomeStackScreens}
        initialParams={{ chk: false }}
        options={() => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginLeft: responsiveWidth(12),
                  // marginRight: responsiveWidth(4),
                  alignItems: 'center',
                  height: tabBarHeight,
                  width: responsiveWidth(25),
                  marginTop:
                    Platform.OS === 'ios' ? responsiveHeight(2.5) : null,
                  // flexDirection: 'row',
                }}>
                <Image
                  source={focused ? appImages.HomeRed : appImages.HomeGrey}
                  style={{
                    height: responsiveWidth(6),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                    marginBottom: responsiveHeight(0.2),

                  }}
                />
                <Text
                  style={{
                    color: focused ? colors.button : colors.greyText,
                    fontFamily: fontFamily.appTextRegular,
                    marginTop: responsiveHeight(1),
                    fontSize: fontSize.small
                    // marginLeft: responsiveWidth(1),
                  }}>
                  Home
                </Text>
              </View>
            )
          },
        })}
      />
      <MainTab.Screen
        name={'Blog'}
        component={BlogStackScreens}
        initialParams={{ chk: false }}
        listeners={{
          tabPress: e => {
            // Prevent default action
            // e.preventDefault();
          },
        }}
        options={() => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginLeft: responsiveWidth(12),
                  // marginRight: responsiveWidth(4),
                  alignItems: 'center',
                  height: tabBarHeight,
                  width: responsiveWidth(25),
                  // flexDirection: 'row',
                  marginTop:
                    Platform.OS === 'ios' ? responsiveHeight(2.5) : null,
                }}>
                <Image
                  source={focused ? appImages.BlogRed : appImages.BlogGrey}
                  style={{
                    height: responsiveWidth(6),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                    marginBottom: responsiveHeight(0.2),
                  }}
                />

                <Text
                  style={{
                    color: focused ? colors.button : colors.greyText,
                    fontFamily: fontFamily.appTextRegular,
                    marginTop: responsiveHeight(1),
                    fontSize: fontSize.small
                    // marginLeft: responsiveWidth(1),
                  }}>
                  Blog
                </Text>
              </View>
            )
          },
        })}
      />
      <MainTab.Screen
        name={'Shop'}
        component={ShopStackScreens}
        initialParams={{ chk: false }}
        listeners={{
          tabPress: e => {
            // Prevent default action
            // e.preventDefault();
          },
        }}
        options={() => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginLeft: responsiveWidth(12),
                  // marginRight: responsiveWidth(4),
                  alignItems: 'center',
                  height: tabBarHeight,
                  width: responsiveWidth(25),
                  marginTop:
                    Platform.OS === 'ios' ? responsiveHeight(2.5) : null,
                  // flexDirection: 'row',
                }}>
                <Image
                  source={focused ? appImages.ShopRed : appImages.ShopGrey}
                  style={{
                    height: responsiveWidth(6),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                    marginBottom: responsiveHeight(0.2),
                  }}
                />
                <Text
                  style={{
                    color: focused ? colors.button : colors.greyText,
                    fontFamily: fontFamily.appTextRegular,
                    marginTop: responsiveHeight(1),
                    fontSize: fontSize.small
                    // marginLeft: responsiveWidth(1),
                  }}>
                  shop
                </Text>
              </View>
            )
          },
        })}
      />
      <MainTab.Screen
        name={'Todo'}
        component={TodoStackScreen}
        initialParams={{ chk: false }}
        listeners={{
          tabPress: e => {
            // Prevent default action
            // e.preventDefault();
          },
        }}
        options={() => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginLeft: responsiveWidth(12),
                  // marginRight: responsiveWidth(4),
                  alignItems: 'center',
                  height: tabBarHeight,
                  width: responsiveWidth(25),
                  marginTop:
                    Platform.OS === 'ios' ? responsiveHeight(2.5) : null,
                  // flexDirection: 'row',
                }}>
                <Image
                  source={focused ? appImages.TodoPink : appImages.TodoGrey}
                  style={{
                    height: responsiveWidth(6),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                    marginBottom: responsiveHeight(0.2),
                  }}
                />
                <Text
                  style={{
                    color: focused ? colors.button : colors.greyText,
                    fontFamily: fontFamily.appTextRegular,
                    marginTop: responsiveHeight(1),
                    fontSize: fontSize.small
                    // marginLeft: responsiveWidth(1),
                  }}>
                  TO-DO
                </Text>
              </View>
            )
          },
        })}
      />
      <MainTab.Screen
        name={'Profile'}
        component={ProfileStackScreen}
        initialParams={{ chk: false }}
        listeners={{
          tabPress: e => {
            // Prevent default action
            // e.preventDefault();
          },
        }}
        options={() => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginLeft: responsiveWidth(12),
                  // marginRight: responsiveWidth(4),
                  alignItems: 'center',
                  height: tabBarHeight,
                  width: responsiveWidth(25),
                  marginTop:
                    Platform.OS === 'ios' ? responsiveHeight(2.5) : null,
                  // flexDirection: 'row',
                }}>
                <Image
                  source={focused ? appImages.UserRed : appImages.UserGrey}
                  style={{
                    height: responsiveWidth(6),
                    width: responsiveWidth(6),
                    resizeMode: 'contain',
                    marginBottom: responsiveHeight(0.2),
                  }}
                />
                <Text
                  style={{
                    color: focused ? colors.button : colors.greyText,
                    fontFamily: fontFamily.appTextRegular,
                    marginTop: responsiveHeight(1),
                    fontSize: fontSize.small
                    // marginLeft: responsiveWidth(1),
                  }}>
                  Profile
                </Text>
              </View>
            )
          },
        })}
      />
    </MainTab.Navigator>
  );
};
//   const DrawerScreens = () => {
//     return (
//       <Drawer.Navigator
//         drawerStyle={{width: responsiveWidth(70)}}
//         drawerContent={props => <CustomeDrawar {...props} />}
//         initialRouteName={'Main'}>
//         <Drawer.Screen name={'Main'} component={MainTabScreens} />
//       </Drawer.Navigator>
//     );
//   };
const App = () => {
  return (
    <MainApp.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName={'MainApp'}>
      <MainApp.Screen name={'Main'} component={MainTabScreens} />
      <MainApp.Screen name={'BlogDetails'} component={BlogDetails} />
      <MainApp.Screen name={'ShopDetails'} component={ShopDetails} />
      <MainApp.Screen name={'Menu'} component={Menu} />
      <MainApp.Screen name={'Contact'} component={Contact} />
      <MainApp.Screen name={'Privacy'} component={Privacy} />
      <MainApp.Screen name={'Terms'} component={Terms} />
      <MainApp.Screen name={'Feedback'} component={Feedback} />
      <MainApp.Screen name={'Settings'} component={Settings} />
      <MainApp.Screen name={'EditProfile'} component={EditProfile} />
      <MainApp.Screen name={'Notification'} component={Notification} />
      <MainApp.Screen name={'TopCoaches'} component={TopCoaches} />
      <MainApp.Screen name={'PopularCourses'} component={PopularCourses} />
      <MainApp.Screen name={'CourseDetails'} component={CourseDetails} />
      <MainApp.Screen name={'Tickets'} component={Tickets} />
      <MainApp.Screen name={'TicketsDetails'} component={TicketsDetails} />
      <MainApp.Screen name={'Subscription'} component={Subscription} />
      <MainApp.Screen name={'AddCard'} component={AddCard} />
      <MainApp.Screen name={'Summary'} component={Summary} />
      <MainApp.Screen name={'PaymentDone'} component={PaymentDone} />
      <MainApp.Screen name={'MoonCalander'} component={MoonCalander} />
      <MainApp.Screen name={'Details'} component={Details} />
      <MainApp.Screen name={'Search'} component={Search} />
      <MainApp.Screen name={'AddTask'} component={AddTask} />
      <MainApp.Screen name={'Calander'} component={Calander} />
      <MainApp.Screen name={'TaskDetails'} component={TaskDetails} />
      <MainApp.Screen name={'Wallet'} component={Wallet} />
      <MainApp.Screen name={'Withdraw'} component={Withdraw} />
      <MainApp.Screen name={'Bank'} component={Bank} />
      <MainApp.Screen name={'Done'} component={Done} />
      <MainApp.Screen name={'Fav'} component={Fav} />
      <MainApp.Screen name={'ChangePassword'} component={ChangePassword} />
      <MainApp.Screen name={'CheckEmail'} component={CheckEmail} />
      <MainApp.Screen name={'HomeAddCard'} component={HomeAddCard} />
      <MainApp.Screen name={'HomePayScreen'} component={HomePayScreen} />
      <MainApp.Screen name={'ShowCoachProfile'} component={ShowCoachProfile} />
      <MainApp.Screen name={'VideoPlay'} component={VideoPlay} />
      <MainApp.Screen name={'EditTask'} component={EditTask} />

    </MainApp.Navigator>
  );
};

export default App;
