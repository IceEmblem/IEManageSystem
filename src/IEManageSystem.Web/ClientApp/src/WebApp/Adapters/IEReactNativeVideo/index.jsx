import React from 'react'
import videoImg from './videoImg.png'
import { Image, View } from 'react-native'

class IEReactNativeVideo extends React.Component {
    render() {
        if (this.props.audioOnly) {
            return <View style={this.props.style} >
            </View>
        }

        return (
            <View style={this.props.style} >
                <img src={videoImg} alt="" />
            </View>
        )
    }
}

export default IEReactNativeVideo;