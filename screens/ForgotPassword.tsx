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

const ForgotPassword = ({navigation}: any) => {
  const [newPass, setNewPass] = useState('');
  const [newRePass, setNewRePass] = useState('');
  const [oldPass, setOldPass] = useState('');
  
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
            navigation.navigate('SignInScreen');
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
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          marginTop: 45,
        }}>
        <TopBackNavigation />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginStart: 84,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 18,
              lineHeight: 27,
              fontWeight: '700',
              color: 'black',
            }}>
            Forgot Password
          </Text>
        </View>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.title}>Enter Old Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#00000080"
          value={oldPass}
          secureTextEntry={true}
          onChangeText={text => setOldPass(text)}
        />

        <Text style={styles.title}>Create New Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#00000080"
          secureTextEntry={true}
          value={newPass}
          onChangeText={text => setNewPass(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Re-Enter Password"
          placeholderTextColor="#00000080"
          secureTextEntry={true}
          value={newRePass}
          onChangeText={text => setNewRePass(text)}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={updatePassword}>
          <Text style={styles.saveText}>Save</Text>
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
