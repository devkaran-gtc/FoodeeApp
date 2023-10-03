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
}

const BestOffersCard = ({backgroundColor, imgSource}: Props) => {
  return (
    <Pressable style={[styles.CardContainer, {backgroundColor}]}>
      <Image resizeMode='contain' source={imgSource} style={{height:73,width:82}} />

      <View style={styles.InnerContainer}>
        <Text style={styles.text1}>Frenchdog</Text>
        <Text style={styles.text2}>Tasty&Spicy 🌶🌶🌶</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal:24,
    flexDirection: 'row',
    width:"100%",
    marginBottom:8,
  },
  InnerContainer: {
    flexDirection: 'column',
    marginStart:10,
  },
  text1: {
    fontFamily: 'Abel-Regular',
    fontSize: 24,
    color: '#3D405B',
    fontWeight: '400',
  },
  text2: {
    fontFamily: 'Abel-Regular',
    fontSize: 16,
    color: '#3D405B',
    fontWeight: '400',
  },
});

export default BestOffersCard;
