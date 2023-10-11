import {
  StyleSheet,
  View,
} from 'react-native';
import SimpleHeader from '../components/SimpleHeader';

const AboutUs = ({navigation}: any) => {
 
  return (
    <View style={styles.container}>
      <SimpleHeader title="About us" />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default AboutUs;
