
  import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  
  import {StyleSheet} from 'react-native';
import { colors } from '../../../globals/utilities/colors';
  
  export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
   
    dataPickerContainer: {
      borderWidth: responsiveWidth(0.2),
      width: responsiveWidth(90),
      paddingVertical:responsiveHeight(2),
      alignSelf: 'center',
     
      marginTop: responsiveHeight(1.5),
      paddingLeft: responsiveWidth(3),
      borderRadius: responsiveWidth(2),
      borderColor: colors.txtInputborder,
      justifyContent: 'center',
      // alignItems: 'center',
    },
  });