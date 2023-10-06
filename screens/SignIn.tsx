import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBackNavigation from '../components/TopBackNavigation';
import {CommonActions} from '@react-navigation/native';

const SignIn = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkSignIn = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');

      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        if (!username || !password) {
          ToastAndroid.showWithGravityAndOffset(
            'Enter Username && Password',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          return;
        } else {
          if (
            userData.username === username &&
            userData.password === password
          ) {
            await AsyncStorage.setItem('userIsSignedIn', 'true');

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
            // navigation.navigate('HomePageScreen');
            
            setUsername('');
            setPassword('');
          } else {
            ToastAndroid.showWithGravityAndOffset(
              'Invalid username or password. Please try again.',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
        }
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'No user data found. Please sign up',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } catch (error) {
      console.error('Error checking user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 15, marginTop: 45, position: 'absolute'}}>
        <TopBackNavigation />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#00000080"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#00000080"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <TouchableOpacity style={styles.signInBtn} onPress={checkSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <Pressable
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          <Text style={styles.forgotPass}>Forgot Password?</Text>
        </Pressable>
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
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  title: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '700',
    marginBottom: 32,
    fontFamily: 'Roboto-Bold',
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
  signInBtn: {
    marginTop: 10,
    backgroundColor: '#F28482',
    borderRadius: 30,
  },
  signInText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 13,
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
  forgotPass: {
    fontSize: 14,
    textAlign: 'right',
    marginTop: 21,
    color: '#34495E',
    fontFamily: 'Roboto-Regular',
  },
});

export default SignIn;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
