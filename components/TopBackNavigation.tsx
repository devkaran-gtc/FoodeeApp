import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import BackIcon from '../assets/icons/BackIcon';

const TopBackNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.backButton}
        underlayColor="#ECF0F1"
        onPress={() => {
          navigation.goBack();
        }}>
        <BackIcon color="#333" size={20} />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  backButton: {
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopBackNavigation;
