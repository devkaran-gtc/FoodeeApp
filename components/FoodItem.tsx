import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';

interface Props {
  price: any;
  imgSource: any;
  foodName: string;
  onPress: () => void;
}
const FoodItem = ({price, imgSource, foodName, onPress}: Props) => {
  return (
    <Pressable style={[styles.CardContainer]} onPress={onPress}>
      <Image style={styles.img} source={imgSource} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text
          style={{
            fontFamily: 'Abel-Regular',
            fontSize: 16,
            color: '#3D405B',
            fontWeight: '600',
          }}>
          {foodName}
        </Text>
        <Text
          style={{
            fontFamily: 'Abel-Regular',
            fontSize: 16,
            color: '#3D405B',
            fontWeight: '600',
          }}>
          + ${price}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    width: 104,
    height: 176,
    paddingHorizontal: 8,
    paddingVertical: 20,
    backgroundColor: '#F7EDE2',
  },

  textContainer: {
    marginTop: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    height: 90,
    width: 95,
  },
});

export default FoodItem;
