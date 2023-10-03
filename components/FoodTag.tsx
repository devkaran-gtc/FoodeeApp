import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface Props {
  text: string;
  background: string;
  fontColor: string;
}

const FoodTag = ({text, background, fontColor}: Props) => {
  return (
    <Text
      style={[styles.textTag, {color: fontColor, backgroundColor: background}]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  textTag: {
    padding: 12,
    fontFamily: 'Abel-Regular',
    borderRadius: 28,
    fontSize: 16,
    marginBottom: 5,
  },
});

export default FoodTag;
