import { Dimensions } from 'react-native';

class Device {
    height = Dimensions.get('window').height;
    width = Dimensions.get('window').width;
}

export default new Device();