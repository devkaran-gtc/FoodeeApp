import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import ProfileMenuItem from '../components/ProfileMenuItem';
import Button from '../components/Button';
import SimpleHeader from '../components/SimpleHeader';
import {useFocusEffect} from '@react-navigation/native';

const Profile = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [mobileNo, setmobileNo] = useState('');
  const [profileImg, setProfileImg] = useState('');

  const fetchCardData = () => {
    AsyncStorage.getItem('userData')
      .then(cardItemsJson => {
        if (cardItemsJson) {
          const parsedCartItems = JSON.parse(cardItemsJson);
          setProfileImg(parsedCartItems.img);
          setUsername(parsedCartItems.username);
          setmobileNo(parsedCartItems.mobileNo);
        }
      })
      .catch(error => {
        console.error('Error loading card data:', error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCardData();
    }, []),
  );
  const signOut = async () => {
    await AsyncStorage.removeItem('userIsSignedIn');

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'SignInScreen',
          },
        ],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <SimpleHeader title="Profile" />

      <View style={{alignItems: 'center', marginTop: 25}}>
        <Pressable
          onPress={() => {
            navigation.navigate('MyProfile');
          }}>
          <Image
            resizeMode="contain"
            style={styles.imgContainer}
            source={
              profileImg
                ? {uri: profileImg}
                : require('../assets/images/profile.png')
            }
          />
        </Pressable>

        <Text
          style={{
            marginTop: 20,
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            lineHeight: 27,
            fontWeight: '700',
            color: 'black',
          }}>
          {username}
        </Text>
        <Text
          style={{
            marginTop: 5,
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            lineHeight: 16.41,
            fontWeight: '400',
            color: 'black',
          }}>
          {mobileNo}
        </Text>
      </View>

      <View style={{marginTop: 25, marginHorizontal: 20}}>
        <ProfileMenuItem
          title="My Profile"
          onPress={() => {
            navigation.navigate('MyProfile');
          }}
        />
        <ProfileMenuItem
          title="Change Password"
          onPress={() => {
            navigation.navigate('ForgotPassword', {fromProfile: true});
          }}
        />
        <ProfileMenuItem
          title="Payment Settings"
          onPress={() => {
            navigation.navigate('PaymentSettings');
          }}
        />
        <ProfileMenuItem
          title="My Voucher"
          onPress={() => {
            navigation.navigate('MyVoucher');
          }}
        />
        <ProfileMenuItem
          title="Notification"
          onPress={() => {
            navigation.navigate('Notification');
          }}
        />
        <ProfileMenuItem
          title="About us"
          onPress={() => {
            navigation.navigate('AboutUs');
          }}
        />
        <ProfileMenuItem
          title="Contact Us"
          onPress={() => {
            navigation.navigate('ContactUs');
          }}
        />
      </View>

      <View style={{marginTop: 15, marginHorizontal: 30}}>
        <Button
          color="#F5CAC3"
          text="Sign Out"
          textColor="black"
          onPress={signOut}
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
  imgContainer: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
  },
});

export default Profile;
