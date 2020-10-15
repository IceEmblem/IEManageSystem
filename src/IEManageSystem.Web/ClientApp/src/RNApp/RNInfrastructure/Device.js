import { Dimensions, Platform } from 'react-native';

class Device {
    height = undefined;
    width = undefined;

    constructor(){
        if(Platform.OS == 'web'){
            this.height = 540;
            this.width = 360;
        }
        else{
            this.height = Dimensions.get('window').height;
            this.width = Dimensions.get('window').width;
        }
    }
}

export default new Device();