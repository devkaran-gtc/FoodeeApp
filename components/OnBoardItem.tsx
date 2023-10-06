import React from 'react';
import {Image, StyleSheet, View, Text, Dimensions} from 'react-native';

interface Props {
  title: string;
  description: string;
  imgSource: any;
}

const OnBoardItem = ({title, description, imgSource}: Props) => {
    const { width } = Dimensions.get('window');


  return (
    <View style={[styles.container ,{width}]}>
      <Image
        source={imgSource}
        resizeMode="contain"
        style={{width: 200, height: 200}}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F28482',
      alignItems: "center",
      justifyContent: 'center',
    },
    title: {
      marginTop: 20,
      fontFamily: 'Poppins-Regular',
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 36,
      textAlign: 'center',
      justifyContent: 'center',
    },
    description: {
      marginTop: 15,
      fontFamily: 'Poppins-Regular',
      marginHorizontal:60,
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 16.41,
      textAlign: 'center',
      justifyContent: 'center',
    },
  });
  

export default OnBoardItem;
