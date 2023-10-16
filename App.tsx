import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {checkIfUserIsSignedIn} from './components/CheckIfUserIsSignedIn';
import First from './screens/First';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import HomePage from './screens/HomePage';
import FoodInfo from './screens/FoodInfo';
import Cart from './screens/Cart';
import ForgotPassword from './screens/ForgotPassword';
import OnBoard from './screens/OnBoard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaymentSettings from './screens/PaymentSettings';
import AddCard from './screens/AddCard';
import MyProfile from './screens/MyProfile';
import MyVoucher from './screens/MyVoucher';
import ManagePaymentMethod from './screens/ManagePaymentMethod';
import PaymentScreen from './screens/PaymentScreen';
import PaymentStatus from './screens/PaymentStatus';
import Notification from './screens/Notification';
import ContactUs from './screens/ContactUs';
import AboutUs from './screens/AboutUs';
import {enableLatestRenderer} from 'react-native-maps';

export type RootStackParam = {
  FirstScreen: any;
  SignUpScreen: any;
  SignInScreen: any;
  HomePageScreen: any;
  FoodInfo: any;
  Cart: any;
  ForgotPassword: any;
  OnBoard: any;
  PaymentSettings: any;
  AddCard: any;
  MyProfile: any;
  MyVoucher: any;
  ManagePaymentMethod: any;
  PaymentScreen: any;
  PaymentStatus: any;
  Notification: any;
  ContactUs: any;
  AboutUs: any;
};

const RootStack = createNativeStackNavigator<RootStackParam>();

function LoadingIndicator() {
  return (
    <View style={styles.loadingContainer}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <ActivityIndicator size="large" color="#F28482" />
    </View>
  );
}

function App() {
  enableLatestRenderer();
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParam>('OnBoard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIfOnboardingSeen = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');

      if (hasSeenOnboarding) {
        const userIsSignedIn = await checkIfUserIsSignedIn();
        if (userIsSignedIn) {
          setInitialRoute('HomePageScreen');
        } else {
          setInitialRoute('FirstScreen');
        }
      } else {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      }

      setIsLoading(false);
    };

    checkIfOnboardingSeen();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <RootStack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="OnBoard" component={OnBoard} />
        <RootStack.Screen name="FirstScreen" component={First} />
        <RootStack.Screen name="SignUpScreen" component={SignUp} />
        <RootStack.Screen name="SignInScreen" component={SignIn} />
        <RootStack.Screen name="HomePageScreen" component={HomePage} />
        <RootStack.Screen name="FoodInfo" component={FoodInfo} />
        <RootStack.Screen name="Cart" component={Cart} />
        <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
        <RootStack.Screen name="PaymentSettings" component={PaymentSettings} />
        <RootStack.Screen name="AddCard" component={AddCard} />
        <RootStack.Screen name="MyProfile" component={MyProfile} />
        <RootStack.Screen name="MyVoucher" component={MyVoucher} />
        <RootStack.Screen
          name="ManagePaymentMethod"
          component={ManagePaymentMethod}
        />
        <RootStack.Screen name="PaymentScreen" component={PaymentScreen} />
        <RootStack.Screen name="PaymentStatus" component={PaymentStatus} />
        <RootStack.Screen name="Notification" component={Notification} />
        <RootStack.Screen name="ContactUs" component={ContactUs} />
        <RootStack.Screen name="AboutUs" component={AboutUs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
