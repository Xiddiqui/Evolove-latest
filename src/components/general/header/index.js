import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet ,Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../globals/utilities/colors';
import { styles } from './styles'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { fontSize } from '../../../globals/utilities/size';
import { fontFamily } from '../../../globals/utilities/fonts';
import { appImages } from '../../../globals/utilities/assets';

export const AuthHeader = props => {
  const navigation = useNavigation();
  const { text, onPress, Back, name, type } = props;
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.circle} onPress={Back}>
        <Icon
          // name={'chevron-left'}
          name={name}
          // type={'feather'}
          type={type}
          color={colors.whiteText}
        // onPress={() => navigation.toggleDrawer()}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.hedingtxt}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
export const AppHeader = props => {
  const navigation = useNavigation();
  const { text, onPress, Back, name, type} = props;
  return (
    <View style={[styles.header1, {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: responsiveHeight(6),
      paddingLeft: responsiveWidth(5),
      paddingRight: responsiveWidth(5),
      alignItems: 'center',
      paddingBottom: responsiveHeight(2)
    }]}>
      <Icon
        name={'menu'}
        type={'entypo'}
        color={colors.whiteText}
        size={fontSize.h2}
        onPress={() => navigation.navigate('Menu')}
      />
      <Text style={{
        color: colors.whiteText,
        fontSize: fontSize.large,
        fontFamily: fontFamily.appTextMedium
      }}>{text}</Text>

      <TouchableOpacity onPress={onPress}>
        <Icon
          // name={'notifications-none'}
          // type={'material'}
          name={name}
          type={type}
          color={colors.whiteText}
          size={fontSize.h4}
        />
      </TouchableOpacity>
    </View>
  );
};
export const CoachHeader = props => {
  const navigation = useNavigation();
  const { text, onPress, Back, name, type , name1 , type1} = props;
  return (
    <View style={[styles.header1, {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: responsiveHeight(6),
      paddingLeft: responsiveWidth(5),
      paddingRight: responsiveWidth(5),
      alignItems: 'center',
      paddingBottom: responsiveHeight(2)
    }]}>
      <View style={[styles.circle,{backgroundColor:'transparent'}]} />
        {/* <Icon
          // name={'chevron-left'}
          name={name1}
          // type={'feather'}
          type={type1}
          color={colors.whiteText}
        // onPress={() => navigation.toggleDrawer()}
        /> */}
      {/* </TouchableOpacity> */}
      <Text style={{
        color: colors.whiteText,
        fontSize: fontSize.large,
        fontFamily: fontFamily.appTextMedium
      }}>{text}</Text>

      <TouchableOpacity onPress={onPress}>
        <Icon
          // name={'notifications-none'}
          // type={'material'}
          name={name}
          type={type}
          color={colors.whiteText}
          size={fontSize.h4}
        />
      </TouchableOpacity>
    </View>
  );
};
export const AppLogoHeader = props => {
  const navigation = useNavigation();
  const { text, onPress, Back, name, type} = props;
  return (
    <View style={[styles.header1, {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: responsiveHeight(6),
      paddingLeft: responsiveWidth(5),
      paddingRight: responsiveWidth(5),
      alignItems: 'center',
      paddingBottom: responsiveHeight(2)
    }]}>
      <Icon
        name={'menu'}
        type={'entypo'}
        color={colors.whiteText}
        size={fontSize.h2}
        onPress={() => navigation.navigate('Menu')}
      />
      <Image source={appImages.Logo1} style={styles.Logo1}/>

      <TouchableOpacity onPress={onPress}>
        <Icon
          // name={'notifications-none'}
          // type={'material'}
          name={name}
          type={type}
          color={colors.whiteText}
          size={fontSize.h4}
        />
      </TouchableOpacity>
    </View>
  );
};

