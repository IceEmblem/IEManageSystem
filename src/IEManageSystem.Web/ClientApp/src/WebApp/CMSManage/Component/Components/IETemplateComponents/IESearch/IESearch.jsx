import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IESearch/IComponent'
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IESearch/Setting'
import { withRouter } from 'react-router-dom'

import './IESearch.css'

const searchRegex = /search=[^\&]*?/

class IESearch extends IComponent {
    state = {
        search: undefined
    }

    render() {
        let setting = new Setting(this.getDefaultSetting());
        let icon = <Button
            style={{color: setting.fontColor}}
            type='link'
            onClick={() => {
                let params = this.props.location.search;
                if(!searchRegex.test(params)){
                    if(!params) {
                        params = `?search=${this.state.search || ''}`
                    }
                    else {
                        params = `${params}&search=${this.state.search || ''}`
                    }
                }
                else{
                    params = params.replace(searchRegex, `search=${this.state.search || ''}`)
                }

                this.props.history.push(
                    setting.url + params
                );
            }}
        >
            <SearchOutlined />
        </Button>;

        return (
            <div className="ie-search">
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

export default (register) => register(IComponent, withRouter(IESearch));
