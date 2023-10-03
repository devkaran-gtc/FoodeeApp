import React from 'react';
import {Pressable, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({navigation}:any) => {

  const signOut = async () => {
    await AsyncStorage.removeItem('userIsSignedIn');
    navigation.navigate('SignInScreen');
  };

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}> 
      <Pressable onPress={signOut}
        style={{backgroundColor:"#777",marginHorizontal:20,borderRadius:28}}>
        <Text style={{color: 'black', fontFamily: 'Abel-Regular' ,fontSize:25,padding:10}}>
          log Out
        </Text>
      </Pressable>
    </View>
  );
};

export default Profile;
