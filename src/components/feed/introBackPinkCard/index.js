import React from 'react';
import {View , TouchableOpacity , Text , Image} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { appImages } from '../../../globals/utilities/assets';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style'

export const PinkCard = props => {
  const navigation = useNavigation();
  const {Cardimage} = props 
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.skipButton} onPress={()=>{navigation.navigate('Login')}}>
          <Text style={styles.skipButtonText}>
              Skip
          </Text>
      </TouchableOpacity>
      <Image source = {Cardimage} style={styles.image}/>
    </View>
  );
};




