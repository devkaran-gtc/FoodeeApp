import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface Props {
  text: string;
  color: string;
  textColor: string;
  onPress: () => void;
}

const Button = (props: Props) => {
  return (
    <TouchableOpacity
      style={{backgroundColor: props.color, borderRadius: 30}}
      onPress={props.onPress}>
      <Text
        style={{
          color: props.textColor,
          textAlign: 'center',
          fontSize: 18,
          paddingVertical: 14,
          fontWeight: '700',
          fontFamily: 'Poppins-Regular',
        }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
