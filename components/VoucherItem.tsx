import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid,
  Image,
} from 'react-native';
import ClockIcon from '../assets/icons/ClockIcon';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface Props {
  img: any;
  title: string;
  duration: string;
  daysLeft: string;
}

const MyVoucher = ({img,title,duration,daysLeft}: Props) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              backgroundColor: '#ECF0F1',
            }}>
            <Image
              resizeMode="contain"
              style={{width: 80, height: 80}}
              source={img}
            />
          </View>

          <View style={{justifyContent: 'space-between', marginStart: 20}}>
            <Text
              style={{
                fontSize: 14,
                color: '#34495E',
                fontWeight: '700',
                fontFamily: 'Poppins-Regular',
              }}>
              {title}
            </Text>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ClockIcon size={15} />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: '#34495E',
                  fontWeight: '400',
                  marginStart: 5,
                  lineHeight: 17.06,
                  fontFamily: 'Poppins-Regular',
                  textAlignVertical: 'center',
                }}>
                {duration}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: '#FF0000',
                fontWeight: '800',
                lineHeight: 21,
                textAlignVertical: 'center',
                fontFamily: 'Poppins-Regular',
              }}>
              {daysLeft}
            </Text>
          </View>
        </View>

        <View style={{justifyContent: 'center'}}>
          <BouncyCheckbox
            size={25}
            fillColor="#F28482"
            unfillColor="#ECF0F1"
            innerIconStyle={{borderWidth: 0}}
            onPress={(isChecked: boolean) => {}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
  },
});

export default MyVoucher;
