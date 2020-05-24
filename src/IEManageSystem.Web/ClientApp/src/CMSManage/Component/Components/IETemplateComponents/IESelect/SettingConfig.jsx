import React from 'react'
import PropTypes from 'prop-types'
import BaseConfig from 'CMSManage/Component/Components/BaseComponents/BaseComponent/BaseConfig'
import Setting from './Setting'

import { Input, Tag, Radio, Button } from 'antd';

export default class SettingConfig extends BaseConfig {
    state = {
        isShowPicturePopupBox: false
    }

    setting = null;

    constructor(props) {
        super(props);

        this.setting = new Setting(props.data);
    }

    render() {
        this.setting.setSetting(this.props.data);

        let seleteDatas = this.setting.getSeleteDatas();

        return (<div>
            {
                seleteDatas.map((item, index) => (
                    <div key={index} className="mb-3 d-flex">
                        <div className="col-md-6">
                            <Input
                                placeholder="名称"
                                value={item.text}
                                onChange={(e)=>{
                                    item.text = e.currentTarget.value;
                                    this.setState({})
                                }}
                                onBlur={(e) => {
                                    this.props.setData(this.setting.setting);
                                }}
                                suffix={<Tag color="#55acee">名称</Tag>}
                            />
                        </div>
                        <div className="col-md-6">
                            <Input
                                placeholder="Url"
                                value={item.url}
                                onChange={(e)=>{
                                    item.url = e.currentTarget.value;
                                    this.setState({})
                                }}
                                onBlur={(e) => {
                                    this.props.setData(this.setting.setting);
                                }}
                                suffix={<Tag color="#55acee">链接 Url</Tag>}
                            />
                        </div>

                    </div>
                ))
            }
            <Button type="primary" onClick={() => {
                this.setting.createSeleteData();
                this.props.setData(this.setting.setting);
            }}>添加数据</Button>
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}