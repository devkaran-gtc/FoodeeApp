import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import CloseIcon from '../assets/icons/CloseIcon';

const PaymentStatus = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            backgroundColor: '#F2848240',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 16,
          }}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <CloseIcon color={'#F28482'} size={24} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#F2848240',
            marginHorizontal: 30,
            borderRadius: 26,
          }}>
          <View
            style={{
              borderRadius: 26,
              marginVertical: 69,
              marginHorizontal: 69,
              backgroundColor: '#F28482',
              elevation: 8,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 22,
                marginVertical: 40,
                fontFamily: 'Avenir',
                fontWeight: '300',
                textAlign: 'center',
              }}>
              Payment {'\n'}Successful.{'\n'}Thank You
            </Text>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text
              style={{
                right: 0,
                bottom: 0,
                position: 'absolute',
                margin: 10,
                padding: 10,
                color: '#F28482',
                lineHeight: 20.49,
              }}>
              Back to Home
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2848240',
  },
  header: {
    position: 'absolute',
    marginTop: 68,
    right: 0,
    marginHorizontal: 20,
  },
});

export default PaymentStatus;
