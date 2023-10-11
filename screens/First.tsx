import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParam} from '../App';
import Button from '../components/Button';

type Props = NativeStackNavigationProp<RootStackParam, 'FirstScreen'>;

const First = ({navigation}: any) => {
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
