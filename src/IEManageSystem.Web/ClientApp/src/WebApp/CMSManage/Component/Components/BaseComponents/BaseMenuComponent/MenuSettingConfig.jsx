import React from 'react';
import {ComponentSettingConfig} from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import {IMenuSettingConfig} from 'BaseCMSManage/Components/BaseComponents/BaseMenuComponent';
import { ieReduxFetch } from 'Core/IEReduxFetch'
import IocContainer from 'Core/IocContainer';

import { Select } from 'antd';

const { Option } = Select;

class MenuSettingConfig extends IMenuSettingConfig {
    constructor(props) {
        super(props)

        this.state = {
            menus: []
        }
    }

    componentDidMount() {
        ieReduxFetch("/api/Menu/GetMenus", {})
            .then(value => {
                this.setState({ menus: value.menus });
            })
    }

    render() {
        let menuList = this.state.menus.map(item => <Option key={item.id} value={item.name}>{item.displayName}</Option>);

        // 如果当前没有选择页面且有页面，则默认选择第一个页面
        if (!this.props.data &&
            this.state.menus.length > 0) {
            this.props.setData(this.state.menus[0].name);

            return <div></div>;
        }

        return (
            <div className="col-md-12 float-left">
                <label htmlFor="sel1">指定菜单:</label>
                <Select
                    showSearch
                    onChange={(value) => {
                        this.props.setData(value);
                    }}
                    value={this.props.data}
                    className="w-100"
                    dropdownStyle={{zIndex:10000}}
                >
                    {menuList}
                </Select>
            </div>
        );
    }
}

const buildMenuSettingConfig = function(){
    return ComponentSettingConfig.BuildMenuComponentSettingConfig("ieMenuSetting", "菜单配置",
        (pageComponentSetting, setPageComponentSetting) => {
            return <MenuSettingConfig
                data={pageComponentSetting}
                setData={setPageComponentSetting}
            />;
        }
    );
}

IocContainer.registerTransient(IMenuSettingConfig, buildMenuSettingConfig);