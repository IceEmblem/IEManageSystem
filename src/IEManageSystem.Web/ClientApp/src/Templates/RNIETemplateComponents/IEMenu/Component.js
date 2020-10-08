import React from 'react';
import IComponent from 'IETemplateComponents/IEMenu/IComponent'
import StyleCheck from 'RNCMS/StyleCheck'
import Theme from 'BaseLayout/Theme'
import { View, StyleSheet } from 'react-native'
import { withRouter } from 'react-router-native'
import { Button, Icon, Text } from 'native-base'
import AntIcons from 'BaseCommon/AntIcons'

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
            let curTextStyle = textStyle;
            let isActive = this.props.currentPageAndPost.page.name == menuItems[item].pageName;
            if(isActive){
                curTextStyle = {...curTextStyle};

                if(curTextStyle.fontSize){
                    curTextStyle.fontSize = curTextStyle.fontSize + 2;
                }
                else{
                    curTextStyle.fontSize = 16;
                }
            }

            let icon = menuItems[item].icon ? AntIcons.getIcon(menuItems[item].icon, curTextStyle) : undefined;

            if (menuItems[item].isCompositeMenuType()) {
                let childMenus = this.createMenusIteration(menuItems[item]);

                lis = lis.concat(childMenus);
            }
            else {
                let menu =
                    <Button
                        small
                        full
                        style={[styles.button, {height: curTextStyle.lineHeight}]}
                        key={menuItems[item].name}
                        onPress={() => {
                            this.props.history.push(menuItems[item].createUrl());
                        }}
                        transparent
                    >
                        {icon}
                        <Text style={curTextStyle}>
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
            <View style={[this.baseStyle, { flexDirection: 'row', backgroundColor: Theme.primary }]}>
                {this.createMenus()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        flexGrow: 1,
        borderRadius: 15,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
    }
})

export default withRouter(Component);
