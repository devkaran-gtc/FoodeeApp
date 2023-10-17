import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Button from '../components/Button';
import SimpleHeader from '../components/SimpleHeader';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const MyProfile = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [avatarSource, setAvatarSource] = useState<any>(null);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  const [userData, setUserData] = useState<any>(null);

  const options: any = {
    mediaType: 'photo',
    includeBase64: false,
    maxWidth: 2000,
    maxHeight: 2000,
  };

  useEffect(() => {
    async function checkPermissions() {
      try {
        const cameraPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        /* const galleryPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ); */

        if (cameraPermission) {
          setPermissionsGranted(true);
        }
      } catch (error) {
        console.error('Error checking permissions:', error);
      }
    }

    checkPermissions();
  }, []);

  const requestCameraAndGalleryPermission = async () => {
    try {
      const cameraGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (cameraGranted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionsGranted(true);
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleAvatarPress = () => {
    if (permissionsGranted) {
      Alert.alert(
        'Change Avatar',
        'Choose an option:',
        [
          {
            text: 'Camera',
            onPress: () => {
              launchCamera(options, (response: any) => {
                if (response.didCancel) {
                } else if (response.errorMessage) {
                  console.error(response.errorMessage);
                } else {
                  setAvatarSource(response.assets[0].uri);
                  // console.log(response.assets[0].uri);
                }
              });
            },
          },
          {
            text: 'Gallery',
            onPress: () => {
              launchImageLibrary(options, (response: any) => {
                if (response.didCancel) {
                } else if (response.errorMessage) {
                  console.error(response.errorMessage);
                } else {
                  setAvatarSource(response.assets[0].uri);
                  // console.log(response.assets[0].uri);
                }
              });
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    } else {
      requestCameraAndGalleryPermission();
    }
  };

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
              setUsername(userData.username);
              setEmail(userData.email);
              setMobileNo(userData.mobileNo);
              setAvatarSource(userData.profilePic);
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

  const updateProfile = async () => {
    const user = auth().currentUser;
    if (user) {
      const userId = user.uid;

      const updatedUserData: any = {
        username: username,
        email: email,
        mobileNo: mobileNo,
      };

      try {
        await firestore()
          .collection('users')
          .doc(userId)
          .update(updatedUserData);
          if (avatarSource !== userData.profilePic) {
            const imageFileName = `profile_picture_${userId}.jpg`;
            const reference = storage().ref(`profile_pictures/${imageFileName}`);
            await reference.putFile(avatarSource);
            const imageUrl = await reference.getDownloadURL();
            updatedUserData.profilePic = imageUrl;
          }

        await firestore()
          .collection('users')
          .doc(userId)
          .update(updatedUserData);

        setUserData(updatedUserData);

        navigation.goBack();
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <SimpleHeader title="My Profile" />

      <Pressable
        style={{alignItems: 'center', marginTop: 25}}
        onPress={() => {
          handleAvatarPress();
        }}>
        <Image
          resizeMode="contain"
          style={styles.imgContainer}
          source={
            avatarSource
              ? {uri: avatarSource}
              : require('../assets/images/profile.png')
          }
        />
      </Pressable>

      <View style={{marginHorizontal: 30, marginTop: 30}}>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="#00000080"
          value={username}
          onChangeText={text => setUsername(text)}
        />

        <TextInput
          editable={false}
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#00000080"
          value={email}
          inputMode="email"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          editable={false}
          style={styles.input}
          placeholder="Enter Mobile No"
          placeholderTextColor="#00000080"
          value={mobileNo}
          inputMode="numeric"
          onChangeText={text => setMobileNo(text)}
        />

        <View style={{marginTop: 15}}>
          <Button
            color="#F5CAC3"
            text="Save"
            textColor="black"
            onPress={updateProfile}
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
    backgroundColor: '#F5F5F5',
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

export default MyProfile;
