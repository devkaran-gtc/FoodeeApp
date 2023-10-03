import React from 'react'
import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MinusIcon from '../assets/icons/MinusIcon';
import PlusIcon from '../assets/icons/PlusIcon';


interface CartCounterProps {
    counter: number;
    onIncrement: () => void;
    onDecrement: () => void;
  }
  
  const CartCounter = ({ counter, onIncrement, onDecrement }: CartCounterProps) => {
    return (
      <View style={styles.cartCounterCon}>
        <Pressable onPress={onDecrement} disabled={counter === 1}>
        <MinusIcon color={counter === 1 ? '#F7EDE2' : '#D3D3D3'} size={24} />
      </Pressable>
        <Text style={styles.itemCount}>{counter}</Text>
        <Pressable onPress={onIncrement}>
          <PlusIcon color="#F28482" size={24} />
        </Pressable>
      </View>
    );
  };

const styles = StyleSheet.create({
  
    cartCounterCon: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    itemCount: {
      flex: 1,
      paddingHorizontal: 15,
      fontFamily: 'Abel-Regular',
      textAlign: 'center',
      fontSize: 20,
      lineHeight: 26,
      color: '#3D405B',
    },
  });

export default CartCounter