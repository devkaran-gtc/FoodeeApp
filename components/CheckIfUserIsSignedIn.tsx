import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkIfUserIsSignedIn = async () => {
  try {
    const userIsSignedIn = await AsyncStorage.getItem('userIsSignedIn');
    return userIsSignedIn === 'true';
  } catch (error) {
    console.error('Error checking user sign-in status:', error);
    return false;
  }
};
