import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import EyeOff from '../assets/icons/EyeOff';
import EyeOn from '../assets/icons/EyeOn';


interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry: boolean;
}

const PasswordInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}:PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const renderIcon = () => {
    return isPasswordVisible ? <EyeOn size={20} /> : <EyeOff size={20} />;
  };

  return (
    <View
      style={{
        marginBottom: 22,
        backgroundColor: '#ECF0F1',
        borderRadius: 30,
        paddingStart: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TextInput
        style={{
          flex: 1,
          color: '#000000',
          fontSize: 14,
          paddingVertical: 13,
        }}
        placeholder={placeholder}
        placeholderTextColor="#00000080"
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          paddingHorizontal: 15,
        }}
        onPress={togglePasswordVisibility}>
        {renderIcon()}
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
