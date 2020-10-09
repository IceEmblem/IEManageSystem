import React from 'react'
import IComponent from 'IETemplateComponents/IEVideo/IComponent'
import StyleCheck from 'RNCMS/StyleCheck'
import { View, StyleSheet, TouchableHighlight, Text, Modal } from 'react-native'
import { Button } from 'native-base'
import Video from 'react-native-video';
import Device from 'RNInfrastructure/Device'
import Theme from 'BaseLayout/Theme'
import Weburl from 'Core/Weburl'
import ProgressBar from 'RNCommon/ProgressBar'
import AntIcons from 'BaseCommon/AntIcons'

class Component extends IComponent {
    videoHeight = Device.width * 9 / 16;
    player = undefined;

    state = {
        showTool: true,
        paused: this.getCurrentSetting().autoPlay != 'true',
        progressSecond: 0,
        progress: "0%",
        minute: 0,
        second: 0,
        fullscreen: false
    }

    render() {
        let setting = this.getCurrentSetting();
        let data = this.getCurrentData();

        let video = (
            <View style={[styles.view, this.state.fullscreen ? { height: "100%", width: "100%" } : { height: this.videoHeight }]}>
                <Video
                    source={{ uri: Weburl.handleWeburl(this.getVideoUrl()) }}          // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }}
                    // 缩放模式
                    resizeMode='contain'
                    // 是否循环播放
                    repeat={setting.loopPlay == 'true'}
                    // 是否暂停
                    paused={this.state.paused}
                    // 是否全屏
                    fullscreen={this.state.fullscreen}
                    // 未播放时显示的图片
                    poster={Weburl.handleWeburl(this.getImgUrl())}
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onError={this.videoError}               // Callback when video cannot be loaded
                    style={[styles.backgroundVideo]}
                    // 进度事件
                    onProgress={(e) => {
                        // currentTime 当前时间，seekableDuration 总时间
                        let progress = `${parseInt((e.currentTime / e.seekableDuration) * 100)}%`
                        this.setState({ progress: progress, progressSecond: e.currentTime });
                    }}
                    // 结束事件
                    onEnd={() => {
                        this.setState({ progress: "100%", paused: true, progressSecond: 0 });
                    }}
                    // 加载完成，可以播放事件
                    onLoad={(e) => {
                        let minute = parseInt(e.duration / 60);
                        let second = parseInt(e.duration % 60);
                        this.setState({ minute: minute, second: second });
                        // 设置开始播放的时间
                        this.player.seek(this.state.progressSecond);
                    }}
                />
                <View style={{ height: '100%', justifyContent: 'flex-end' }}>
                    <View style={[styles.toolBar, { display: setting.hiddenTool == 'false' && this.state.showTool ? 'flex' : 'none' }]}>
                        <Button small transparent
                            onPress={() => {
                                this.setState({ paused: !this.state.paused })
                            }}
                            style={{ marginRight: 15 }}
                        >
                            <Text>
                                {
                                    AntIcons.getIcon(this.state.paused ? "CaretRightFilled" : "PauseOutlined", { color: Theme.color6 })
                                }
                            </Text>
                        </Button>
                        <View style={{ flexGrow: 1 }}>
                            <ProgressBar height={4} progress={this.state.progress} />
                        </View>
                        <View style={{ flexShrink: 0, marginLeft: 15 }}>
                            <Text style={{ color: Theme.primary }}>{`${this.state.minute} : ${this.state.second} 秒`}</Text>
                        </View>
                        <Button small transparent
                            onPress={() => {
                                this.setState({ fullscreen: !this.state.fullscreen })
                            }}
                            style={{ marginLeft: 15 }}
                        >
                            <Text>
                                {
                                    AntIcons.getIcon(!this.state.fullscreen ? "FullscreenOutlined" : "FullscreenExitOutlined", { color: Theme.color6 })
                                }
                            </Text>
                        </Button>
                    </View>
                </View>
            </View>)

        return (
            <TouchableHighlight
                style={this.baseStyle}
                onPress={() => this.setState({ showTool: !this.state.showTool })}
                underlayColor='#0000'
            >
                <View>
                    <View>
                        {!this.state.fullscreen && video}
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.fullscreen}
                    >
                        {this.state.fullscreen && video}
                    </Modal>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    toolBar: {
        backgroundColor: '#0004',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        padding: 10
    },
    view: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        justifyContent: 'center',
    }
});

export default Component;
