import React from 'react'
import PropTypes from 'prop-types'
import Setting from 'IETemplateComponents/Text/Setting'
import { Input, Tag, Radio } from 'antd';

class SettingConfig extends React.Component {
    setting = null;

    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <div className="mb-3">
                <Tag color="#55acee">文本类型</Tag>
                <Radio.Group
                    value={setting.textType}
                    onChange={(e) => {
                        setting.textType = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="h1">H1</Radio>
                    <Radio value="h2">H2</Radio>
                    <Radio value="h3">H3</Radio>
                    <Radio value="h4">H4</Radio>
                    <Radio value="text">普通文本</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">文本来源</Tag>
                <Radio.Group
                    value={setting.textSource}
                    onChange={(e) => {
                        setting.textSource = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="PTitle">文章标题</Radio>
                    <Radio value="PDescribe">文章描述</Radio>
                    <Radio value="CText">组件文本</Radio>
                </Radio.Group>
            </div>
            <Input
                placeholder="示例：#ffffff"
                className="mb-3"
                value={setting.fontColor}
                onChange={(e) => {
                    setting.fontColor = e.currentTarget.value;
                    this.props.setData(setting.setting);
                }}
                suffix={<Tag color="#55acee">字体颜色</Tag>}
            />
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default SettingConfig;
