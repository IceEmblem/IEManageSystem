import React from 'react';
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
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
                        style={styles.button}
                        key={menuItems[item].name}
                        onPress={() => {
                            this.props.history.push(menuItems[item].createUrl());
                            console.log(menuItems[item].createUrl())
                        }}
                    >
                        {icon && <Icon name={icon}></Icon>}
                        <Text>
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
