import React from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import CartCounter from './CartCounter';

interface Props {
  name: string;
  price: any;
  counter: number;
  imgUrl: any;
  onIncrement: () => void;
  onDecrement: () => void;
  onLongPress: () => void;
}

const CartItem = ({
  name,
  price,
  counter,
  imgUrl,
  onIncrement,
  onDecrement,
  onLongPress,
}: Props) => {
  return (
      <Pressable style={styles.cartItemContainer} onLongPress={onLongPress}>
        <Image
          resizeMode="contain"
          style={{height: 60, width: 60}}
          source={imgUrl}
        />
        <View style={styles.namePriceContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
        <View style={styles.cartCounterCon}>
          <CartCounter
            counter={counter}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  
  cartItemContainer: {
    flexDirection: 'row',
    height: 84,
    borderRadius: 28,
    paddingHorizontal:24,
    marginHorizontal:20,
    paddingVertical:12,
    marginVertical: 4,
    backgroundColor: '#FFFFFF',
    elevation: 6,
  },
  cartCounterCon: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 28,
    paddingVertical: 15,
  },
  namePriceContainer: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 20,
    justifyContent: 'center',

  },
  name: {
    fontFamily: 'Abel-Regular',
    fontWeight: '400',
    fontSize: 13,
    color: '#3D405B',
    lineHeight: 26,
  },
  price: {
    fontFamily: 'Abel-Regular',
    fontWeight: '400',
    fontSize: 12,
    color: '#F28482',
  },
});

export default CartItem;
