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

const Card = ({backgroundColor, imgSource}: Props) => {
  return (
    <Pressable style={[styles.CardContainer, {backgroundColor}]}>
      <View style={styles.InnerContainer}>
        <Text style={styles.text1}>Free Donut!</Text>
        <Text style={styles.text2}>For orders over $20</Text>
      </View>
      <Image
        source={imgSource}
        resizeMode="contain"
        style={{width:116,height:107}}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: 28,
    paddingVertical: 12,

    paddingStart: 20,
    paddingEnd: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 128,
    width:370,
    justifyContent: 'space-between',
    marginHorizontal:4,
  },
  InnerContainer: {
    flexDirection: 'column',
  },
  text1: {
    fontFamily: 'Abel-Regular',
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  text2: {
    fontFamily: 'Abel-Regular',
    fontSize: 16,
    color: '#F4F1DE',
    fontWeight: '400',
  },
});

export default Card;
