import React from 'react'
import PropTypes from 'prop-types'
import ISettingConfig from 'BaseCMSManage/Components/IETemplateComponents/IECard/ISettingConfig'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IECard/Setting'
import { Input, Tag } from 'antd';

class SettingConfig extends ISettingConfig {
    render() {
        let setting = new Setting(this.props.data);

        return (<div className='d-flex'>
            <div className="col-md-6 mb-3">
                <label htmlFor="">图片高度（Web端：30, 30px, 30rem ... | App端：30）</label>
                <Input
                    placeholder="示例：300"
                    value={setting.height}
                    onChange={(e) => {
                        setting.height = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">图片高度</Tag>}
                />
            </div>
            <div className="col-md-6 mb-3">
                <label htmlFor="">图片宽度（Web端：30, 30px, 30rem ... | App端：30）</label>
                <Input
                    placeholder="示例：300"
                    value={setting.width}
                    onChange={(e) => {
                        setting.width = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">图片宽度</Tag>}
                />
            </div>
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default (register) => register(ISettingConfig, SettingConfig);
