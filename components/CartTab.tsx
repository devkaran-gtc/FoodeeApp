import React from 'react';
import {StyleSheet, View} from 'react-native';
import CartCounter from './CartCounter';
import CartBtn from './CartBtn';

interface Props {
  btnText: string;
  price: any;
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  btnOnly: boolean;
  counter: number;
  onIncrement: () => void;
  onDecrement: () => void;
  totalPrice: any;
  cartBtnOnPress:() => void;
}

const CartTab = ({
  btnText,
  price,
  flexDirection,
  btnOnly,
  counter,
  onIncrement,
  onDecrement,
  totalPrice,
  cartBtnOnPress,
}: Props) => {
  return (
    <View style={styles.cartTab}>
      {!btnOnly && (
        <View style={styles.cartCounterCon}>
          <CartCounter
            counter={counter}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        </View>
      )}
      <CartBtn
        btnText={btnText}
        flexDirection={flexDirection}
        price={totalPrice}
        onPress={cartBtnOnPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cartTab: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 92,
    borderRadius: 28,
    marginBottom: 10,
    shadowOffset: {width: 0, height: 16},
    shadowOpacity: 0.6,
    shadowRadius: 32,
    // shadowColor: '#F6BD60',
    elevation: 8,
    padding: 8,
    marginHorizontal: 10,
  },
  cartCounterCon: {
    flex: 1,
    borderRadius: 28,
    paddingHorizontal: 38,
    paddingVertical: 15,
    borderColor: '#F28482',
    marginEnd: 8,
    borderWidth: 1,
  },
});

export default CartTab;
