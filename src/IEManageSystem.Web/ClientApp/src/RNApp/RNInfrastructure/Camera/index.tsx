import React from 'react'
import { View, StyleSheet, Modal, Platform } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { Button, Icon, Input, Text, Item } from 'native-base'

// TwoCode 二维码，Take 拍照
type CameraType = "TwoCode" | "Take"
// 谁能告诉我这两个值怎么关联起来
const cameraType = {
    TwoCode: "TwoCode",
    Take: "Take"
}

interface Props {
    isShow: boolean,
    type: CameraType,
    callback: (result: string) => void,
    cancelShow: () => void,
}

export default class Camera extends React.Component<Props> {
    camera = undefined;

    constructor(props) {
        super(props)
    }

    render() {
        return <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.isShow}

        >
            <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
                <View style={{ position: 'absolute', zIndex: 999 }}>
                    <Button
                        transparent
                        onPress={()=>{
                            if(this.props.cancelShow){
                                this.props.cancelShow();
                            }
                        }}
                    >
                        <Icon name='left' type='AntDesign' />
                    </Button>
                </View>
                {
                    Platform.OS != "web" &&
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
                        onBarCodeRead={this.props.type == cameraType.TwoCode ?
                            (e) => {
                                this.props.callback(e.data)
                            } : undefined
                        }
                    >
                        {
                            this.props.type == cameraType.Take &&
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
                                                this.props.callback(data);
                                            })
                                            .catch(err => console.error(err));
                                    }}
                                >
                                    <Text>拍照</Text>
                                </Button>
                            </View>
                        }
                    </RNCamera>
                }
            </View>
        </Modal>
    }
}

const styles = StyleSheet.create({
    btnView: {
        width: '100%',
        bottom: 80,
        padding: 20
    }
})