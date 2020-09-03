import React from 'react'
import PropTypes from 'prop-types'
import ISettingConfig from 'BaseCMSManage/Components/IETemplateComponents/IEAnimation/ISettingConfig'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEAnimation/Setting'

import { Tag, Radio, InputNumber } from 'antd';

class SettingConfig extends ISettingConfig {
    state = {
        isShowPicturePopupBox: false
    }

    render() {
        let setting = new Setting(this.props.data);

        return (<div className='d-flex flex-wrap'>
            <div className="mb-3 col-md-6">
                <Tag color="#55acee">动画执行事件</Tag>
                <Radio.Group
                    value={setting.time}
                    onChange={(e) => {
                        setting.time = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="init">加载后执行</Radio>
                    <Radio value="scroll">滚动到时执行</Radio>
                    <Radio value="hover">鼠标进入时执行</Radio>
                    <Radio value="repeat">循环</Radio>
                </Radio.Group>
            </div>
            {
                setting.time == "repeat" &&
                <div className='mb-3 col-md-6'>
                    <Tag color="#55acee">循环时间间隔(秒)</Tag>
                    <InputNumber
                        value={setting.repeatTime}
                        onChange={(value) => {
                            setting.repeatTime = value;
                            this.props.setData(setting.setting);
                        }}
                    />
                </div>
            }
            <div className="mb-3 col-md-6">
                <Tag color="#55acee">方向</Tag>
                <Radio.Group
                    value={setting.direction}
                    onChange={(e) => {
                        setting.direction = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="toRight">左到右</Radio>
                    <Radio value="toBottom">上到下</Radio>
                    <Radio value="toLeft">右到左</Radio>
                    <Radio value="toTop">下到上</Radio>
                    <Radio value="toLarge">从无到有</Radio>
                    <Radio value="toOpacity">淡入</Radio>
                </Radio.Group>
            </div>
            <div className='mb-3 col-md-6'>
                <Tag color="#55acee">初始值 0 - 100</Tag>
                <InputNumber
                    value={setting.initValue}
                    onChange={(value) => {
                        setting.initValue = value;
                        this.props.setData(setting.setting);
                    }}
                />
            </div>
            <div className="mb-3 col-md-6">
                <Tag color="#55acee">是否隐藏溢出部分</Tag>
                <Radio.Group
                    value={setting.isOverHidden}
                    onChange={(e) => {
                        setting.isOverHidden = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="true">隐藏</Radio>
                    <Radio value="false">不隐藏</Radio>
                </Radio.Group>
            </div>
            <div className='mb-3 col-md-6'>
                <Tag color="#55acee">执行速度</Tag>
                <InputNumber
                    value={setting.speed}
                    onChange={(value) => {
                        setting.speed = value;
                        this.props.setData(setting.setting);
                    }}
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