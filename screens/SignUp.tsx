import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBackNavigation from '../components/TopBackNavigation';
import Button from '../components/Button';
import {CommonActions} from '@react-navigation/native';
import {showToast} from '../components/Toast';

const SignUp = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setmobileNo] = useState('');

  const saveUserData = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || !password || !mobileNo || !reEnteredPassword || !email) {
      showToast('Fields are empty');
    } else if (!emailRegex.test(email)) {
      showToast('Invalid email format');
    } else if (password !== reEnteredPassword) {
      showToast('passwords do not match');
    } else if (password.length < 6) {
      showToast('Password must be at least 6 characters long');
    } else {
      const userData = {
        username: username,
        password: password,
        email: email,
        mobileNo: mobileNo,
      };

      const userDataJSON = JSON.stringify(userData);

      await AsyncStorage.setItem('userData', userDataJSON);

      console.log('User data saved successfully.');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'HomePageScreen',
            },
          ],
        }),
      );
    }
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
          maxLength={10}
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

        <View style={{marginTop: 10}}>
        <Button
          color="#F28482"
          onPress={saveUserData}
          text="Sign Up"
          textColor="#FFF"
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
  innerContainer: {
    marginHorizontal: 30,
    marginTop: 140,
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
});

export default SignUp;
