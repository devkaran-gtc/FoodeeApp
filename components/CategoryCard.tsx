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
  backgroundColor: string;
  imgSource: any;
  text: any;
  onPress: () => void;
}

const CategoryCard = ({backgroundColor, imgSource, text, onPress}: Props) => {
  return (
    <Pressable
      style={[styles.CardContainer, {backgroundColor}]}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
      <Image style={styles.img} source={imgSource} resizeMode="contain" />
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
    height: 128,
    paddingHorizontal: 8,
  /*   shadowOffset: {width: 0, height: 8},
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowColor: '#F6BD60',
    elevation: 20, */
  },

  text: {
    fontFamily: 'Abel-Regular',
    fontSize: 12,
    color: '#3D405B',
    fontWeight: '400',
    paddingTop: 16,
  },

  img: {
    height: 90,
    width: 95,
  },
});

export default CategoryCard;
