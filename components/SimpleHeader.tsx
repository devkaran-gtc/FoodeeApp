import React from 'react';
import { Text, View } from 'react-native';
import TopBackNavigation from './TopBackNavigation';

interface Props{
    title:string
}

const SimpleHeader = ({title}:Props) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          marginTop: 45,
          position: 'absolute',
        }}>
        <TopBackNavigation />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 15,
          marginTop: 51,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            lineHeight: 27,
            fontWeight: '700',
            color: 'black',
          }}>
          {title}
        </Text>
      </View>
    </>
  );
};

export default SimpleHeader;
