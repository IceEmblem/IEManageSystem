import React from 'react'
import { View } from 'react-native'
import {Theme} from 'ice-common'

export default class extends React.Component {
    render() {
        let height = this.props.height || 6;
        let progress = this.props.progress || "0%";
        let progressColor = this.props.progressColor || Theme.primary;

        return (
        <View style={{ height: height, backgroundColor: '#0002', borderRadius: height / 2, width: '100%' }}>
            <View style={{ height: height, width: progress, backgroundColor: progressColor, borderRadius: height / 2 }}>
            </View>
        </View>);
    }
}