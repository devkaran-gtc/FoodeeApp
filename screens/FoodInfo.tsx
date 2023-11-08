import React, {useEffect} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import FoodTag from '../components/FoodTag';
import CartTab from '../components/CartTab';
import Header from '../components/Header';
import {connect} from 'react-redux';
import {
  addToCart,
  incrementCartItem,
  decrementCartItem,
} from '../components/redux/Action';

const mapStateToProps = (state: any) => ({
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = {
  addToCart,
  incrementCartItem,
  decrementCartItem,
};

const FoodInfo = ({
  route,
  navigation,
  addToCart,
  cartItems,
  incrementCartItem,
  decrementCartItem,
}: any) => {
  const [counter, setCounter] = React.useState(1);
  const [totalPrice, setTotalPrice] = React.useState(route.params.price);

  const handleIncrement = () => {
    setCounter(counter + 1);
    setTotalPrice(totalPrice + route.params.price);
    incrementCartItem(route.params.id);
  };

  const handleDecrement = () => {
    if (counter > 1) {
      setCounter(counter - 1);
      setTotalPrice(totalPrice - route.params.price);
      decrementCartItem(route.params.id);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: Math.floor(Math.random() * 9000 + 1000),
      name: route.params.name,
      itemCount: counter,
      price: totalPrice,
      basePrice: route.params.price,
      imgUrl: route.params.imgUrl,
    };

    addToCart(cartItem);
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.topContainer,
          {backgroundColor: route.params.backgroundColor},
        ]}>
        <View style={styles.header}>
          <Header
            iconBg={route.params.iconBg}
            iconColor={route.params.backgroundColor}
            onPress={() => {
              navigation.goBack();
            }}
            title={route.params.name}
          />
        </View>

        <View style={styles.tagContainer}>
          <View style={styles.tagColumn}>
            <FoodTag
              background="#F7EDE2"
              fontColor="#3D405B"
              text="Classic Taste"
            />
          </View>

          <View style={styles.tagColumn}>
            <FoodTag
              background="#84A59D"
              fontColor="#FFFFFF"
              text="Best seller"
            />
          </View>
        </View>

        <Image
          style={[
            styles.img,
            {width: route.params.height, height: route.params.width},
          ]}
          source={route.params.imgUrl}
          resizeMode="contain"
        />
      </View>
      <View style={styles.descContainer}>
        <Text style={[styles.title, {marginTop: 36}]}>Description 🤩</Text>
        <Text style={styles.description}>{route.params.description}</Text>
      </View>

      <View style={styles.nutritionCotainer}>
        <Text style={styles.title}>Nutrition Facts</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
          }}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={styles.nuWeight}>35 g</Text>
            <Text style={styles.nuDesc}>Total Fat (45% DV)</Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={styles.nuWeight}>43 g</Text>
            <Text style={styles.nuDesc}>Total Carbs (16% DV)</Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={styles.nuWeight}>35 g</Text>
            <Text style={styles.nuDesc}>Protein</Text>
          </View>
        </View>
      </View>

      <View style={styles.cartTab}>
        <CartTab
          btnOnly={false}
          btnText="Add to Cart"
          flexDirection="column"
          price={route.params.price}
          counter={counter}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          totalPrice={totalPrice}
          cartBtnOnPress={handleAddToCart}
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
  topContainer: {
    backgroundColor: '#F28482',
    height: 364,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  header: {
    marginTop: 68,
    marginHorizontal: 20,
  },
  img: {
    position: 'absolute',
    right: 0,
    bottom: -20,
  },
  tagColumn: {
    marginStart: 20,
    flexDirection: 'row',
  },
  tagContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Abel-Regular',
    color: '#3D405B',
    fontWeight: '400',
  },
  descContainer: {
    marginHorizontal: 20,
  },
  description: {
    paddingTop: 13,
    fontFamily: 'Abel-Regular',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 12.39,
    color: '#5E5959',
    height: 167,
  },
  nutritionCotainer: {
    marginTop: 13,
    marginHorizontal: 20,
  },
  nuWeight: {
    fontFamily: 'Abel-Regular',
    fontSize: 20,
    color: '#3D405B',
    fontWeight: '400',
  },
  nuDesc: {
    fontFamily: 'Abel-Regular',
    fontSize: 11,
    color: '#3D405B',
    fontWeight: '400',
  },

  cartTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodInfo);
