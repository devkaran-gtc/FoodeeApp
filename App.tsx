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

export type RootStackParam = {
  FirstScreen: any;
  SignUpScreen: any;
  SignInScreen: any;
  HomePageScreen: any;
  FoodInfo: any;
  Cart: any;
  ForgotPassword: any;
  OnBoard: any;
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
