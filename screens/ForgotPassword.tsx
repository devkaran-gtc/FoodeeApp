import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleHeader from '../components/SimpleHeader';
import PasswordInput from '../components/PasswordInput';

const ForgotPassword = ({navigation, route}: any) => {
  const [newPass, setNewPass] = useState('');
  const [newRePass, setNewRePass] = useState('');
  const [oldPass, setOldPass] = useState('');

  const fromProfile = route.params?.fromProfile || false;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const updatePassword = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');

      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        if (!newPass || !newRePass || !oldPass) {
          ToastAndroid.showWithGravityAndOffset(
            'Fields are empty',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else if (userData.password === oldPass) {
          if (newPass === newRePass) {
            const updatedUserData = {
              ...userData,
              password: newPass,
            };

            const updatedUserDataJSON = JSON.stringify(updatedUserData);

            await AsyncStorage.setItem('userData', updatedUserDataJSON);

            console.log('Password updated successfully.');
            ToastAndroid.showWithGravityAndOffset(
              'Password updated successfully.',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
            );

            if (fromProfile) {
              navigation.goBack();
            } else {
              navigation.navigate('SignInScreen');
            }
          } else {
            ToastAndroid.showWithGravityAndOffset(
              'new password should be same',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
            console.log('new password should be same');
          }
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Old password is incorrect',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          console.log('Old password is incorrect');
        }
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <SimpleHeader
          title={fromProfile ? 'Change Password' : 'Forgot Password'}
        />

        <View style={styles.innerContainer}>
          <Text style={styles.title}>Enter Old Password</Text>

          <PasswordInput
            value={oldPass}
            onChangeText={text => setOldPass(text)}
            placeholder="Password"
            secureTextEntry={true}
          />

          <Text style={styles.title}>Create New Password</Text>

          <PasswordInput
            value={newPass}
            onChangeText={text => setNewPass(text)}
            placeholder="Enter Password"
            secureTextEntry={true}
          />

          <PasswordInput
            value={newRePass}
            onChangeText={text => setNewRePass(text)}
            placeholder="Re-Enter Password"
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={updatePassword}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    marginHorizontal: 20,
    marginTop: 48,
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

export default ForgotPassword;
