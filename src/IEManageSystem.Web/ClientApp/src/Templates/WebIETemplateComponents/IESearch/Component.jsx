import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import IComponent from 'IETemplateComponents/IESearch/IComponent'

import './IESearch.css'


class Component extends IComponent {
    render() {
        let setting = this.getCurrentSetting();
        let icon = <Button
            style={{color: setting.fontColor}}
            type='link'
            onClick={this.onClick}
        >
            <SearchOutlined />
        </Button>;

        return (
            <div style={this.baseStyle} className="ie-search">
                <Input
                    placeholder="在 IceEmblem 中搜索"
                    style={{ border: setting.showBorder == 'false' && "0px", backgroundColor: "fff0", color: setting.fontColor }}
                    prefix={setting.iconPos == 'left' && icon}
                    suffix={setting.iconPos == 'right' && icon}
                    value={this.state.search}
                    onChange={(e) => {
                        this.setState({ search: e.target.value });
                    }}
                />
            </div>
        );
    }
}

export default withRouter(Component);
