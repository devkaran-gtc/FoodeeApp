import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParam} from '../App';

type Props = NativeStackNavigationProp<RootStackParam, 'FirstScreen'>;

const First = ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />

      <Image
        style={styles.card}
        source={require('../assets/images/hamburger.png')}
      />

      <TouchableOpacity
        style={styles.signInBtn}
        onPress={() => {
          navigation.navigate('SignInScreen');
        }}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpBtn}
        onPress={() => {
          navigation.navigate('SignUpScreen');
        }}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  card: {
    marginTop: 109,
    marginHorizontal: 57,
    borderRadius: 30,
  },
  signInBtn: {
    marginTop: 60,
    backgroundColor: '#F28482',
    borderRadius: 30,
    marginHorizontal: 30,
  },
  signInText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 11,
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
  signUpBtn: {
    marginTop: 31,
    backgroundColor: '#ECF0F1',
    borderRadius: 30,
    marginHorizontal: 30,
  },
  signUpText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 11,
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
});

export default First;
