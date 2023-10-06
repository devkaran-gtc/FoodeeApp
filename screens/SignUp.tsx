import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBackNavigation from '../components/TopBackNavigation';

const SignUp = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setmobileNo] = useState('');

  const saveUserData = async () => {
    if (!username || !password || !mobileNo || !reEnteredPassword || !email) {
      ToastAndroid.showWithGravityAndOffset(
        'Fields are empty',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToastAndroid.showWithGravityAndOffset(
        'Invalid email format',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }

    if (password !== reEnteredPassword) {
      ToastAndroid.showWithGravityAndOffset(
        'Passwords do not match',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }

    if (password.length < 6) {
      ToastAndroid.showWithGravityAndOffset(
        'Password must be at least 6 characters long',
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
      email: email,
      mobileNo: mobileNo,
    };

    const userDataJSON = JSON.stringify(userData);

    await AsyncStorage.setItem('userData', userDataJSON);

    console.log('User data saved successfully.');
    navigation.navigate('SignInScreen');
  };

  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 15, marginTop: 45, position: 'absolute'}}>
        <TopBackNavigation />
      </View>

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
          placeholder="Enter Email"
          placeholderTextColor="#00000080"
          value={email}
          inputMode="email"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile No"
          placeholderTextColor="#00000080"
          value={mobileNo}
          inputMode="numeric"
          onChangeText={text => setmobileNo(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#00000080"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Re-Enter Password"
          placeholderTextColor="#00000080"
          secureTextEntry={true}
          value={reEnteredPassword}
          onChangeText={text => setReEnteredPassword(text)}
        />

        <TouchableOpacity style={styles.signUpBtn} onPress={saveUserData}>
          <Text style={styles.signUpText}>Sign Up</Text>
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
  innerContainer: {
    marginHorizontal: 30,
    marginTop:140,
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
