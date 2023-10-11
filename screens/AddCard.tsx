import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';
import SimpleHeader from '../components/SimpleHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

import MonthPicker from 'react-native-month-year-picker';
import {showToast} from '../components/Toast';

const AddCard = ({navigation}: any) => {
  const [cardDetails, setCardDetails] = useState({
    bankName: '',
    cardHolderName: '',
    cardNumber: '',
    cardDate: '',
    cvv: '',
  });

  const [date, setDate] = useState(new Date());
  const [formetedCardNumber, setFormetedCardNumber] = useState('');
  const [show, setShow] = useState(false);
  const [isDatePicked, setIsDatePicked] = useState(false);

  const showPicker = useCallback((value: any) => setShow(value), []);

  const onValueChange = useCallback(
    (event: any, newDate: any) => {
      const selectedDate = newDate || date;

      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        month: '2-digit',
        year: 'numeric',
      });

      showPicker(false);
      setDate(selectedDate);
      setIsDatePicked(true);
      setCardDetails({...cardDetails, cardDate: formattedDate});
    },
    [date, showPicker, cardDetails],
  );

  const handleTextInputChange = (key: string, value: string) => {
    if (key === 'cardNumber') {
      const cardNumberWithoutSpaces = value.replace(/\s/g, '');
      const formattedInput = value.replace(/\D/g, '');

      const formattedCardNumber = formattedInput.match(/.{1,4}/g);

      if (formattedCardNumber) {
        setFormetedCardNumber(formattedCardNumber.join(' '));
      } else {
        setFormetedCardNumber('');
      }
      setCardDetails({...cardDetails, [key]: cardNumberWithoutSpaces});
    } else {
      setCardDetails({...cardDetails, [key]: value});
    }
  };

  const saveCard = async () => {
    if (!cardDetails.bankName.trim()) {
      showToast('Bank Name is required');
    } else if (!cardDetails.cardHolderName.trim()) {
      showToast('Card Holder Name is required');
    } else if (!cardDetails.cardNumber.trim()) {
      showToast('Card Number is required');
    } else if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
      showToast('Card Number must be 16 digits');
    } else if (!isDatePicked) {
      showToast('Expiry Date is required');
    } else if (!cardDetails.cvv.trim()) {
      showToast('CVV is required');
    } else if (cardDetails.cvv.length !== 3) {
      showToast('CVV must be 3 digits');
    } else {
      try {
        const existingCardDataJSON = await AsyncStorage.getItem('cardData');
        const existingCardData = existingCardDataJSON
          ? JSON.parse(existingCardDataJSON)
          : [];
        existingCardData.push(cardDetails);
        await AsyncStorage.setItem(
          'cardData',
          JSON.stringify(existingCardData),
        );
        showToast('Card added successfully.');
        console.log(cardDetails);

        navigation.navigate('PaymentSettings');
      } catch (error) {
        console.error('Error storing card in AsyncStorage:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <SimpleHeader title="Add Credit Card" />

      <View style={styles.CardContainer}>
        <View style={{alignItems: 'center'}}>
          <Image
            resizeMode="contain"
            style={{height: 196}}
            source={require('../assets/images/CreditCardBg.png')}
          />
        </View>

        <View
          style={{
            flex: 1,
            position: 'absolute',
            marginHorizontal: 42,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.nameText}>{cardDetails.cardHolderName}</Text>
            <Text style={[styles.bankText, {marginTop: 66}]}>
              {cardDetails.bankName}
            </Text>
            <Text style={styles.cardNumberText}>{formetedCardNumber}</Text>
            <Text style={styles.balanceText}>$12,999,999.99</Text>
          </View>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={[styles.bankText, {marginTop: 15}]}>
              {cardDetails.bankName}
            </Text>
            <Image
              resizeMode="contain"
              style={{marginTop: 123, width: 40, height: 23}}
              source={require('../assets/images/masterCard.png')}
            />
          </View>
        </View>

        <View style={styles.addCardContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Bank Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Bank name"
              placeholderTextColor={'#00000080'}
              onChangeText={text => handleTextInputChange('bankName', text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Your Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Name"
              placeholderTextColor={'#00000080'}
              onChangeText={text =>
                handleTextInputChange('cardHolderName', text)
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Card Number</Text>
            <TextInput
              style={styles.textInput}
              inputMode="numeric"
              placeholder="Enter Card Number"
              maxLength={19}
              placeholderTextColor={'#00000080'}
              onChangeText={text => handleTextInputChange('cardNumber', text)}
              value={formetedCardNumber}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.title}>Expiry</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Date"
              placeholderTextColor="#00000080"
              value={
                isDatePicked
                  ? date.toLocaleDateString('en-US', {
                      month: '2-digit',
                      year: 'numeric',
                    })
                  : ''
              }
              onChangeText={() => {}}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              onPress={() => {
                showPicker(true);
              }}
            />
          </View>

          {show && (
            <MonthPicker
              onChange={onValueChange}
              value={date}
              minimumDate={new Date()}
              locale="us"
            />
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.title}>CVV</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter cvv"
              inputMode="numeric"
              secureTextEntry
              maxLength={3}
              placeholderTextColor={'#00000080'}
              onChangeText={text => handleTextInputChange('cvv', text)}
            />
          </View>
          <View style={{marginTop: 109}}>
            <Button
              color="#F28482"
              text="Add"
              textColor="#FFFFFF"
              onPress={saveCard}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  CardContainer: {
    marginHorizontal: 30,
    marginTop: 27,
  },
  textOverlay: {
    position: 'absolute',
    marginHorizontal: 42,
    alignItems: 'center',
  },
  nameText: {
    marginTop: 15,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '700',
  },
  bankText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 11.72,
    fontWeight: '400',
  },
  cardNumberText: {
    marginTop: 5,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  balanceText: {
    marginTop: 10,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
  },
  addCardContainer: {
    marginTop: 33,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: '#00000080',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 16.41,
    fontWeight: '400',
  },
  textInput: {
    flex: 2,
    textAlign: 'right',
    color: '#000000',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
  },
});

export default AddCard;
