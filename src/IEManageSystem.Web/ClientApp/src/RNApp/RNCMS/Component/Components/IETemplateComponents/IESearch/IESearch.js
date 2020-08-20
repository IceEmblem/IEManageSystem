import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IESearch/IComponent'
import { TextInput, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

class IESearch extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[this.baseStyle, styles.view]}>
                <Icon.Button name='search1' backgroundColor=""></Icon.Button>
                <TextInput
                    placeholder="在 IceEmblem 中搜索"
                    style={{ border: 0, backgroundColor: "fff0" }}
                    onChange={()=>{}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    }
})

export default (register) => register(IComponent, IESearch);
