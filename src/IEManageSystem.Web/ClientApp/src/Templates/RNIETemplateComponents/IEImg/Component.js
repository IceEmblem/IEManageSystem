import React from 'react';
import IComponent from 'IETemplateComponents/IEImg/IComponent'

import { View, Image, TouchableHighlight } from 'react-native'
import WebUrl from 'Core/Weburl'
import { withRouter } from 'react-router-native'
import StyleCheck from 'RNCMS/StyleCheck'

class Component extends IComponent {
    render() {
        let data = this.getCurrentData();
        let setting = this.getCurrentSetting();

        return <TouchableHighlight to={data.linkUrl}
            style={[this.baseStyle]}
            onPress={this.click}
            underlayColor='#0004'
        >
            <View style={{ alignItems: 'center' }}>
                <Image source={{ uri: WebUrl.handleWeburl(this.getImgUrl()) }} style={StyleCheck.handle(this.getImgStyle())} />
                <View
                    style={{
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: setting.position == 'onimg' ? '100%' : 'auto',
                        position: setting.position == 'onimg' ? 'absolute' : 'relative'
                    }}
                >
                    {
                        this.props.children.length > 0 &&
                        this.props.children[0]
                    }
                </View>
            </View>
        </TouchableHighlight>
    }
}

export default withRouter(Component);
