import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IESearch/IComponent'
import { TextInput, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

class IESearch extends IComponent {
    state = {
        text: ''
    }
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[this.baseStyle, styles.view]}>
                <Icon.Button name='search1' color='#0008' backgroundColor=""></Icon.Button>
                <TextInput
                    placeholder="在 IceEmblem 中搜索"
                    style={{ height: 25, border: 0, color: '#000A', backgroundColor: "fff0", padding: 0 }}
                    value={this.state.text}
                    onChange={(e)=>{
                        this.setState({text: e.nativeEvent.text})
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    }
})

export default (register) => register(IComponent, IESearch);
