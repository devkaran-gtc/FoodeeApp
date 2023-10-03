import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBackNavigation from '../components/TopBackNavigation';

const SignUp = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const saveUserData = async () => {
    try {
      if (!username || !password) {
        ToastAndroid.showWithGravityAndOffset(
          'Enter Username && Password',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        return;
      }
      const userData = {
        username: username,
        password: password,
      };

      const userDataJSON = JSON.stringify(userData);

      await AsyncStorage.setItem('userData', userDataJSON);

      console.log('User data saved successfully.');
      navigation.navigate('SignInScreen');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TopBackNavigation />

      <View style={styles.innerContainer}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="#00000080"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#00000080"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <TouchableOpacity style={styles.signUpBtn} onPress={saveUserData}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.forgotPass}>Forgot Password?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
    marginBottom: 32,
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
  signUpBtn: {
    marginTop: 10,
    backgroundColor: '#F28482',
    borderRadius: 30,
  },
  signUpText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 13,
    fontWeight: '700',
  },
  forgotPass: {
    fontSize: 14,
    textAlign: 'right',
    marginTop: 21,
    color: '#34495E',
  },
});

export default SignUp;
