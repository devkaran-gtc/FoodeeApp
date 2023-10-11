import {
  StyleSheet,
  View,
} from 'react-native';
import SimpleHeader from '../components/SimpleHeader';


const Notification = ({navigation}: any) => {
 
  return (
    <View style={styles.container}>
      <SimpleHeader title="Notifications" />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default Notification;
