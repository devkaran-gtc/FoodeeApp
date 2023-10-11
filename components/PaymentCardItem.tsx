import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ForwardIcon from '../assets/icons/ForwardIcon';
import MasterCardIcon from '../assets/icons/MasterCardIcon';

interface Props {
  cardType: string;
  cardNumber: any;
  onPress: ()=> void;
}

const PaymentCardItem = ({cardType, cardNumber,onPress}: Props) => {
  return (
    <View style={styles.addCardContainer}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#ECF0F1',
            borderRadius: 5,
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <MasterCardIcon size={20} />
          </View>
        </View>
        <Text
          style={{
            paddingLeft: 15,
            fontFamily: 'Roboto-Regular',
            fontWeight: '400',
            fontSize: 14,
            lineHeight: 16.41,
            color: '#34495E',
            textAlignVertical: 'center',
          }}>
          {cardType}
        </Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            paddingLeft: 15,
            fontFamily: 'Roboto-Regular',
            fontWeight: '400',
            fontSize: 14,
            lineHeight: 16.41,
            color: '#34495E',
            textAlignVertical: 'center',
            textAlign: 'right',
            marginEnd:15,
          }}>
          {cardNumber}
        </Text>

        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#ECF0F1',
            borderRadius: 5,
          }}
          onPress={onPress}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ForwardIcon size={24} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addCardContainer: {
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 27,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default PaymentCardItem;
