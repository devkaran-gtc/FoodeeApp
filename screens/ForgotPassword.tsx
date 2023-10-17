import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid,
} from 'react-native';
import SimpleHeader from '../components/SimpleHeader';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showToast} from '../components/Toast';

const ForgotPassword = ({navigation, route}: any) => {
  const [newPass, setNewPass] = useState('');
  const [newRePass, setNewRePass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [userData, setUserData] = useState<any>(null);

  const fromProfile = route.params?.fromProfile || false;

  useEffect(() => {
    async function fetchUserData() {
      const user = auth().currentUser;
      if (user) {
        const userId = user.uid;
        const userRef = firestore().collection('users').doc(userId);
        userRef
          .get()
          .then(documentSnapshot => {
            if (documentSnapshot.exists) {
              const userData: any = documentSnapshot.data();
              setUserData(userData);              
            } else {
              console.log('User data not found');
            }
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }
    }

    fetchUserData();
  }, []);

  const updatePassword = async () => {
    if (!newPass || !newRePass || !oldPass) {
      ToastAndroid.showWithGravityAndOffset(
        'Fields are empty',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (userData.password === oldPass) {
      const user = auth().currentUser;
      if (user) {
        const email: any = user.email;
        const credential = firebase.auth.EmailAuthProvider.credential(
          email,
          oldPass,
        );

        try {
          await user.reauthenticateWithCredential(credential);
          await user.updatePassword(newPass);

          const userId = user.uid;
          const userRef = firestore().collection('users').doc(userId);

          await userRef.update({
            password: newPass,
          });

          console.log(
            'Password updated successfully in both Authentication and Firestore.',
          );
          showToast('password updated successfully');

          if (fromProfile) {
            navigation.goBack();
          } else {
            navigation.navigate('SignInScreen');
          }
        } catch (error) {
          showToast('Error updating password');
          console.log('Error updating password:', error);
        }
      } else {
        showToast('User not authenticated');
        console.log('User not authenticated');
      }
    } else {
      showToast('Old password is incorrect');
      console.log('Old password is incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <SimpleHeader title={fromProfile ? "Change Password" : "Forgot Password"} />

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
