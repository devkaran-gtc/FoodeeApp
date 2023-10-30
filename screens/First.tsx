import React, {useEffect} from 'react';
import {StyleSheet, View, Image, StatusBar} from 'react-native';
import Button from '../components/Button';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {firebase} from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

const First = ({navigation}: any) => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId:
        '219171945749-7da6hc4gicg5sub6o4e8asfgd4duknrb.apps.googleusercontent.com',
      offlineAccess: true,
    });
   
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo);

    /*   const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      console.log(
        'User signed in with Google:',
        firebaseUserCredential.user.displayName,
      ); */

      /*  navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'HomePageScreen',
            },
          ],
        }),
      ); */
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User canceled the sign-in process
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Sign-in process is already in progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play Services are not available
      } else {
        // Other errors
        console.error('Error signing in with Google:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />

      <Image
        style={styles.card}
        source={require('../assets/images/hamburger.png')}
      />

      <View style={{marginTop: 60, marginHorizontal: 30}}>
        <Button
          color="#F28482"
          onPress={() => {
            navigation.navigate('SignInScreen');
          }}
          text="Sign In"
          textColor="#fff"
        />
      </View>

      <View style={{marginTop: 20, marginHorizontal: 30}}>
        <Button
          color="#ECF0F1"
          onPress={() => {
            navigation.navigate('SignUpScreen');
          }}
          text="Sign Up"
          textColor="#000000"
        />
      </View>

      <View style={{marginTop: 20, marginHorizontal: 30}}>
        <Button
          color="#ECF0F1"
          onPress={signInWithGoogle}
          text="Continue with Google"
          textColor="#000000"
        />
      </View>
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
});

export default First;
