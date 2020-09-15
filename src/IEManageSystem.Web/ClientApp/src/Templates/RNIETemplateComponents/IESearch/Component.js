import React from 'react';
import IComponent from 'IETemplateComponents/IESearch/IComponent'
import { withRouter } from 'react-router-dom'
import { View, StyleSheet } from 'react-native'
import { Item, Icon, Input, Button } from 'native-base'

class Component extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = this.getCurrentSetting();
        let icon = <Button
            type='link'
            onClick={this.onClick}
            transparent
        >
            <Icon style={{ color: setting.fontColor }} name="search1" type='AntDesign' />
        </Button>;

        return (
            <View style={[this.baseStyle, styles.view, {borderWidth: setting.showBorder != 'false' && 1}]}>
                <Item style={[{borderBottomWidth: 0}]}>
                    {setting.iconPos == 'left' && icon}
                    <Input 
                        style={{ color: setting.fontColor }} 
                        placeholder="搜索文章" 
                        value={this.state.search}
                        onChange={(e) => {
                            this.setState({ search: e.target.value });
                        }}
                    />
                    {setting.iconPos == 'right' && icon}
                </Item>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
    }
})

export default withRouter(Component);
