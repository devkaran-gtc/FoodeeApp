import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SimpleHeader from '../components/SimpleHeader';
import CardIcon from '../assets/icons/CardIcon';
import PlusIcon from '../assets/icons/PlusIcon';
import PaymentCardItem from '../components/PaymentCardItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import { formatCardNumber } from '../components/FormetCardNumber';

interface CardDetail {
  bankName: string;
  cardHolderName: string;
  cardNumber: string;
  cardDate: string;
  cvv: string;
}

const PaymentSettings = ({navigation}: any) => {
  const [cardData, setCardData] = useState<CardDetail[]>([]);

 /*  useEffect(() => {
    loadCardData();
  }, []);

  const loadCardData = async () => {
    try {
      const cardItemsJson = await AsyncStorage.getItem('cardData');
      if (cardItemsJson) {
        const parsedCardItems = JSON.parse(cardItemsJson);
        setCardData(parsedCardItems);
      }
    } catch (error) {
      console.error('Error loading card items:', error);
    }
  }; */

  const fetchCardData = () => {
    AsyncStorage.getItem('cardData')
      .then(cardItemsJson => {
        if (cardItemsJson) {
          const parsedCartItems = JSON.parse(cardItemsJson);
          setCardData(parsedCartItems);
        }
      })
      .catch(error => {
        console.error('Error loading card data:', error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCardData();
    }, [])
  );

  const navigateToAddCard = () => {
    navigation.navigate('AddCard');
  };

  
  return (
    <View style={styles.container}>
      <SimpleHeader title="Payments Settings" />

      {cardData.map((cardItem: any, index) => (
        <PaymentCardItem
          key={index}
          cardNumber={formatCardNumber( cardItem.cardNumber)}
          cardType={cardItem.cardHolderName}
          onPress={() => {
            navigation.navigate('ManagePaymentMethod', {
              cardType: cardItem.cardHolderName,
              cardNumber: cardItem.cardNumber,
            });
          }}
        />
      ))}

      <View style={styles.addCardContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{padding: 5}}>
            <CardIcon size={20} />
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
            Add new payment method
          </Text>
        </View>

        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#ECF0F1',
            borderRadius: 5,
          }}
          onPress={() => {
            navigateToAddCard();
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <PlusIcon size={24} color="#F28482" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  addCardContainer: {
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 27,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    color: '#34495E',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  input: {
    marginBottom: 22,
    backgroundColor: '#ECF0F1',
    borderRadius: 30,
    paddingStart: 30,
    paddingVertical: 13,
    color: '#000000',
    fontSize: 14,
  },
  saveBtn: {
    marginTop: 275,
    backgroundColor: '#F28482',
    borderRadius: 30,
  },
  saveText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 13,
    fontWeight: '700',
  },
});

export default PaymentSettings;
