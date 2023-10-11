import {
  StyleSheet,
  View,
} from 'react-native';
import SimpleHeader from '../components/SimpleHeader';

const ContactUs = ({navigation}: any) => {
 
  return (
    <View style={styles.container}>
      <SimpleHeader title="Contact Us" />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default ContactUs;
