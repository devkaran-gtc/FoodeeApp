import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  btnText: string;
  price: any;
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  onPress: () => void;
}

const CartBtn = ({btnText, price, flexDirection, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.addToCartBtn, {flexDirection: flexDirection}]}
      onPress={onPress}>
      <Text style={styles.addToCartText}>{btnText}</Text>
      <Text style={styles.priceText}>${price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addToCartBtn: {
    flex: 1,
    paddingHorizontal: 38,
    paddingVertical: 15,
    borderRadius: 28,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#F28482',
  },
  addToCartText: {
    width:112,
    fontSize: 16,
    fontFamily: 'Abel-Regular',
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  priceText: {
    fontFamily: 'Abel-Regular',
    fontWeight: '400',
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    lineHeight: 26,
  },
});

export default CartBtn;
