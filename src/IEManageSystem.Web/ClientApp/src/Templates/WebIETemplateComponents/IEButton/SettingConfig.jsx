import React from 'react'
import PropTypes from 'prop-types'
import Setting from 'IETemplateComponents/IEButton/Setting'
import { Input, Tag, Radio, Button } from 'antd'

import { SketchPicker } from 'react-color'
import { icons } from 'Common/AntIcons'

class SettingConfig extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let buttonSetting = new Setting(this.props.data);

        return (<div className='d-flex flex-wrap'>
            <div className="mb-3 col-md-6">
                <Input
                    value={buttonSetting.text}
                    onChange={(e) => {
                        buttonSetting.text = e.currentTarget.value;
                        this.props.setData(buttonSetting.setting);
                    }}
                    suffix={<Tag color="#55acee">按钮文本</Tag>}
                />
            </div>
            <div className="mb-3 col-md-6">
                <Input
                    value={buttonSetting.url}
                    onChange={(e) => {
                        buttonSetting.url = e.currentTarget.value;
                        this.props.setData(buttonSetting.setting);
                    }}
                    suffix={<Tag color="#55acee">链接 Url</Tag>}
                />
            </div>
            <div className="mb-3 col-md-6">
                <Input
                    value={buttonSetting.bgcolor}
                    onChange={(e) => {
                        buttonSetting.bgcolor = e.currentTarget.value;
                        this.props.setData(buttonSetting.setting);
                    }}
                    suffix={<Tag color="#55acee">按钮颜色</Tag>}
                />
                <SketchPicker
                    color={buttonSetting.bgcolor || '#0000'}
                    onChange={(color, e) => {
                        buttonSetting.bgcolor = color.hex;
                        this.props.setData(buttonSetting.setting);
                    }} />
            </div>
            <div className="mb-3 col-md-6">
                <Input
                    value={buttonSetting.color}
                    onChange={(e) => {
                        buttonSetting.color = e.currentTarget.value;
                        this.props.setData(buttonSetting.setting);
                    }}
                    suffix={<Tag color="#55acee">字体颜色</Tag>}
                />
                <SketchPicker
                    color={buttonSetting.color || '#0000'}
                    onChange={(color, e) => {
                        buttonSetting.color = color.hex;
                        this.props.setData(buttonSetting.setting);
                    }} />
            </div>
            <div className='col-md-6'>
                <div className="mb-3">
                    <Tag color="#55acee">按钮类型</Tag>
                    <Radio.Group
                        value={buttonSetting.btnType}
                        onChange={(e) => {
                            buttonSetting.btnType = e.target.value;
                            this.props.setData(buttonSetting.setting);
                        }}
                    >
                        <Radio value="primary">主按钮</Radio>
                        <Radio value="default">默认按钮</Radio>
                        <Radio value="link">链接</Radio>
                    </Radio.Group>
                </div>
                <div className="mb-3">
                    <Tag color="#55acee">按钮大小</Tag>
                    <Radio.Group
                        value={buttonSetting.size}
                        onChange={(e) => {
                            buttonSetting.size = e.target.value;
                            this.props.setData(buttonSetting.setting);
                        }}
                    >
                        <Radio value="large">大</Radio>
                        <Radio value="middle">中</Radio>
                        <Radio value="small">小</Radio>
                    </Radio.Group>
                </div>
                <div className="mb-3">
                    <Tag color="#55acee">形&#12288;&#12288;状</Tag>
                    <Radio.Group
                        value={buttonSetting.shape}
                        onChange={(e) => {
                            buttonSetting.shape = e.target.value;
                            this.props.setData(buttonSetting.setting);
                        }}
                    >
                        <Radio value="circle">圆角型</Radio>
                        <Radio value="round">有点方</Radio>
                        <Radio value="">正方</Radio>
                    </Radio.Group>
                </div>
            </div>
            <div className="mb-3 col-md-6">
                <Tag className='mb-3' color="#55acee">按钮图标</Tag>
                <Radio.Group
                    value={buttonSetting.icon}
                    onChange={(e) => {
                        buttonSetting.icon = e.target.value;
                        this.props.setData(buttonSetting.setting);
                    }}
                >
                    <Radio>无</Radio>
                    {
                        Object.keys(icons).map(key => {
                            let IconType = icons[key];
                            return <Radio value={key}><IconType /></Radio>
                        })
                    }
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
