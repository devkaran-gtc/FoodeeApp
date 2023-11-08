import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT_CART_ITEM,
  INCREMENT_CART_ITEM,
  REMOVE_FROM_CART,
} from './Constants';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item: any) => item.id !== action.payload,
        ),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    case INCREMENT_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item: any) =>
          item.id === action.payload
            ? {...item, itemCount: item.itemCount + 1}
            : item,
        ),
      };
    case DECREMENT_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item: any) =>
          item.id === action.payload && item.itemCount > 1
            ? {...item, itemCount: item.itemCount - 1}
            : item,
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
