import React from 'react'
import PropTypes from 'prop-types'
import {BaseConfig} from 'CMSManage/Component/Components/BaseComponents/BaseComponent'
import Setting from './Setting'

import { Input, Tag, Radio, Typography, Card } from 'antd';

export default class SettingConfig extends BaseConfig {
    render() {
        let setting = new Setting(this.props.data);

        return (<div>
            <div className="mb-3">
                <Input
                    placeholder="示例：线条1|线条2|线条3"
                    value={setting.lines}
                    onChange={(e) => {
                        setting.lines = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">线条名称（多线条已 | 进行分隔）</Tag>}
                />
            </div>
            <div className="mb-3">
                <Input
                    placeholder="示例：°C"
                    value={setting.suffix}
                    onChange={(e) => {
                        setting.suffix = e.currentTarget.value;
                        this.props.setData(setting.setting);
                    }}
                    suffix={<Tag color="#55acee">后缀</Tag>}
                />
            </div>
            <div className="mb-3">
                <span>图表类型：</span>
                <Radio.Group
                    value={setting.type}
                    onChange={(e) => {
                        setting.type = e.target.value;
                        this.props.setData(setting.setting);
                    }}
                >
                    <Radio value="zx">折线图</Radio>
                    <Radio value="zz">柱状图</Radio>
                    <Radio value="tx">条形图</Radio>
                </Radio.Group>
            </div>
            <div className="mb-3">
                <Card title="折线图配置">
                    <div className="mb-3">
                        <span>形状：</span>
                        <Radio.Group
                            value={setting.lineShape}
                            onChange={(e) => {
                                setting.lineShape = e.target.value;
                                this.props.setData(setting.setting);
                            }}
                        >
                            <Radio value="">折线</Radio>
                            <Radio value="smooth">曲线</Radio>
                            <Radio value="hv">梯形</Radio>
                        </Radio.Group>

                    </div>
                </Card>
            </div>
            <div className="mb-3">
                <Card title="柱状图配置">
                    <div className="mb-3">
                        <span>形状：</span>
                        <Radio.Group
                            value={setting.zhuzhuangShape}
                            onChange={(e) => {
                                setting.zhuzhuangShape = e.target.value;
                                this.props.setData(setting.setting);
                            }}
                        >
                            <Radio value="">条形</Radio>
                            <Radio value="polar">圆形</Radio>
                        </Radio.Group>
                    </div>
                    <div className="mb-3">
                        <span>显示类型：</span>
                        <Radio.Group
                            value={setting.dodgeOfzhuzhuang}
                            onChange={(e) => {
                                setting.dodgeOfzhuzhuang = e.target.value;
                                this.props.setData(setting.setting);
                            }}
                        >
                            <Radio value="dodge">分开</Radio>
                            <Radio value="jitter">有点堆叠</Radio>
                            <Radio value="stack">堆叠</Radio>
                            <Radio value="symmetric">区间</Radio>
                        </Radio.Group>
                    </div>
                </Card>
            </div>
            <div className="mb-3">
                <Card title="条形图配置">
                    <div className="mb-3">
                        <span>形状：</span>
                        <Radio.Group
                            value={setting.dodgeOfTiaoxing}
                            onChange={(e) => {
                                setting.dodgeOfTiaoxing = e.target.value;
                                this.props.setData(setting.setting);
                            }}
                        >
                            <Radio value="dodge">分开</Radio>
                            <Radio value="jitter">有点堆叠</Radio>
                            <Radio value="stack">堆叠</Radio>
                            <Radio value="symmetric">区间</Radio>
                        </Radio.Group>
                    </div>
                </Card>
            </div>
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}