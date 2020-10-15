import React from 'react'
import PropTypes from 'prop-types'
import Setting from 'IETemplateComponents/IEVideo/Setting'
import { Input, Tag, Radio } from 'antd';

class SettingConfig extends React.Component {
    setting = null;

    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <div className="mb-3">
                <Tag color="#55acee">自动播放</Tag>
                <Radio.Group
                    value={setting.autoPlay}
                    onChange={(e) => {
                        setting.autoPlay = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="true">是</Radio>
                    <Radio value="false">否</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">循环播放</Tag>
                <Radio.Group
                    value={setting.loopPlay}
                    onChange={(e) => {
                        setting.loopPlay = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="true">是</Radio>
                    <Radio value="false">否</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">隐藏工具栏</Tag>
                <Radio.Group
                    value={setting.hiddenTool}
                    onChange={(e) => {
                        setting.hiddenTool = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="true">是</Radio>
                    <Radio value="false">否</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Tag color="#55acee">使用自定义高度（在基本设置中设置，App 不支持）</Tag>
                <Radio.Group
                    value={setting.customizeHeight}
                    onChange={(e) => {
                        setting.customizeHeight = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="true">是</Radio>
                    <Radio value="false">否</Radio>
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
