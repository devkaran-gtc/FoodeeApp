import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Button from '../components/Button';
import CloseIcon from '../assets/icons/CloseIcon';

const PaymentScreen = ({navigation}: any) => {
  const [isCardNumberFocused, setIsCardNumberFocused] = useState(false);
  const [isCardExpiryFocused, setIsCardExpiryFocused] = useState(false);
  const [isCvvFocused, setIsCvvFocused] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleCardNumberFocus = () => {
    setIsCardNumberFocused(true);
    setIsCardExpiryFocused(false);
    setIsCvvFocused(false);
  };

  const handleCardExpiryFocus = () => {
    setIsCardNumberFocused(false);
    setIsCardExpiryFocused(true);
    setIsCvvFocused(false);
  };

  const handleCvvFocus = () => {
    setIsCardNumberFocused(false);
    setIsCardExpiryFocused(false);
    setIsCvvFocused(true);
  };

  const handleCardNumberChange = (input: any) => {
    const formattedInput = input.replace(/\D/g, '');
    const formattedCardNumber = formattedInput.match(/.{1,4}/g);

    if (formattedCardNumber) {
      setCardNumber(formattedCardNumber.join(' '));
    } else {
      setCardNumber('');
    }
  };

  const handleCardExpiryChange = (text: string) => {
    const numericText = text.replace(/\D/g, '');

    let formattedExpiry = '';
    if (numericText.length > 0) {
      formattedExpiry = numericText;
      if (formattedExpiry.length > 2) {
        formattedExpiry = `${formattedExpiry.slice(
          0,
          2,
        )}/${formattedExpiry.slice(2)}`;
      }
    }

    setCardExpiry(formattedExpiry);
  };

  const handleCvvChange = (text: string) => {
    setCvv(text);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
              navigation.goBack();
            }}>
            <CloseIcon color={'#F28482'} size={24} />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, justifyContent: 'center', marginTop: 100}}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              marginHorizontal: 30,
              borderRadius: 26,
            }}>
            <View
              style={{
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  color: '#FF785B',
                  fontSize: 17,
                  marginVertical: 16,
                  fontFamily: 'Avenir',
                  fontWeight: '300',
                }}>
                Card Details
              </Text>

              <View
                style={[
                  styles.inputContainer,
                  isCardNumberFocused
                    ? {borderColor: '#FF785B'}
                    : {borderColor: '#C4C4C4'},
                ]}>
                <Text
                  style={[
                    styles.label,
                    isCardNumberFocused
                      ? {color: '#FF785B'}
                      : {color: '#C4C4C4'},
                  ]}>
                  Card Number
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    isCardNumberFocused
                      ? {color: '#FF785B'}
                      : {color: '#C4C4C4'},
                  ]}
                  inputMode="numeric"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  placeholderTextColor={
                    isCardNumberFocused ? '#FF785B' : '#C4C4C4'
                  }
                  onFocus={handleCardNumberFocus}
                  onChangeText={handleCardNumberChange}
                  value={cardNumber}
                />
              </View>

              <View style={{flexDirection: 'row', marginTop: 23}}>
                <View
                  style={[
                    styles.inputContainer,
                    isCardExpiryFocused
                      ? {borderColor: '#FF785B'}
                      : {borderColor: '#C4C4C4'},
                    {flex: 1, marginRight: 11},
                  ]}>
                  <Text
                    style={[
                      styles.label,
                      isCardExpiryFocused
                        ? {color: '#FF785B'}
                        : {color: '#C4C4C4'},
                    ]}>
                    Card Expiry
                  </Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      isCardExpiryFocused
                        ? {color: '#FF785B'}
                        : {color: '#C4C4C4'},
                    ]}
                    inputMode="numeric"
                    placeholder="MM/YY"
                    maxLength={5}
                    placeholderTextColor={
                      isCardExpiryFocused ? '#FF785B' : '#C4C4C4'
                    }
                    onFocus={handleCardExpiryFocus}
                    onChangeText={handleCardExpiryChange}
                    value={cardExpiry}
                  />
                </View>

                <View
                  style={[
                    styles.inputContainer,
                    isCvvFocused
                      ? {borderColor: '#FF785B'}
                      : {borderColor: '#C4C4C4'},
                    {flex: 1, marginLeft: 11},
                  ]}>
                  <Text
                    style={[
                      styles.label,
                      isCvvFocused ? {color: '#FF785B'} : {color: '#C4C4C4'},
                    ]}>
                    CVV
                  </Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      isCvvFocused ? {color: '#FF785B'} : {color: '#C4C4C4'},
                    ]}
                    inputMode="numeric"
                    placeholder="123"
                    maxLength={3}
                    secureTextEntry={true}
                    placeholderTextColor={isCvvFocused ? '#FF785B' : '#C4C4C4'}
                    onFocus={handleCvvFocus}
                    onChangeText={handleCvvChange}
                    value={cvv}
                  />
                </View>
              </View>

              <View style={{marginHorizontal: 50, marginVertical: 33}}>
                <Button
                  text="Pay Now"
                  color="#F28482"
                  onPress={() => {
                    //   console.log(cardNumberWithoutSpaces);
                    navigation.navigate('PaymentStatus');
                  }}
                  textColor="#FFFFFF"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  textInput: {
    fontSize: 20,
    fontWeight: '300',
    lineHeight: 27.32,
    fontFamily: 'Avenir',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    marginBottom: 10,
  },
  label: {
    color: '#C4C4C4',
    fontSize: 11,
    fontWeight: '300',
    marginTop: 4,
    fontFamily: 'Avenir',
    paddingLeft: 5,
  },
});

export default PaymentScreen;
