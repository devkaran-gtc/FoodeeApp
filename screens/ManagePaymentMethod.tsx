import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import SimpleHeader from '../components/SimpleHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MasterCardIcon from '../assets/icons/MasterCardIcon';
import Button from '../components/Button';
import {formatCardNumber} from '../components/FormetCardNumber';
import {showToast} from '../components/Toast';

interface CardDetail {
  bankName: string;
  cardHolderName: string;
  cardNumber: string;
  cardDate: string;
  cvv: string;
}

const ManagePaymentMethod = ({navigation, route}: any) => {
  const [cardData, setCardData] = useState<CardDetail[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('cardData')
      .then(cardItemsJson => {
        if (cardItemsJson) {
          const parsedCartItems = JSON.parse(cardItemsJson);
          setCardData(parsedCartItems);
        }
      })
      .catch(error => {
        console.error('Error loading cart items:', error);
      });
  }, []);

  const onRemoveCard = () => {
    const cardNumberToRemove = route.params.cardNumber;

    const updatedCardData = cardData.filter(
      card => card.cardNumber !== cardNumberToRemove,
    );

    setCardData(updatedCardData);

    AsyncStorage.setItem('cardData', JSON.stringify(updatedCardData))
      .then(() => {
        ToastAndroid.show('Card removed successfully', ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error removing card:', error);
      });
  };

  const onMakeDefault = () => {
    const cardNumberToMakeDefault = route.params.cardNumber;

    const selectedCard = cardData.find(
      card => card.cardNumber === cardNumberToMakeDefault,
    );

    if (selectedCard) {
      const updatedCardData = cardData.filter(
        card => card.cardNumber !== cardNumberToMakeDefault,
      );

      updatedCardData.unshift(selectedCard);
      setCardData(updatedCardData);

      AsyncStorage.setItem('cardData', JSON.stringify(updatedCardData))
        .then(() => {
          showToast('Card set as default successfully');
          navigation.goBack();
        })
        .catch(error => {
          console.error('Error setting card as default:', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <SimpleHeader title="Payments Settings" />
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
            {route.params.cardType}
          </Text>
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
            textAlign: 'right',
            marginEnd: 15,
          }}>
          {formatCardNumber(route.params.cardNumber)}
        </Text>
      </View>

      <View style={styles.bottomButtonsContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            color="#F28482"
            text="Make as Default"
            textColor="#FFFFFF"
            onPress={() => {
              onMakeDefault();
            }}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            color="#ECF0F1"
            text="Remove"
            textColor="#000000"
            onPress={() => {
              onRemoveCard();
            }}
          />
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
  addCardContainer: {
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 27,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 140,
    width: '100%',
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default ManagePaymentMethod;
