import React from 'react'
import PropTypes from 'prop-types'
import Setting from 'IETemplateComponents/IESearch/Setting'
import { Input, Tag, Radio } from 'antd';

class SettingConfig extends React.Component {
    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <div className="mb-3">
                <Input
                    placeholder="示例：/Page/PostList"
                    value={setting.url}
                    onChange={(e) => {
                        setting.url = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">跳转 Url（如：跳转 /Page/PostList）</Tag>}
                />
            </div>
            <div className="mb-3">
                <Input
                    placeholder="示例：#ffffff"
                    value={setting.fontColor}
                    onChange={(e) => {
                        setting.fontColor = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">字体颜色</Tag>}
                />
            </div>
            <div className="mb-3">
                <Tag color="#55acee">图标位置</Tag>
                <Radio.Group
                    value={setting.iconPos}
                    onChange={(e) => {
                        setting.iconPos = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="left">左边</Radio>
                    <Radio value="right">右边</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">显示边框</Tag>
                <Radio.Group
                    value={setting.showBorder}
                    onChange={(e) => {
                        setting.showBorder = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="true">显示</Radio>
                    <Radio value="false">不显示</Radio>
                </Radio.Group>
            </div>
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default SettingConfig;