export const AppHeaderwithBack = props => {
  const navigation = useNavigation();
  const { text, onPress, Back } = props;
  return (
    <View style={[styles.header1, {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: responsiveHeight(6),
      paddingLeft: responsiveWidth(5),
      paddingRight: responsiveWidth(5),
      alignItems: 'center',
      paddingBottom: responsiveHeight(2)
    }]}>
      <TouchableOpacity style={styles.circle} onPress={Back}>
        <Icon
          name={'chevron-left'}
          type={'feather'}
          color={colors.whiteText}
        // onPress={() => navigation.toggleDrawer()}
        />
      </TouchableOpacity>
      <Text style={{
        color: colors.whiteText,
        fontSize: fontSize.large,
        fontFamily: fontFamily.appTextMedium
      }}>{text}</Text>

      <TouchableOpacity onPress={()=>{navigation.navigate('Notification')}}>
        <Icon
          name={'notifications-none'}
          type={'material'}
          color={colors.whiteText}
          size={fontSize.h2}
        />
      </TouchableOpacity>
    </View>
  );
};
export const SearchHeader = props => {
  const navigation = useNavigation();
  const { text, onPress, Back } = props;
  return (
    <View style={[styles.header1, {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: responsiveHeight(6),
      paddingLeft: responsiveWidth(5),
      paddingRight: responsiveWidth(5),
      alignItems: 'center',
      paddingBottom: responsiveHeight(2)
    }]}>
      <TouchableOpacity style={styles.circle} onPress={Back}>
        <Icon
          name={'chevron-left'}
          type={'feather'}
          color={colors.whiteText}
        // onPress={() => navigation.toggleDrawer()}
        />
      </TouchableOpacity>
      <Text style={{
        color: colors.whiteText,
        fontSize: fontSize.large,
        fontFamily: fontFamily.appTextMedium
      }}>{text}</Text>

      <TouchableOpacity onPress={onPress}>
        <Icon
          name={'filter'}
          type={'feather'}
          color={colors.whiteText}
          size={fontSize.h2}
        />
      </TouchableOpacity>
    </View>
  );
};
export const AppLogoHeaderwithBack = props => {
  const navigation = useNavigation();
  const { text, onPress, Back } = props;
  return (
    <View style={[styles.header1, {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: responsiveHeight(6),
      paddingLeft: responsiveWidth(5),
      paddingRight: responsiveWidth(5),
      alignItems: 'center',
      paddingBottom: responsiveHeight(2)
    }]}>
      <TouchableOpacity style={styles.circle} onPress={Back}>
        <Icon
          name={'chevron-left'}
          type={'feather'}
          color={colors.whiteText}
        // onPress={() => navigation.toggleDrawer()}
        />
      </TouchableOpacity>
      <Image source={appImages.Logo1} style={styles.Logo1}/>

      <TouchableOpacity>
        <Icon
          name={'notifications-none'}
          type={'material'}
          color={colors.whiteText}
          size={fontSize.h2}
        />
      </TouchableOpacity>
    </View>
  );
};
export const AppHeaderwithBackwithnothirdbtn = props => {
  const navigation = useNavigation();
  const { text, onPress, Back, name, type } = props;
  return (
    <View style={[styles.header1, {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: responsiveHeight(6),
      paddingLeft: responsiveWidth(5),
      paddingRight: responsiveWidth(5),
      alignItems: 'center',
      paddingBottom: responsiveHeight(2)
    }]}>
      <TouchableOpacity style={styles.circle} onPress={Back}>
        <Icon
          name={'chevron-left'}
          type={'feather'}
          color={colors.whiteText}
        // onPress={() => navigation.toggleDrawer()}
        />
      </TouchableOpacity>
      <Text style={{
        color: colors.whiteText,
        fontSize: fontSize.large,
        fontFamily: fontFamily.appTextMedium
      }}>{text}</Text>

      <View style={styles.circle1} />
    </View>
  );
};
export const AppHeaderwithBackwiththirdtxt = props => {
  const navigation = useNavigation();
  const { text, onPress, Back, name, type } = props;
  return (
    <View style={[styles.header1, {
      flexDirection: 'row',
      justifyContent: 'space-between',
     
      alignItems: 'center',
      paddingBottom: responsiveHeight(2)
    }]}>
      <TouchableOpacity style={styles.circle} onPress={Back}>
        <Icon
          name={'chevron-left'}
          type={'feather'}
          color={colors.whiteText}
        // onPress={() => navigation.toggleDrawer()}
        />
      </TouchableOpacity>
      <Text style={{
        color: colors.whiteText,
        fontSize: fontSize.large,
        fontFamily: fontFamily.appTextMedium
      }}>{text}</Text>

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.hedingtxt}>Withdraw</Text>
      </TouchableOpacity>
    </View>
  );
};



