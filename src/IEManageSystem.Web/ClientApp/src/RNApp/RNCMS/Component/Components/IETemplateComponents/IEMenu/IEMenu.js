import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEMenu/IComponent'
import { View, Text } from 'react-native'
import { withRouter } from 'react-router-native'
import Icon from 'react-native-vector-icons/AntDesign';

class IEMenu extends IComponent {
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
                    <View style={{ flexGrow: 1 }}>
                        <Icon.Button
                            key={menuItems[item].name}
                            name={icon}
                            color="#000A"
                            style={{ justifyContent: 'center' }}
                            backgroundColor="#fff"
                            onPress={() => { this.props.history.push(menuItems[item].createUrl()); }}
                        >
                            <Text>
                                {menuItems[item].displayName}
                            </Text>
                        </Icon.Button>
                    </View>

                lis.push(menu);
            }
        }

        return lis;
    }

    render() {
        return (
            <View style={[this.baseStyle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                {this.createMenus()}
            </View>
        )
    }
}

export default (register) => register(IComponent, withRouter(IEMenu));
