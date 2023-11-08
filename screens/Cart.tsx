import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import CartTab from '../components/CartTab';
import FoodItem from '../components/FoodItem';
import {addToCart, clearCart, removeFromCart} from '../components/redux/Action';
import {connect} from 'react-redux';

const mapStateToProps = (state: any) => ({
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = {
  removeFromCart,
  clearCart,
};

const Cart = ({navigation, cartItems, removeFromCart, clearCart}: any) => {
  const [currentStep, setCurrentStep] = useState('myOrder');
  const [grandTotal, setGrandTotal] = useState(0);
  
  useEffect(() => {
    calculateGrandTotal(cartItems);
  }, []);

  const [dfta, setdfta] = useState([
    {
      name: 'Burgers',
      imgUrl: require('../assets/images/burger.png'),
      price: 50,
    },
    {
      name: 'Fries',
      imgUrl: require('../assets/images/Fries.png'),
      price: 20,
    },
    {
      name: 'Drinks',
      imgUrl: require('../assets/images/drinks.png'),
      price: 30,
    },
    {
      name: 'IceCream',
      imgUrl: require('../assets/images/icecream.png'),
      price: 24,
    },
    {
      name: 'Hot Dog',
      imgUrl: require('../assets/images/hotdog.png'),
      price: 75,
    },
    {
      name: 'Cold Coffee',
      imgUrl: require('../assets/images/coldcoffee.png'),
      price: 45,
    },
  ]);

  const calculateGrandTotal = (items: any) => {
    let total = 0;
    for (const item of items) {
      total += item.price;
    }
    setGrandTotal(total);
  };

  const onDelete = (itemIndex: number) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from the cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            removeFromCart(itemIndex);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const clearAllItems = () => {
    Alert.alert(
      'Clear All Items',
      'Are you sure you want to clear all items from the cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          onPress: () => {
            clearCart();
            calculateGrandTotal([]);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleIncrement = (itemIndex: number) => {
    const updatedCartItems = [...cartItems];
    const cartItem = updatedCartItems.find(
      (item: any) => item.id === itemIndex,
    );

    if (cartItem) {
      cartItem.itemCount = (cartItem.itemCount || 0) + 1;
      cartItem.price += cartItem.basePrice;

      addToCart(updatedCartItems);
      calculateGrandTotal(updatedCartItems);
    }
  };

  const handleDecrement = (itemIndex: number) => {
    const updatedCartItems = [...cartItems];
    const cartItem = updatedCartItems.find(item => item.id === itemIndex);

    if (cartItem && cartItem.itemCount > 1) {
      cartItem.itemCount -= 1;
      cartItem.price -= cartItem.basePrice;

      addToCart(updatedCartItems);
      calculateGrandTotal(updatedCartItems);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 'myOrder') {
      setCurrentStep('details');
    } else if (currentStep === 'details') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      navigation.navigate('PaymentScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header
          iconBg={'#F5CAC3'}
          iconColor={'#F28482'}
          onPress={() => {
            navigation.goBack();
          }}
          title={'My Cart'}
        />
      </View>

      <View style={styles.orderPathContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.detailTxt}>My Order</Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.detailTxt}>Details</Text>
        </View>

        <View style={styles.innerContainer}>
          <Text style={styles.detailTxt}>Payment</Text>
        </View>
      </View>

      <View style={styles.orderPathContainer1}>
        <Pressable
          style={styles.innerContainer}
          onPress={() => setCurrentStep('myOrder')}>
          <Text
            style={[
              styles.pathCount,
              currentStep === 'myOrder'
                ? styles.activePathCount
                : styles.inactivePathCount,
            ]}>
            1
          </Text>
        </Pressable>
        <View style={styles.verticalLine} />

        <Pressable
          style={styles.innerContainer}
          onPress={() => setCurrentStep('details')}>
          <Text
            style={[
              styles.pathCount,
              currentStep === 'details'
                ? styles.activePathCount
                : styles.inactivePathCount,
            ]}>
            2
          </Text>
        </Pressable>
        <View style={styles.verticalLine} />

        <Pressable
          style={styles.innerContainer}
          onPress={() => setCurrentStep('payment')}>
          <Text
            style={[
              styles.pathCount,
              currentStep === 'payment'
                ? styles.activePathCount
                : styles.inactivePathCount,
            ]}>
            3
          </Text>
        </Pressable>
      </View>

      {currentStep === 'myOrder' && (
        <>
          <View style={styles.orderContainer}>
            <View style={styles.orderHeader}>
              <Text
                style={{
                  fontSize: 24,
                  lineHeight: 30,
                  fontFamily: 'Abel-Regular',
                  fontWeight: '400',
                  color: '#3D405B',
                }}>
                Order
              </Text>
              <Pressable onPress={clearAllItems}>
                <Text
                  style={{
                    fontSize: 20,
                    lineHeight: 30,
                    fontFamily: 'Abel-Regular',
                    fontWeight: '400',
                    color: '#F28482',
                  }}>
                  Clear all
                </Text>
              </Pressable>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 104}}>
            {cartItems.map((item: any) => (
              <CartItem
                key={item.id}
                counter={item.itemCount}
                imgUrl={item.imgUrl}
                name={item?.name}
                onDecrement={() => handleDecrement(item.id)}
                onIncrement={() => handleIncrement(item.id)}
                price={item.price}
                onLongPress={() => {
                  onDelete(item.id);
                }}
              />
            ))}

            <Text
              style={{
                marginTop: 28,
                fontSize: 24,
                fontFamily: 'Abel-Regular',
                color: '#3D405B',
                fontWeight: '400',
                marginHorizontal: 20,
              }}>
              Don’t Forget ☺
            </Text>

            <View style={{marginVertical: 16}}>
              <FlatList
                data={dfta}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 12}}
                renderItem={({item}) => (
                  <FoodItem
                    imgSource={item.imgUrl}
                    foodName={item.name}
                    price={item.price}
                    onPress={() => {}}
                  />
                )}
              />
            </View>
          </ScrollView>
        </>
      )}
      {currentStep === 'details' && (
        <>
          <Text
            style={{
              color: 'black',
              marginTop: 100,
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            details Screen
          </Text>
        </>
      )}
      {currentStep === 'payment' && (
        <>
          <Text>Payment related info</Text>
        </>
      )}

      <View style={styles.cartTab}>
        <CartTab
          btnOnly={true}
          btnText={
            currentStep === 'myOrder'
              ? 'Next Step'
              : currentStep === 'details'
              ? 'Proceed to Payment'
              : 'Complete Order'
          }
          flexDirection="row"
          counter={1}
          onDecrement={() => {}}
          onIncrement={() => {}}
          totalPrice={grandTotal}
          cartBtnOnPress={handleNextStep}
          price={''}
          key={''}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginTop: 68,
    marginHorizontal: 20,
  },
  orderPathContainer: {
    marginTop: 40,
    flexDirection: 'row',
    marginHorizontal: 37,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderPathContainer1: {
    flexDirection: 'row',
    marginHorizontal: 37,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verticalLine: {
    flex: 1,
    width: 50,
    height: 1,
    backgroundColor: '#F5CAC3',
  },
  innerContainer: {
    flexDirection: 'column',
  },
  detailTxt: {
    fontSize: 11,
    fontFamily: 'Abel-Regular',
    fontWeight: '400',
    textAlign: 'center',
    color: '#3D405B',
  },
  pathCount: {
    width: 44,
    height: 44,
    backgroundColor: '#F28482',
    fontSize: 11,
    fontFamily: 'Abel-Regular',
    fontWeight: '400',
    lineHeight: 14.02,
    borderRadius: 24,
    color: '#FFFFFF',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  orderContainer: {
    marginTop: 32,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItems: {
    height: 373,
  },
  cartTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  activePathCount: {
    width: 44,
    height: 44,
    backgroundColor: '#F28482',
    fontSize: 11,
    fontFamily: 'Abel-Regular',
    fontWeight: '400',
    lineHeight: 14.02,
    borderRadius: 24,
    color: '#F5CAC3',
    textAlignVertical: 'center',
    textAlign: 'center',
  },

  inactivePathCount: {
    width: 44,
    height: 44,
    backgroundColor: '#F5CAC3',
    fontSize: 11,
    fontFamily: 'Abel-Regular',
    fontWeight: '400',
    lineHeight: 14.02,
    borderRadius: 24,
    color: '#FFFFFF',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
