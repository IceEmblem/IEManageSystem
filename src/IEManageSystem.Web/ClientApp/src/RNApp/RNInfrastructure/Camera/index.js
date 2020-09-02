import React from 'react'
import { View, StyleSheet } from 'react-native'
import { RNCamera, FaceDetector } from 'react-native-camera'
import { Button, Icon, Input, Text } from 'native-base'
import ILayoutInstance from 'BaseLayout/ILayoutInstance'
import IocContainer from 'Core/IocContainer'

export default class Camera extends React.Component {
    state = {
        open: false
    }

    camera = undefined;

    constructor(props) {
        super(props)
        this.onPress = this.onPress.bind(this);
    }

    onPress(backcall) {
        let layoutInstance = IocContainer.getService(ILayoutInstance);
        if (!layoutInstance) {
            return;
        }

        layoutInstance.showCustomizeView(
            <View style={{ width: '100%', height: '100%' }}>
                <RNCamera
                    style={{ width: '100%', height: '100%' }}
                    ref={ref => {
                        this.camera = ref;
                    }}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: '权限申请',
                        message: '我们需要你允许开启摄像头',
                        buttonPositive: '好的',
                        buttonNegative: '不了',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: '权限申请',
                        message: '我们需要你允许录音功能',
                        buttonPositive: '好的',
                        buttonNegative: '不了',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                >
                    <View style={styles.btnView}>
                        <Button
                            block
                            bordered
                            rounded
                            info
                            onPress={() => {
                                const options = { quality: 0.5, base64: true };
                                this.camera.takePictureAsync(options)
                                    .then((data) => {
                                        if (backcall) {
                                            backcall(data)
                                        }
                                        layoutInstance.closeCustomizeView();
                                    })
                                    .catch(err => console.error(err));
                            }}
                        >
                            <Text>拍照</Text>
                        </Button>
                    </View>
                </RNCamera>
            </View>);
    }

    render() {
        let BtnComponent = this.props.btnComponent;
        return <BtnComponent
            onPress={this.onPress}
        />
    }
}

const styles = StyleSheet.create({
    btnView: {
        width: '100%',
        position: 'absolute',
        bottom: 80,
        padding: 20
    }
})