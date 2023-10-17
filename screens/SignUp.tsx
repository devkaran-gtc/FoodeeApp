import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBackNavigation from '../components/TopBackNavigation';
import Button from '../components/Button';
import {CommonActions} from '@react-navigation/native';
import {showToast} from '../components/Toast';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        const user = userCredential.user;

        await firestore().collection('users').doc(user.uid).set({
          username: username,
          email: email,
          mobileNo: mobileNo,
          password: password,
          profilePic: null,
        });

        await AsyncStorage.setItem('userIsSignedIn', 'true');
        const hasSeenOnboarding = await AsyncStorage.getItem(
          'hasSeenOnboarding',
        );

        if (hasSeenOnboarding) {
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
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'OnBoard',
                },
              ],
            }),
          );
        }
      } catch (error) {
        console.error('Error signing up:', error);
        showToast('Sign-up failed');
      }
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
