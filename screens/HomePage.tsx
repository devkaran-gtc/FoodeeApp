import React, {useEffect} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useIsFocused} from '@react-navigation/native';

import Location from './Location';
import Home from './Home';
import MyCart from './MyCart';
import Profile from './Profile';
import CartIcon from '../assets/icons/CartIcon';
import HomeIcon from '../assets/icons/HomeIcon';
import LocationIcon from '../assets/icons/LocationIcon';
import ProfileIcon from '../assets/icons/ProfileIcon';

export type RootStackParams = {
  Location: any;
  Home: any;
  MyCart: any;
  Profile: any;
};

const RootStack = createBottomTabNavigator<RootStackParams>();

function HomePage() {
  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F28482',
        tabBarInactiveTintColor: '#3D405B',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 92,
          borderRadius: 28,
          marginHorizontal: 10,
          marginBottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 10,
          position: 'absolute',
        },
        tabBarIconStyle: {
          marginTop: 15,
        },
        tabBarLabelStyle: {
          marginBottom: 20,
        },
      }}>
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => {
            const isFocused = useIsFocused();
            return <HomeIcon color={color} size={size} focused={isFocused} />;
          },
          tabBarLabel: 'Home',
        }}
      />

      <RootStack.Screen
        name="Location"
        component={Location}
        options={{
          tabBarIcon: ({color, size}) => {
            const isFocused = useIsFocused();
            return (
              <LocationIcon color={color} size={size} focused={isFocused} />
            );
          },
          tabBarLabel: 'Location',
        }}
      />

      <RootStack.Screen
        name="MyCart"
        component={MyCart}
        options={{
          tabBarIcon: ({color, size}) => {
            const isFocused = useIsFocused();
            return <CartIcon color={color} size={size} focused={isFocused} />;
          },
          tabBarLabel: 'My Cart',
        }}
      />
      <RootStack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => {
            const isFocused = useIsFocused();
            return (
              <ProfileIcon color={color} size={size} focused={isFocused} />
            );
          },
          tabBarLabel: 'Profile',
        }}
      />
    </RootStack.Navigator>
  );
}

export default HomePage;
