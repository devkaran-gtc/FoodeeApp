import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import SearchIcon from '../assets/icons/SearchIcon';
import FilterIcon from '../assets/icons/FilterIcon';
import Card from '../components/Card';
import CategoryCard from '../components/CategoryCard';
import BestOffersCard from '../components/BestOffersCard';
import { useFocusEffect } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [mobileNo, setmobileNo] = useState('');
  const [profileImg, setProfileImg] = useState('');

  

  const menuItems = [
    {
      backgroundColor: '#81B29A',
      imgSource: require('../assets/images/cake.png'),
    },
    {
      backgroundColor: '#F6BD60',
      imgSource: require('../assets/images/icecream.png'),
    },
    {
      backgroundColor: '#F5CAC3',
      imgSource: require('../assets/images/Fries.png'),
    },
    {
      backgroundColor: '#F28482',
      imgSource: require('../assets/images/hotdog.png'),
    },
  ];

  const [categories, setCategories] = useState([
    {
      name: 'Burgers',
      imgUrl: require('../assets/images/burger.png'),
      backgroundColor: '#FFEF92',
      iconBg: '#84A59D',
      height: 280,
      width: 260,
      description:
        'Our fried rice is made from the finest ingredients and veggies. Every single dish is \nmade with fresh vegetables. \nEach plate is served with our signature ingredients ',
      price: 50,
    },
    {
      name: 'Fries',
      imgUrl: require('../assets/images/Fries.png'),
      backgroundColor: '#F5CAC3',
      iconBg: '#84A59D',
      height: 205,
      width: 270,
      description:
        'Our fried rice is made from the finest ingredients and veggies. Every single dish is made with fresh vegetables. Each plate is served with our signature ingredients ',
      price: 20,
    },
    {
      name: 'Drinks',
      imgUrl: require('../assets/images/drinks.png'),
      backgroundColor: '#B6D7CF',
      iconBg: '#84A59D',
      height: 195,
      width: 270,
      description:
        'Our fried rice is made from the finest ingredients and veggies. Every single dish is made with fresh vegetables. Each plate is served with our signature ingredients ',
      price: 30,
    },
    {
      name: 'IceCream',
      imgUrl: require('../assets/images/icecream.png'),
      backgroundColor: '#FFEF92',
      iconBg: '#84A59D',
      height: 274,
      width: 250,
      description:
        'Our fried rice is made from the finest ingredients and veggies. Every single dish is made with fresh vegetables. Each plate is served with our signature ingredients ',
      price: 24,
    },
    {
      name: 'Hot Dog',
      imgUrl: require('../assets/images/hotdog.png'),
      backgroundColor: '#F28482',
      iconBg: '#84A59D',
      height: 274,
      width: 250,
      description:
        'Our fried rice is made from the finest ingredients and veggies. Every single dish is made with fresh vegetables. Each plate is served with our signature ingredients ',
      price: 75,
    },
    {
      name: 'Cold Coffee',
      imgUrl: require('../assets/images/coldcoffee.png'),
      backgroundColor: '#F5CAC3',
      iconBg: '#84A59D',
      height: 274,
      width: 250,
      description:
        'Our fried rice is made from the finest ingredients and veggies. Every single dish is \nmade with fresh vegetables. \nEach plate is served with our signature ingredients ',
      price: 45,
    },
  ]);

  const bestOffers = [
    {
      backgroundColor: '#F28482',
      imgSource: require('../assets/images/hotdog.png'),
    },
    {
      backgroundColor: '#FFEF92',
      imgSource: require('../assets/images/hotdog.png'),
    },
    {
      backgroundColor: '#B6D7CF',
      imgSource: require('../assets/images/hotdog.png'),
    },
    {
      backgroundColor: '#F5CAC3',
      imgSource: require('../assets/images/hotdog.png'),
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      async function fetchUserData() {
        const user = auth().currentUser;
        if (user) {
          const userId = user.uid;
          const userRef = firestore().collection('users').doc(userId);
          userRef
            .get()
            .then((documentSnapshot) => {
              if (documentSnapshot.exists) {
                const userData:any = documentSnapshot.data();
                setUsername(userData.username);
                setmobileNo(userData.mobileNo);
                setProfileImg(userData.profilePic);
              } else {
                console.log('User data not found');
              }
            })
            .catch((error) => {
              console.error('Error fetching user data:', error);
            });
        }
      }
  
      fetchUserData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.greetCard}
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Image
          resizeMode="contain"
          style={{height: 64, width: 64, borderRadius: 32}}
          source={
            profileImg
              ? {uri: profileImg}
              : require('../assets/images/profile.png')
          }
        />
        <Text style={styles.greetText}>
          {username}
          {'\n'}
          {mobileNo}
        </Text>
      </Pressable>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TouchableOpacity>
            <SearchIcon />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor={'#3D405B'}
          />
        </View>

        <TouchableOpacity>
          <FilterIcon />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}>
        <Text style={styles.title}>Today's Menu</Text>
        <View style={styles.cardContainer}>
          <FlatList
            data={menuItems}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 16}}
            renderItem={({item}) => (
              <Card
                backgroundColor={item.backgroundColor}
                imgSource={item.imgSource}
              />
            )}
          />
        </View>

        <View style={styles.CategoryCardContainer}>
          <FlatList
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 12}}
            renderItem={({item}) => (
              <CategoryCard
                backgroundColor={item.backgroundColor}
                imgSource={item.imgUrl}
                text={item.name}
                onPress={() => {
                  navigation.navigate('FoodInfo', {
                    name: item.name,
                    imgUrl: item.imgUrl,
                    backgroundColor: item.backgroundColor,
                    iconBg: item.iconBg,
                    height: item.height,
                    width: item.width,
                    description: item.description,
                    price: item.price,
                  });
                }}
              />
            )}
          />
        </View>

        <Text style={styles.title2}>Best Offers 💕</Text>

        <View style={styles.OffersCardContainer}>
          {bestOffers.map((item, index) => (
            <BestOffersCard
              key={index.toString()}
              imgSource={item.imgSource}
              backgroundColor={item.backgroundColor}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // paddingHorizontal: 20,
  },
  greetCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFF2',
    borderRadius: 28,
    shadowOpacity: 0.6,
    elevation: 20,
    paddingVertical: 12,
    paddingStart: 20,
    paddingEnd: 12,
    marginTop: 57,
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetText: {
    marginStart: 12,
    fontFamily: 'Abel-Regular',
    fontSize: 14,
    color: '#3D405B',
    fontWeight: '400',
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 26,
    justifyContent: 'space-between',
    height: 44,
    marginHorizontal: 20,
    marginBottom: 3,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 12,
  },
  input: {
    flex: 1,
    marginStart: 6,
    fontFamily: 'Abel-Regular',
    fontSize: 14,
    color: '#3D405B',
    fontWeight: '400',
  },
  title: {
    marginStart: 20,
    marginTop: 23,
    fontWeight: '400',
    fontFamily: 'Abel-Regular',
    fontSize: 32,
    lineHeight: 40,
    color: '#3D405B',
  },
  cardContainer: {
    marginTop: 15,
  },
  CategoryCardContainer: {
    marginTop: 32,
  },
  title2: {
    marginStart: 20,
    marginTop: 30,
    fontWeight: '400',
    fontFamily: 'Abel-Regular',
    fontSize: 24,
    lineHeight: 30,
    color: '#3D405B',
  },

  OffersCardContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  vScroll: {
    paddingStart: 20,
  },
});

export default Home;
