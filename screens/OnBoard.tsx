import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Text,
  Pressable,
} from 'react-native';
import OnBoardItem from '../components/OnBoardItem';
import { CommonActions } from '@react-navigation/native';


const {width} = Dimensions.get('window');

const OnBoard = ({navigation}: any) => {


const handleOnPressNext = () => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'FirstScreen',
        },
      ],
    })
  );
  // navigation.navigate('FirstScreen');
};


  const [activeSlide, setActiveSlide] = React.useState(0);
  const flatListRef = useRef<FlatList | null>(null);

  const onBoardItems = [
    {
      id: '0',
      imgSource: require('../assets/images/chicken-leg.png'),
      title: 'Delicious Food',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: '1',
      imgSource: require('../assets/images/shipped.png'),
      title: 'Fast Shipping',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum rhoncus nulla.',
    },
    {
      id: '2',
      imgSource: require('../assets/images/medal.png'),
      title: 'Certificate Food',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultricies mauris a id.',
    },
    {
      id: '3',
      imgSource: require('../assets/images/credit-card.png'),
      title: 'Payment Online',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui ultricies sit massa.',
    },
  ];

  const renderDot = (index: any) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.dot,
        {backgroundColor: index === activeSlide ? '#FFFFFF' : '#F5CAC3'},
      ]}
      onPress={() => scrollToIndex(index)}
    />
  );

  const scrollToIndex = (index: any) => {
    if (flatListRef.current) {
      const offset = index * width;
      flatListRef.current.scrollToOffset({animated: true, offset});
      setActiveSlide(index);
    }
  };

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={onBoardItems}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        renderItem={({item}) => (
          <OnBoardItem
            description={item.description}
            imgSource={item.imgSource}
            title={item.title}
          />
        )}
      />

      <Pressable
        style={{justifyContent: 'center', alignItems: 'center', bottom: 50}}
        onPress={handleOnPressNext}>
        <Text>next</Text>
      </Pressable>

      <View style={styles.dotContainer}>
        {onBoardItems.map((_, index) => renderDot(index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F28482',
  },
  onBoardItem: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default OnBoard;
