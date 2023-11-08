import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT_CART_ITEM,
  INCREMENT_CART_ITEM,
  REMOVE_FROM_CART,
 
} from './Constants';


export const addToCart = (item: any) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId: any) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const incrementCartItem = (itemId:any) => ({
  type: INCREMENT_CART_ITEM,
  payload: itemId,
});

export const decrementCartItem = (itemId:any) => ({
  type: DECREMENT_CART_ITEM,
  payload: itemId,
});
