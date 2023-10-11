import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid,
} from 'react-native';
import SimpleHeader from '../components/SimpleHeader';
import VoucherItem from '../components/VoucherItem';
import Button from '../components/Button';

const MyVoucher = ({navigation}: any) => {
  const [voucher, setVoucher] = useState([
    {
      img: require('../assets/images/voucher.png'),
      title: 'Sale off 30% for Pizza',
      duration: 'Apr 10 - Apr 30',
      daysLeft: '11 days left',
    },
    {
      img: require('../assets/images/voucher.png'),
      title: 'Sale off 20% for Burger',
      duration: 'Apr 10 - Apr 30',
      daysLeft: '3 days left',
    },
    {
      img: require('../assets/images/voucher.png'),
      title: 'Sale off 10% for Fries',
      duration: 'Apr 10 - Apr 20',
      daysLeft: '8 days left',
    },
    {
      img: require('../assets/images/voucher.png'),
      title: 'Sale off 30% for Momoes',
      duration: 'Apr 10 - Apr 30',
      daysLeft: '7 days left',
    },
  ]);
  return (
    <View style={styles.container}>
      <SimpleHeader title="My Voucher" />
      <View style={{marginTop: 21, marginHorizontal: 30}}>
        
        {voucher.map((item, index) => (
          <VoucherItem
            key={index.toString()}
            img={item.img}
            title={item.title}
            daysLeft={item.daysLeft}
            duration={item.duration}
          />
        ))}
      </View>

      <View style={{marginHorizontal: 30, marginTop: 150}}>
        <Button
          color="#F28482"
          onPress={() => {}}
          text="Save"
          textColor="#FFFFFF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default MyVoucher;
