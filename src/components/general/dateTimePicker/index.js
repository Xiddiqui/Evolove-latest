import {
    Text,
    TouchableOpacity,

} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { colors } from '../../../globals/utilities/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { styles } from './style';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Icon } from 'react-native-elements'
import { fontFamily } from '../../../globals/utilities/fonts';

const DateSelect = (props) => {
    const { iconStyle } = props
    const [isDatePickerVisible, setDatePickerVisibility] = useState(props.isVisible || false);
    const [date, setDate] = useState('');
    useEffect(() => {
        setDate(props.initialDate);
    }, [props]);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {

        setDate(moment(date).format('YYYY/MM/DD'));
        props.getDate(moment(date).format('YYYY/MM/DD'));
        hideDatePicker();
    };

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={props.style}
            onPress={showDatePicker}>
            <Text
                style={{
                    color: date != '' ? colors.txtInputborder : colors.txtInputborder, fontSize: responsiveFontSize(1.7), marginTop: responsiveHeight(0.5),marginLeft:responsiveWidth(1) , fontFamily:fontFamily.appTextRegular
                }}>
                {date != '' ? date : 'Select Date    '}
            </Text>
            <DateTimePickerModal
                isVisible={props.isVisible || isDatePickerVisible}
                mode="date"
                // date={new Date()}
                // value={date}

                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                pickerContainerStyleIOS={{}}
                display={Platform.OS === 'ios' ? 'inline' : 'spinner'}
                ref={props.ref}
            />
<Icon name='date' type='fontisto' color={colors.txtInputborder} style={iconStyle} size={responsiveWidth(5.5)} />
        </TouchableOpacity>
    );
};

const TimeSelect = (props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState('');
    const { iconStyle } = props
    useEffect(() => {
        setDate(props.initialDate);
    }, [props]);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {

        setDate(moment(date).format('hh:mm A'));
        props.getDate(moment(date).format('hh:mm A'));
        hideDatePicker();
    };

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={props.style}
            onPress={showDatePicker}>
            <Text
                style={{
                    color: date != '' ? colors.txtInputborder : colors.txtInputborder
                }}>
                {date != '' ? date : props.placeHolder}
            </Text>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                // date={new Date()}
                // value={date}

                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                pickerContainerStyleIOS={{}}
                display={Platform.OS === 'ios' ? 'inline' : 'spinner'}
            />
            <Icon name='clock' type='feather' color={colors.txtInputborder} style={iconStyle} size={responsiveWidth(5.5)} />
        </TouchableOpacity>
    );
};

export { DateSelect, TimeSelect };