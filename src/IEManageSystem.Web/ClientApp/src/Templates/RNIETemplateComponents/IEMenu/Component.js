import React from 'react';
import IComponent from 'IETemplateComponents/IEMenu/IComponent'
import StyleCheck from 'RNCMS/StyleCheck'
import Theme from 'BaseLayout/Theme'
import { View, StyleSheet } from 'react-native'
import { withRouter } from 'react-router-native'
import { Button, Icon, Text } from 'native-base'

class Component extends IComponent {
    constructor(props) {
        super(props);
    }

    createMenus() {
        let mainMenu = this.props.menu;
        if (!mainMenu) {
            return null;
        }

        return this.createMenusIteration(mainMenu);
    }

    createMenusIteration(menu) {
        let textStyle = StyleCheck.handle(this.getFontSetting().toStyle());
        let lis = Array();

        let menuItems = menu.menus;
        for (let item in menuItems) {
            let icon = menuItems[item].icon;

            if (menuItems[item].isCompositeMenuType()) {
                let childMenus = this.createMenusIteration(menuItems[item]);

                lis = lis.concat(childMenus);
            }
            else {
                let menu =
                    <Button
                        small
                        full
                        style={[styles.button, {backgroundColor: Theme.primary}, {height: textStyle.lineHeight}]}
                        key={menuItems[item].name}
                        onPress={() => {
                            this.props.history.push(menuItems[item].createUrl());
                            console.log(menuItems[item].createUrl())
                        }}
                        transparent
                    >
                        {icon && <Icon style={textStyle} name={icon} type='AntDesign'></Icon>}
                        <Text style={textStyle}>
                            {menuItems[item].displayName}
                        </Text>
                    </Button>

                lis.push(menu);
            }
        }

        return lis;
    }

    render() {
        return (
            <View style={[this.baseStyle, { flexDirection: 'row', backgroundColor: '#0008' }]}>
                {this.createMenus()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        flexGrow: 1
    }
})

export default withRouter(Component);
