import React from 'react'
import PropTypes from 'prop-types'
import Setting from 'IETemplateComponents/IETab/Setting'
import { Input, Tag, Radio } from 'antd';

class SettingConfig extends React.Component {
    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <div className="mb-3">
                <Tag color="#55acee">标签位置（App 端暂不支持）</Tag>
                <Radio.Group
                    value={setting.tabPosition}
                    onChange={(e) => {
                        setting.tabPosition = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="top">顶部</Radio>
                    <Radio value="bottom">底部</Radio>
                    <Radio value="left">左边</Radio>
                    <Radio value="right">右边</Radio>
                </Radio.Group>
            </div>
            {/* <div>
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
            </div> */}
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default SettingConfig;
