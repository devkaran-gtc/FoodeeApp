import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import ForwardIcon from '../assets/icons/ForwardIcon';

interface Props {
  title: string;
  onPress: () => void;
  // opacity: number;
}

const ProfileMenuItem = ({title, onPress}: Props) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="#ECF0F1"
      style={{
        paddingVertical: 11,
        paddingHorizontal: 10,
        borderRadius: 8,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.title}>{title}</Text>
        <ForwardIcon size={24} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    lineHeight: 21,
    color: '#000000',
  },
});

export default ProfileMenuItem;
