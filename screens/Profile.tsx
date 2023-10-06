import React from 'react';
import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import TopBackNavigation from '../components/TopBackNavigation';

const Profile = ({navigation}: any) => {
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

    // navigation.navigate('SignInScreen');
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          marginTop: 45,
          position: 'absolute',
        }}>
        <TopBackNavigation />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 15,
          marginTop: 51,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            lineHeight: 27,
            fontWeight: '700',
            color: 'black',
          }}>
          Profile
        </Text>
      </View>

      <View style={{alignItems: 'center', marginTop: 25}}>
        <Image
          resizeMode="contain"
          style={styles.imgContainer}
          source={require('../assets/images/profile.png')}
        />
        <Text
          style={{
            marginTop: 20,
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            lineHeight: 27,
            fontWeight: '700',
            color: 'black',
          }}>
          name
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
          9023812604
        </Text>
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

export default Profile;
