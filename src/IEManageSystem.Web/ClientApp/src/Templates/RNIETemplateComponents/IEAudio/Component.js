import React from 'react'
import IComponent from 'IETemplateComponents/IEAudio/IComponent'
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
import { Button, Icon } from 'native-base'
import Video from 'react-native-video';
import Device from 'RNInfrastructure/Device'
import Theme from 'BaseLayout/Theme'
import ProgressBar from 'RNCommon/ProgressBar'
import AntIcons from 'BaseCommon/AntIcons'

class Component extends IComponent {
    videoHeight = Device.width * 9 / 16;

    state = {
        paused: true,
        progress: "0%",
        minute: 0,
        second: 0,
        // 一开始不加载video，加快页面渲染
        isLoad: false
    }

    componentDidMount() {
        setTimeout(()=>{
            this.setState({ isLoad: true });
        }, 1)
    }

    render() {
        return (
            <TouchableHighlight
                style={this.baseStyle}
                onPress={() => this.setState({ showTool: !this.state.showTool })}
                underlayColor='#0000'
            >
                <View style={[styles.view]}>
                    {
                        this.state.isLoad &&
                        <Video
                            audioOnly
                            source={{ uri: this.getUrl() }}          // Can be a URL or a local file.
                            ref={(ref) => {
                                this.player = ref
                            }}
                            // 是否暂停
                            paused={this.state.paused}
                            onBuffer={this.onBuffer}                // Callback when remote video is buffering
                            onError={this.videoError}               // Callback when video cannot be loaded
                            style={[styles.backgroundVideo, { height: this.videoHeight }]}
                            onProgress={(e) => {
                                let progress = `${parseInt((e.currentTime / e.seekableDuration) * 100)}%`
                                this.setState({ progress: progress });
                            }}
                            onEnd={() => {
                                this.setState({ progress: "100%", paused: true });
                            }}
                            onLoad={(e) => {
                                let minute = parseInt(e.duration / 60);
                                let second = parseInt(e.duration % 60);
                                this.setState({ minute: minute, second: second })
                            }}
                        />
                    }
                    <View style={[styles.toolBar]}>
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
                            <ProgressBar progress={this.state.progress} />
                        </View>
                        <View style={{ flexShrink: 0, marginLeft: 15 }}>
                            <Text style={{ color: Theme.primary }}>{`${this.state.minute} : ${this.state.second} 秒`}</Text>
                        </View>
                    </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        padding: 10
    },
    view: {
        justifyContent: 'flex-end',
    }
});

export default Component;
