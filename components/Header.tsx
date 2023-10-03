import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CloseIcon from '../assets/icons/CloseIcon';

interface Props {
  iconColor: string;
  iconBg: string;
  title: string;
  onPress: () => void;
}

const Header = ({iconColor,iconBg, title, onPress}: Props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.foodName}>{title}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: iconBg,
          justifyContent: 'center',
          padding: 10,
          borderRadius: 16,
        }}
        onPress={onPress}>
        <CloseIcon color={iconColor} size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodName: {
    fontFamily: 'Abel-Regular',
    fontSize: 32,
    lineHeight: 40,
    color: '#3D405B',
  },
});

export default Header;
