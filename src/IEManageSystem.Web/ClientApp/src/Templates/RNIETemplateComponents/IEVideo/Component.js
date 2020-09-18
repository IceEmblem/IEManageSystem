import React from 'react'
import IComponent from 'IETemplateComponents/IEVideo/IComponent'
import StyleCheck from 'RNCMS/StyleCheck'
import { View, StyleSheet, TouchableHighlight, Platform } from 'react-native'
import { Button, Text, Icon } from 'native-base'
import Video from 'react-native-video';
import Device from 'RNInfrastructure/Device'
import Theme from 'BaseLayout/Theme'
import Weburl from 'Core/Weburl'

class Component extends IComponent {
    videoHeight = Platform.OS != 'web' ? Device.width * 9 / 16 : 212;

    state = {
        showTool: true,
        paused: this.getCurrentSetting().autoPlay != 'true'
    }

    render() {
        let setting = this.getCurrentSetting();
        let data = this.getCurrentData();

        return (
            <TouchableHighlight
                style={this.baseStyle}
                onPress={() => this.setState({ showTool: !this.state.showTool })}
                underlayColor='#0000'
            >
                <View style={[styles.view, { height: this.videoHeight }]}>
                    <Video
                        source={{ uri: data.url }}          // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}
                        // 缩放模式
                        resizeMode='cover'
                        // 是否循环播放
                        repeat={setting.loopPlay == 'true'}
                        // 是否暂停
                        paused={this.state.paused}
                        // 未播放时显示的图片
                        poster={Weburl.handleWeburl(data.img)}
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onError={this.videoError}               // Callback when video cannot be loaded
                        style={[styles.backgroundVideo, { height: this.videoHeight }]}
                    />
                    {
                        setting.hiddenTool == 'false' &&
                        this.state.showTool &&
                        <View style={[styles.toolBar]}>
                            <Button small transparent
                                onPress={() => {
                                    this.setState({ paused: !this.state.paused })
                                }}
                            >
                                <Text>
                                    <Icon
                                        style={{ color: Theme.color6 }}
                                        name={this.state.paused ? 'caretright' : 'pause'}
                                        type='AntDesign'
                                    />
                                </Text>
                            </Button>
                        </View>
                    }
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        width: '100%',
    },
    toolBar: {
        backgroundColor: '#0004',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        padding: 10
    },
    view: {
        justifyContent: 'flex-end',
        backgroundColor: '#0002'
    }
});

export default Component;
